import { GoogleGenerativeAI } from '@google/generative-ai';
import { RevisionPack, StudyPreferences } from '@/types/revision';
import { SAMPLE_REVISION_PACK } from './sample-data';

export async function generateRevisionPackFromAI(
  extractedText: string,
  fileName: string,
  fileSize: number,
  mimeType: string,
  preferences: StudyPreferences,
  pageCountEstimate?: number
): Promise<{ pack: RevisionPack; isDemoFallback?: boolean }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  // If no API key is provided, return intelligent sample data with user's customized subject
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('GEMINI_API_KEY is not set. Using high-fidelity demo fallback.');
    const dynamicPack: RevisionPack = {
      ...SAMPLE_REVISION_PACK,
      id: `pack-${Date.now()}`,
      documentTitle: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || preferences.subject,
      subject: preferences.subject || 'Advanced Computer Science',
      academicLevel: preferences.academicLevel,
      examStyle: preferences.examStyle,
      generatedAt: new Date().toISOString(),
      sourceFileName: fileName,
      sourceFileSize: fileSize,
      sourceFileType: mimeType,
      pageCountEstimate: pageCountEstimate || 12,
    };
    return { pack: dynamicPack, isDemoFallback: true };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-1.5-flash for rapid, cost-effective structured output
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  const prompt = `
You are StudyFlow's expert academic synthesizer and university exam preparation specialist.
Your task is to transform the following raw lecture text into a comprehensive, high-yield, exam-ready Revision Pack.

CONTEXT & PREFERENCES:
- File Name: ${fileName}
- Target Subject: ${preferences.subject}
- Academic Level: ${preferences.academicLevel}
- Exam Style Focus: ${preferences.examStyle}

CRITICAL RULES:
1. Base all notes, concepts, definitions, and questions strictly on the lecture text provided. Do not hallucinate external information.
2. Return ONLY a valid JSON object strictly matching the schema below. Do not wrap in markdown or backticks.
3. Exam Mode section must be high-density, focusing on last-minute cramming value:
   - "mustKnow": absolute core essentials
   - "importantDefinitions": key terminology
   - "commonConfusions": pairs of concepts students frequently confuse, with clear distinctions
   - "likelyQuestions": high-probability exam questions with concise model hints
   - "quickRevisionSummary": a 3-minute executive summary for immediate pre-exam review.

REQUIRED JSON SCHEMA:
{
  "documentTitle": "string",
  "subject": "string",
  "overview": {
    "summary": "string (concise 2-3 paragraph overview of the lecture)",
    "keyThemes": ["string"],
    "prerequisites": ["string"]
  },
  "revisionNotes": [
    {
      "id": "sec-1",
      "heading": "string",
      "subheading": "string",
      "summary": "string",
      "bulletPoints": ["string"],
      "formulas": ["string (if applicable, else omit or empty)"],
      "examples": ["string"],
      "highlightNotes": ["string (exam traps or pro tips)"]
    }
  ],
  "keyConcepts": [
    {
      "id": "c-1",
      "name": "string",
      "category": "string",
      "importance": "critical" | "high" | "medium",
      "definition": "string",
      "explanation": "string",
      "relatedConcepts": ["string"]
    }
  ],
  "importantDefinitions": [
    {
      "term": "string",
      "definition": "string",
      "contextOrFormula": "string"
    }
  ],
  "examQuestions": [
    {
      "id": "q-1",
      "type": "short-answer" | "conceptual" | "descriptive" | "application",
      "question": "string",
      "modelAnswer": "string",
      "markingPoints": ["string (key criteria for scoring points on exam)"],
      "difficulty": "easy" | "medium" | "hard"
    }
  ],
  "examMode": {
    "mustKnow": ["string"],
    "importantDefinitions": [
      {
        "term": "string",
        "definition": "string"
      }
    ],
    "commonConfusions": [
      {
        "conceptA": "string",
        "conceptB": "string",
        "distinction": "string"
      }
    ],
    "likelyQuestions": [
      {
        "question": "string",
        "coreAnswerHint": "string"
      }
    ],
    "quickRevisionSummary": "string"
  }
}

LECTURE TEXT:
"""
${extractedText.slice(0, 50000)}
"""
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    const parsedData = JSON.parse(cleanJson);

    const fullPack: RevisionPack = {
      id: `pack-${Date.now()}`,
      documentTitle: parsedData.documentTitle || fileName.replace(/\.[^/.]+$/, ''),
      subject: parsedData.subject || preferences.subject,
      academicLevel: preferences.academicLevel,
      examStyle: preferences.examStyle,
      generatedAt: new Date().toISOString(),
      sourceFileName: fileName,
      sourceFileSize: fileSize,
      sourceFileType: mimeType,
      pageCountEstimate: pageCountEstimate || 10,
      stats: {
        conceptCount: parsedData.keyConcepts?.length || 0,
        questionCount: parsedData.examQuestions?.length || 0,
        sectionCount: parsedData.revisionNotes?.length || 0,
        estimatedStudyTimeMinutes: Math.max(15, Math.min(60, (parsedData.revisionNotes?.length || 3) * 6)),
      },
      overview: parsedData.overview || {
        summary: 'Generated lecture revision overview.',
        keyThemes: [],
        prerequisites: [],
      },
      revisionNotes: parsedData.revisionNotes || [],
      keyConcepts: parsedData.keyConcepts || [],
      importantDefinitions: parsedData.importantDefinitions || [],
      examQuestions: parsedData.examQuestions || [],
      examMode: parsedData.examMode || {
        mustKnow: [],
        importantDefinitions: [],
        commonConfusions: [],
        likelyQuestions: [],
        quickRevisionSummary: '',
      },
    };

    return { pack: fullPack, isDemoFallback: false };
  } catch (error) {
    console.error('Gemini API execution error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate revision pack using Gemini AI.'
    );
  }
}
