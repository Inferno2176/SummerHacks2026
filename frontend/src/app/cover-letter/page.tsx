"use client";
import React from 'react';

const letters = [
  {
    id: 1,
    name: "Google_UX_Letter_v1.pdf",
    edited: "2 hours ago",
    optimized: 94,
    statusText: "94% Optimized",
    type: "Product Design",
    theme: "bg-tertiary-container/10",
    iconColor: "text-tertiary"
  },
  {
    id: 2,
    name: "Stripe_Marketing_Final.pdf",
    edited: "1 day ago",
    optimized: 88,
    statusText: "88% Optimized",
    type: "Marketing",
    theme: "bg-primary-container/10",
    iconColor: "text-primary"
  },
  {
    id: 3,
    name: "Startup_Draft_Rough.docx",
    edited: "3 days ago",
    optimized: 70,
    statusText: "70% Needs Work",
    type: "General",
    theme: "bg-error-container/10",
    iconColor: "text-error"
  }
];

export default function CoverLetterPage() {
  return (
    <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] flex flex-col">
      <main className="flex-1 p-6 xl:p-8 max-w-7xl mx-auto w-full pb-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <h2 className="text-4xl font-manrope font-black text-on-surface tracking-tight mb-2 uppercase">Cover Letter</h2>
            <p className="text-on-surface-variant text-lg font-body font-medium opacity-70">Draft, optimize, and manage your tailored letters.</p>
          </div>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-md py-4 px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Create New Letter
          </button>
        </div>

        {/* Upload Zone */}
        <div className="mb-6 bg-white/50 backdrop-blur-sm rounded-md p-8 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low/50 transition-all group ambient-shadow">
          <div className="w-14 h-14 rounded-md bg-primary-container/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl text-primary font-bold">upload_file</span>
          </div>
          <h3 className="text-xl font-manrope font-black text-on-surface mb-2 uppercase tracking-tight">Drag & Drop your cover letter</h3>
          <p className="text-sm text-on-surface-variant font-bold opacity-60 uppercase tracking-tighter">Supports PDF and DOCX formats up to 5MB.</p>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter) => (
            <div key={letter.id} className="bg-white rounded-md p-7 flex flex-col relative group transition-all hover:-translate-y-1 ambient-shadow border border-outline-variant/10">
              <div className="absolute top-7 right-7 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-md hover:bg-primary/5">
                  <span className="material-symbols-outlined text-xl">download</span>
                </button>
                <button className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-md hover:bg-error/5">
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>

              <div className={`w-12 h-12 rounded-md ${letter.theme} flex items-center justify-center mb-4 border border-outline-variant/5`}>
                <span className={`material-symbols-outlined ${letter.iconColor} text-xl`} style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              </div>

              <h4 className="font-manrope font-black text-lg text-on-surface mb-1 truncate pr-16 uppercase tracking-tight">{letter.name}</h4>
              <p className="text-xs text-on-surface-variant mb-4 font-black opacity-60 uppercase tracking-tighter">Edited {letter.edited}</p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant/5">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tighter ${letter.theme.replace('/10', '/30')} ${letter.iconColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${letter.iconColor.replace('text-', 'bg-')} mr-2 animate-pulse`}></span>
                  {letter.statusText}
                </span>
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest bg-surface-container-highest/50 px-3 py-1.5 rounded-md">
                  {letter.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
