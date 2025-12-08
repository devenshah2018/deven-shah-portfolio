import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Import pdf-parse (CommonJS module) - use createRequire for ES modules
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Extract text from a PDF file
 * @param pdfPath - Path to the PDF file (relative to public/papers/ or absolute)
 * @returns Promise<string> - Extracted text from PDF
 */
export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    // Handle both relative and absolute paths
    let fullPath: string;
    if (pdfPath.startsWith('/') || pdfPath.startsWith(process.cwd())) {
      fullPath = pdfPath;
    } else {
      // Assume it's in public/papers/
      fullPath = join(process.cwd(), 'public', 'papers', pdfPath);
    }

    if (!existsSync(fullPath)) {
      console.warn(`PDF file not found: ${fullPath}`);
      return '';
    }

    const pdfBuffer = await readFile(fullPath);
    const data = await pdfParse(pdfBuffer);

    // Clean and normalize the text
    let text = data.text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
      .trim();

    return text;
  } catch (error) {
    console.error(`Error extracting text from PDF ${pdfPath}:`, error);
    return '';
  }
}

/**
 * Extract text from PDF and combine with metadata
 * @param pdfPath - Path to PDF file
 * @param metadata - Additional metadata to prepend
 * @returns Promise<string> - Combined text
 */
export async function extractAndCombinePDFText(
  pdfPath: string,
  metadata: { title?: string; abstract?: string; keywords?: string[] }
): Promise<string> {
  const pdfText = await extractTextFromPDF(pdfPath);
  
  const parts: string[] = [];
  
  if (metadata.title) {
    parts.push(metadata.title);
  }
  
  if (metadata.abstract) {
    parts.push(metadata.abstract);
  }
  
  if (metadata.keywords && metadata.keywords.length > 0) {
    parts.push(metadata.keywords.join(' '));
  }
  
  if (pdfText) {
    parts.push(pdfText);
  }
  
  return parts.join('\n\n');
}

