'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import {
  ChevronDown,
  ChevronUp,
  Bookmark,
  FunctionSquare,
  Lightbulb,
  AlertTriangle,
  ListOrdered,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import GlareHover from '@/components/GlareHover';

export function NotesTab() {
  const { activePack } = useRevisionStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    // Expand all by default for quick browsing
    const map: Record<string, boolean> = {};
    activePack?.revisionNotes.forEach((s) => (map[s.id] = true));
    return map;
  });

  if (!activePack) return null;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (expand: boolean) => {
    const map: Record<string, boolean> = {};
    activePack.revisionNotes.forEach((s) => (map[s.id] = expand));
    setExpandedSections(map);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Controls Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Structured Revision Notes</h2>
          <p className="text-xs text-slate-400">
            {activePack.revisionNotes.length} core sections extracted and broken down into exam-focused points
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleAll(true)}
            className="btn-spring btn-spring-glass flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] cursor-pointer"
          >
            <Maximize2 className="h-3 w-3" />
            <span className="hidden sm:inline">Expand All</span>
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="btn-spring btn-spring-glass flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] cursor-pointer"
          >
            <Minimize2 className="h-3 w-3" />
            <span className="hidden sm:inline">Collapse All</span>
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {activePack.revisionNotes.map((section, idx) => {
          const isExpanded = expandedSections[section.id] ?? true;

          return (
            <GlareHover
              key={section.id || idx}
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
                className="glass-panel rounded-2xl border border-white/[0.08] overflow-hidden transition"
              >
                {/* Section Header */}
                <div
                  onClick={() => toggleSection(section.id)}
                  className="flex items-start sm:items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition select-none"
                >
                  <div className="space-y-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-mono font-bold text-indigo-400 border border-indigo-500/20">
                        Section {idx + 1}
                      </span>
                      {section.subheading && (
                        <span className="text-xs text-slate-400 truncate hidden md:inline">
                          • {section.subheading}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {section.heading}
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-1 text-slate-400 hover:text-white shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Section Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-1 space-y-4 border-t border-white/[0.04]">
                    {/* Summary / Lead */}
                    <p className="text-sm text-slate-300 leading-relaxed font-normal bg-white/[0.01] p-3 rounded-xl border border-white/[0.04]">
                      {section.summary}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider flex items-center gap-1.5">
                        <ListOrdered className="h-3.5 w-3.5 text-indigo-400" />
                        Key Principles & Breakdown
                      </h4>
                      <ul className="space-y-2">
                        {section.bulletPoints.map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Formulas Callout */}
                    {section.formulas && section.formulas.length > 0 && (
                      <GlareHover
                        width="100%"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="0.75rem"
                        glareColor="#00f2fe"
                        glareOpacity={0.2}
                        glareAngle={-30}
                        glareSize={220}
                      >
                        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/[0.04] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FunctionSquare className="h-4 w-4 text-cyan-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                              Formulas & Equations
                            </span>
                          </div>
                          <div className="space-y-1.5 font-mono text-xs sm:text-sm text-cyan-200">
                            {section.formulas.map((formula, fIdx) => (
                              <div
                                key={fIdx}
                                className="bg-black/30 p-2.5 rounded-lg border border-cyan-500/10"
                              >
                                {formula}
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlareHover>
                    )}

                    {/* Examples Callout */}
                    {section.examples && section.examples.length > 0 && (
                      <GlareHover
                        width="100%"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="0.75rem"
                        glareColor="#a855f7"
                        glareOpacity={0.2}
                        glareAngle={-30}
                        glareSize={220}
                      >
                        <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.04] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="h-4 w-4 text-purple-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                              Concrete Examples & Applications
                            </span>
                          </div>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-purple-200">
                            {section.examples.map((ex, eIdx) => (
                              <li key={eIdx} className="flex items-start gap-2">
                                <span className="text-purple-400">•</span>
                                <span>{ex}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlareHover>
                    )}

                    {/* Highlight Notes / Exam Traps */}
                    {section.highlightNotes && section.highlightNotes.length > 0 && (
                      <GlareHover
                        width="100%"
                        height="auto"
                        background="transparent"
                        borderColor="transparent"
                        borderRadius="0.75rem"
                        glareColor="#f59e0b"
                        glareOpacity={0.25}
                        glareAngle={-30}
                        glareSize={220}
                      >
                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                              Exam Trap / High-Yield Note
                            </span>
                          </div>
                          <div className="space-y-1 text-xs sm:text-sm text-amber-200">
                            {section.highlightNotes.map((note, nIdx) => (
                              <p key={nIdx}>{note}</p>
                            ))}
                          </div>
                        </div>
                      </GlareHover>
                    )}
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
