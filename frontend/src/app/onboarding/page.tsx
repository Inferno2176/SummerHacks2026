"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { runAgentSkill } from '../actions/ai';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const STEPS = [
  "Personal", "Objective", "Education", "Work History", 
  "Training", "Skills", "Extra-Curricular", "Portfolio", "Accomplishments"
];

interface Experience {
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
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  
  // Experience Builder State
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isAddingExp, setIsAddingExp] = useState<'job' | 'internship' | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience>>({});

  const [formData, setFormData] = useState<any>({
    fullName: "", email: "", phone: "", location: "",
    objective: "",
    education: "",
    training: "",
    skills: "",
    extra: "",
    portfolio: "",
    accomplishments: ""
  });

  const [skippedSteps, setSkippedSteps] = useState<number[]>([]);

  // Calculate progress
  const completedSteps = STEPS.filter((_, i) => {
    if (i === 3) return experiences.length > 0 || skippedSteps.includes(i);
    return formData[getFieldName(i)] || skippedSteps.includes(i);
  }).length;
  const progressPercentage = Math.round((completedSteps / STEPS.length) * 100);

  function getFieldName(index: number) {
    const fields = ["fullName", "objective", "education", "experience", "training", "skills", "extra", "portfolio", "accomplishments"];
    return fields[index];
  }

  const handleNext = () => {
    if (currentStep === 3 && experiences.length === 0 && !skippedSteps.includes(3)) {
      alert("Please add at least one work experience or click Skip.");
      return;
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    setSkippedSteps([...skippedSteps, currentStep]);
    handleNext();
  };

  const helpMeWrite = async () => {
    setIsAILoading(true);
    try {
      const result = await runAgentSkill("objective_helper", { 
        name: formData.fullName, 
        skills: formData.skills,
        raw: formData.objective 
      });
      setFormData({ ...formData, objective: result.suggestion });
    } catch (err) {
      console.error(err);
    } finally {
      setIsAILoading(false);
    }
  };

  const saveExperience = () => {
    if (!editingExp.role || !editingExp.organization) return;
    const newExp = {
      ...editingExp,
      id: Math.random().toString(36).substr(2, 9),
      type: isAddingExp
    } as Experience;
    setExperiences([...experiences, newExp]);
    setIsAddingExp(null);
    setEditingExp({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const structuredProfile = await runAgentSkill("resume_parser", { ...formData, experience: experiences });
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          ...structuredProfile,
          workHistory: experiences,
          onboardingCompleted: true,
          completionPercentage: progressPercentage
        });
        await refreshProfile();
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Onboarding failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body antialiased selection:bg-primary/30">
      <div className="w-full h-1 bg-surface-container-high fixed top-0 z-50">
        <div className="h-full bg-primary transition-all duration-700 ease-in-out shadow-[0_0_15px_rgba(74,75,215,0.5)]" style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className="flex flex-1 pt-12 overflow-hidden">
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
          <div className="max-w-xl w-full space-y-8 animate-fade-in-up">
            <header className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">Sanctuary Setup Step {currentStep + 1}</span>
              <h1 className="text-5xl font-headline font-black tracking-tight uppercase leading-none">{STEPS[currentStep]}</h1>
            </header>

            <div className="bg-surface-container-low p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-focus-within:bg-primary/10 transition-colors"></div>
              
              <div className="relative z-10 space-y-6">
                {currentStep === 3 ? (
                  <ExperienceBuilder 
                    experiences={experiences} 
                    isAdding={isAddingExp} 
                    setIsAdding={setIsAddingExp}
                    editingExp={editingExp}
                    setEditingExp={setEditingExp}
                    onSave={saveExperience}
                  />
                ) : (
                  renderStepContent(currentStep, formData, setFormData, helpMeWrite, isAILoading)
                )}
              </div>

              {!isAddingExp && (
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                  <button onClick={handleSkip} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all active:scale-95">Skip Phase</button>
                  <button 
                    onClick={handleNext} 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.25em] shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Orchestrating..." : (currentStep === STEPS.length - 1 ? "Initialize Portal" : "Proceed")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="hidden xl:flex w-96 border-l border-white/5 p-12 flex-col justify-between bg-[#08080c]/50 backdrop-blur-3xl">
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Profile Synthesis</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="opacity-50">Coherence</span>
                  <span className="text-primary">{progressPercentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden p-[1px]">
                  <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full shadow-[0_0_10px_rgba(74,75,215,0.4)]" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>
            </div>

            {progressPercentage < 100 && (
              <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem] border border-primary/20 space-y-3">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Efficiency Advisory</span>
                <p className="text-[11px] font-medium text-on-surface/60 leading-relaxed uppercase tracking-wide">
                  Your professional sanctuary functions at peak efficiency when all data nodes are populated.
                </p>
              </div>
            )}
          </div>
          
          <div className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[0.4em] leading-loose">
            Agentic Ecosystem<br/>Secure Initialization v2.4
          </div>
        </aside>
      </div>
    </div>
  );
}

function ExperienceBuilder({ experiences, isAdding, setIsAdding, editingExp, setEditingExp, onSave }: any) {
  if (isAdding) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Adding New {isAdding}</h4>
           <button onClick={() => setIsAdding(null)} className="text-[10px] font-bold text-on-surface-variant uppercase hover:text-error transition-colors">Cancel</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder={isAdding === 'job' ? 'Designation' : 'Internship Role'}
            className="w-full bg-surface-container-high px-6 py-4 rounded-2xl border border-white/5 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/30"
            value={editingExp.role || ''}
            onChange={(e) => setEditingExp({...editingExp, role: e.target.value})}
          />
          <input 
            placeholder="Organization"
            className="w-full bg-surface-container-high px-6 py-4 rounded-2xl border border-white/5 text-on-surface focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/30"
            value={editingExp.organization || ''}
            onChange={(e) => setEditingExp({...editingExp, organization: e.target.value})}
          />
        </div>
        <div className="flex items-center space-x-4">
           <input 
             type="date"
             className="flex-1 bg-surface-container-high px-6 py-4 rounded-2xl border border-white/5 text-on-surface focus:ring-2 focus:ring-primary/40 outline-none transition-all"
             value={editingExp.startDate || ''}
             onChange={(e) => setEditingExp({...editingExp, startDate: e.target.value})}
           />
           {!editingExp.isCurrent && (
             <input 
                type="date"
                className="flex-1 bg-surface-container-high px-6 py-4 rounded-2xl border border-white/5 text-on-surface focus:ring-2 focus:ring-primary/40 outline-none transition-all"
                value={editingExp.endDate || ''}
                onChange={(e) => setEditingExp({...editingExp, endDate: e.target.value})}
             />
           )}
        </div>
        <label className="flex items-center space-x-3 cursor-pointer group">
           <input 
             type="checkbox" 
             className="w-4 h-4 rounded border-white/20 bg-surface-container-high text-primary focus:ring-primary"
             checked={editingExp.isCurrent}
             onChange={(e) => setEditingExp({...editingExp, isCurrent: e.target.checked})}
           />
           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface transition-colors italic">I am currently working here</span>
        </label>
        <textarea 
          placeholder="Detailed Description (Max 1000 characters)" 
          className="w-full h-40 bg-surface-container-high px-6 py-4 rounded-2xl border border-white/5 text-on-surface focus:ring-2 focus:ring-primary/40 outline-none transition-all resize-none placeholder:text-on-surface-variant/30"
          value={editingExp.description || ''}
          maxLength={1000}
          onChange={(e) => setEditingExp({...editingExp, description: e.target.value})}
        />
        <div className="flex justify-end pt-4">
           <button onClick={onSave} className="bg-primary text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">Save Entry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setIsAdding('job')} className="p-6 rounded-[2rem] bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all text-center space-y-2 group">
           <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">work</span>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Add Job</p>
        </button>
        <button onClick={() => setIsAdding('internship')} className="p-6 rounded-[2rem] bg-secondary-container/5 border border-secondary/20 hover:bg-secondary-container/10 transition-all text-center space-y-2 group">
           <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">school</span>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Add Internship</p>
        </button>
      </div>

      <div className="space-y-4 mt-8">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 pl-2">Timeline Summary</h4>
        {experiences.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[2rem] text-on-surface-variant/20 italic text-sm">
             No nodes added to your timeline yet.
          </div>
        ) : (
          experiences.map((exp: any) => (
            <div key={exp.id} className="p-6 bg-surface-container-high rounded-3xl border border-white/5 flex justify-between items-center group hover:bg-surface transition-colors">
               <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                     <span className="text-xs font-black text-on-surface uppercase tracking-tight">{exp.organization}</span>
                     <span className="text-[8px] bg-primary/20 px-2 py-0.5 rounded-full text-primary font-bold uppercase tracking-widest">{exp.type}</span>
                  </div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{exp.role} | {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}</p>
               </div>
               <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-error">delete</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function renderStepContent(step: number, formData: any, setFormData: any, helpMeWrite: any, isAILoading: boolean) {
  const counterColor = (len: number) => {
    if (len >= 256) return "text-error font-black animate-pulse";
    if (len >= 200) return "text-amber-500 font-black";
    return "text-on-surface-variant/40";
  };

  switch (step) {
    case 0: // Personal
      return (
        <div className="space-y-5">
          {["fullName", "email", "phone", "location"].map((field) => (
            <input 
              key={field}
              placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
              className="w-full bg-surface-container-high px-8 py-5 rounded-2xl border border-white/5 text-on-surface focus:ring-4 focus:ring-primary/20 focus:bg-surface-container-lowest outline-none transition-all placeholder:text-on-surface-variant/20 font-medium" 
              value={formData[field]}
              onChange={(e) => setFormData({...formData, [field]: e.target.value})}
            />
          ))}
        </div>
      );
    case 1: // Objective
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-end mb-2">
            <button 
              onClick={helpMeWrite}
              disabled={isAILoading}
              className="flex items-center space-x-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 rounded-full border border-primary/20 text-primary transition-all active:scale-95 group disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[16px] ${isAILoading ? 'animate-spin' : 'group-hover:animate-bounce'}`}>auto_fix</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{isAILoading ? 'Synthesizing...' : 'Help me write this'}</span>
            </button>
            <div className={`text-[10px] tracking-widest uppercase transition-colors ${counterColor(formData.objective.length)}`}>
              {formData.objective.length} / 256
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl -z-10 group-focus-within:bg-primary/10 transition-colors"></div>
            <textarea 
              placeholder="Define your career ecosystem and vision..." 
              maxLength={256}
              className="w-full h-56 bg-transparent px-8 py-6 rounded-3xl border border-white/5 text-on-surface focus:ring-4 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-on-surface-variant/20 font-medium leading-relaxed" 
              value={formData.objective}
              onChange={(e) => setFormData({...formData, objective: e.target.value})}
            />
          </div>
        </div>
      );
    default:
      const field = ["fullName", "objective", "education", "experience", "training", "skills", "extra", "portfolio", "accomplishments"][step];
      return (
        <textarea 
          placeholder={`Input your ${STEPS[step]} nodes...`} 
          className="w-full h-72 bg-surface-container-high px-8 py-6 rounded-3xl border border-white/5 text-on-surface focus:ring-4 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-on-surface-variant/20 font-medium leading-relaxed" 
          value={formData[field]}
          onChange={(e) => setFormData({...formData, [field]: e.target.value})}
        />
      );
  }
}
