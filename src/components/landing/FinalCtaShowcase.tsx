'use client';

import React from 'react';
import { Zap, Upload, ArrowUp, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { CyberTelemetry } from './CyberTelemetry';
import GlareHover from '@/components/GlareHover';

interface FinalCtaShowcaseProps {
  onRunDemo: () => void;
  onScrollToUpload: () => void;
}

export function FinalCtaShowcase({ onRunDemo, onScrollToUpload }: FinalCtaShowcaseProps) {
  return (
    <div className="w-full space-y-8">
      {/* Telemetry Bar from Design */}
      <CyberTelemetry />

      {/* Grand Finale Story Card */}
      <GlareHover
        width="100%"
        height="auto"
        background="transparent"
        borderColor="transparent"
        borderRadius="1.5rem"
        glareColor="#00f2fe"
        glareOpacity={0.2}
        glareAngle={-45}
        glareSize={380}
        transitionDuration={750}
      >
        <div className="w-full bg-[#121520]/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-cyan-500/40 shadow-[0_0_40px_rgba(0,242,254,0.2)] text-center space-y-6 relative overflow-hidden">
          {/* Cyber accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00f2fe] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#e20476] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-[#00f2fe] font-mono text-xs font-bold tracking-wider">
            <Cpu className="h-4 w-4 text-[#00f2fe] animate-pulse" />
            <span>CHAPTER 06 // SYNAPTIC ACTIVATION COMPLETE</span>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono leading-tight">
              Transform your lectures into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-teal-300 to-[#e20476]">
                unfair academic recall
              </span>
              .
            </h2>
            <p className="text-sm sm:text-base text-[#b9cacb] max-w-2xl mx-auto leading-relaxed">
              No more re-reading 80-slide decks blindly the night before an exam.
              Upload your files, unlock the neural workspace, and drill with high-yield confidence.
            </p>
          </div>

          {/* Quick Feature Verification Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 font-mono">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#00f2fe]" /> 100% Free & Open For Testing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Client-Side Privacy Guaranteed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-pink-400" /> Gemini 2.5 Flash Enhanced
            </span>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono">
            <button
              onClick={onScrollToUpload}
              className="btn-spring btn-spring-cyan inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#121520] border border-[#00f2fe] text-[#00f2fe] text-sm font-bold shadow-[0_0_25px_rgba(0,242,254,0.4)] transition cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>UPLOAD LECTURE MATERIAL</span>
            </button>

            <button
              onClick={onRunDemo}
              className="btn-spring btn-spring-magenta inline-flex items-center gap-2 px-8 py-4 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-sm font-bold shadow-[0_0_20px_rgba(226,4,118,0.3)] transition cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>RUN LIVE SAMPLE DEMO</span>
            </button>
          </div>
        </div>
      </GlareHover>
    </div>
  );
}
