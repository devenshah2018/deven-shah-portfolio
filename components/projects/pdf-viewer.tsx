'use client';

import { ChevronLeft, ChevronRight, Maximize, Minus, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { getDocument, TextLayer } from '@/lib/pdf-engine';
import styles from './pdf-viewer.module.css';

type Fit = 'width' | 'page';
const control =
  'inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-md text-[#deded8] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd] disabled:opacity-30 disabled:hover:bg-transparent';

export default function PdfViewer({
  src,
  title,
  slides = false,
}: {
  src: string;
  title: string;
  slides?: boolean;
}) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(true);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState<Fit>(slides ? 'page' : 'width');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => setSize({ width: viewport.clientWidth, height: viewport.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    setError(false);
    setDocument(null);
    setPage(1);
    const task = getDocument({ url: src, isEvalSupported: false });
    void task.promise.then(
      pdf => {
        if (active) setDocument(pdf);
      },
      () => {
        if (active) setError(true);
      }
    );
    return () => {
      active = false;
      // Also terminates the worker and aborts outstanding network requests.
      void task.destroy().catch(() => {});
    };
  }, [src]);

  useEffect(() => {
    const host = pageRef.current;
    if (!document || !host || !size.width || !size.height) return;
    let active = true;
    let renderTask: RenderTask | undefined;
    let textLayer: TextLayer | undefined;
    setBusy(true);
    setError(false);
    host.replaceChildren();
    const render = async () => {
      const pdfPage = await document.getPage(page);
      if (!active) return;
      const natural = pdfPage.getViewport({ scale: 1 });
      const widthScale = Math.max(1, size.width - 32) / natural.width;
      const scale =
        (fit === 'page'
          ? Math.min(widthScale, Math.max(1, size.height - 32) / natural.height)
          : widthScale) * zoom;
      const viewport = pdfPage.getViewport({ scale });
      const canvas = window.document.createElement('canvas');
      const layer = window.document.createElement('div');
      // Bound backing-store memory on high-DPI phones and at high zoom levels.
      const density = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(8_000_000 / (viewport.width * viewport.height))
      );
      canvas.width = Math.floor(viewport.width * density);
      canvas.height = Math.floor(viewport.height * density);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      canvas.setAttribute('aria-hidden', 'true');
      layer.className = styles['textLayer'] ?? '';
      layer.style.setProperty('--total-scale-factor', String(viewport.scale));
      host.style.width = `${viewport.width}px`;
      host.style.height = `${viewport.height}px`;
      host.replaceChildren(canvas, layer);
      renderTask = pdfPage.render({ canvas, viewport, transform: [density, 0, 0, density, 0, 0] });
      textLayer = new TextLayer({
        textContentSource: pdfPage.streamTextContent(),
        container: layer,
        viewport,
      });
      await Promise.all([renderTask.promise, textLayer.render()]);
      if (active) setBusy(false);
    };
    void render().catch(() => {
      if (active) {
        setError(true);
        setBusy(false);
      }
    });
    return () => {
      active = false;
      renderTask?.cancel();
      textLayer?.cancel();
      host.replaceChildren();
    };
  }, [document, page, size, zoom, fit]);

  const changePage = (next: number) => {
    setPage(Math.max(1, Math.min(document?.numPages ?? 1, next)));
    viewportRef.current?.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <div
        role='toolbar'
        aria-label='PDF tools'
        className='flex shrink-0 flex-wrap items-center justify-between gap-x-2 border-t border-white/5 px-2 py-1 sm:px-5'
      >
        <div className='flex items-center'>
          <button
            type='button'
            aria-label='Previous page'
            className={control}
            disabled={!document || page <= 1}
            onClick={() => changePage(page - 1)}
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <span
            aria-live='polite'
            className='min-w-[5.5rem] text-center text-xs tabular-nums text-[#bbbfb8]'
          >
            {document ? `${slides ? 'Slide' : 'Page'} ${page} / ${document.numPages}` : 'Loading…'}
          </span>
          <button
            type='button'
            aria-label='Next page'
            className={control}
            disabled={!document || page >= document.numPages}
            onClick={() => changePage(page + 1)}
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
        <div className='flex items-center'>
          <button
            type='button'
            aria-label='Zoom out'
            className={control}
            disabled={!document || zoom <= 0.5}
            onClick={() => setZoom(current => Math.max(0.5, current - 0.25))}
          >
            <Minus className='h-4 w-4' />
          </button>
          <output
            aria-label='Zoom level'
            className='w-11 text-center text-xs tabular-nums text-[#bbbfb8]'
          >
            {Math.round(zoom * 100)}%
          </output>
          <button
            type='button'
            aria-label='Zoom in'
            className={control}
            disabled={!document || zoom >= 3}
            onClick={() => setZoom(current => Math.min(3, current + 0.25))}
          >
            <Plus className='h-4 w-4' />
          </button>
          <button
            type='button'
            aria-label='Fit page'
            title='Fit page'
            className={control}
            disabled={!document}
            onClick={() => {
              setFit('page');
              setZoom(1);
            }}
          >
            <Maximize className='h-4 w-4' />
          </button>
          <button
            type='button'
            aria-label='Fit width'
            className={`${control} px-2 text-xs`}
            disabled={!document}
            onClick={() => {
              setFit('width');
              setZoom(1);
            }}
          >
            Width
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        role='region'
        aria-label={`${title} PDF pages`}
        tabIndex={0}
        className='relative min-h-0 flex-1 overflow-auto overscroll-contain bg-[#242627] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#a5c9bd]'
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'PageDown') {
            event.preventDefault();
            changePage(page + 1);
          }
          if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
            event.preventDefault();
            changePage(page - 1);
          }
          if (event.key === 'Home') {
            event.preventDefault();
            changePage(1);
          }
          if (event.key === 'End') {
            event.preventDefault();
            changePage(document?.numPages ?? 1);
          }
        }}
      >
        {error && (
          <div
            role='alert'
            className='absolute inset-0 z-10 flex items-center justify-center bg-[#242627] p-6 text-center text-sm text-[#deded8]'
          >
            This PDF could not be displayed. Use Open PDF or Download PDF above.
          </div>
        )}
        {!error && busy && (
          <p
            role='status'
            className='absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full bg-[#101113]/90 px-4 py-2 text-xs text-[#deded8]'
          >
            Loading page…
          </p>
        )}
        <div
          className={`flex min-h-full w-max min-w-full justify-center p-4 ${slides ? 'items-center' : 'items-start'}`}
        >
          <div
            ref={pageRef}
            role='document'
            aria-label={`${title}, ${slides ? 'slide' : 'page'} ${page}`}
            aria-busy={busy}
            className={styles['page']}
            style={{ visibility: error || busy ? 'hidden' : 'visible' }}
          />
        </div>
      </div>
    </div>
  );
}
