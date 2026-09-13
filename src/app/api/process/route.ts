import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/parsers/extract-text';
import { generateRevisionPackFromAI } from '@/lib/gemini';
import { StudyPreferences } from '@/types/revision';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const subject = (formData.get('subject') as string) || 'Computer Science';
    const courseBranch = (formData.get('courseBranch') as string) || '';
    const academicLevel = (formData.get('academicLevel') as any) || 'Undergraduate';
    const examStyle = (formData.get('examStyle') as any) || 'Mixed / Comprehensive';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    const fileName = file.name;
    const fileSize = file.size;
    const mimeType = file.type || 'application/octet-stream';

    // File size check: 25MB max
    if (fileSize > 25 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 25MB limit. Please upload a smaller document.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Text Extraction
    const { text, pageCountEstimate } = await extractTextFromFile(buffer, fileName, mimeType);

    if (!text || text.length < 30) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Insufficient text extracted from file. The document might be image-only scanned pages or empty.',
        },
        { status: 422 }
      );
    }

    // 2. AI Synthesis
    const preferences: StudyPreferences = {
      subject,
      courseBranch,
      academicLevel,
      examStyle,
    };

    const { pack, isDemoFallback } = await generateRevisionPackFromAI(
      text,
      fileName,
      fileSize,
      mimeType,
      preferences,
      pageCountEstimate
    );

    return NextResponse.json({
      success: true,
      pack,
      isDemoFallback,
    });
  } catch (error) {
    console.error('Document processing route error:', error);
    const message = error instanceof Error ? error.message : 'Unknown server error during processing.';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
