'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, FileText } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative pt-6 pb-8 text-center sm:pt-10 sm:pb-12">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[260px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300 backdrop-blur-sm mb-6"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        <span>Next-Gen Academic Synthesizer</span>
        <span className="h-1 w-1 rounded-full bg-indigo-400" />
        <span className="text-slate-400">Powered by Gemini AI</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
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
        className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
      >
        Drop your lecture slides or notes. StudyFlow extracts definitions, structured summaries,
        likely exam questions, and generates a condensed <b>Exam Mode</b> cram pack in seconds.
      </motion.p>

      {/* Step workflow indicator pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 max-w-3xl"
      >
        <span className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          <FileText className="h-3.5 w-3.5 text-indigo-400" /> 1. Upload Material
        </span>
        <ArrowRight className="h-3 w-3 text-slate-600 hidden sm:inline" />
        <span className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" /> 2. AI Analysis
        </span>
        <ArrowRight className="h-3 w-3 text-slate-600 hidden sm:inline" />
        <span className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" /> 3. Structured Revision
        </span>
        <ArrowRight className="h-3 w-3 text-slate-600 hidden sm:inline" />
        <span className="flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-amber-300 font-medium">
          <Zap className="h-3.5 w-3.5 text-amber-400" /> 4. Exam Mode & PDF
        </span>
      </motion.div>
    </div>
  );
}
