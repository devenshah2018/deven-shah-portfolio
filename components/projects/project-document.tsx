'use client';

import dynamic from 'next/dynamic';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Download, FileText, Presentation, X } from 'lucide-react';
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
const iconControl =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#aaa] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]';
const formatOption =
  'flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm outline-none data-[highlighted]:bg-white/10 data-[highlighted]:text-white';

function DocumentDownload({ pdf, source }: { pdf: string; source?: string | undefined }) {
  if (!source)
    return (
      <a href={pdf} download aria-label='Download PDF' title='Download PDF' className={iconControl}>
        <Download className='h-5 w-5' aria-hidden='true' />
      </a>
    );
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type='button'
          aria-label='Download slide deck'
          title='Download slide deck'
          className={iconControl}
        >
          <Download className='h-5 w-5' aria-hidden='true' />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          sideOffset={8}
          collisionPadding={16}
          className='z-[60] min-w-52 max-w-[calc(100vw-2rem)] rounded-lg bg-[#1c1e20] p-1.5 text-[#f5f5f0] shadow-xl ring-1 ring-white/10 focus:outline-none'
        >
          <DropdownMenu.Label className='px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#a5c9bd]'>
            Download as
          </DropdownMenu.Label>
          <DropdownMenu.Item asChild>
            <a href={pdf} download className={formatOption}>
              <FileText className='h-4 w-4' aria-hidden='true' />
              PDF (.pdf)
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href={source} download className={formatOption}>
              <Presentation className='h-4 w-4' aria-hidden='true' />
              PowerPoint (.pptx)
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function ProjectDocument({ project, kind }: { project: Project; kind: 'paper' | 'slides' }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const slides = kind === 'slides';
  const src = slides ? project.slideDeck?.pdf : project.paper;
  const label = slides ? 'Slide deck' : 'Paper';
  if (!src) return null;
  const Icon = slides ? Presentation : FileText;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type='button'
        ref={triggerRef}
        aria-haspopup='dialog'
        aria-expanded={open}
        aria-controls={open ? dialogId : undefined}
        aria-label={`${label} for ${project.title} (PDF)`}
        data-label={slides ? 'Slidedeck' : 'Paper'}
        className={styles['action']}
        onClick={() => setOpen(true)}
      >
        <Icon aria-hidden='true' />
        <span className='sr-only'>{slides ? 'Slidedeck' : 'Paper'}</span>
      </button>
      <noscript>
        <a href={src} download className={styles['fallback']}>
          Download {label}
        </a>
      </noscript>
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
        <div className='flex shrink-0 items-start justify-between gap-3 px-4 py-4 sm:px-6'>
          <div className='min-w-0'>
            <p className='mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#a5c9bd]'>
              {label}
            </p>
            <DialogTitle className='line-clamp-3 text-base font-medium leading-snug sm:line-clamp-2 sm:text-xl'>
              {project.title}
              <span className='sr-only'> {label.toLowerCase()}</span>
            </DialogTitle>
            <DialogDescription className='sr-only'>
              {slides
                ? 'Read the PDF, change slides, zoom, or download a copy.'
                : 'Scroll through all pages of the paper, zoom, or download a copy.'}{' '}
              Use Escape to close the viewer.
            </DialogDescription>
          </div>
          <div className='-mr-2 -mt-1 flex shrink-0 items-center gap-1'>
            <DocumentDownload pdf={src} source={slides ? project.slideDeck?.source : undefined} />
            <DialogClose asChild>
              <button
                type='button'
                aria-label={`Close ${label.toLowerCase()}`}
                className={iconControl}
              >
                <X className='h-5 w-5' aria-hidden='true' />
              </button>
            </DialogClose>
          </div>
        </div>
        {open && (
          <PdfViewer
            src={src}
            title={project.title}
            slides={slides}
            videos={slides ? project.slideDeck?.videos : undefined}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
