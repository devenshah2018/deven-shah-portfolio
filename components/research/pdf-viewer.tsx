'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
}

export function PDFViewer({ pdfUrl, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
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
    <div className='relative flex-1 min-h-0 w-full flex flex-col overflow-hidden'>
      {/* Loading state - minimal and reassuring */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-[#0f0f0f] z-20'>
          <div className='flex flex-col items-center gap-5 max-w-sm px-8'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full border border-[#262626] bg-[#1a1a1a]'>
              <Loader2 className='h-5 w-5 text-[#737373] animate-spin' strokeWidth={2} />
            </div>
            <div className='text-center space-y-1.5'>
              <p className='text-sm font-medium text-[#a3a3a3]'>
                {retryCount > 0 ? 'Loading…' : 'Preparing document'}
              </p>
              <p className='text-xs text-[#525252] line-clamp-2' title={title}>
                {title}
              </p>
            </div>
            {retryCount > 0 && retryCount < maxRetries && (
              <button
                type='button'
                onClick={handleRetry}
                className='text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors'
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      {/* PDF iframe - absolute fill to eliminate bottom gap */}
      <iframe
        ref={iframeRef}
        src={apiUrl}
        className='absolute inset-0 w-full h-full border-0 bg-[#f5f5f0]'
        title={title}
        onLoad={handleLoad}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        allow='fullscreen'
      />
    </div>
  );
}

