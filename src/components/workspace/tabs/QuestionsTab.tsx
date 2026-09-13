'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { ExamQuestion } from '@/types/revision';
import {
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Award,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import GlareHover from '@/components/GlareHover';

export function QuestionsTab() {
  const { activePack } = useRevisionStore();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selfTestMode, setSelfTestMode] = useState<boolean>(false);

  if (!activePack) return null;

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllAnswers = (reveal: boolean) => {
    const map: Record<string, boolean> = {};
    activePack.examQuestions.forEach((q) => (map[q.id] = reveal));
    setRevealedAnswers(map);
  };

  const filteredQuestions = activePack.examQuestions.filter((q) => {
    return selectedType === 'all' || q.type === selectedType;
  });

  const getTypeBadge = (type: ExamQuestion['type']) => {
    switch (type) {
      case 'short-answer':
        return (
          <span className="rounded-md bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[11px] font-medium text-blue-300">
            Short Answer
          </span>
        );
      case 'conceptual':
        return (
          <span className="rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[11px] font-medium text-purple-300">
            Conceptual
          </span>
        );
      case 'descriptive':
        return (
          <span className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
            Descriptive
          </span>
        );
      case 'application':
        return (
          <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-300">
            Application
          </span>
        );
      default:
        return null;
    }
  };

  const getDifficultyBadge = (diff: ExamQuestion['difficulty']) => {
    switch (diff) {
      case 'hard':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
            Hard
          </span>
        );
      case 'medium':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            Medium
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            Easy
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Self-Test Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Exam Question Bank</h2>
          <p className="text-xs text-slate-400">
            Calibrated questions directly synthesized from the lecture's core exam objectives
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !selfTestMode;
              setSelfTestMode(next);
              toggleAllAnswers(!next);
            }}
            className={`btn-spring btn-spring-glass flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition border cursor-pointer ${
              selfTestMode
                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-200'
                : 'border-white/10 bg-white/5 text-slate-300'
            }`}
          >
            {selfTestMode ? (
              <>
                <EyeOff className="h-3.5 w-3.5 text-indigo-400" />
                <span>Self-Test Mode (Active)</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 text-slate-400" />
                <span>Practice / Hide Answers</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'short-answer', label: 'Short Answer' },
          { id: 'conceptual', label: 'Conceptual' },
          { id: 'descriptive', label: 'Descriptive' },
          { id: 'application', label: 'Application' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`btn-spring btn-spring-glass rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition border cursor-pointer ${
              selectedType === tab.id
                ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = revealedAnswers[q.id] ?? !selfTestMode;

          return (
            <GlareHover
              key={q.id || idx}
              width="100%"
              height="auto"
              background="transparent"
              borderColor="transparent"
              borderRadius="1rem"
              glareColor="#00f2fe"
              glareOpacity={0.2}
              glareAngle={-35}
              glareSize={250}
              transitionDuration={700}
            >
              <div
                className="glass-panel rounded-2xl border border-white/[0.08] p-5 sm:p-6 space-y-4 transition hover:border-white/[0.12]"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      Q{idx + 1}
                    </span>
                    {getTypeBadge(q.type)}
                    <span className="text-slate-600">•</span>
                    {getDifficultyBadge(q.difficulty)}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAnswer(q.id)}
                    className="btn-spring btn-spring-glass flex items-center gap-1 text-xs text-indigo-400 hover:text-white transition shrink-0 px-3 py-1 rounded-full border border-transparent cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>Hide Solution</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span>Reveal Solution</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Question Prompt */}
                <h3 className="text-sm sm:text-base font-semibold text-white leading-snug">
                  {q.question}
                </h3>

                {/* Solution & Marking Scheme (Expandable) */}
                {isRevealed ? (
                  <div className="space-y-4 pt-3 border-t border-white/[0.06]">
                    {/* Model Answer */}
                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                        Model Answer
                      </h4>
                      <GlareHover
                        width="100%"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="0.75rem"
                        glareColor="#818cf8"
                        glareOpacity={0.15}
                        glareAngle={-30}
                        glareSize={220}
                      >
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.04] whitespace-pre-line">
                          {q.modelAnswer}
                        </p>
                      </GlareHover>
                    </div>

                    {/* Marking Scheme Checklist */}
                    {q.markingPoints && q.markingPoints.length > 0 && (
                      <GlareHover
                        width="100%"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="0.75rem"
                        glareColor="#10b981"
                        glareOpacity={0.2}
                        glareAngle={-30}
                        glareSize={220}
                      >
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-3.5 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <Award className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                              Exam Scoring Criteria
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-emerald-200/90">
                            {q.markingPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlareHover>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => toggleAnswer(q.id)}
                    className="rounded-xl border border-dashed border-white/10 bg-white/[0.01] p-3 text-center cursor-pointer hover:bg-white/[0.03] transition"
                  >
                    <p className="text-xs text-slate-500">
                      Solution hidden for self-testing. Click to reveal answer and marking scheme.
                    </p>
                  </div>
                )}
              </div>
            </GlareHover>
          );
        })}
      </div>
    </div>
  );
}
