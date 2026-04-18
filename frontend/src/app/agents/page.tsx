"use client";
import React from 'react';

export default function AgentsPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-10 bg-surface">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="w-24 h-24 bg-primary-fixed/20 rounded-md flex items-center justify-center mx-auto text-primary">
          <span className="material-symbols-outlined text-5xl">smart_toy</span>
        </div>
        <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Agent Hub</h1>
        <p className="text-on-surface-variant font-body text-lg leading-relaxed">
          Your Intelligent Concierge center is currently under development. 
          Soon you'll be able to deploy custom career agents to automate your job discovery and application tracking.
        </p>
        <div className="pt-6">
          <button className="px-8 py-3 bg-primary text-on-primary rounded-md font-label font-medium hover:bg-primary-dim transition-all shadow-[0_8px_16px_rgba(74,75,215,0.2)]">
            Explore Capabilities
          </button>
        </div>
      </div>
    </main>
  );
}
