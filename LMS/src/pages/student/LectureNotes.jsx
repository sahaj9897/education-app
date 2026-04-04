import React, { useEffect, useState } from "react";
import { useGetLectureAINotesQuery } from "@/features/api/courseApi"; // Update import
import { Loader2, FileText, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

const LectureNotes = ({ lectureId }) => {
  // If the status is processing, tell RTK Query to refetch every 5 seconds!
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading, isError, refetch } = useGetLectureAINotesQuery(lectureId, {
    pollingInterval: pollingInterval,
  });

  
  useEffect(() => {
    if (data?.status === "processing") {
      setPollingInterval(5000); // Check every 5 seconds
    } else {
      setPollingInterval(0); // Stop checking once done or error
    }
  }, [data]);

  if (isLoading) return <div className="p-4">Checking for AI Notes...</div>;
  if (isError || data?.status === "error") {
    return (
      <div className="flex items-center gap-2 text-red-500 p-4 bg-red-50 rounded-md">
        <AlertCircle className="w-5 h-5" />
        <p>Failed to generate AI notes for this lecture.</p>
      </div>
    );
  }

  if (data?.status === "processing") {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <h3 className="font-medium text-lg">AI is generating notes...</h3>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-sm">
          We are watching the video and summarizing the key points. This usually takes about a minute. You don't need to refresh the page.
        </p>
      </div>
    );
  }

  // ... existing code (loading states, error states)

  if (data?.status === "done" && data?.notes) {
    
    if (data.notes.includes("[NOT_EDUCATIONAL]")) {
        console.log(data.notes)
      return (
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-10 h-10 text-yellow-500 mb-3" />
          <h3 className="font-semibold text-lg text-yellow-800 dark:text-yellow-200">No Study Notes Available</h3>
          <p className="text-yellow-600 dark:text-yellow-400 mt-2 text-sm max-w-md">
            This video doesn't appear to contain a standard academic lecture or instructional content, so our AI couldn't generate structured study notes for it.
          </p>
        </div>
      );
    }
    console.log(data.notes)
    // NORMAL: Render the beautiful Markdown notes
    return (
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">AI Lecture Notes</h2>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{data.notes}</ReactMarkdown>
        </div>
      </div>
    );
  }

  return null;
};

export default LectureNotes;