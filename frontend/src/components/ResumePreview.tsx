"use client";

import React from 'react';

export interface ExperienceItem {
  role: string;
  org: string;
  dates: string;
  desc: string;
  isTailored?: boolean;
}

export interface ResumeData {
  name: string;
  email: string;
  location: string;
  objective: string;
  internships: ExperienceItem[];
  jobs: ExperienceItem[];
  education: string;
  skills: string[];
  accomplishments: string;
}

const renderBullets = (text: string) => {
  if (!text) return null;
  // Split by bullet point character or newline if they used it
  const lines = text.split(/•|\n/).map(line => line.trim()).filter(line => line.length > 0);
  return (
    <ul className="list-disc list-outside ml-4 space-y-2 mt-2">
      {lines.map((bullet, j) => {
        // Strip leading hyphen if they used that instead of bullet
        const cleanBullet = bullet.replace(/^-/, '').trim();
        return (
          <li key={j} className="text-sm text-zinc-600 leading-relaxed pl-2">
            {cleanBullet}
          </li>
        );
      })}
    </ul>
  );
};

export default function ResumePreview({ data }: { data: ResumeData }) {
  if (!data) return null;

  return (
    <div className="bg-white text-zinc-900 p-12 shadow-2xl rounded-sm w-full font-serif min-h-[1100px] border border-zinc-100 flex flex-col relative transition-all duration-500">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-zinc-900 pb-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-3">{data.name || "Candidate Name"}</h1>
        <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.email && data.location && <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </header>

      <div className="flex-1 space-y-8">
        
        {/* Objective */}
        {data.objective && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 border-b border-zinc-100 pb-2">Executive Summary</h2>
            <p className="text-sm text-zinc-700 leading-relaxed font-medium">{data.objective}</p>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 border-b border-zinc-100 pb-2">Technical Proficiencies</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-zinc-50 px-3 py-1 text-xs font-bold text-zinc-700 rounded border border-zinc-100">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Jobs */}
        {data.jobs && data.jobs.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-zinc-100 pb-2">Professional Experience</h2>
            <div className="space-y-6">
              {data.jobs.map((exp, i) => (
                <div key={i} className={`group relative p-2 -mx-2 rounded transition-colors ${exp.isTailored ? 'bg-primary/5 border border-primary/20' : ''}`}>
                  {exp.isTailored && (
                    <div className="absolute -right-2 top-2 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                      Resonance Tailored
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pr-24">
                    <h3 className="text-lg font-bold text-zinc-900">{exp.role}</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">
                      <div>{exp.org}</div>
                      <div className="text-zinc-300 mt-0.5">{exp.dates}</div>
                    </div>
                  </div>
                  {renderBullets(exp.desc)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internships */}
        {data.internships && data.internships.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 border-b border-zinc-100 pb-2">Internships & Co-ops</h2>
            <div className="space-y-6">
              {data.internships.map((exp, i) => (
                 <div key={i} className={`group relative p-2 -mx-2 rounded transition-colors ${exp.isTailored ? 'bg-primary/5 border border-primary/20' : ''}`}>
                  {exp.isTailored && (
                    <div className="absolute -right-2 top-2 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                      Resonance Tailored
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pr-24">
                    <h3 className="text-lg font-bold text-zinc-900">{exp.role}</h3>
                     <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">
                      <div>{exp.org}</div>
                      <div className="text-zinc-300 mt-0.5">{exp.dates}</div>
                    </div>
                  </div>
                  {renderBullets(exp.desc)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Accomplishments row */}
        <div className="grid grid-cols-2 gap-8">
          {data.education && (
             <section>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 border-b border-zinc-100 pb-2">Education</h2>
              <p className="text-sm text-zinc-700 font-medium whitespace-pre-wrap">{data.education}</p>
             </section>
          )}
          {data.accomplishments && (
             <section>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 border-b border-zinc-100 pb-2">Accomplishments</h2>
              <p className="text-sm text-zinc-700 font-medium whitespace-pre-wrap">{data.accomplishments}</p>
             </section>
          )}
        </div>
      </div>

      {/* Footer / Watermark */}
      <footer className="mt-20 pt-8 border-t border-zinc-100 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.4em] flex justify-between items-center">
        <span>Generated by Lumina AI Engine</span>
        <span>2026</span>
      </footer>
    </div>
  );
}
