'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ScanText,
  BrainCircuit,
  Layers,
  HelpCircle,
  Zap,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useRevisionStore } from '@/store/useRevisionStore';

interface ProcessingStageItem {
  key: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGES: ProcessingStageItem[] = [
  {
    key: 'reading',
    title: 'Reading Document',
    description: 'Parsing binary stream and resolving page layout hierarchy...',
    icon: FileText,
  },
  {
    key: 'extracting',
    title: 'Extracting Text & Data',
    description: 'Normalizing raw typography, slides, tables, and formula tokens...',
    icon: ScanText,
  },
  {
    key: 'identifying_concepts',
    title: 'Identifying Key Concepts',
    description: 'AI model is isolating critical principles, relationships, and dependencies...',
    icon: BrainCircuit,
  },
  {
    key: 'structuring_notes',
    title: 'Structuring Revision Notes',
    description: 'Formatting subheadings, bullet summaries, and highlighted exam traps...',
    icon: Layers,
  },
  {
    key: 'generating_questions',
    title: 'Calibrating Exam Questions',
    description: 'Synthesizing conceptual, short-answer, and application-based questions...',
    icon: HelpCircle,
  },
  {
    key: 'exam_mode',
    title: 'Assembling Exam Mode Pack',
    description: 'Condensing high-yield Must Know items, confusions, and blitz recap...',
    icon: Zap,
  },
];

interface ProcessingScreenProps {
  currentStageIndex: number;
  totalStages?: number;
}

export function ProcessingScreen({ currentStageIndex }: ProcessingScreenProps) {
  const { uploadedFile, preferences } = useRevisionStore();

  const progressPercent = Math.min(
    100,
    Math.round(((currentStageIndex + 1) / STAGES.length) * 100)
  );

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-cyan-500/25 bg-[#11141e]/50 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/50">
      {/* File & Target Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm sm:text-base truncate max-w-xs sm:max-w-md">
              {uploadedFile?.name || 'Lecture_Materials.pdf'}
            </h3>
            <p className="text-xs text-slate-400">
              {preferences.subject} • {preferences.academicLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Analyzing
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 mb-8">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
          <span className="font-medium text-slate-300">Processing Pipeline</span>
          <span className="font-mono text-indigo-400">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Animated Stages List */}
      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isUpcoming = idx > currentStageIndex;
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-start gap-3.5 rounded-xl p-3.5 transition-all border ${
                isCurrent
                  ? 'border-indigo-500/40 bg-indigo-500/10 shadow-lg shadow-indigo-500/5'
                  : isDone
                  ? 'border-white/[0.04] bg-white/[0.01]'
                  : 'border-transparent opacity-40'
              }`}
            >
              {/* Status Icon */}
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                ) : isCurrent ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white shadow-md shadow-indigo-500/50">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-slate-500 border border-white/10">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>

              {/* Stage Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-semibold ${
                      isCurrent
                        ? 'text-white'
                        : isDone
                        ? 'text-slate-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-500/20 px-1.5 py-0.2 rounded">
                      In progress
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-400 truncate">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          Synthesizing high-yield study material • Zero hallucinations guaranteed
        </p>
      </div>
    </div>
  );
}
