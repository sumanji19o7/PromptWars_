'use client';

import React from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { Terminal, Zap, RefreshCw, Sliders, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { activePack, resetWorkspace, setActiveTab, activeTab } = useRevisionStore();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#090a0f]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={resetWorkspace}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#181c2b] border border-cyan-400/40 cyber-glow-cyan">
            <Terminal className="h-4 w-4 text-[#00f2fe]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
          </div>
          <span className="text-[20px] font-bold tracking-tight text-white glow-text-cyan flex items-center font-mono">
            Lectura<span className="text-[#00f2fe]">.ai</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-400/40 text-[#00f2fe] tracking-widest font-bold">
            CYBER SYNAPSE v3.0
          </span>
        </div>

        {/* Center Nav Matrices */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-[#121520]/90 border border-[#3a494b]/60 font-mono text-[12px] gap-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`btn-spring px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#00f2fe] text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'btn-spring-cyan text-slate-400 hover:text-black'
            }`}
          >
            [01] SYNTHESIZE
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`btn-spring px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-[#00f2fe] text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'btn-spring-cyan text-slate-400 hover:text-black'
            }`}
          >
            [02] MEMORY_VAULT
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`btn-spring px-4 py-1.5 rounded-full transition-all font-semibold cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-[#00f2fe] text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                : 'btn-spring-cyan text-slate-400 hover:text-black'
            }`}
          >
            [03] RECALL_MATRICES
          </button>
        </nav>

        {/* Right HUD Status */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-[11px]">
            <span className="animate-pulse">⚡</span>
            <span className="font-bold">STREAK: 6 DAYS</span>
          </div>

          {activePack && (
            <button
              onClick={() => setActiveTab(activeTab === 'exam-mode' ? 'overview' : 'exam-mode')}
              className={`btn-spring btn-spring-magenta flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono font-bold transition shadow-lg cursor-pointer ${
                activeTab === 'exam-mode'
                  ? 'bg-[#e20476] text-white shadow-[0_0_15px_rgba(226,4,118,0.6)] border border-pink-400'
                  : 'bg-[#e20476]/20 border border-[#e20476]/50 text-pink-300'
              }`}
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>{activeTab === 'exam-mode' ? 'EXIT EXAM MODE' : 'EXAM_HUD'}</span>
            </button>
          )}

          {activePack && (
            <button
              onClick={resetWorkspace}
              title="Reset"
              className="btn-spring btn-spring-glass p-2 rounded-full border border-[#3a494b]/50 text-cyan-300/80 hover:text-white transition cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}

          {!activePack && (
            <div className="hidden sm:flex flex-col items-end font-mono">
              <span className="text-[12px] text-cyan-200 font-semibold tracking-wide">
                ALEX_MORGAN // 0x48F
              </span>
              <span className="text-[9px] text-[#b9cacb] uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
                BioSci_202 • SYNCED
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
