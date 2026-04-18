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
      
      await Promise.race([
        setDoc(userRef, finalizedProfile, { merge: true }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Database Timeout")), 2500))
      ]);

      clearTimeout(failSafeTimer);
      router.push('/dashboard');
      setTimeout(() => forceNavigate(), 1000);

    } catch (err) {
      console.error("Critical Synchronization Error:", err);
      clearTimeout(failSafeTimer);
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
    <div className="h-screen w-screen overflow-hidden bg-surface text-on-surface flex flex-col font-body selection:bg-primary/20">
      
      <div className="w-full h-1 bg-surface-container-high fixed top-0 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-container transition-all duration-700 ease-out" 
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1 h-full w-full max-w-[1600px] mx-auto mt-1">
        <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 relative z-10 h-full">
          <div className="w-full max-w-3xl flex flex-col h-[75vh]">
            <header className="mb-6 shrink-0 text-center animate-fade-in-up">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-80">
                Phase {currentStep + 1} / {STEPS.length}
              </span>
              <h1 className="text-3xl lg:text-4xl font-manrope font-black tracking-tight uppercase leading-none mt-1 text-on-surface">{STEPS[currentStep]}</h1>
            </header>

            <div className={`flex-1 flex flex-col bg-surface-container-lowest border border-outline-variant/20 shadow-xl rounded-xl overflow-hidden transition-all duration-500 animate-fade-in-up ${showError ? 'border-error ring-2 ring-error/20' : ''}`}>
              
              <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar">
                {currentStep === 3 ? (
                  <WorkHistoryBuilder entries={workHistory} adding={addingEntry} setAdding={setAddingEntry} temp={tempEntry} setTemp={setTempEntry} onSave={saveWorkEntry} />
                ) : (
                  renderStepContent(currentStep, formData, setFormData, helpMeWrite, isAILoading, showError)
                )}
              </div>

              {!addingEntry && (
                <div className="p-6 md:px-10 bg-surface-container-lowest border-t border-outline-variant/10 shrink-0">
                  {showStuckLink && (
                     <button onClick={forceNavigate} className="mb-4 text-[10px] font-black uppercase tracking-widest text-secondary animate-pulse hover:text-primary transition-colors text-center w-full">
                       Network timeout? Click here to bypass and sync in Dashboard
                     </button>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {MANDATORY_STEPS.includes(currentStep) ? (
                       <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Mandatory Step</span>
                    ) : (
                      <button onClick={() => { setSkippedSteps([...skippedSteps, currentStep]); handleNext(); }} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary font-manrope border px-4 py-2 rounded-md hover:bg-surface-container/50 transition-all">Skip Step</button>
                    )}
                    
                    <button 
                      onClick={handleNext} disabled={isSubmitting}
                      className="ml-auto bg-primary hover:opacity-90 text-on-primary px-8 py-3.5 rounded-md font-black text-[10px] uppercase tracking-widest shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? "Saving..." : (currentStep === STEPS.length - 1 ? "Complete Setup" : "Continue")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="hidden xl:flex w-[320px] border-l border-outline-variant/10 p-8 flex-col justify-between bg-surface-container-lowest shrink-0 shadow-sm relative z-20 overflow-y-auto no-scrollbar">
           <div className="space-y-12">
              <div className="space-y-4">
                 <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Profile Synthesis</h3>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-on-surface-variant">Progress</span>
                       <span className="text-primary">{progressPercentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                       <div className="h-full bg-primary transition-all duration-1000 shadow-sm" style={{ width: `${progressPercentage}%` }} />
                    </div>
                 </div>
              </div>

              <div className="space-y-5">
                 <h4 className="text-[9px] font-black uppercase tracking-widest text-primary font-manrope">Task Checklist</h4>
                 <ul className="space-y-3">
                    {STEPS.map((step, i) => (
                      <li key={i} className="flex items-center gap-3">
                         <span className={`w-1.5 h-1.5 rounded-sm ${isFieldFilled(i) ? 'bg-primary' : 'bg-outline-variant/30'}`}></span>
                         <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${i === currentStep ? 'text-primary' : (isFieldFilled(i) ? 'text-on-surface' : 'text-on-surface-variant')}`}>{step}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
           <div className="mt-8">
             <div className="bg-surface-container/50 px-4 py-4 rounded-md border border-outline-variant/10 leading-relaxed text-center">
               <span className="material-symbols-outlined text-primary mb-1">cloud_done</span>
               <h5 className="text-[9px] font-black text-on-surface uppercase tracking-[0.3em]">Autosave Active</h5>
               <p className="text-[9.5px] font-medium text-on-surface-variant mt-1.5">You can safely leave and resume your setup at any time.</p>
             </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

function WorkHistoryBuilder({ entries, adding, setAdding, temp, setTemp, onSave }: any) {
  if (adding) {
    return (
      <div className="space-y-5 animate-fade-in flex flex-col h-full">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary shrink-0">
          <span>Adding {adding}</span>
          <button onClick={() => setAdding(null)} className="text-on-surface-variant hover:text-error transition-colors px-3 py-1 bg-surface-container rounded-md border border-outline-variant/10">Cancel</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
           <input placeholder="DESIGNATION" className="w-full bg-surface px-5 py-4 rounded-md border border-outline-variant/20 text-on-surface outline-none focus:border-primary text-sm font-bold uppercase transition-colors" value={temp.role} onChange={(e) => setTemp({...temp, role: e.target.value})} />
           <input placeholder="COMPANY" className="w-full bg-surface px-5 py-4 rounded-md border border-outline-variant/20 text-on-surface outline-none focus:border-primary text-sm font-bold uppercase transition-colors" value={temp.organization} onChange={(e) => setTemp({...temp, organization: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
           <input type="date" className="w-full bg-surface px-5 py-4 rounded-md border border-outline-variant/20 text-on-surface-variant outline-none focus:border-primary text-sm font-medium transition-colors" value={temp.startDate} onChange={(e) => setTemp({...temp, startDate: e.target.value})} />
           {!temp.isCurrent && <input type="date" className="w-full bg-surface px-5 py-4 rounded-md border border-outline-variant/20 text-on-surface-variant outline-none focus:border-primary text-sm font-medium transition-colors" value={temp.endDate} onChange={(e) => setTemp({...temp, endDate: e.target.value})} />}
        </div>
        <textarea placeholder="Describe your responsibilities and impact..." className="flex-1 w-full bg-surface px-5 py-4 rounded-md border border-outline-variant/20 text-on-surface outline-none focus:border-primary resize-none font-medium transition-colors mt-2" value={temp.description} onChange={(e) => setTemp({...temp, description: e.target.value})} />
        <button onClick={onSave} className="w-full py-4 mt-4 shrink-0 bg-primary hover:opacity-90 text-white rounded-md font-black text-[11px] uppercase tracking-widest shadow-sm transition-opacity">Save Entry</button>
      </div>
    );
  }
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setAdding('job')} className="p-6 rounded-md bg-surface border border-outline-variant/20 hover:border-primary hover:bg-primary/5 transition-all group flex flex-col items-center">
             <span className="material-symbols-outlined text-[28px] text-primary mb-2">work</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Add Experience</span>
          </button>
          <button onClick={() => setAdding('internship')} className="p-6 rounded-md bg-surface border border-outline-variant/20 hover:border-secondary hover:bg-secondary/5 transition-all group flex flex-col items-center">
             <span className="material-symbols-outlined text-[28px] text-secondary mb-2">school</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Add Internship</span>
          </button>
       </div>
       <div className="space-y-3">
          <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant pl-1">Your Timeline</h4>
          {entries.length === 0 ? <div className="p-8 text-center border-2 border-dashed border-outline-variant/30 rounded-md bg-surface-container-low text-on-surface-variant italic text-sm font-medium">Your work history is empty.</div> : entries.map((e: any) => (
            <div key={e.id} className="p-5 bg-surface border border-outline-variant/10 rounded-md flex justify-between items-center group hover:bg-surface-container-low transition-all">
               <div>
                 <p className="text-sm font-bold text-on-surface uppercase tracking-tight">{e.organization}</p>
                 <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{e.role} • {e.startDate} - {e.isCurrent ? "Present" : e.endDate}</p>
               </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-max">
           {["fullName", "email", "phone", "location"].map((field) => (
             <div key={field} className="space-y-1.5 pt-1">
                <label className="block text-[9px] font-black uppercase tracking-widest text-on-surface-variant pl-1">{field === 'fullName' ? 'Full Name' : field}{field === 'fullName' || field === 'email' ? ' *' : ''}</label>
                <input 
                  className={`w-full bg-surface px-5 py-4 rounded-md border transition-colors text-sm font-bold text-on-surface placeholder:text-outline-variant focus:border-primary outline-none ${showError && (field === 'fullName' || field === 'email') && !formData[field].trim() ? 'border-error bg-error/5 ring-2 ring-error/10' : 'border-outline-variant/20'}`}
                  value={formData[field]} onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                  placeholder={`Enter your ${field}`}
                />
             </div>
           ))}
        </div>
      );
    case 1:
      return (
        <div className="flex flex-col h-full space-y-4">
           <div className="flex justify-between items-end shrink-0">
              <button 
                onClick={helpMeWrite} disabled={isAILoading}
                className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-md text-primary transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-sm ${isAILoading ? 'animate-spin' : ''}`}>auto_fix</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{isAILoading ? 'Generating...' : 'Help me write'}</span>
              </button>
              <span className={`text-[10px] font-black uppercase tracking-widest ${formData.objective.length >= 256 ? 'text-error' : 'text-on-surface-variant'}`}>{formData.objective.length} / 256</span>
           </div>
           <textarea maxLength={256} className="flex-1 w-full bg-surface px-6 py-6 rounded-md border border-outline-variant/20 text-on-surface focus:border-primary outline-none resize-none font-medium leading-relaxed transition-colors mt-2" value={formData.objective} onChange={(e) => setFormData({...formData, objective: e.target.value})} placeholder="Write a short summary about your professional goals, background, and what you're looking for..." />
        </div>
      );
    default:
      const fields = ["fullName", "objective", "education", "experience", "training", "skills", "extra", "portfolio", "accomplishments"];
      return (
        <div className="flex flex-col h-full">
           <div className="mb-3 shrink-0">
               <label className="block text-[9px] font-black uppercase tracking-widest text-on-surface-variant pl-1">{STEPS[step]}</label>
           </div>
           <textarea className="flex-1 w-full bg-surface px-6 py-6 rounded-md border border-outline-variant/20 text-on-surface focus:border-primary outline-none resize-none font-medium leading-relaxed transition-colors" value={formData[fields[step]]} onChange={(e) => setFormData({...formData, [fields[step]]: e.target.value})} placeholder={`Add your ${STEPS[step]} details here...`} />
        </div>
      );
  }
}
