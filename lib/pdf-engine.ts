'use client';

import { GlobalWorkerOptions } from 'pdfjs-dist';

// Webpack emits the matching installed worker as a same-origin asset.
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export { getDocument, TextLayer } from 'pdfjs-dist';
