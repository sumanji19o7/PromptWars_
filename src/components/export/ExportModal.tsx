'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { jsPDF } from 'jspdf';
import {
  X,
  Download,
  FileText,
  FileDown,
  Copy,
  Check,
  Printer,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { activePack } = useRevisionStore();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen || !activePack) return null;

  const generatePdf = () => {
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;
      let y = 50;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          doc.addPage();
          y = 50;
        }
      };

      // Header Banner
      doc.setFillColor(15, 18, 28);
      doc.rect(0, 0, pageWidth, 90, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('StudyFlow — Exam Revision Pack', margin, 38);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(165, 180, 252);
      doc.text(
        `Generated on ${new Date(activePack.generatedAt).toLocaleDateString()} | Subject: ${activePack.subject}`,
        margin,
        55
      );
      doc.text(
        `Academic Level: ${activePack.academicLevel} | Exam Style: ${activePack.examStyle}`,
        margin,
        70
      );

      y = 115;

      // Document Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(17, 24, 39);
      const titleLines = doc.splitTextToSize(activePack.documentTitle, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 18 + 15;

      // Executive Summary
      checkPageBreak(80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text('EXECUTIVE SUMMARY', margin, y);
      y += 16;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(55, 65, 81);
      const summaryLines = doc.splitTextToSize(activePack.overview.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 14 + 20;

      // 1. MUST KNOW & EXAM MODE
      checkPageBreak(120);
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(margin, y, contentWidth, 24, 4, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(146, 64, 14);
      doc.text('EXAM MODE: HIGH-YIELD MUST KNOW', margin + 10, y + 16);
      y += 34;

      activePack.examMode.mustKnow.forEach((item) => {
        checkPageBreak(30);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(185, 28, 28);
        doc.text('•', margin + 6, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(31, 41, 55);
        const itemLines = doc.splitTextToSize(item, contentWidth - 20);
        doc.text(itemLines, margin + 18, y);
        y += itemLines.length * 13 + 6;
      });
      y += 10;

      // 2. KEY CONCEPTS
      checkPageBreak(60);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text('KEY CONCEPTS & DEFINITIONS', margin, y);
      y += 18;

      activePack.keyConcepts.forEach((c) => {
        checkPageBreak(50);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(17, 24, 39);
        doc.text(`${c.name} [${c.importance.toUpperCase()}]`, margin, y);
        y += 14;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(79, 70, 229);
        const defLines = doc.splitTextToSize(`Definition: ${c.definition}`, contentWidth - 10);
        doc.text(defLines, margin + 10, y);
        y += defLines.length * 12 + 4;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(75, 85, 99);
        const expLines = doc.splitTextToSize(c.explanation, contentWidth - 10);
        doc.text(expLines, margin + 10, y);
        y += expLines.length * 12 + 10;
      });

      // 3. REVISION NOTES
      checkPageBreak(60);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text('STRUCTURED REVISION NOTES', margin, y);
      y += 18;

      activePack.revisionNotes.forEach((sec, idx) => {
        checkPageBreak(60);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(17, 24, 39);
        doc.text(`${idx + 1}. ${sec.heading}`, margin, y);
        y += 14;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        const sLines = doc.splitTextToSize(sec.summary, contentWidth);
        doc.text(sLines, margin, y);
        y += sLines.length * 12 + 6;

        sec.bulletPoints.forEach((pt) => {
          checkPageBreak(25);
          doc.text('–', margin + 8, y);
          const ptLines = doc.splitTextToSize(pt, contentWidth - 24);
          doc.text(ptLines, margin + 20, y);
          y += ptLines.length * 12 + 4;
        });

        if (sec.formulas?.length) {
          checkPageBreak(30);
          doc.setFont('courier', 'bold');
          sec.formulas.forEach((f) => {
            doc.text(`[Formula] ${f}`, margin + 15, y);
            y += 12;
          });
          doc.setFont('helvetica', 'normal');
        }

        y += 8;
      });

      // 4. EXAM QUESTIONS & MARKING SCHEMES
      checkPageBreak(60);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(79, 70, 229);
      doc.text('EXAM QUESTIONS & MARKING SCHEMES', margin, y);
      y += 18;

      activePack.examQuestions.forEach((q, idx) => {
        checkPageBreak(60);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(17, 24, 39);
        const qLines = doc.splitTextToSize(`Q${idx + 1} [${q.type.toUpperCase()}]: ${q.question}`, contentWidth);
        doc.text(qLines, margin, y);
        y += qLines.length * 13 + 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        const ansLines = doc.splitTextToSize(`Model Solution:\n${q.modelAnswer}`, contentWidth - 15);
        doc.text(ansLines, margin + 15, y);
        y += ansLines.length * 12 + 6;

        if (q.markingPoints?.length) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(5, 150, 105);
          doc.text('Grading Points:', margin + 15, y);
          y += 11;
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(75, 85, 99);
          q.markingPoints.forEach((pt) => {
            const ptLines = doc.splitTextToSize(`✓ ${pt}`, contentWidth - 25);
            doc.text(ptLines, margin + 25, y);
            y += ptLines.length * 11 + 3;
          });
        }
        y += 10;
      });

      // Save PDF file
      const safeFilename =
        activePack.documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_studyflow_pack.pdf';
      doc.save(safeFilename);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const downloadMarkdown = () => {
    let md = `# ${activePack.documentTitle}\n\n`;
    md += `**Subject:** ${activePack.subject} | **Level:** ${activePack.academicLevel}\n\n`;
    md += `## Executive Summary\n${activePack.overview.summary}\n\n`;

    md += `## ⚡ Exam Mode — High Yield\n`;
    md += `### Must Know\n`;
    activePack.examMode.mustKnow.forEach((m) => (md += `- ${m}\n`));
    md += `\n### Important Definitions\n`;
    activePack.examMode.importantDefinitions?.forEach((d) => (md += `- **${d.term}:** ${d.definition}\n`));
    md += `\n### Common Confusions\n`;
    activePack.examMode.commonConfusions?.forEach((c) => (md += `- **${c.conceptA} vs ${c.conceptB}:** ${c.distinction}\n`));
    md += `\n### 5-Minute Blitz Recap\n${activePack.examMode.quickRevisionSummary}\n\n`;

    md += `## Revision Notes\n`;
    activePack.revisionNotes.forEach((sec, idx) => {
      md += `### ${idx + 1}. ${sec.heading}\n${sec.summary}\n\n`;
      sec.bulletPoints.forEach((pt) => (md += `- ${pt}\n`));
      if (sec.formulas?.length) {
        md += `\n**Formulas:**\n`;
        sec.formulas.forEach((f) => (md += `\`${f}\`\n`));
      }
      md += `\n`;
    });

    md += `## Exam Questions Bank\n`;
    activePack.examQuestions.forEach((q, idx) => {
      md += `### Q${idx + 1} [${q.type.toUpperCase()}]: ${q.question}\n\n`;
      md += `**Model Answer:**\n${q.modelAnswer}\n\n`;
      if (q.markingPoints?.length) {
        md += `**Marking Criteria:**\n`;
        q.markingPoints.forEach((pt) => (md += `- [ ] ${pt}\n`));
      }
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePack.documentTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_revision_pack.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-[#10131e]/55 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-spring btn-spring-glass absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Download className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-white">Export Revision Pack</h3>
          </div>
          <p className="text-xs text-slate-400">
            Download your structured revision pack for printing, offline study, or import into Notion.
          </p>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          {/* PDF Option */}
          <button
            onClick={generatePdf}
            disabled={isGeneratingPdf}
            className="btn-spring btn-spring-glass w-full flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-left transition group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
                {isGeneratingPdf ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Download as PDF</h4>
                <p className="text-xs text-indigo-200/70">
                  Formatted study handout with Exam Mode sheet included
                </p>
              </div>
            </div>
            <FileDown className="h-5 w-5 text-indigo-400 group-hover:translate-y-0.5 transition" />
          </button>

          {/* Markdown Option */}
          <button
            onClick={downloadMarkdown}
            className="btn-spring btn-spring-glass w-full flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-left transition group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
                <FileDown className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Download as Markdown (.md)</h4>
                <p className="text-xs text-slate-400">
                  Optimized for Notion, Obsidian, Bear, or Anki
                </p>
              </div>
            </div>
            <FileDown className="h-5 w-5 text-slate-400 group-hover:translate-y-0.5 transition" />
          </button>
        </div>

        <div className="pt-2 border-t border-white/[0.06] text-center">
          <button
            onClick={onClose}
            className="btn-spring btn-spring-glass text-xs font-semibold text-slate-400 hover:text-white transition px-5 py-2 rounded-full border border-white/10 hover:border-white/20 cursor-pointer"
          >
            Cancel and Return to Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
