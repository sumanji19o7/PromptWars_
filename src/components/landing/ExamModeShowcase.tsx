'use client';

import React, { useState } from 'react';
import { Zap, Flame, AlertTriangle, CheckCircle, ArrowRight, Download, Sparkles } from 'lucide-react';
import GlareHover from '@/components/GlareHover';

interface ExamModeShowcaseProps {
  onRunDemo?: () => void;
  onScrollToUpload?: () => void;
}

const SAMPLE_MUST_KNOW = [
  {
    fact: 'Resting Membrane Potential is primarily dictated by K+ leak channels (-70mV)',
    importance: 'CRITICAL',
    why: 'Direct application of the Goldman-Hodgkin-Katz voltage equation.',
  },
  {
    fact: 'Refractory Period prevents retrograde action potential back-propagation',
    importance: 'MUST KNOW',
    why: 'Inactivated Na+ channels require membrane repolarization to re-prime.',
  },
  {
    fact: 'Myelin sheath increases conduction velocity via saltatory conduction at nodes',
    importance: 'MUST KNOW',
    why: 'Increases membrane resistance Rm and decreases capacitance Cm.',
  },
];

const SAMPLE_PITFALLS = [
  {
    mistake: 'Confusing action potential AMPLITUDE with stimulus INTENSITY',
    correction: 'Action potentials are all-or-none. Frequency encodes intensity, not amplitude.',
  },
  {
    mistake: 'Assuming equilibrium potential of Na+ equals peak of action potential',
    correction: 'Peak (+30mV) falls short of E_Na (+60mV) due to rapid Na+ channel inactivation.',
  },
];

export function ExamModeShowcase({ onRunDemo, onScrollToUpload }: ExamModeShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'mustKnow' | 'pitfalls'>('mustKnow');

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#3a494b]/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-bold">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>CHAPTER 05 // FINAL 30-MINUTE CRAM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-mono">
            Signature{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-orange-400 glow-text-amber">
              Exam Mode & Cheat Sheets
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9cacb] max-w-2xl leading-relaxed">
            When the exam is minutes away, cut the noise. StudyFlow filters out non-essential filler
            and synthesizes only the high-weight principles, traps, and formula proofs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono shrink-0">
          <button
            onClick={onRunDemo}
            className="btn-spring btn-spring-amber inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Experience Exam Mode</span>
          </button>
        </div>
      </div>

      {/* Interactive Exam Mode Preview Deck */}
      <GlareHover
        width="100%"
        height="auto"
        background="transparent"
        borderColor="transparent"
        borderRadius="1.25rem"
        glareColor="#f59e0b"
        glareOpacity={0.2}
        glareAngle={-40}
        glareSize={300}
        transitionDuration={700}
      >
        <div className="w-full bg-[#121520]/55 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.12)] space-y-6">
          {/* Top Bar with Mode Toggle & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-2 font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('mustKnow')}
                className={`btn-spring px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'mustKnow'
                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'btn-spring-glass text-slate-400 hover:text-amber-300'
                }`}
              >
                ⚡ 1. MUST-KNOW FACTS
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pitfalls')}
                className={`btn-spring px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'pitfalls'
                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'btn-spring-glass text-slate-400 hover:text-amber-300'
                }`}
              >
                ⚠️ 2. COMMON PITFALLS
              </button>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] text-amber-300/80">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                ESTIMATED CRAM TIME: <b>4.5 MIN</b>
              </span>
            </div>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'mustKnow' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_MUST_KNOW.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/[0.04] p-4 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                        POINT 0{idx + 1}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30">
                        {item.importance}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {item.fact}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#b9cacb] font-mono pt-2 border-t border-amber-500/20">
                    💡 <b>Why it matters:</b> {item.why}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_PITFALLS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2.5"
                >
                  <div className="flex items-center gap-2 font-mono text-rose-300 text-xs font-bold">
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span>COMMON EXAM TRAP #{idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-200/90 font-medium">
                    ❌ <b>Trap:</b> {item.mistake}
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 font-medium">
                    ✅ <b>Correct Synapse:</b> {item.correction}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Action strip */}
          <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[#b9cacb] flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-amber-400" />
              Auto-formats to 1-page printable pocket cheat sheet
            </span>
            <button
              type="button"
              onClick={onScrollToUpload}
              className="btn-spring btn-spring-amber inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-amber-300 hover:text-black font-bold transition cursor-pointer"
            >
              <span>Build Exam Mode Sheet</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </GlareHover>
    </div>
  );
}
