"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ResumePreview from '@/components/ResumePreview';
import Link from 'next/link';

export default function ResumePage() {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-on-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest p-8 md:p-20 overflow-y-auto font-body">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center mb-12">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Dashboard
          </Link>
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-surface-container-high rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:bg-surface transition-all">Download PDF</button>
             <button className="px-6 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/30 transition-all">Custom Optimization</button>
          </div>
        </header>

        {userProfile ? (
          <ResumePreview data={userProfile as any} />
        ) : (
          <div className="text-center py-20 space-y-6">
            <h2 className="text-3xl font-headline font-black uppercase tracking-tight">No Profile Found</h2>
            <p className="text-on-surface-variant max-w-md mx-auto">It looks like you haven't completed your onboarding yet. Complete the questionnaire to see your professional resume.</p>
            <Link href="/onboarding" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Complete Onboarding</Link>
          </div>
        )}
      </div>
    </div>
  );
}
