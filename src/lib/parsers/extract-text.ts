import { extractText } from 'unpdf';
import mammoth from 'mammoth';
import { parseOffice } from 'officeparser';

export async function extractTextFromFile(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ text: string; pageCountEstimate?: number }> {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // 1. PDF Extraction
  if (mimeType === 'application/pdf' || extension === 'pdf') {
    try {
      const { text, totalPages } = await extractText(new Uint8Array(buffer));
      const cleanText = Array.isArray(text) ? text.join('\n\n') : String(text || '');
      return {
        text: cleanText.trim(),
        pageCountEstimate: totalPages || Math.max(1, Math.ceil(cleanText.length / 2000)),
      };
    } catch (err: unknown) {
      console.error('PDF extraction failed:', err);
      throw new Error('Failed to extract text from PDF. Please check if the document is encrypted or scanned images only.');
    }
  }

  // 2. DOCX Extraction
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword' ||
    extension === 'docx' ||
    extension === 'doc'
  ) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      const cleanText = result.value.trim();
      return {
        text: cleanText,
        pageCountEstimate: Math.max(1, Math.ceil(cleanText.length / 2500)),
      };
    } catch (err: unknown) {
      console.error('DOCX extraction failed:', err);
      throw new Error('Failed to extract text from Word document. The file may be damaged.');
    }
  }

  // 3. PPTX Extraction
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'application/vnd.ms-powerpoint' ||
    extension === 'pptx' ||
    extension === 'ppt'
  ) {
    try {
      const parsedText: any = await parseOffice(buffer, { fileType: 'pptx' as any });
      const cleanText = typeof parsedText === 'string' ? parsedText.trim() : String(parsedText || '').trim();
      return {
        text: cleanText,
        pageCountEstimate: Math.max(1, Math.ceil(cleanText.length / 1000)),
      };
    } catch (err: unknown) {
      console.error('PPTX extraction failed:', err);
      throw new Error('Failed to extract text from PowerPoint presentation.');
    }
  }

  throw new Error(`Unsupported file type: ${mimeType || extension}. Please upload a PDF, DOCX, or PPTX file.`);
}
