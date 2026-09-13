'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import {
  Zap,
  Flame,
  BookOpen,
  Split,
  HelpCircle,
  Clock,
  CheckCircle,
  Printer,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import GlareHover from '@/components/GlareHover';

export function ExamModeTab() {
  const { activePack } = useRevisionStore();
  const [masteredItems, setMasteredItems] = useState<Record<string, boolean>>({});

  if (!activePack) return null;

  const examData = activePack.examMode;

  const toggleMastered = (key: string) => {
    setMasteredItems((prev) => {
      const next = !prev[key];
      if (next && Object.values({ ...prev, [key]: true }).filter(Boolean).length === examData.mustKnow.length) {
        // Trigger celebratory confetti when all Must Know are completed!
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      return { ...prev, [key]: next };
    });
  };

  const masteredCount = Object.values(masteredItems).filter(Boolean).length;
  const progressPct = examData.mustKnow.length > 0
    ? Math.round((masteredCount / examData.mustKnow.length) * 100)
    : 0;

  return (
    <div className="space-y-8 pb-20">
      {/* Signature Banner */}
      <div className="relative rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-amber-500/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>SIGNATURE FEATURE: EXAM MODE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Last-Minute Study & Cram Sheet
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Distilled specifically for final-hour revision. Focus on must-know concepts, common
              pitfalls, and high-probability exam questions.
            </p>
          </div>

          {/* Quick Mastery Counter */}
          <div className="flex items-center gap-4 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md p-4 shrink-0">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Mastery Progress</p>
              <p className="text-lg font-extrabold text-white">
                {masteredCount} <span className="text-xs font-normal text-slate-400">/ {examData.mustKnow.length} Concepts</span>
              </p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
              {progressPct}%
            </div>
          </div>
        </div>
      </div>

      {/* 1. MUST KNOW */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide">
              1. MUST KNOW (Non-Negotiable)
            </h3>
            <p className="text-xs text-slate-400">Core principles guaranteed to carry exam weight</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examData.mustKnow.map((item, idx) => {
            const isMastered = masteredItems[`mk-${idx}`] || false;

            return (
              <GlareHover
                key={idx}
                width="100%"
                height="100%"
                background="transparent"
                borderColor="transparent"
                borderRadius="1rem"
                glareColor="#f43f5e"
                glareOpacity={0.2}
                glareAngle={-35}
                glareSize={220}
                transitionDuration={600}
              >
                <div
                  onClick={() => toggleMastered(`mk-${idx}`)}
                  className={`w-full h-full flex items-start gap-3 rounded-2xl p-4 transition cursor-pointer border select-none backdrop-blur-md ${
                    isMastered
                      ? 'border-emerald-500/40 bg-emerald-500/[0.1]'
                      : 'border-white/[0.08] bg-[#121520]/45 hover:border-amber-500/30 hover:bg-[#161a28]/60'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                      isMastered
                        ? 'border-emerald-400 bg-emerald-500 text-black'
                        : 'border-white/20 bg-white/5 text-transparent'
                    }`}
                  >
                    <CheckCircle className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <div className="flex-1">
                    <span
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isMastered ? 'line-through text-slate-400' : 'text-slate-200 font-medium'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                </div>
              </GlareHover>
            );
          })}
        </div>
      </section>

      {/* 2. COMMON CONFUSIONS (Don't Mix These Up!) */}
      {examData.commonConfusions && examData.commonConfusions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Split className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                2. COMMON CONFUSIONS (Don't Mix These Up!)
              </h3>
              <p className="text-xs text-slate-400">
                Where students lose marks: subtle differences between overlapping concepts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examData.commonConfusions.map((conf, idx) => (
              <GlareHover
                key={idx}
                width="100%"
                height="100%"
                background="transparent"
                borderColor="transparent"
                borderRadius="1rem"
                glareColor="#a855f7"
                glareOpacity={0.25}
                glareAngle={-35}
                glareSize={240}
                transitionDuration={650}
              >
                <div
                  className="w-full h-full rounded-2xl border border-purple-500/25 bg-[#131422]/45 backdrop-blur-xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
                    <span className="font-bold text-sm text-purple-300">{conf.conceptA}</span>
                    <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">vs</span>
                    <span className="font-bold text-sm text-cyan-300">{conf.conceptB}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
                      The Crucial Distinction
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.04]">
                      {conf.distinction}
                    </p>
                  </div>
                </div>
              </GlareHover>
            ))}
          </div>
        </section>
      )}

      {/* 3. IMPORTANT DEFINITIONS */}
      {examData.importantDefinitions && examData.importantDefinitions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                3. IMPORTANT DEFINITIONS
              </h3>
              <p className="text-xs text-slate-400">Exact definitions expected by examiners</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examData.importantDefinitions.map((def, idx) => (
              <GlareHover
                key={idx}
                width="100%"
                height="100%"
                background="transparent"
                borderColor="transparent"
                borderRadius="1rem"
                glareColor="#00f2fe"
                glareOpacity={0.25}
                glareAngle={-35}
                glareSize={240}
                transitionDuration={650}
              >
                <div
                  className="w-full h-full rounded-2xl border border-cyan-500/20 bg-[#121520]/45 backdrop-blur-xl p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-cyan-300">{def.term}</h4>
                    <span className="text-[10px] font-mono text-slate-500">Term #{idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {def.definition}
                  </p>
                </div>
              </GlareHover>
            ))}
          </div>
        </section>
      )}

      {/* 4. LIKELY QUESTIONS */}
      {examData.likelyQuestions && examData.likelyQuestions.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide">
                4. LIKELY EXAM QUESTIONS & CORE HINTS
              </h3>
              <p className="text-xs text-slate-400">
                High-probability questions with quick mental triggers for your answer
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {examData.likelyQuestions.map((item, idx) => (
              <GlareHover
                key={idx}
                width="100%"
                height="auto"
                background="transparent"
                borderColor="transparent"
                borderRadius="1rem"
                glareColor="#f59e0b"
                glareOpacity={0.2}
                glareAngle={-35}
                glareSize={240}
                transitionDuration={650}
              >
                <div
                  className="rounded-2xl border border-white/[0.08] bg-[#121520]/45 backdrop-blur-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-amber-400">
                        Q{idx + 1}
                      </span>
                      <h4 className="font-semibold text-sm text-white">{item.question}</h4>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="text-indigo-400 font-semibold">Key Hint:</span>{' '}
                      <span>{item.coreAnswerHint}</span>
                    </p>
                  </div>
                </div>
              </GlareHover>
            ))}
          </div>
        </section>
      )}

      {/* 5. QUICK REVISION (5-Minute Blitz) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.08]">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wide">
              5. QUICK REVISION (5-Minute Blitz)
            </h3>
            <p className="text-xs text-slate-400">The entire lecture condensed into a rapid refresher</p>
          </div>
        </div>

        <GlareHover
          width="100%"
          height="auto"
          background="transparent"
          borderColor="transparent"
          borderRadius="1.5rem"
          glareColor="#10b981"
          glareOpacity={0.2}
          glareAngle={-45}
          glareSize={250}
          transitionDuration={700}
        >
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.04] p-6 sm:p-8 space-y-3">
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {examData.quickRevisionSummary}
            </p>
          </div>
        </GlareHover>
      </section>
    </div>
  );
}
