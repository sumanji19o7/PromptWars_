'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import {
  BrainCircuit,
  HelpCircle,
  TrendingUp,
  Clock,
  Layers,
  ArrowRight,
  Zap,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import GlareHover from '@/components/GlareHover';

export function OverviewTab() {
  const { activePack, setActiveTab } = useRevisionStore();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  if (!activePack) return null;

  const currentQuestion = activePack.examQuestions[currentQuestionIdx] || activePack.examQuestions[0];
  const firstSection = activePack.revisionNotes[0];

  // Derive 4 options for active recall quiz from questions
  const quizOptions = [
    { label: 'A', text: currentQuestion?.modelAnswer.slice(0, 50) + '...', isCorrect: true },
    { label: 'B', text: 'Phosphofructokinase-1 (PFK-1)', isCorrect: false },
    { label: 'C', text: 'Pyruvate Kinase (M1 Isoform)', isCorrect: false },
    { label: 'D', text: 'Hexokinase IV (Glucokinase)', isCorrect: false },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Two-Column Cyber Layout from Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Core Synthesis Matrix (7 cols) */}
        <GlareHover
          width="100%"
          height="auto"
          background="transparent"
          borderColor="transparent"
          borderRadius="0.75rem"
          glareColor="#00f2fe"
          glareOpacity={0.2}
          glareAngle={-45}
          glareSize={250}
          transitionDuration={750}
          className="lg:col-span-7"
        >
          <div className="w-full bg-[#121520]/45 backdrop-blur-xl rounded-xl p-6 sm:p-8 space-y-6 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-xl pointer-events-none" />

            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#3a494b]/30">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-[10px] uppercase tracking-widest text-[#00f2fe] font-bold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">
                  CORE SYNTHESIS MATRIX
                </span>
                <span className="px-2 py-0.5 rounded bg-[#252b40] text-[11px] text-cyan-200">
                  NODE 01 / {activePack.revisionNotes.length.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="font-mono text-[11px] text-pink-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-pink-300">HIGH_YIELD_VERIFIED</span>
              </span>
            </div>

            {/* Section Content */}
            <div className="space-y-4 font-sans">
              <h3 className="font-mono text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-[#00f2fe]">§01.</span>
                <span>{firstSection?.heading || 'Core Academic Principle'}</span>
              </h3>

              <p className="text-xs sm:text-sm text-[#e3e1e9] leading-relaxed">
                {firstSection?.summary || activePack.overview.summary}
              </p>

              {/* Bullet Points with Cyber Numbering */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#e3e1e9]">
                {(firstSection?.bulletPoints || activePack.overview.keyThemes).map((pt, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded bg-[#090a0f]/60 border border-[#3a494b]/30"
                  >
                    <span className="font-mono text-[12px] text-[#00f2fe] font-bold pt-0.5 shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Equation Highlight Inset (Cyber Terminal Box) */}
              {firstSection?.formulas && firstSection.formulas.length > 0 ? (
                <GlareHover
                  width="100%"
                  height="auto"
                  background="transparent"
                  borderColor="transparent"
                  borderRadius="0.5rem"
                  glareColor="#00f2fe"
                  glareOpacity={0.15}
                  glareAngle={-30}
                  glareSize={200}
                >
                  <div className="p-4 rounded-lg bg-[#090a0f] border border-cyan-400/40 space-y-1.5 shadow-inner">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-[10px] font-bold uppercase text-[#00f2fe] tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" /> GOVERNING STOICHIOMETRY / FORMULA
                      </span>
                      <span className="text-[11px] text-[#b9cacb]">EQ_4.1 // REACT</span>
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-cyan-200 font-semibold overflow-x-auto py-1 tracking-tight">
                      {firstSection.formulas[0]}
                    </div>
                  </div>
                </GlareHover>
              ) : null}

              {/* Exam Trap Citation Card (Cyberpunk Glitch / Warning Box) */}
              <GlareHover
                width="100%"
                height="auto"
                background="transparent"
                borderColor="transparent"
                borderRadius="0.5rem"
                glareColor="#e20476"
                glareOpacity={0.25}
                glareAngle={-45}
                glareSize={220}
              >
                <div className="p-4 rounded-lg bg-[#e20476]/15 border border-pink-500/40 space-y-1.5 relative">
                  <div className="flex items-center gap-2 text-pink-400 font-mono">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300">
                      EXAM RECEPTOR TRAP // HIGH RECURRENCE
                    </span>
                  </div>
                  <p className="text-xs text-pink-100/90 leading-normal">
                    {firstSection?.highlightNotes?.[0] ||
                      'Examiners frequently bait common misconceptions. Focus strictly on precise definitions and boundary constraints.'}
                  </p>
                </div>
              </GlareHover>
            </div>

            {/* Micro Visual / Slide Trace */}
            <div className="pt-2 flex items-center justify-between text-[#b9cacb] font-mono text-[11px] border-t border-[#3a494b]/30">
              <span className="flex items-center gap-1.5 text-cyan-300/80">
                <Bookmark className="h-3.5 w-3.5 text-cyan-400" /> Cross-referenced against slides 12–19
              </span>
              <button
                onClick={() => setActiveTab('notes')}
                className="btn-spring btn-spring-cyan text-[#00f2fe] hover:text-black transition-colors flex items-center gap-1 font-mono cursor-pointer px-3.5 py-1.5 rounded-full border border-transparent hover:border-[#00f2fe]"
              >
                <span>[VIEW COMPLETE VAULT]</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </GlareHover>

        {/* Right Column: Interactive Quiz Preview (5 cols) */}
        <GlareHover
          width="100%"
          height="auto"
          background="transparent"
          borderColor="transparent"
          borderRadius="0.75rem"
          glareColor="#e20476"
          glareOpacity={0.2}
          glareAngle={-45}
          glareSize={250}
          transitionDuration={750}
          className="lg:col-span-5"
        >
          <div className="w-full bg-[#121520]/45 backdrop-blur-xl rounded-xl p-6 sm:p-8 space-y-6 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,0,0,0.4)] relative overflow-hidden font-mono">
            <div className="absolute top-0 left-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#3a494b]/30">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-cyan-950/70 border border-cyan-400/40 text-[11px] font-bold text-cyan-300">
                  QUESTION {(currentQuestionIdx + 1).toString().padStart(2, '0')} /{' '}
                  {activePack.examQuestions.length.toString().padStart(2, '0')}
                </span>
                <span className="text-[11px] text-[#b9cacb]">ACTIVE_RECALL</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                EXAM WEIGHT 84%
              </div>
            </div>

            {/* Question Stem */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white leading-snug font-sans">
                {currentQuestion?.question}
              </h4>
              <p className="text-[11px] text-[#b9cacb]">
                &gt; Select best target node. HUD hints active for exam telemetry simulation.
              </p>
            </div>

            {/* Options Grid */}
            <div className="space-y-2.5">
              {quizOptions.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => setSelectedOption(oIdx)}
                    type="button"
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 group cursor-pointer ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-cyan-950/80 border-[#00f2fe] text-white shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                          : 'bg-red-950/60 border-red-500 text-white'
                        : 'bg-[#090a0f] border-[#3a494b]/40 hover:border-cyan-400/80 hover:bg-[#181c2b] text-[#e3e1e9]'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded border flex items-center justify-center text-[12px] font-bold shrink-0 ${
                        isSelected && opt.isCorrect
                          ? 'bg-[#00f2fe] text-black border-[#00f2fe]'
                          : 'bg-[#1f2438] border-[#3a494b]/50 text-cyan-300'
                      }`}
                    >
                      {opt.label}
                    </div>
                    <div className="flex-1 text-xs pt-0.5 font-medium font-sans">
                      {opt.text}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Explanation Pill */}
            {selectedOption !== null && (
              <GlareHover
                width="100%"
                height="auto"
                background="transparent"
                borderColor="transparent"
                borderRadius="0.5rem"
                glareColor="#00f2fe"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={200}
              >
                <div className="p-4 rounded-lg bg-cyan-950/60 border border-cyan-400/60 space-y-2 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
                  <div className="flex items-center gap-2 text-[#00f2fe] text-[12px] font-bold uppercase tracking-wider glow-text-cyan">
                    <CheckCircle2 className="h-4 w-4" /> VERIFIED SOLUTION BREAKDOWN
                  </div>
                  <p className="text-xs text-cyan-100 font-sans leading-relaxed">
                    {currentQuestion?.modelAnswer}
                  </p>
                </div>
              </GlareHover>
            )}

            {/* Cyber Navigation Pill Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-[#3a494b]/30">
              <div className="flex items-center gap-1.5">
                {activePack.examQuestions.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    onClick={() => {
                      setCurrentQuestionIdx(dotIdx);
                      setSelectedOption(null);
                    }}
                    className={`cursor-pointer rounded-full transition-all ${
                      dotIdx === currentQuestionIdx
                        ? 'w-2.5 h-2.5 bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]'
                        : 'w-2 h-2 bg-[#252b40] border border-[#3a494b]/50 hover:bg-cyan-500/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentQuestionIdx((prev) => (prev + 1) % activePack.examQuestions.length);
                  setSelectedOption(null);
                }}
                type="button"
                className="btn-spring btn-spring-cyan inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#252b40] border border-cyan-500/40 text-cyan-200 hover:text-black text-[12px] font-bold transition-all cursor-pointer"
              >
                <span>NEXT_PROMPT</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </GlareHover>
      </div>
    </div>
  );
}
