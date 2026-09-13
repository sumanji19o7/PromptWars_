'use client';

import React, { useState } from 'react';
import { useRevisionStore } from '@/store/useRevisionStore';
import { WorkspaceHeader } from './WorkspaceHeader';
import { WorkspaceNav } from './WorkspaceNav';
import { OverviewTab } from './tabs/OverviewTab';
import { NotesTab } from './tabs/NotesTab';
import { ConceptsTab } from './tabs/ConceptsTab';
import { QuestionsTab } from './tabs/QuestionsTab';
import { ExamModeTab } from './tabs/ExamModeTab';
import { ExportModal } from '../export/ExportModal';

export function RevisionWorkspace() {
  const { activeTab } = useRevisionStore();
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Workspace Top Bar */}
      <WorkspaceHeader onOpenExport={() => setIsExportOpen(true)} />

      {/* Workspace Tab Navigator */}
      <WorkspaceNav />

      {/* Main Tab Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'notes' && <NotesTab />}
        {activeTab === 'concepts' && <ConceptsTab />}
        {activeTab === 'questions' && <QuestionsTab />}
        {activeTab === 'exam-mode' && <ExamModeTab />}
      </main>

      {/* Export Modal Dialog */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
