'use client';

import React from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { AcademicLevel, ExamStyle } from '@/types/revision';
import { SlidersHorizontal, GraduationCap, Target, BookMarked } from 'lucide-react';

const QUICK_SUBJECTS = [
  'Distributed Database Systems',
  'Operating Systems & Kernel Arch',
  'Machine Learning & Neural Nets',
  'Computer Networks & Protocols',
  'Software Engineering & OOP',
];

const ACADEMIC_LEVELS: AcademicLevel[] = [
  'High School',
  'Undergraduate',
  'Postgraduate',
  'Professional',
];

const EXAM_STYLES: ExamStyle[] = [
  'Theory Focused',
  'Application & Problem Solving',
  'Mixed / Comprehensive',
];

export function PersonalizationForm() {
  const { preferences, setPreferences } = useRevisionStore();

  return (
    <div className="rounded-2xl border border-cyan-500/25 bg-[#11141e]/50 p-5 sm:p-6 backdrop-blur-xl shadow-xl shadow-black/40">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/15">
        <SlidersHorizontal className="h-4 w-4 text-[#00f2fe]" />
        <h2 className="text-sm font-semibold text-white tracking-wide">
          Revision Personalization
        </h2>
        <span className="text-[11px] text-[#b9cacb] ml-auto">Tailors AI depth & question styling</span>
      </div>

      <div className="space-y-4">
        {/* Subject Input & Quick Suggestions */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
            <BookMarked className="h-3.5 w-3.5 text-slate-400" />
            <span>Target Subject / Course</span>
          </label>
          <input
            type="text"
            value={preferences.subject}
            onChange={(e) => setPreferences({ subject: e.target.value })}
            placeholder="e.g. Distributed Database Systems, Organic Chemistry..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
          />

          {/* Quick Subject Chips */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Quick select:</span>
            {QUICK_SUBJECTS.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setPreferences({ subject: sub })}
                className={`btn-spring btn-spring-glass rounded-full px-3 py-1 text-[11px] transition border cursor-pointer ${
                  preferences.subject === sub
                    ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300'
                    : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Academic Level & Exam Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Academic Level */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
              <span>Academic Level</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {ACADEMIC_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPreferences({ academicLevel: level })}
                  className={`btn-spring btn-spring-glass rounded-full px-3 py-1.5 text-xs font-medium text-center transition border cursor-pointer ${
                    preferences.academicLevel === level
                      ? 'border-indigo-500/60 bg-indigo-500/15 text-indigo-200 shadow-sm'
                      : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Style */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <Target className="h-3.5 w-3.5 text-slate-400" />
              <span>Exam Focus</span>
            </label>
            <div className="flex flex-col gap-1.5">
              {EXAM_STYLES.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setPreferences({ examStyle: style })}
                  className={`btn-spring btn-spring-glass rounded-full px-3.5 py-1.5 text-xs font-medium text-left transition border cursor-pointer ${
                    preferences.examStyle === style
                      ? 'border-purple-500/60 bg-purple-500/15 text-purple-200 shadow-sm'
                      : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
