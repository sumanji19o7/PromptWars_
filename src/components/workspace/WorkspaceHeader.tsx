'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import {
  Zap,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  FileCheck2,
} from 'lucide-react';

interface WorkspaceHeaderProps {
  onOpenExport: () => void;
}

export function WorkspaceHeader({ onOpenExport }: WorkspaceHeaderProps) {
  const { activePack, activeTab, setActiveTab, resetWorkspace } = useRevisionStore();
  const [copied, setCopied] = useState(false);

  if (!activePack) return null;

  const handleCopyMarkdown = () => {
    let md = `# ${activePack.documentTitle}\n\n`;
    md += `**Subject:** ${activePack.subject} | **Level:** ${activePack.academicLevel}\n\n`;
    md += `## Overview\n${activePack.overview.summary}\n\n`;

    md += `## Revision Notes\n`;
    activePack.revisionNotes.forEach((sec) => {
      md += `### ${sec.heading}\n${sec.summary}\n`;
      sec.bulletPoints.forEach((pt) => (md += `- ${pt}\n`));
      if (sec.formulas?.length) {
        md += `\n**Key Formulas:**\n`;
        sec.formulas.forEach((f) => (md += `> ${f}\n`));
      }
      md += `\n`;
    });

    md += `## Key Concepts\n`;
    activePack.keyConcepts.forEach((c) => {
      md += `### ${c.name} (${c.importance.toUpperCase()})\n**Definition:** ${c.definition}\n${c.explanation}\n\n`;
    });

    md += `## Exam Questions\n`;
    activePack.examQuestions.forEach((q, i) => {
      md += `### Q${i + 1} [${q.type.toUpperCase()}]: ${q.question}\n**Model Answer:** ${q.modelAnswer}\n\n`;
    });

    md += `## Exam Mode Cheat Sheet\n`;
    md += `### Must Know\n`;
    activePack.examMode.mustKnow.forEach((m) => (md += `- ${m}\n`));
    md += `\n### Quick Revision Summary\n${activePack.examMode.quickRevisionSummary}\n`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#090a0f]/45 border-b border-cyan-500/20 px-4 sm:px-6 lg:px-12 py-5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Source info */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
            <h1 className="font-mono text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">
              {activePack.documentTitle}
            </h1>
          </div>
          <p className="font-mono text-[12px] text-[#b9cacb] pl-5 mt-0.5">
            SYNTHESIZED {new Date(activePack.generatedAt).toLocaleDateString()} • SOURCE:{' '}
            <span className="text-cyan-300 font-bold">{activePack.sourceFileName}</span> • LEVEL:{' '}
            <span className="text-pink-300">{activePack.academicLevel}</span>
          </p>
        </div>

        {/* Action Suite */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
          {/* Anki/Markdown Export */}
          <button
            onClick={handleCopyMarkdown}
            type="button"
            className="btn-spring btn-spring-glass inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121520]/60 border border-[#3a494b]/60 text-cyan-200 font-semibold transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">COPIED_MD</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-pink-400" />
                <span>EXPORT_ANKI</span>
              </>
            )}
          </button>

          {/* Export PDF */}
          <button
            onClick={onOpenExport}
            type="button"
            className="btn-spring btn-spring-glass inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#121520]/60 border border-[#3a494b]/60 text-cyan-200 font-semibold transition-all cursor-pointer"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            <span>MARKDOWN / PDF</span>
          </button>

          {/* Exam Mode Signature CTA */}
          <button
            onClick={() => setActiveTab(activeTab === 'exam-mode' ? 'overview' : 'exam-mode')}
            type="button"
            className={`btn-spring btn-spring-magenta inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(226,4,118,0.5)] border border-pink-400/40 cursor-pointer ${
              activeTab === 'exam-mode'
                ? 'bg-white text-black'
                : 'bg-[#e20476] text-white'
            }`}
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>{activeTab === 'exam-mode' ? 'EXIT_HUD_QUIZ' : 'FULL_HUD_QUIZ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
