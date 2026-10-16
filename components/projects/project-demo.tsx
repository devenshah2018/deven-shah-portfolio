'use client';

import { Play, Download, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Project } from '@/lib/types';
import actionStyles from './project-actions.module.css';

function DemoPlayer({
  src,
  project,
  videoRef,
}: {
  src: string;
  project: Project;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [status, setStatus] = useState<'playing' | 'blocked' | 'error'>('playing');
  const active = useRef(false);
  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().then(
      () => {
        if (active.current) setStatus(current => (current === 'error' ? current : 'playing'));
      },
      () => {
        if (active.current) setStatus(current => (current === 'error' ? current : 'blocked'));
      }
    );
  }, [videoRef]);

  useEffect(() => {
    active.current = true;
    const video = videoRef.current;
    play();
    return () => {
      active.current = false;
      // Release the stream as well as stopping playback when the dialog unmounts.
      video?.pause();
      video?.removeAttribute('src');
      video?.load();
    };
  }, [play, videoRef]);

  return (
    <div className='relative aspect-video max-h-[calc(100dvh-10rem)] w-full bg-black'>
      <video
        ref={videoRef}
        src={src}
        poster={project.thumbnail?.src}
        aria-label={`${project.title} demo video`}
        autoPlay
        muted
        playsInline
        controls
        preload='none'
        className='h-full w-full object-contain'
        style={{ colorScheme: 'dark' }}
        onPlay={() => setStatus('playing')}
        onError={() => setStatus('error')}
      />
      {status === 'blocked' && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/60 p-5'>
          <button
            type='button'
            onClick={play}
            className='inline-flex min-h-12 items-center gap-2 rounded-full bg-[#a5c9bd] px-6 text-sm font-medium text-[#141414] transition-colors hover:bg-[#bbdbcf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
          >
            <Play className='h-4 w-4' aria-hidden='true' />
            Play demo
          </button>
        </div>
      )}
      {status === 'error' && (
        <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#101113] p-5 text-center'>
          <p role='alert' className='text-sm text-[#c5c8c4]'>
            This video could not be loaded.
          </p>
          <a
            href={src}
            download
            aria-label='Download video'
            title='Download video'
            className='inline-flex h-11 w-11 items-center justify-center rounded-full text-[#a5c9bd] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]'
          >
            <Download className='h-4 w-4' aria-hidden='true' />
          </a>
        </div>
      )}
    </div>
  );
}

export function ProjectDemo({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  if (!project.demoVideo) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) videoRef.current?.pause();
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <button
          type='button'
          aria-label={`Demo for ${project.title}`}
          className={actionStyles['action']}
        >
          <Play className='h-3.5 w-3.5' aria-hidden='true' />
          Demo
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        overlayClassName='bg-black/80 backdrop-blur-md motion-reduce:!animate-none'
        className='max-h-[calc(100dvh-1.5rem)] max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden rounded-xl border-0 bg-[#101113] p-0 text-[#f5f5f0] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 motion-reduce:!animate-none sm:max-w-[min(1100px,calc(100vw-4rem))]'
      >
        <div className='flex min-w-0 items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4'>
          <div className='min-w-0'>
            <p className='mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#a5c9bd]'>
              Project demo
            </p>
            <DialogTitle className='text-base font-medium leading-snug sm:text-xl'>
              {project.title}
              <span className='sr-only'> demo</span>
            </DialogTitle>
            <DialogDescription className='sr-only'>
              {project.subtitle}. Video playback starts automatically. Use the player controls to
              pause, seek, adjust sound, or enter full screen.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button
              type='button'
              aria-label='Close demo'
              className='-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#a3a3a3] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]'
            >
              <X className='h-5 w-5' aria-hidden='true' />
            </button>
          </DialogClose>
        </div>
        <DemoPlayer src={project.demoVideo} project={project} videoRef={videoRef} />
      </DialogContent>
    </Dialog>
  );
}
