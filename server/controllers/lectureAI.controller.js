import axios from "axios";
import { Lecture } from "../models/lecture.model.js";
import { LectureAI } from "../models/lectureAI.model.js";
import { GoogleGenAI } from "@google/genai";

/* ----------------------------------
   CLOUDINARY: video → audio
-----------------------------------*/
const getAudioUrlFromVideo = (videoUrl) => {
  console.log("🎧 Converting video to audio URL");
  // Ensure we are only replacing the upload segment correctly
  return videoUrl.replace("/upload/", "/upload/f_mp3/q_auto/");
};

/* ----------------------------------
   GLADIA: Transcription Helpers
-----------------------------------*/
const startGladiaTranscription = async (audioUrl) => {
  console.log("📝 Starting Gladia transcription");
  const res = await axios.post(
    "https://api.gladia.io/v2/pre-recorded",
    { audio_url: audioUrl },
    {
      headers: {
        "Content-Type": "application/json",
        "x-gladia-key": process.env.GLADIA_API_KEY,
      },
    },
  );
  return res.data.result_url;
};

const pollGladiaResult = async (resultUrl) => {
  console.log("⏳ Polling Gladia transcription result");
  while (true) {
    const res = await axios.get(resultUrl, {
      headers: { "x-gladia-key": process.env.GLADIA_API_KEY },
    });
    const status = res.data.status;

    if (status === "done") {
      const transcription = res.data.result?.transcription;
      if (transcription?.full_transcript) return transcription.full_transcript;
      if (Array.isArray(transcription?.utterances)) {
        return transcription.utterances.map((u) => u.text).join(" ");
      }
      throw new Error("Gladia returned no usable transcript");
    }
    if (status === "error") throw new Error("Gladia transcription failed");

    await new Promise((r) => setTimeout(r, 5000));
  }
};

const transcribeWithGladia = async (audioUrl) => {
  const resultUrl = await startGladiaTranscription(audioUrl);
  return pollGladiaResult(resultUrl);
};

/* ----------------------------------
   GEMINI: Generation
-----------------------------------*/
const ai = new GoogleGenAI({ apiKey: process.env.GEMINIPRO_API_KEY });

const generateNotesWithGemini = async (transcript) => {
  console.log("🤖 Sending transcript to Gemini");
  const prompt = `
You are an expert AI teaching assistant. Your task is to analyze the following video transcript.

STEP 1: EVALUATE THE CONTENT
Determine if the transcript is educational, academic, or instructional. 
If the transcript is empty, or is mostly casual conversation, gaming, music, or a vlog:
You MUST stop immediately and output EXACTLY AND ONLY this string:
[NOT_EDUCATIONAL]

STEP 2: GENERATE NOTES (ONLY IF EDUCATIONAL)
If the content IS educational, generate study notes using EXACTLY the following Markdown format. ALWAYS wrap technical terms or code in backticks. Do not add greetings.

## **Summary**
(Provide a brief summary in 2 to 3 short sentences maximum.)

## **Structured Notes**
- **[Replace with Heading 1]**
  - [Replace with Point 1]
  - [Replace with Point 2]
- **[Replace with Heading 2]**
  - [Replace with Point 1]

## **Key Ideas for Revision**
- [Replace with Idea 1]
- [Replace with Idea 2]

Transcript:
"""
${transcript}
"""`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash", // Updated to the stable Flash model
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.4, maxOutputTokens: 4096 },
  });
  return response.candidates[0].content.parts[0].text;
};

/* ----------------------------------
   BACKGROUND WORKER
-----------------------------------*/
export const processLectureAI = async (lectureId) => {
  try {
    const existing = await LectureAI.findOne({ lectureId });
    if (existing?.status === "done") return;

    await LectureAI.findOneAndUpdate(
      { lectureId },
      { status: "processing" },
      { upsert: true },
    );

    // Fetch the actual lecture document from your DB
    const lecture = await Lecture.findById(lectureId);
    if (!lecture || !lecture.videoUrl)
      throw new Error("Lecture or video not found");

    const audioUrl = getAudioUrlFromVideo(lecture.videoUrl);
    const transcript = await transcribeWithGladia(audioUrl);
    const notes = await generateNotesWithGemini(transcript);

    await LectureAI.findOneAndUpdate(
      { lectureId },
      { transcript, notes, status: "done" },
    );
    console.log("✅ AI notes saved successfully");
  } catch (err) {
    console.error("❌ Lecture AI error:", err.message);
    await LectureAI.findOneAndUpdate({ lectureId }, { status: "error" });
  }
};

/* ----------------------------------
   STUDENT API ENDPOINT
-----------------------------------*/
export const getLectureNotes = async (req, res) => {
  try {
    const { lectureId } = req.params;

    let data = await LectureAI.findOne({ lectureId });

    // Lazy trigger
    if (!data) {
      console.log("🚀 Triggering AI generation for lecture:", lectureId);
      processLectureAI(lectureId); // Runs in background (no await)
      return res.status(202).json({ status: "processing" }); // 202 Accepted
    }

    if (data.status === "processing") {
      return res.status(202).json({ status: "processing" });
    }

    if (data.status === "error") {
      return res
        .status(500)
        .json({ status: "error", message: "AI generation failed" });
    }

    return res.status(200).json({
      status: "done",
      notes: data.notes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
