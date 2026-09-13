'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Zap, FileText, Move3d, CheckCircle2, Unlock } from 'lucide-react';
import { SplineScene } from './SplineScene';

interface SplineHeroProps {
  onStartNow: () => void;
  onRunDemo: () => void;
  onScrollToUpload: () => void;
  isUnlocked: boolean;
}

export function SplineHero({
  onStartNow,
  onRunDemo,
  onScrollToUpload,
  isUnlocked,
}: SplineHeroProps) {
  return (
    <div className="relative pt-4 pb-8 sm:pt-6 sm:pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Header Info */}
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md mb-5 shadow-lg shadow-indigo-500/10"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Interactive 3D Workspace</span>
          <span className="h-1 w-1 rounded-full bg-indigo-400" />
          <span className="text-slate-400">Powered by Gemini AI</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
        >
          Turn your lectures into{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
            exam-ready revision
          </span>
          .
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Upload your lecture slides or notes. StudyFlow extracts definitions, structured summaries,
          likely exam questions, and generates a condensed <b>Exam Mode</b> cram pack in seconds.
        </motion.p>
      </div>

      {/* 3D Spline Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0d101b]/80 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden relative"
      >
        {/* Top Control Bar of 3D Frame */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">
              studyflow_scene.3d • Interactive Spatial Node
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium">
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                Workspace Unlocked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-indigo-300">
                <Move3d className="h-3.5 w-3.5" />
                <span>Interactive 3D • Click Asset to Start</span>
              </span>
            )}
          </div>
        </div>

        {/* The 3D Scene Viewport */}
        <div className="w-full h-[400px] sm:h-[480px] lg:h-[520px] relative">
          <SplineScene onStartNow={onStartNow} />

          {/* Quick Overlay Action Buttons */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-3 w-11/12 sm:w-auto">
            {/* Primary START NOW Button on the Spline Asset */}
            <button
              onClick={onStartNow}
              className={`btn-spring flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold shadow-2xl transition cursor-pointer ${
                isUnlocked
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 ring-2 ring-white/30'
                  : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-indigo-500/40 ring-2 ring-white/30 animate-pulse'
              }`}
            >
              <Zap className="h-4 w-4 fill-current text-white" />
              <span>{isUnlocked ? 'Features Unlocked (Scroll Down)' : '⚡ Start Now'}</span>
            </button>

            {isUnlocked ? (
              <button
                onClick={onScrollToUpload}
                className="btn-spring btn-spring-glass flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-black/90 transition shadow-lg backdrop-blur-md cursor-pointer"
              >
                <FileText className="h-4 w-4 text-indigo-400" />
                <span>Upload Lecture</span>
                <ArrowDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={onRunDemo}
                className="btn-spring btn-spring-amber flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/70 px-6 py-3 text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/20 transition shadow-lg backdrop-blur-md cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-current text-amber-400" />
                <span>Sample Demo</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
