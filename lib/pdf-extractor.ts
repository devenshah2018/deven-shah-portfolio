import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Lazy load pdfjs-dist for PDF parsing (ESM-compatible)
let pdfjsLib: any = null;

async function getPdfJs() {
  if (!pdfjsLib) {
    try {
      // pdfjs-dist legacy build for Node.js environments
      // Use dynamic import to handle the legacy build path
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      pdfjsLib = pdfjs;
    } catch (error: any) {
      // If legacy path doesn't work, try alternative import
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjsLib = pdfjs;
      } catch (altError: any) {
        console.warn('Error loading pdfjs-dist:', altError.message || error.message || error);
        return null;
      }
    }
  }
  return pdfjsLib;
}

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
    
    // Try to get and use pdfjs-dist for PDF parsing
    try {
      const pdfjs = await getPdfJs();
      if (!pdfjs) {
        // PDF parsing not available - return empty string, metadata will still be used
        return '';
      }
      
      // Convert Buffer to Uint8Array (pdfjs-dist requires Uint8Array, not Buffer)
      const uint8Array = new Uint8Array(pdfBuffer);
      
      // Suppress console warnings from pdfjs-dist
      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        // Filter out pdfjs-dist font warnings
        const message = args[0]?.toString() || '';
        if (message.includes('standardFontDataUrl') || 
            message.includes('UnknownErrorException') ||
            message.includes('TT: undefined function')) {
          return; // Suppress these warnings
        }
        originalWarn.apply(console, args);
      };
      
      try {
        // Load the PDF document
        const loadingTask = pdfjs.getDocument({ data: uint8Array });
        
        const pdfDocument = await loadingTask.promise;
        
        // Extract text from all pages
        const textParts: string[] = [];
        const numPages = pdfDocument.numPages;
        
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine text items from the page
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          
          if (pageText.trim()) {
            textParts.push(pageText);
          }
        }
        
        // Combine all pages and clean/normalize the text
        let text = textParts.join('\n\n')
          .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
          .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
          .trim();

        // Truncate text to fit within Pinecone metadata limits (40KB)
        // Reserve space for other metadata fields, so limit text to ~30KB
        const MAX_TEXT_LENGTH = 30000;
        if (text.length > MAX_TEXT_LENGTH) {
          text = text.substring(0, MAX_TEXT_LENGTH) + '... [truncated]';
        }

        // Restore original console.warn
        console.warn = originalWarn;
        
        return text;
      } catch (pdfError: any) {
        // Restore original console.warn before re-throwing
        console.warn = originalWarn;
        throw pdfError;
      }
    } catch (parseError: any) {
      // If PDF parsing fails, just return empty string
      // The metadata will still be used for embeddings
      console.warn(`PDF parsing failed for ${pdfPath}, using metadata only. Error: ${parseError.message || parseError}`);
      return '';
    }
  } catch (error: any) {
    // File read errors or other issues - return empty string
    console.warn(`Error extracting text from PDF ${pdfPath}: ${error.message || error}`);
    return '';
  }
}

/**
 * Extract text from PDF and combine with metadata
 * Weight important fields (title, keywords) by repeating them 2-3x
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
  
  // Title - repeat 3x for high weight
  if (metadata.title) {
    parts.push(`Title: ${metadata.title}`);
    parts.push(metadata.title);
    parts.push(metadata.title);
  }
  
  if (metadata.abstract) {
    parts.push(metadata.abstract);
  }
  
  // Keywords - repeat 3x for very high weight
  if (metadata.keywords && metadata.keywords.length > 0) {
    const keywordsText = metadata.keywords.join(' ');
    parts.push(keywordsText);
    parts.push(keywordsText);
    parts.push(keywordsText);
  }
  
  if (pdfText) {
    parts.push(pdfText);
  }
  
  return parts.join('\n\n');
}

