"use client";
import React, { useState } from 'react';

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    // Mock the backend call to our Node.js / Express Server
    setTimeout(() => {
      setIsUploading(false);
      setMessage("Resume successfully securely stored in Firebase and parsed by AI!");
      setFile(null);
    }, 2000);
  };

  return (
    <div className="bg-surface-container-low p-6 rounded-md ambient-shadow border border-ghost w-full max-w-md">
      <h3 className="text-xl font-manrope font-bold mb-4">Upload Base Resume</h3>
      <p className="text-sm text-outline-variant mb-6">Let the AI extract your profile.</p>
      
      <div className="border-2 border-dashed border-outline-variant/30 rounded-md p-8 text-center mb-6">
        <input 
          type="file" 
          id="resume" 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx" 
        />
        <label htmlFor="resume" className="cursor-pointer font-bold text-primary hover:text-primary-dim">
          {file ? file.name : "Click to select a file"}
        </label>
      </div>

      <button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-white rounded-[9999px] font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isUploading ? "Uploading & Analyzing..." : "Extract Data"}
      </button>

      {message && <p className="mt-4 text-secondary font-semibold text-sm">{message}</p>}
    </div>
  );
}