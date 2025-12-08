'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
}

export function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const maxRetries = 3;

  // Extract filename from pdfUrl (e.g., /papers/file.pdf -> file.pdf)
  const filename = pdfUrl.split('/').pop() || '';
  const apiUrl = `/api/research/pdf?file=${encodeURIComponent(filename)}`;

  // Check if PDF is loaded by checking iframe content
  const checkPDFLoaded = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return false;

    try {
      // Try to access iframe content - if it's loaded, we can access it
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        // Check if PDF viewer is present (browser's native PDF viewer)
        const body = iframeDoc.body;
        if (body && (body.querySelector('embed') || body.querySelector('object') || body.innerHTML.length > 0)) {
          return true;
        }
      }
    } catch {
      // Cross-origin or not ready yet
      // If we can't access it but iframe loaded, assume PDF is loading
      return false;
    }
    return false;
  }, []);

  // Poll to check if PDF is loaded
  useEffect(() => {
    if (!isLoading) return;

    // Start checking after a short delay to allow iframe to start loading
    const startCheckDelay = setTimeout(() => {
      checkIntervalRef.current = setInterval(() => {
        if (checkPDFLoaded()) {
          setIsLoading(false);
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
          }
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
      }, 500); // Check every 500ms
    }, 1000);

    // Extended timeout - give PDF plenty of time to load
    timeoutRef.current = setTimeout(() => {
      // If still loading after 20 seconds, assume it's loaded (might be slow network)
      setIsLoading(false);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    }, 20000);

    return () => {
      clearTimeout(startCheckDelay);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, checkPDFLoaded, retryCount]);

  const handleLoad = useCallback(() => {
    // Give it a moment for PDF to render
    setTimeout(() => {
      setIsLoading(false);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }, 500);
  }, []);

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setIsLoading(true);
      // Force iframe reload
      if (iframeRef.current) {
        iframeRef.current.src = `${apiUrl}&retry=${retryCount + 1}`;
      }
    }
  }, [retryCount, apiUrl]);

  // Reset on URL change
  useEffect(() => {
    setIsLoading(true);
    setRetryCount(0);
    if (iframeRef.current) {
      iframeRef.current.src = apiUrl;
    }
  }, [apiUrl]);

  return (
    <div className='relative w-full h-full bg-black border-0 overflow-hidden'>
      {/* Refined loading state */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black border border-gray-800 z-20'>
          <div className='text-center px-6'>
            {/* Smooth spinner */}
            <div className='relative inline-block mb-6'>
              <div className='w-16 h-16 border-2 border-gray-800 border-t-cyan-400/60 animate-spin rounded-full' style={{ animationDuration: '1s' }} />
              <div className='absolute inset-0 flex items-center justify-center'>
                <FileText className='h-6 w-6 text-cyan-400/40' />
              </div>
            </div>
            <div className='space-y-1'>
              <p className='text-sm font-semibold text-gray-300'>Loading Document</p>
              <p className='text-xs font-mono text-gray-500'>Initializing viewer...</p>
              {retryCount > 0 && (
                <p className='text-xs font-mono text-cyan-400/70 mt-3'>
                  Retry {retryCount}/{maxRetries}
                </p>
              )}
            </div>
            {/* Subtle progress indicator */}
            <div className='mt-6 flex justify-center gap-1.5'>
              <div className='w-1 h-6 bg-gray-800 animate-pulse' style={{ animationDelay: '0ms' }} />
              <div className='w-1 h-6 bg-cyan-400/40 animate-pulse' style={{ animationDelay: '200ms' }} />
              <div className='w-1 h-6 bg-gray-800 animate-pulse' style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* PDF iframe - always rendered, just hidden when loading */}
      <iframe
        ref={iframeRef}
        src={apiUrl}
        className='w-full h-full min-h-[600px] border-0 bg-white'
        title={title}
        onLoad={handleLoad}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        allow='fullscreen'
      />

      {/* Retry button (only show if we've tried and it's been a while) */}
      {!isLoading && retryCount > 0 && retryCount < maxRetries && (
        <div className='absolute bottom-4 right-4 z-10'>
          <button
            onClick={handleRetry}
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors shadow-lg flex items-center gap-2'
          >
            <Loader2 className='h-4 w-4' />
            Retry Loading
          </button>
        </div>
      )}
    </div>
  );
}

