'use client';

import React from 'react';
import { useRevisionStore, WorkspaceTab } from '@/store/useRevisionStore';
import { LayoutDashboard, FileText, BrainCircuit, HelpCircle, Zap } from 'lucide-react';

interface TabItem {
  id: WorkspaceTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  highlight?: boolean;
}

export function WorkspaceNav() {
  const { activeTab, setActiveTab, activePack } = useRevisionStore();

  if (!activePack) return null;

  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'notes',
      label: 'Revision Notes',
      icon: FileText,
      count: activePack.revisionNotes.length,
    },
    {
      id: 'concepts',
      label: 'Key Concepts',
      icon: BrainCircuit,
      count: activePack.keyConcepts.length,
    },
    {
      id: 'questions',
      label: 'Exam Questions',
      icon: HelpCircle,
      count: activePack.examQuestions.length,
    },
    {
      id: 'exam-mode',
      label: 'Exam Mode',
      icon: Zap,
      highlight: true,
    },
  ];

  return (
    <div className="border-b border-cyan-500/20 bg-[#090a0f]/45 backdrop-blur-xl sticky top-16 z-30 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-spring flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all shrink-0 select-none cursor-pointer ${
                  tab.highlight
                    ? isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20'
                      : 'btn-spring-magenta text-amber-400 bg-amber-500/10 border border-amber-500/30'
                    : isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'btn-spring-cyan text-slate-400 hover:text-black'
                }`}
              >
                <Icon className={`h-4 w-4 ${tab.highlight && !isActive ? 'text-amber-400' : ''}`} />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    Signature
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
