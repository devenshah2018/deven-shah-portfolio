'use client';

import dynamic from 'next/dynamic';
import { ArrowUpRight, Download, FileText, Presentation, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Project } from '@/lib/types';
import styles from './project-actions.module.css';

const PdfViewer = dynamic(() => import('./pdf-viewer'), {
  ssr: false,
  loading: () => (
    <p role='status' className='flex flex-1 items-center justify-center text-sm text-[#bbbfb8]'>
      Loading viewer…
    </p>
  ),
});
const toolLink =
  'inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-xs font-medium text-[#c7ccc5] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]';

export function ProjectDocument({ project, kind }: { project: Project; kind: 'paper' | 'slides' }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const dialogId = useId();
  const slides = kind === 'slides';
  const src = slides ? project.slideDeck?.pdf : project.paper;
  const label = slides ? 'Slide deck' : 'Paper';
  if (!src) return null;
  const Icon = slides ? Presentation : FileText;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <a
        ref={triggerRef}
        href={src}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={`${label} for ${project.title} (PDF)`}
        className={styles['action']}
        onClick={event => {
          // Preserve native new-tab/download behavior, and a usable URL without JS.
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        <Icon aria-hidden='true' />
        {slides ? 'Slidedeck' : 'Paper'}
      </a>
      <DialogContent
        id={dialogId}
        onCloseAutoFocus={event => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
        showCloseButton={false}
        overlayClassName='bg-black/80 backdrop-blur-md motion-reduce:!animate-none'
        className='flex h-[calc(100dvh-1.5rem)] max-w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-xl border-0 bg-[#101113] p-0 text-[#f5f5f0] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 motion-reduce:!animate-none sm:h-[min(900px,calc(100dvh-3rem))] sm:max-w-[min(1200px,calc(100vw-4rem))]'
      >
        <div className='flex shrink-0 items-start justify-between gap-3 px-4 pt-4 sm:px-6'>
          <div className='min-w-0'>
            <p className='mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#a5c9bd]'>
              {label}
            </p>
            <DialogTitle className='line-clamp-2 text-base font-medium leading-snug sm:text-xl'>
              {project.title}
              <span className='sr-only'> {label.toLowerCase()}</span>
            </DialogTitle>
            <DialogDescription className='sr-only'>
              Read the PDF, change pages, zoom, or download a copy. Use Escape to close the viewer.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button
              type='button'
              aria-label={`Close ${label.toLowerCase()}`}
              className='-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#aaa] hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]'
            >
              <X className='h-5 w-5' aria-hidden='true' />
            </button>
          </DialogClose>
        </div>
        {slides && (
          <p className='px-4 pt-2 text-[11px] text-[#999] sm:px-6'>
            PDF preview. Download PowerPoint for embedded video.
          </p>
        )}
        <div className='flex shrink-0 flex-wrap items-center gap-x-1 px-1 py-1 sm:px-3'>
          <a href={src} download className={toolLink}>
            <Download className='h-4 w-4' aria-hidden='true' />
            Download PDF
          </a>
          {slides && project.slideDeck?.source && (
            <a href={project.slideDeck.source} download className={toolLink}>
              <Download className='h-4 w-4' aria-hidden='true' />
              Download PowerPoint
            </a>
          )}
          <a
            href={src}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Open PDF in a new tab'
            className={toolLink}
          >
            Open PDF
            <ArrowUpRight className='h-3.5 w-3.5' aria-hidden='true' />
          </a>
        </div>
        {open && <PdfViewer src={src} title={project.title} slides={slides} />}
      </DialogContent>
    </Dialog>
  );
}
