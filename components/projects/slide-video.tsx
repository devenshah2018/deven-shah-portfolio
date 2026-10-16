'use client';

import { Download, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SlideVideo as SlideVideoSpec } from '@/lib/types';

export function SlideVideo({
  clip,
  title,
  ready,
}: {
  clip: SlideVideoSpec;
  title: string;
  ready: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mounted = useRef(false);
  const playRequest = useRef(0);
  const readyRef = useRef(ready);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<'playing' | 'blocked' | 'error'>('playing');
  readyRef.current = ready;

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = false;
    const request = ++playRequest.current;
    void video.play().then(
      () => {
        if (mounted.current && readyRef.current && request === playRequest.current)
          setStatus(current => (current === 'error' ? current : 'playing'));
      },
      () => {
        if (
          mounted.current &&
          readyRef.current &&
          request === playRequest.current &&
          !userPaused.current
        )
          setStatus(current => (current === 'error' ? current : 'blocked'));
      }
    );
  }, []);

  useEffect(() => {
    mounted.current = true;
    const video = videoRef.current;
    return () => {
      mounted.current = false;
      playRequest.current++;
      video?.pause();
      video?.removeAttribute('src');
      video?.load();
    };
  }, []);

  useEffect(() => {
    if (ready && !userPaused.current) play();
    else {
      playRequest.current++;
      videoRef.current?.pause();
    }
  }, [ready, play]);

  return (
    <div
      className='group/slide-video absolute z-10 overflow-hidden bg-black'
      style={{
        left: `${clip.bounds.left}%`,
        top: `${clip.bounds.top}%`,
        width: `${clip.bounds.width}%`,
        height: `${clip.bounds.height}%`,
      }}
    >
      <video
        ref={videoRef}
        src={clip.src}
        aria-label={`${title} slide ${clip.page} video`}
        autoPlay={ready && !userPaused.current}
        loop
        muted
        playsInline
        preload='none'
        className='h-full w-full object-contain'
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onError={() => setStatus('error')}
      />
      {status === 'blocked' && (
        <button
          type='button'
          aria-label='Play slide video'
          onClick={play}
          className='absolute inset-0 flex items-center justify-center bg-black/40 text-white focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#a5c9bd]'
        >
          <Play className='h-8 w-8' aria-hidden='true' />
        </button>
      )}
      {status === 'error' ? (
        <a
          href={clip.src}
          download
          aria-label='Download slide video'
          title='Download slide video'
          className='absolute inset-0 flex items-center justify-center gap-2 bg-[#101113] p-2 text-center text-xs text-[#a5c9bd] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#a5c9bd]'
        >
          <Download className='h-4 w-4 shrink-0' aria-hidden='true' />
        </a>
      ) : (
        status !== 'blocked' && (
          <button
            type='button'
            aria-label={paused ? 'Play slide video' : 'Pause slide video'}
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              if (video.paused) play();
              else {
                userPaused.current = true;
                playRequest.current++;
                video.pause();
              }
            }}
            className='absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#a5c9bd] group-focus-within/slide-video:opacity-100 group-hover/slide-video:opacity-100 [@media(hover:none)]:opacity-100'
          >
            {paused ? (
              <Play className='h-4 w-4' aria-hidden='true' />
            ) : (
              <Pause className='h-4 w-4' aria-hidden='true' />
            )}
          </button>
        )
      )}
    </div>
  );
}
