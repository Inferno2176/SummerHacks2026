"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ResumeData } from '@/components/ResumePreview';
import Link from 'next/link';
import { runAgentSkill } from '@/app/actions/ai';
import ClassicResumePreview from '@/components/ClassicResumePreview';

export default function ResumePage() {
  const { userProfile, loading: authLoading } = useAuth();
  const [masterResume, setMasterResume] = useState<ResumeData | null>(null);
  const [displayResume, setDisplayResume] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  // Tailor Panel State
  const [jobDescription, setJobDescription] = useState("");
  const [gaps, setGaps] = useState<any>(null);
  const [isTailoring, setIsTailoring] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'tailor'>('preview');

  useEffect(() => {
    async function loadOrGenerateResume() {
      if (authLoading || !userProfile) return;
      
      // Fast bypass: If userProfile actually has the structured format already from a previous save
      if ((userProfile as any).masterResume) {
         setMasterResume((userProfile as any).masterResume);
         setDisplayResume((userProfile as any).masterResume);
         return;
      }

      // Phase 1: Generate Master Node
      setIsGenerating(true);
      try {
        const parsedNode = await runAgentSkill('resume_parser', userProfile);
        setMasterResume(parsedNode);
        setDisplayResume(parsedNode);
      } catch (err: any) {
        setGenerationError(err.message || "(Phase 1) Engine failed to synthesize data. Please check questionnaire inputs.");
      } finally {
        setIsGenerating(false);
      }
    }
    
    if (!masterResume && !isGenerating && !generationError) {
      loadOrGenerateResume();
    }
  }, [userProfile, authLoading, masterResume, isGenerating, generationError]);

  const handleTailorSynthesis = async () => {
    if (!jobDescription.trim() || !masterResume) return;
    setIsTailoring(true);
    try {
      // 1. Identify Gaps
      const computedGaps = await runAgentSkill('job_matcher', { resume: masterResume, jd: jobDescription });
      setGaps(computedGaps);

      // 2. Synthesize new CV
      const tailoredResume = await runAgentSkill('cv_tailor', { resume: masterResume, gaps: computedGaps });
      setDisplayResume(tailoredResume);
      setActiveTab('preview');
    } catch (err: any) {
       alert(`Synthesis Error: ${err.message}`);
    } finally {
      setIsTailoring(false);
    }
  };

  const revertToMaster = () => {
    setDisplayResume(masterResume);
    setGaps(null);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface text-on-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-primary border-t-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest p-6 md:p-10 overflow-y-auto font-body flex flex-col">
      <header className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-6 w-full max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Dashboard
        </Link>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 bg-surface-container px-2 py-1 rounded-md border border-outline-variant/20">
              <button 
                onClick={() => setActiveTab('preview')} 
                className={`px-4 py-2 text-[10px] uppercase font-black tracking-widest rounded transition-colors ${activeTab === 'preview' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Canvas
              </button>
              <button 
                onClick={() => setActiveTab('tailor')} 
                className={`px-4 py-2 text-[10px] uppercase font-black tracking-widest rounded transition-colors flex items-center gap-2 ${activeTab === 'tailor' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                Tailor Panel
              </button>
           </div>
           <button className="px-6 py-2.5 bg-surface text-on-surface border border-outline-variant/20 rounded-md font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-surface-container transition-all flex items-center gap-2">
             <span className="material-symbols-outlined text-[14px]">download</span>
             Download AST
           </button>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: Synthesis / Tailor Controls */}
        <div className={`lg:col-span-4 space-y-6 ${activeTab !== 'tailor' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-surface-container rounded-md p-6 border border-outline-variant/20 shadow-sm relative overflow-hidden">
             {/* Gradient glow to make it look advanced */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
             
             <h2 className="text-sm font-manrope font-black tracking-widest text-on-surface uppercase mb-2 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
               Resonance Engine
             </h2>
             <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed mb-6">
               Paste a job description below. The AI will compute missing resonance gaps and dynamically tailor your CV bullets.
             </p>
             
             <textarea 
               value={jobDescription}
               onChange={(e) => setJobDescription(e.target.value)}
               placeholder="Insert full Job Description here..."
               className="w-full h-48 bg-surface border border-outline-variant/20 rounded-md p-4 text-[12px] font-medium text-on-surface-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none shadow-inner mb-4"
             ></textarea>
             
             {isTailoring ? (
                <div className="w-full bg-primary/10 text-primary border border-primary/20 py-3 rounded-md flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest pulse-fast">
                   <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                   Synthesizing...
                </div>
             ) : (
                <button 
                  onClick={handleTailorSynthesis}
                  disabled={!jobDescription.trim() || !masterResume}
                  className="w-full bg-primary hover:opacity-90 text-on-primary py-3 rounded-md flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  Tailor CV
                </button>
             )}

             {displayResume !== masterResume && (
                <button onClick={revertToMaster} className="w-full mt-3 bg-surface hover:bg-surface-container-high text-on-surface-variant border border-outline-variant/10 py-3 rounded-md flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all">
                  <span className="material-symbols-outlined text-[14px]">history</span>
                  Revert Vector
                </button>
             )}
          </div>

          {/* Gaps Computation Module */}
          {gaps && (
             <div className="bg-tertiary/5 border border-tertiary/20 rounded-md p-6 shadow-sm animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-tertiary/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-tertiary flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">radar</span>
                     Gap Analysis
                   </h3>
                   <span className="text-[10px] font-black px-2 py-1 bg-tertiary/10 text-tertiary rounded">Match: {gaps.resonanceScore || "??"}%</span>
                </div>
                
                <div className="space-y-4">
                   <div className="space-y-2">
                     <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-80">Missing Keywords</div>
                     <div className="flex flex-wrap gap-1.5">
                       {gaps.missingKeywords?.map((kw: string, i: number) => (
                         <span key={i} className="px-2 py-1 bg-white border border-tertiary/30 text-[9px] font-bold text-tertiary uppercase tracking-wider rounded">{kw}</span>
                       ))}
                     </div>
                   </div>
                   <div className="space-y-2">
                     <div className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-80">Underemphasized Metrics</div>
                     <div className="flex flex-wrap gap-1.5">
                       {gaps.underemphasizedSkills?.map((kw: string, i: number) => (
                         <span key={i} className="px-2 py-1 bg-white border border-tertiary/30 text-[9px] font-bold text-tertiary uppercase tracking-wider rounded">{kw}</span>
                       ))}
                     </div>
                   </div>
                </div>
             </div>
          )}
        </div>

        {/* Right Panel: Canvas */}
        <div className={`lg:col-span-8 ${activeTab !== 'preview' ? 'hidden lg:block' : 'block'}`}>
          {isGenerating ? (
            <div className="bg-surface-container rounded-md flex flex-col items-center justify-center py-40 border border-outline-variant/10 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[200%] animate-[shimmer_2s_infinite]"></div>
               <span className="material-symbols-outlined text-[48px] text-primary/30 mb-6 animate-pulse">account_tree</span>
               <h2 className="text-lg font-manrope font-black tracking-tight text-on-surface uppercase mb-3">Synthesizing AST Nodes</h2>
               <p className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">Parsing questionnaire via AI Engine (Phase 1)...</p>
               <div className="mt-8 w-64 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-1/2 animate-[slide_1s_ease-in-out_infinite_alternate] rounded-full"></div>
               </div>
            </div>
          ) : generationError ? (
            <div className="bg-error/5 border border-error/20 rounded-md p-10 text-center space-y-4">
               <span className="material-symbols-outlined text-[40px] text-error">error</span>
               <h2 className="text-base font-black text-on-surface uppercase tracking-widest">Engine Fault Detected</h2>
               <p className="text-xs text-error font-bold leading-relaxed">{generationError}</p>
            </div>
          ) : !userProfile ? (
            <div className="bg-surface-container rounded-md p-20 text-center space-y-6 border border-outline-variant/10">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-2">person_off</span>
              <h2 className="text-xl font-headline font-black uppercase tracking-tight text-on-surface">No Identity Matrix Found</h2>
              <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed max-w-sm mx-auto">Complete the 9-step onboarding ritual to initialize your master data nodes.</p>
              <Link href="/onboarding" className="inline-block bg-primary text-white mt-4 px-8 py-3 rounded-md font-black text-[10px] uppercase tracking-widest shadow-sm hover:opacity-90 transition-all">Begin Onboarding</Link>
            </div>
          ) : displayResume ? (
             <div className="flex justify-center w-full">
               <ClassicResumePreview data={displayResume} />
             </div>
          ) : null}
        </div>
        
      </div>
    </div>
  );
}
