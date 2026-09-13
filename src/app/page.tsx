'use client';

import React, { useState, useRef } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { Navbar } from '@/components/Navbar';
import { CyberpunkHero } from '@/components/landing/CyberpunkHero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FileUploadZone } from '@/components/landing/FileUploadZone';
import { PersonalizationForm } from '@/components/landing/PersonalizationForm';
import { KeyConceptsShowcase } from '@/components/landing/KeyConceptsShowcase';
import { ExamModeShowcase } from '@/components/landing/ExamModeShowcase';
import { FinalCtaShowcase } from '@/components/landing/FinalCtaShowcase';
import { StorySection } from '@/components/landing/StorySection';
import { ProcessingScreen } from '@/components/processing/ProcessingScreen';
import { RevisionWorkspace } from '@/components/workspace/RevisionWorkspace';
import { AlertCircle, Zap, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const {
    activePack,
    setActivePack,
    preferences,
    loadSampleDemo,
    setUploadedFile,
  } = useRevisionStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(true);

  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleStartNow = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 },
    });
    scrollToUpload();
  };

  const scrollToUpload = () => {
    const el = document.getElementById('upload-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simulated rapid stage stepper
  const advanceStages = async (callback: () => Promise<void>) => {
    setIsProcessing(true);
    setCurrentStageIdx(0);
    setErrorMessage(null);

    const stageInterval = setInterval(() => {
      setCurrentStageIdx((prev) => (prev < 5 ? prev + 1 : prev));
    }, 1200);

    try {
      await callback();
    } catch (err: any) {
      clearInterval(stageInterval);
      setIsProcessing(false);
      setErrorMessage(err.message || 'An unexpected error occurred.');
      return;
    }

    clearInterval(stageInterval);
    setCurrentStageIdx(5);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handleStartProcessing = async (file: File) => {
    await advanceStages(async () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', preferences.subject);
      formData.append('courseBranch', preferences.courseBranch || '');
      formData.append('academicLevel', preferences.academicLevel);
      formData.append('examStyle', preferences.examStyle);

      const res = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to process document.');
      }

      setActivePack(data.pack);
    });
  };

  const handleRunDemo = async () => {
    setIsUnlocked(true);
    setUploadedFile({
      name: 'Lecture_08_Neurobiology_Synaptic_Transmission.pdf',
      size: 4404019,
      type: 'application/pdf',
    });

    await advanceStages(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2400));
      loadSampleDemo();
    });
  };

  // If a pack is active, show the Revision Workspace
  if (activePack) {
    return (
      <div className="min-h-screen bg-transparent text-[#e3e1e9] flex flex-col font-sans cyber-grid selection:bg-[#00f2fe] selection:text-black">
        <Navbar />
        <div className="pt-16">
          <RevisionWorkspace />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e3e1e9] flex flex-col font-sans cyber-grid selection:bg-[#00f2fe] selection:text-black relative overflow-x-hidden">
      {/* Ambient Neon Glow Blurs from Design */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-[28rem] h-[28rem] bg-[#e20476]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-80 h-80 bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Navbar />

      <main className="w-full pt-16 sm:pt-20 pb-16 flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Error banner if any */}
          {errorMessage && (
            <div className="mb-6 mx-auto max-w-3xl flex items-center gap-3 rounded-lg border border-red-500/40 bg-red-950/20 p-4 text-sm text-red-300 font-mono">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <div className="flex-1">
                <p className="font-bold">SYNAPSE EXTRACTION ERROR</p>
                <p className="text-xs text-red-200/80 mt-0.5">{errorMessage}</p>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="rounded-full px-3 py-1 text-xs text-red-300 hover:bg-red-500/20 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Processing State */}
          {isProcessing ? (
            <div className="py-12">
              <ProcessingScreen currentStageIndex={currentStageIdx} />
            </div>
          ) : (
            /* Apple-Style Scroll Storytelling Sequence */
            <div className="w-full">
              {/* CHAPTER 1: Hero & Spatial Core */}
              <StorySection
                isFirst
                id="hero-section"
                chapterNumber="CHAPTER 01"
                chapterTitle="NEURAL SPATIAL MATRIX"
              >
                <CyberpunkHero onStartNow={handleStartNow} isUnlocked={isUnlocked} />
              </StorySection>

              {/* CHAPTER 2: How It Works */}
              <StorySection
                id="how-it-works"
                chapterNumber="CHAPTER 02"
                chapterTitle="DISTILLATION ARCHITECTURE"
              >
                <HowItWorks
                  onRunDemo={handleRunDemo}
                  onScrollToUpload={scrollToUpload}
                />
              </StorySection>

              {/* CHAPTER 3: AI Revision Pack / Upload Zone */}
              <StorySection
                id="upload-section"
                chapterNumber="CHAPTER 03"
                chapterTitle="SYNAPTIC INGESTION HUB"
              >
                <div ref={uploadSectionRef} className="space-y-6">
                  <FileUploadZone
                    onStartProcessing={handleStartProcessing}
                    onRunDemo={handleRunDemo}
                  />

                  <div className="max-w-3xl mx-auto">
                    <PersonalizationForm />
                  </div>
                </div>
              </StorySection>

              {/* CHAPTER 4: Key Concepts */}
              <StorySection
                id="key-concepts"
                chapterNumber="CHAPTER 04"
                chapterTitle="COGNITIVE RECOVERY"
              >
                <KeyConceptsShowcase
                  onRunDemo={handleRunDemo}
                  onScrollToUpload={scrollToUpload}
                />
              </StorySection>

              {/* CHAPTER 5: Signature Exam Mode */}
              <StorySection
                id="exam-mode"
                chapterNumber="CHAPTER 05"
                chapterTitle="EXAM CRAM PROTOCOL"
              >
                <ExamModeShowcase
                  onRunDemo={handleRunDemo}
                  onScrollToUpload={scrollToUpload}
                />
              </StorySection>

              {/* CHAPTER 6: Final CTA & Telemetry */}
              <StorySection
                isLast
                id="final-cta"
                chapterNumber="CHAPTER 06"
                chapterTitle="SYSTEM ACTIVATION"
              >
                <FinalCtaShowcase
                  onRunDemo={handleRunDemo}
                  onScrollToUpload={scrollToUpload}
                />
              </StorySection>
            </div>
          )}
        </div>
      </main>

      {/* Cyberpunk Footer from Design */}
      <footer className="w-full bg-[#090a0f] border-t border-cyan-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] sm:text-[12px] text-[#b9cacb]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
            <span>DROP PDF ANYWHERE TO TRIGGER SYNAPTIC PARSER</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1f2438] text-cyan-300 border border-cyan-500/30 text-[10px] shadow-sm">
                ⌘K
              </kbd>
              <span>TO QUERY NEURAL MATRIX</span>
            </div>
            <span className="text-[#3a494b]">//</span>
            <span className="text-[#00f2fe] font-semibold">LECTURA_CORE v3.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
