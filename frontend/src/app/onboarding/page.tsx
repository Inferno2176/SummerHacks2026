"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { runAgentSkill } from '../actions/ai';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const STEPS = [
  "Personal Details", 
  "Career Objective", 
  "Education", 
  "Work History", 
  "Training & Courses", 
  "Skills", 
  "Extra-Curricular", 
  "Portfolio", 
  "Accomplishments"
];

const MANDATORY_STEPS = [0]; 
const CRITICAL_STEPS = [3, 5]; 

interface WorkEntry {
  id: string;
  type: 'job' | 'internship';
  role: string;
  organization: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export default function OnboardingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showStuckLink, setShowStuckLink] = useState(false);
  
  const [workHistory, setWorkHistory] = useState<WorkEntry[]>([]);
  const [addingEntry, setAddingEntry] = useState<'job' | 'internship' | null>(null);
  const [tempEntry, setTempEntry] = useState<Partial<WorkEntry>>({
    role: "", organization: "", description: "", isCurrent: false, isRemote: false, startDate: "", endDate: ""
  });

  const [formData, setFormData] = useState<any>({
    fullName: "", email: "", phone: "", location: "",
    objective: "", education: "", training: "", skills: "",
    extra: "", portfolio: "", accomplishments: ""
  });

  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);

  // Monitoring for "stuck" state
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitting) {
      timer = setTimeout(() => setShowStuckLink(true), 4500);
    } else {
      setShowStuckLink(false);
    }
    return () => clearTimeout(timer);
  }, [isSubmitting]);

  const isFieldFilled = (stepIdx: number) => {
    if (stepIdx === 0) return (formData.fullName?.trim().length > 0) && (formData.email?.trim().length > 0);
    if (stepIdx === 3) return workHistory.length > 0;
    const fields = ["fullName", "objective", "education", "experience", "training", "skills", "extra", "portfolio", "accomplishments"];
    return (formData[fields[stepIdx]]?.trim().length > 0);
  };

  const filledCount = STEPS.filter((_, i) => isFieldFilled(i)).length;
  const progressPercentage = Math.round((filledCount / STEPS.length) * 100);

  const handleNext = () => {
    if (MANDATORY_STEPS.includes(currentStep) && !isFieldFilled(currentStep)) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    setShowError(false);
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalize();
    }
  };

  const forceNavigate = () => {
    console.warn("Triggering Force-Navigate to Dashboard...");
    window.location.assign('/dashboard');
  };

  const handleFinalize = async () => {
    if (!user) {
      alert("Portal access denied. Please re-authenticate.");
      return;
    }
    
    if (!isFieldFilled(0)) {
      setCurrentStep(0);
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    
    // FAIL-SAFE: If everything hangs, navigate after 3 seconds anyway
    const failSafeTimer = setTimeout(() => {
       forceNavigate();
    }, 3000);

    try {
      const finalizedProfile = {
        ...formData,
        workHistory,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString()
      };

      const userRef = doc(db, "users", user.uid);
      
      // Use Promise.race to prevent indefinite hanging on setDoc
      await Promise.race([
        setDoc(userRef, finalizedProfile, { merge: true }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Database Timeout")), 2500))
      ]);

      clearTimeout(failSafeTimer);
      router.push('/dashboard');
      
      // Hard fallback if route change fails
      setTimeout(() => forceNavigate(), 1000);

    } catch (err) {
      console.error("Critical Synchronization Error:", err);
      clearTimeout(failSafeTimer);
      // In case of error, we still want to try to get them into the dashboard
      forceNavigate();
    }
  };

  const helpMeWrite = async () => {
    setIsAILoading(true);
    try {
      const result = await runAgentSkill("objective_helper", { 
        name: formData.fullName, 
        skills: formData.skills 
      });
      if (result.suggestion) {
        setFormData({ ...formData, objective: result.suggestion });
      }
    } catch (err) {
       console.error("AI Skill Error:", err);
    } finally {
       setIsAILoading(false);
    }
  };

  const saveWorkEntry = () => {
    if (!tempEntry.role || !tempEntry.organization) return;
    const entry = {
      ...tempEntry,
      id: Math.random().toString(36).substr(2, 9),
      type: addingEntry
    } as WorkEntry;
    setWorkHistory([...workHistory, entry]);
    setAddingEntry(null);
    setTempEntry({ role: "", organization: "", description: "", isCurrent: false, isRemote: false, startDate: "", endDate: "" });
  };

  return (
    <div className="min-h-screen bg-[#0a0a10] text-gray-100 flex flex-col font-body selection:bg-indigo-500/30">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="w-full h-1 bg-white/5 fixed top-0 z-50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-700 ease-out" 
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 pt-16">
        <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10">
          <div className="max-w-2xl w-full space-y-10 animate-fade-in-up">
            <header className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 opacity-80">
                Phase {currentStep + 1} / {STEPS.length}
              </span>
              <h1 className="text-5xl font-manrope font-black tracking-tighter uppercase leading-none">{STEPS[currentStep]}</h1>
            </header>

            <div className={`bg-[#11111a]/80 backdrop-blur-3xl p-10 lg:p-14 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border transition-all duration-500 ${showError ? 'border-red-500 ring-4 ring-red-500/10' : 'border-white/5'}`}>
              <div className="relative z-10 min-h-[420px] flex flex-col justify-between">
                {currentStep === 3 ? (
                  <WorkHistoryBuilder entries={workHistory} adding={addingEntry} setAdding={setAddingEntry} temp={tempEntry} setTemp={setTempEntry} onSave={saveWorkEntry} />
                ) : (
                  renderStepContent(currentStep, formData, setFormData, helpMeWrite, isAILoading, showError)
                )}

                {!addingEntry && (
                  <div className="flex flex-col gap-6 pt-12 border-t border-white/5 mt-auto">
                    {showStuckLink && (
                       <button onClick={forceNavigate} className="text-[10px] font-black uppercase tracking-widest text-amber-500 animate-pulse hover:text-white transition-colors text-center w-full">
                         Still Orchestrating? Bypass and Sync in Dashboard
                       </button>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {MANDATORY_STEPS.includes(currentStep) ? (
                         <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Mandatory Node Stage</span>
                      ) : (
                        <button onClick={() => { setSkippedSteps([...skippedSteps, currentStep]); handleNext(); }} className="text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-indigo-400 font-manrope">Skip Context</button>
                      )}
                      
                      <button 
                        onClick={handleNext} disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-14 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 disabled:opacity-80"
                      >
                        {isSubmitting ? "Orchestrating..." : (currentStep === STEPS.length - 1 ? "Initialize Portal" : "Continue Synthesis")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden xl:flex w-[400px] border-l border-white/5 p-14 flex-col justify-between bg-[#08080c]/80 backdrop-blur-2xl">
           <div className="space-y-14">
              <div className="space-y-5">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Resonance Progress</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                       <span className="text-gray-400">Synthesis</span>
                       <span className="text-indigo-400">{progressPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${progressPercentage}%` }} />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60 font-manrope">Agentic Node Map</h4>
                 <ul className="space-y-4">
                    {STEPS.map((step, i) => (
                      <li key={i} className="flex items-center gap-4">
                         <span className={`w-1.5 h-1.5 rounded-full ${isFieldFilled(i) ? 'bg-indigo-500 shadow-[0_0_8px_#6366f1]' : 'bg-white/10'}`}></span>
                         <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isFieldFilled(i) ? 'text-gray-200' : 'text-gray-600'}`}>{step}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
           <p className="text-[9px] font-black text-gray-800 uppercase tracking-[0.5em]">Sanctuary Node v3.3</p>
        </aside>
      </div>
    </div>
  );
}

function WorkHistoryBuilder({ entries, adding, setAdding, temp, setTemp, onSave }: any) {
  if (adding) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest text-indigo-400">
          <span>Synthesizing {adding}</span>
          <button onClick={() => setAdding(null)} className="text-gray-600 hover:text-red-400 transition-colors">Abort</button>
        </div>
        <div className="grid grid-cols-2 gap-5">
           <input placeholder="DESIGNATION" className="w-full bg-white/5 px-8 py-5 rounded-2xl border border-white/5 text-gray-200 outline-none text-sm font-bold uppercase" value={temp.role} onChange={(e) => setTemp({...temp, role: e.target.value})} />
           <input placeholder="ORGANIZATION" className="w-full bg-white/5 px-8 py-5 rounded-2xl border border-white/5 text-gray-200 outline-none text-sm font-bold uppercase" value={temp.organization} onChange={(e) => setTemp({...temp, organization: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-5">
           <input type="date" className="w-full bg-white/5 px-8 py-5 rounded-2xl border border-white/10 text-gray-400" value={temp.startDate} onChange={(e) => setTemp({...temp, startDate: e.target.value})} />
           {!temp.isCurrent && <input type="date" className="w-full bg-white/5 px-8 py-5 rounded-2xl border border-white/10 text-gray-400" value={temp.endDate} onChange={(e) => setTemp({...temp, endDate: e.target.value})} />}
        </div>
        <textarea placeholder="Describe impact nodes..." className="w-full h-40 bg-white/5 px-8 py-6 rounded-3xl border border-white/5 text-gray-200 outline-none resize-none font-medium" value={temp.description} onChange={(e) => setTemp({...temp, description: e.target.value})} />
        <button onClick={onSave} className="w-full py-5 bg-indigo-600 text-white rounded-full font-black text-[11px] uppercase tracking-widest shadow-2xl">Save Synthesis</button>
      </div>
    );
  }
  return (
    <div className="space-y-8">
       <div className="grid grid-cols-2 gap-6">
          <button onClick={() => setAdding('job')} className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/20 hover:bg-indigo-500/10 transition-all group flex flex-col items-center">
             <span className="material-symbols-outlined text-[32px] text-indigo-400 mb-2">work</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Add Professional Node</span>
          </button>
          <button onClick={() => setAdding('internship')} className="p-8 rounded-[2.5rem] bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 transition-all group flex flex-col items-center">
             <span className="material-symbols-outlined text-[32px] text-purple-400 mb-2">school</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Add Internship Node</span>
          </button>
       </div>
       <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 pl-4">Active Synthesis Map</h4>
          {entries.length === 0 ? <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-3xl text-gray-800 italic text-sm">Empty timeline nodes.</div> : entries.map((e: any) => (
            <div key={e.id} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
               <div><p className="text-sm font-black text-gray-200 uppercase tracking-tighter">{e.organization}</p><p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{e.role} • {e.startDate} - {e.isCurrent ? "Present" : e.endDate}</p></div>
            </div>
          ))}
       </div>
    </div>
  );
}

function renderStepContent(step: number, formData: any, setFormData: any, helpMeWrite: any, isAILoading: boolean, showError: boolean) {
  switch (step) {
    case 0:
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {["fullName", "email", "phone", "location"].map((field) => (
             <div key={field} className="space-y-2">
                <label className="block text-[9px] font-black uppercase tracking-widest text-gray-600 pl-4">{field.toUpperCase()}{field === 'fullName' || field === 'email' ? ' *' : ''}</label>
                <input 
                  className={`w-full bg-white/5 px-8 py-5 rounded-2xl border transition-all text-sm font-bold text-gray-100 placeholder:text-gray-700 focus:bg-[#1a1a25] outline-none ${showError && (field === 'fullName' || field === 'email') && !formData[field].trim() ? 'border-red-500 ring-4 ring-red-500/10' : 'border-white/5'}`}
                  value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                />
             </div>
           ))}
        </div>
      );
    case 1:
      return (
        <div className="space-y-6">
           <div className="flex justify-between items-end">
              <button 
                onClick={helpMeWrite} disabled={isAILoading}
                className="px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-full text-indigo-400 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-sm ${isAILoading ? 'animate-spin' : ''}`}>auto_fix</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{isAILoading ? 'Synthesizing...' : '帮我写 (AI Suggest)'}</span>
              </button>
              <span className={`text-[10px] font-black uppercase tracking-widest ${formData.objective.length >= 256 ? 'text-red-500' : 'text-gray-600'}`}>{formData.objective.length} / 256</span>
           </div>
           <textarea maxLength={256} className="w-full h-64 bg-white/5 px-8 py-7 rounded-[2rem] border border-white/5 text-gray-200 focus:bg-[#1a1a25] outline-none resize-none font-medium leading-relaxed" value={formData.objective} onChange={(e) => setFormData({...formData, objective: e.target.value})} placeholder="Define your professional sanctuary objective..." />
        </div>
      );
    default:
      const fields = ["fullName", "objective", "education", "experience", "training", "skills", "extra", "portfolio", "accomplishments"];
      return (
        <textarea className="w-full h-80 bg-white/5 px-8 py-7 rounded-[2.5rem] border border-white/5 text-gray-100 focus:bg-[#1a1a25] outline-none resize-none font-medium leading-relaxed" value={formData[fields[step]]} onChange={(e) => setFormData({...formData, [fields[step]]: e.target.value})} placeholder={`Input your ${STEPS[step]} nodes...`} />
      );
  }
}
