'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { TextLayer } from '@/lib/pdf-engine';
import styles from './pdf-viewer.module.css';

type PageSize = { width: number; height: number };
type PaperLayout = {
  document: PDFDocumentProxy;
  title: string;
  viewportRef: RefObject<HTMLDivElement | null>;
  size: PageSize;
  zoom: number;
  fit: 'width' | 'page';
};

function PaperPage({
  document,
  title,
  viewportRef,
  size,
  zoom,
  fit,
  number,
  initialSize,
}: PaperLayout & { number: number; initialSize: PageSize }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(number === 1);
  const [natural, setNatural] = useState(initialSize);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState(false);
  const widthScale = Math.max(1, size.width - 32) / natural.width;
  const scale =
    (fit === 'page'
      ? Math.min(widthScale, Math.max(1, size.height - 32) / natural.height)
      : widthScale) * zoom;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      entries => setNearby(entries.some(entry => entry.isIntersecting)),
      { root: viewportRef.current, rootMargin: '100% 0px' }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [viewportRef]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!nearby || !surface || !size.width || !size.height) return;
    let active = true;
    let renderTask: RenderTask | undefined;
    let textLayer: TextLayer | undefined;
    let canvas: HTMLCanvasElement | undefined;
    setBusy(true);
    setError(false);
    const render = async () => {
      const pdfPage = await document.getPage(number);
      if (!active) return;
      const dimensions = pdfPage.getViewport({ scale: 1 });
      setNatural(current =>
        current.width === dimensions.width && current.height === dimensions.height
          ? current
          : { width: dimensions.width, height: dimensions.height }
      );
      const viewport = pdfPage.getViewport({ scale });
      canvas = window.document.createElement('canvas');
      const layer = window.document.createElement('div');
      // Keep only nearby pages rendered and bound each high-DPI backing store.
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
      surface.replaceChildren(canvas, layer);
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
      surface.replaceChildren();
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }, [document, number, nearby, scale, size.width, size.height]);

  return (
    <div className='flex flex-none flex-col items-center gap-2'>
      <span className='text-xs tabular-nums text-[#bbbfb8]'>Page {number}</span>
      <div
        ref={hostRef}
        role='document'
        aria-label={`${title}, page ${number}`}
        aria-busy={nearby && busy}
        className={styles['page']}
        style={{ width: natural.width * scale, height: natural.height * scale }}
      >
        <div ref={surfaceRef} style={{ visibility: busy || error ? 'hidden' : 'visible' }} />
        {nearby && busy && !error && (
          <p role='status' className='absolute inset-0 p-4 text-center text-xs text-[#555]'>
            Loading page {number}…
          </p>
        )}
        {error && (
          <p role='alert' className='absolute inset-0 p-4 text-center text-sm text-[#555]'>
            Page {number} could not be displayed. Use the download button above.
          </p>
        )}
      </div>
    </div>
  );
}

export function PaperPages(props: PaperLayout) {
  const [initialSize, setInitialSize] = useState<PageSize | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    void props.document.getPage(1).then(
      page => {
        if (!active) return;
        const { width, height } = page.getViewport({ scale: 1 });
        setInitialSize({ width, height });
      },
      () => {
        if (active) setError(true);
      }
    );
    return () => {
      active = false;
    };
  }, [props.document]);

  if (error)
    return (
      <p role='alert' className='p-6 text-center text-sm text-[#deded8]'>
        This PDF could not be displayed. Use the download button above.
      </p>
    );
  if (!initialSize)
    return (
      <p role='status' className='p-6 text-center text-xs text-[#deded8]'>
        Loading paper…
      </p>
    );
  return (
    <div className='flex min-h-full w-max min-w-full flex-col items-center gap-6 p-4'>
      {Array.from({ length: props.document.numPages }, (_, index) => (
        <PaperPage key={index + 1} {...props} number={index + 1} initialSize={initialSize} />
      ))}
    </div>
  );
}
