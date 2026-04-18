"use client";
import React from 'react';

export default function InboxPage() {
  return (
    <main className="flex-1 flex overflow-hidden bg-surface relative h-[calc(100vh-4.5rem)]">
      {/* Email List */}
      <div className="w-full md:w-[400px] lg:w-[450px] border-r border-surface-container-high/50 flex flex-col h-full bg-surface-bright z-10 shadow-[20px_0_40px_rgba(44,52,55,0.02)]">
        {/* List Header & Filters */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-2xl font-headline font-bold text-on-surface tracking-tight">AI Inbox</h2>
            <span className="text-xs font-label text-outline bg-surface-container-high px-2 py-1 rounded-md text-slate-500">3 New</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
            <button className="px-4 py-1.5 bg-primary-fixed/20 text-primary-dim font-label text-xs font-semibold rounded-md whitespace-nowrap">All Items</button>
            <button className="px-4 py-1.5 bg-surface-container text-on-surface-variant font-label text-xs font-medium rounded-md whitespace-nowrap border border-outline-variant/20">Urgent</button>
            <button className="px-4 py-1.5 bg-surface-container text-on-surface-variant font-label text-xs font-medium rounded-md whitespace-nowrap border border-outline-variant/20">Newsletters</button>
          </div>
        </div>

        {/* Email Cards */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 no-scrollbar">
          {/* Card 1 (Active) */}
          <div className="bg-surface-container-lowest p-5 rounded-md shadow-[0px_20px_40px_rgba(44,52,55,0.06)] relative overflow-hidden group cursor-pointer border border-primary-container/20">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary-dim font-bold text-sm">ES</div>
                <div>
                  <h4 className="font-headline font-semibold text-sm text-on-surface">Elena Sharma</h4>
                  <p className="font-label text-xs text-outline text-slate-400">10:42 AM</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant hover:text-error transition-colors p-1" style={{ fontSize: '20px' }}>archive</span>
            </div>
            <h3 className="font-headline font-bold text-base text-on-surface mb-2 leading-tight">Q3 Project Deliverables Review</h3>
            {/* AI Badge */}
            <div className="bg-primary-fixed/10 p-3 rounded-md mb-3 flex items-start space-x-2 border border-primary-fixed/20">
              <span className="material-symbols-outlined text-primary-dim mt-0.5" style={{ fontSize: '16px' }}>auto_awesome</span>
              <p className="font-body text-xs text-on-surface leading-relaxed"><span className="font-semibold text-primary-dim">AI Summary:</span> Elena needs final sign-off on the Q3 design assets by EOD Thursday.</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-tertiary-fixed/20 text-tertiary-dim text-[10px] font-bold rounded-md uppercase tracking-wider">Urgent</span>
              <span className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-md uppercase tracking-wider">Work</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-surface-container-lowest/60 hover:bg-surface-container-lowest p-5 rounded-md transition-colors relative group cursor-pointer border border-outline-variant/15">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100" className="w-full h-full object-cover" alt="User" />
                </div>
                <div>
                  <h4 className="font-headline font-semibold text-sm text-on-surface">Marcus Vance</h4>
                  <p className="font-label text-xs text-outline text-slate-400">Yesterday</p>
                </div>
              </div>
            </div>
            <h3 className="font-headline font-semibold text-base text-on-surface mb-2 leading-tight">Follow up: Product Design Role</h3>
            <div className="bg-surface-container p-3 rounded-md mb-3 flex items-start space-x-2">
              <span className="material-symbols-outlined text-outline mt-0.5" style={{ fontSize: '16px' }}>robot_2</span>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed text-slate-500">Marcus is checking your availability for a final portfolio review.</p>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-secondary-fixed/20 text-secondary-dim text-[10px] font-bold rounded-md uppercase tracking-wider">Job Lead</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail View (Canvas) */}
      <div className="hidden md:flex flex-1 flex-col bg-surface-container-low/30 p-8 relative">
        <div className="bg-surface-container-lowest rounded-md p-8 shadow-[0px_20px_40px_rgba(44,52,55,0.04)] mb-6 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary-dim font-bold text-xl">ES</div>
              <div>
                <h2 className="font-headline font-bold text-2xl text-on-surface">Elena Sharma</h2>
                <p className="font-label text-sm text-outline text-slate-500">elena.sharma@acmecorp.com • Today, 10:42 AM</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-md border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
              <button className="p-2 rounded-md bg-surface-container text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined">archive</span>
              </button>
            </div>
          </div>
          <h1 className="font-headline font-extrabold text-3xl text-on-surface mb-8 tracking-tight">Q3 Project Deliverables Review</h1>
          <div className="font-body text-base text-on-surface-variant leading-relaxed space-y-4 max-w-3xl">
            <p>Hi team,</p>
            <p>I've reviewed the latest batch of design assets for the Q3 launch. Generally looking good, but we have a few critical updates needed on the mobile responsive screens before we push to staging.</p>
            <p>Could you please review the attached Figma comments? I need final sign-off on these assets by EOD Thursday so development can stay on schedule.</p>
            <p>Best,<br/>Elena</p>
          </div>
        </div>

        {/* AI Interaction Area (Floating) */}
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-md p-6 shadow-[0px_-10px_40px_rgba(44,52,55,0.05)] border border-outline-variant/10 flex items-center space-x-4">
          <button className="px-6 py-4 rounded-md bg-primary bg-gradient-to-br from-primary to-primary-container text-on-primary font-label font-bold flex items-center space-x-2 shadow-[0px_10px_20px_rgba(74,75,215,0.2)] hover:scale-[1.02] transition-transform">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span>Reply with AI</span>
          </button>
          <div className="flex-1 px-6 py-4 bg-surface-container rounded-md border border-outline-variant/20 text-on-surface-variant font-body text-sm flex items-center justify-between cursor-text">
            <span className="text-slate-500">Or type a quick manual response...</span>
            <span className="material-symbols-outlined text-outline">send</span>
          </div>
        </div>
      </div>
    </main>
  );
}
