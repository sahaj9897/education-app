import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ input, setInput }) => {
  // Ensure input.description exists, default to empty string
  const content = input?.description || '';
  
  const handleChange = (content) => {
    setInput(prev => ({
      ...prev,
      description: content
    }));
  };

  return (
    <ReactQuill 
      theme="snow" 
      value={content}
      onChange={handleChange}
      placeholder="Enter your content here..."
    />
  );
};

export default RichTextEditor;