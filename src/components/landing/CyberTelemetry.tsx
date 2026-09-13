'use client';

import React from 'react';
import { BookOpen, HelpCircle, TrendingUp } from 'lucide-react';
import GlareHover from '@/components/GlareHover';

export function CyberTelemetry() {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderColor="transparent"
      borderRadius="0.75rem"
      glareColor="#00f2fe"
      glareOpacity={0.25}
      glareAngle={-45}
      glareSize={250}
      transitionDuration={700}
    >
      <div className="w-full bg-[#121520]/40 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-cyan-500/25 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-6 text-[#e3e1e9] font-mono text-[12px] sm:text-[13px]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#00f2fe]" />
            <span>
              <strong className="text-white font-bold">32 PDFS</strong> CONVERTED THIS SEMESTER
            </span>
          </div>
          <span className="text-[#3a494b] hidden sm:inline">//</span>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#e20476]" />
            <span>
              <strong className="text-white font-bold">420</strong> RECALL DRILLS COMPLETED
            </span>
          </div>
          <span className="text-[#3a494b] hidden sm:inline">//</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#00f2fe]" />
            <span>
              <strong className="text-[#00f2fe] font-bold">91%</strong> EXAM RETENTION RATE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-cyan-300/80">
          <span>ENCRYPTED IN CLOUD VAULT</span>
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
        </div>
      </div>
      </div>
    </GlareHover>
  );
}
