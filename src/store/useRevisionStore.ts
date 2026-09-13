'use client';

import { create } from 'zustand';
import { RevisionPack, StudyPreferences, ProcessingStage } from '@/types/revision';
import { SAMPLE_REVISION_PACK } from '@/lib/sample-data';

export type WorkspaceTab = 'overview' | 'notes' | 'concepts' | 'questions' | 'exam-mode';

interface RevisionStoreState {
  activePack: RevisionPack | null;
  activeTab: WorkspaceTab;
  processingStage: ProcessingStage;
  stageProgress: number;
  stageMessage: string;
  preferences: StudyPreferences;
  uploadedFile: { name: string; size: number; type: string } | null;
  errorMessage: string | null;

  // Actions
  setActivePack: (pack: RevisionPack | null) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
  setProcessingStage: (stage: ProcessingStage, progress?: number, message?: string) => void;
  setPreferences: (preferences: Partial<StudyPreferences>) => void;
  setUploadedFile: (file: { name: string; size: number; type: string } | null) => void;
  setErrorMessage: (error: string | null) => void;
  loadSampleDemo: () => void;
  resetWorkspace: () => void;
}

const DEFAULT_PREFERENCES: StudyPreferences = {
  subject: 'Distributed Database Systems',
  courseBranch: 'Computer Science & Engineering',
  academicLevel: 'Undergraduate',
  examStyle: 'Mixed / Comprehensive',
};

export const useRevisionStore = create<RevisionStoreState>((set) => ({
  activePack: null,
  activeTab: 'overview',
  processingStage: 'idle',
  stageProgress: 0,
  stageMessage: '',
  preferences: DEFAULT_PREFERENCES,
  uploadedFile: null,
  errorMessage: null,

  setActivePack: (pack) =>
    set({
      activePack: pack,
      processingStage: pack ? 'completed' : 'idle',
      errorMessage: null,
    }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setProcessingStage: (stage, progress = 0, message = '') =>
    set({
      processingStage: stage,
      stageProgress: progress,
      stageMessage: message,
    }),

  setPreferences: (newPrefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPrefs },
    })),

  setUploadedFile: (file) => set({ uploadedFile: file }),

  setErrorMessage: (error) => set({ errorMessage: error, processingStage: 'error' }),

  loadSampleDemo: () =>
    set({
      activePack: SAMPLE_REVISION_PACK,
      activeTab: 'overview',
      processingStage: 'completed',
      uploadedFile: {
        name: SAMPLE_REVISION_PACK.sourceFileName,
        size: SAMPLE_REVISION_PACK.sourceFileSize,
        type: SAMPLE_REVISION_PACK.sourceFileType,
      },
      preferences: {
        subject: SAMPLE_REVISION_PACK.subject,
        academicLevel: SAMPLE_REVISION_PACK.academicLevel,
        examStyle: SAMPLE_REVISION_PACK.examStyle,
      },
      errorMessage: null,
    }),

  resetWorkspace: () =>
    set({
      activePack: null,
      activeTab: 'overview',
      processingStage: 'idle',
      stageProgress: 0,
      stageMessage: '',
      uploadedFile: null,
      errorMessage: null,
    }),
}));
