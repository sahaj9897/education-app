import mongoose from "mongoose";

const lectureAISchema = new mongoose.Schema({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",  
    required: true,
    unique: true, 
  },
  transcript: String,
  notes: String,
  status: {
    type: String,
    enum: ["pending", "processing", "done", "error"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LectureAI = mongoose.model("LectureAI", lectureAISchema);