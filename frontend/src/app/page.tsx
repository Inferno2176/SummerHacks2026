"use client";
import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col overflow-hidden relative font-body">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/20 blur-[150px] pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 w-full px-8 py-6 flex justify-between items-center backdrop-blur-md border-b border-surface-variant/30">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="text-xl font-manrope font-extrabold tracking-tight">LandMyJob</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/tracker" className="font-semibold text-sm hover:text-primary transition-colors">Applications Tracker</Link>
          <Link href="/login" className="font-semibold text-sm hover:text-primary transition-colors">Login</Link>
          <Link href="/register" className="bg-surface-container-highest text-on-surface hover:bg-surface-container hover:text-primary rounded-full px-6 py-2.5 text-sm font-bold transition-all shadow-sm">Sign Up Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-col flex items-center justify-center flex-grow px-4 text-center mt-12 mb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant/20 shadow-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
          <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Lumina AI Online</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-manrope font-black tracking-tighter leading-[1.1] mb-6">
          The Intelligent<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-inverse-primary to-tertiary">Career Concierge</span>
        </h1>
        
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Automate your job search pipeline. Hand off your resume tailoring, tracking, and follow-ups to your personal digital sanctuary.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto bg-gradient-to-br from-primary to-primary-container text-white rounded-full px-10 py-4 text-lg font-bold shadow-[0_8px_30px_rgb(74,75,215,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2">
            Get Started <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
          <Link href="/tracker" className="w-full sm:w-auto bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-full px-10 py-4 text-lg font-bold shadow-sm hover:bg-surface transition-all flex items-center justify-center gap-2">
            View Live Tracker
          </Link>
        </div>
        
        {/* Floating Dashboard Preview Image placeholder based on User's Mac UI prompt */}
        <div className="mt-20 w-full rounded-2xl bg-surface-container-lowest p-2 shadow-2xl border border-surface-variant/50 ambient-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 bottom-[-10px]"></div>
            <div className="bg-surface-container-low rounded-xl w-full h-[400px] flex items-center justify-center overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700" alt="Dashboard Analytics preview"/>
               <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
        </div>
      </main>
      
    </div>
  );
}
