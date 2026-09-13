'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileUp,
  BrainCircuit,
  LayoutDashboard,
  Zap,
  ArrowRight,
  CheckCircle2,
  Download,
  BookOpen,
  Network,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import GlareHover from '@/components/GlareHover';

interface HowItWorksProps {
  onRunDemo: () => void;
  onScrollToUpload: () => void;
}

const STEPS = [
  {
    id: 1,
    title: '1. Ingest Lecture Materials',
    subtitle: 'Upload PDF, DOCX, or PPTX',
    icon: FileUp,
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    description:
      'Drop your raw lecture slides, syllabus readings, or professor handouts. StudyFlow uses high-speed server-side document parsers to extract slides, tables, and formula tokens cleanly.',
    highlights: [
      'Multi-format: PDF slide decks, Word notes (.docx), and PowerPoint (.pptx)',
      'Up to 25MB file handling with layout & page count detection',
      'Zero setup required — no complex account creation needed',
    ],
  },
  {
    id: 2,
    title: '2. Gemini AI Deep Analysis',
    subtitle: 'Strict Zero-Hallucination Grounding',
    icon: BrainCircuit,
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    description:
      'Our Google Gemini synthesis engine analyzes your material against your subject, academic level, and exam style to isolate critical concepts, definitions, and exam traps.',
    highlights: [
      'Strict source anchoring: AI never invents facts not in your slides',
      'Structured JSON output for independent section exploration',
      'Identifies subtle distinctions and common student pitfalls',
    ],
  },
  {
    id: 3,
    title: '3. Multi-View Revision Workspace',
    subtitle: 'Structured Notes & Concept Graphs',
    icon: LayoutDashboard,
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    description:
      'Review your material in whatever way suits your learning style. Read structured notes with formula callouts, explore the interactive 2D/3D concept relationship graph, or practice exam questions.',
    highlights: [
      'Hierarchical notes with exam-trap callouts and equations',
      'Interactive Concept Relationship Network with connected topics',
      'Question Bank with self-test toggle and professor marking schemes',
    ],
  },
  {
    id: 4,
    title: '4. Signature Exam Mode & PDF Export',
    subtitle: 'High-Yield 30-Minute Cram Sheet',
    icon: Zap,
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description:
      'When the exam is 30 minutes away, activate Exam Mode. It cuts out the noise and presents only Must-Know facts, common confusions, rapid definitions, and a 5-minute blitz recap.',
    highlights: [
      'Interactive Must-Know checklist with completion confetti',
      'Common Confusions cards comparing easily mixed-up concepts',
      '1-Click professional PDF handout export and Markdown download',
    ],
  },
];

export function HowItWorks({ onRunDemo, onScrollToUpload }: HowItWorksProps) {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-cyan-500/20 bg-[#10131e]/50 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/50 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>How StudyFlow Works</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Turn Raw Lectures into Exam-Ready Packs
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          From unorganized slides to a structured study workspace and last-minute cram sheet in seconds.
        </p>
      </div>

      {/* Step Selector Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = activeStepId === step.id;

          return (
            <GlareHover
              key={step.id}
              width="100%"
              height="100%"
              background="transparent"
              borderColor="transparent"
              borderRadius="1rem"
              glareColor="#00f2fe"
              glareOpacity={0.25}
              glareAngle={-35}
              glareSize={220}
              transitionDuration={650}
            >
              <button
                onClick={() => setActiveStepId(step.id)}
                className={`btn-spring w-full h-full flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? 'border-cyan-500/60 bg-cyan-500/20 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500/40 text-white'
                    : 'btn-spring-glass border-white/[0.08] bg-white/[0.03] text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Step 0{step.id}
                  </span>
                  <div className={`p-1.5 rounded-lg border ${step.badgeColor}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.subtitle}
                </h3>
              </button>
            </GlareHover>
          );
        })}
      </div>

      {/* Active Step Feature Showcase Card */}
      <GlareHover
        width="100%"
        height="auto"
        background="transparent"
        borderColor="transparent"
        borderRadius="1rem"
        glareColor="#00f2fe"
        glareOpacity={0.2}
        glareAngle={-45}
        glareSize={250}
        transitionDuration={750}
      >
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/[0.08] bg-black/30 backdrop-blur-md p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${activeStep.badgeColor}`}>
                <activeStep.icon className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Step 0{activeStep.id} of 04
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeStep.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onScrollToUpload}
                className="btn-spring btn-spring-cyan flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#121520] px-4 py-2 text-xs font-semibold text-cyan-300 transition shadow-sm cursor-pointer"
              >
                <span>Upload Document</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={onRunDemo}
                className="btn-spring btn-spring-magenta flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-xs font-semibold text-pink-300 transition cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>Sample Demo</span>
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {activeStep.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {activeStep.highlights.map((h, i) => (
              <GlareHover
                key={i}
                width="100%"
                height="100%"
                background="transparent"
                borderColor="transparent"
                borderRadius="0.75rem"
                glareColor="#ffffff"
                glareOpacity={0.15}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={600}
              >
                <div
                  className="h-full flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              </GlareHover>
            ))}
          </div>
        </motion.div>
      </GlareHover>
    </section>
  );
}
