import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get('file');

  if (!filename) {
    return new NextResponse('File parameter is required', { status: 400 });
  }

  // Security: Only allow PDF files from the papers directory
  if (!filename.endsWith('.pdf') || filename.includes('..') || filename.includes('/')) {
    return new NextResponse('Invalid file', { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), 'public', 'papers', filename);
    
    // Check if file exists before attempting to read
    if (!existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    // Ensure we have valid PDF data
    if (!fileBuffer || fileBuffer.length === 0) {
      return new NextResponse('Invalid PDF file', { status: 500 });
    }

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline', // Display in browser, don't download
        'Content-Length': fileBuffer.length.toString(),
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

