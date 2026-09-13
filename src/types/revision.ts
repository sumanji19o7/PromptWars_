export type AcademicLevel = 'High School' | 'Undergraduate' | 'Postgraduate' | 'Professional';

export type ExamStyle = 'Theory Focused' | 'Application & Problem Solving' | 'Mixed / Comprehensive';

export interface StudyPreferences {
  subject: string;
  courseBranch?: string;
  academicLevel: AcademicLevel;
  examStyle: ExamStyle;
}

export interface KeyConcept {
  id: string;
  name: string;
  category: string;
  importance: 'critical' | 'high' | 'medium';
  definition: string;
  explanation: string;
  relatedConcepts: string[];
}

export interface DefinitionItem {
  term: string;
  definition: string;
  contextOrFormula?: string;
}

export interface RevisionSection {
  id: string;
  heading: string;
  subheading?: string;
  summary: string;
  bulletPoints: string[];
  formulas?: string[];
  examples?: string[];
  highlightNotes?: string[];
}

export interface ExamQuestion {
  id: string;
  type: 'short-answer' | 'conceptual' | 'descriptive' | 'application';
  question: string;
  modelAnswer: string;
  markingPoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CommonConfusion {
  conceptA: string;
  conceptB: string;
  distinction: string;
}

export interface LikelyQuestion {
  question: string;
  coreAnswerHint: string;
}

export interface ExamModeData {
  mustKnow: string[];
  importantDefinitions: DefinitionItem[];
  commonConfusions: CommonConfusion[];
  likelyQuestions: LikelyQuestion[];
  quickRevisionSummary: string;
}

export interface RevisionPack {
  id: string;
  documentTitle: string;
  subject: string;
  academicLevel: AcademicLevel;
  examStyle: ExamStyle;
  generatedAt: string;
  sourceFileName: string;
  sourceFileSize: number;
  sourceFileType: string;
  pageCountEstimate?: number;
  stats: {
    conceptCount: number;
    questionCount: number;
    sectionCount: number;
    estimatedStudyTimeMinutes: number;
  };
  overview: {
    summary: string;
    keyThemes: string[];
    prerequisites?: string[];
  };
  revisionNotes: RevisionSection[];
  keyConcepts: KeyConcept[];
  importantDefinitions: DefinitionItem[];
  examQuestions: ExamQuestion[];
  examMode: ExamModeData;
}

export type ProcessingStage =
  | 'idle'
  | 'uploading'
  | 'extracting'
  | 'identifying_concepts'
  | 'structuring_notes'
  | 'generating_questions'
  | 'finalizing_pack'
  | 'completed'
  | 'error';

export interface StageInfo {
  stage: ProcessingStage;
  label: string;
  description: string;
  progress: number;
}
