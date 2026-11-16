'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { itemSlug } from '@/lib/url-utils';
import { HOME_URL } from '@/lib/seo';
import type { Project } from '@/lib/types';
import styles from './project-heading.module.css';

export function ProjectHeading({ project }: { project: Pick<Project, 'id' | 'title' | 'link'> }) {
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(false);
  const copyRequest = useRef(0);
  const fallback = useRef<HTMLInputElement>(null);
  const url = new URL(`#${itemSlug('project', project.id)}`, HOME_URL).href;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (manualCopy) {
      fallback.current?.focus();
      fallback.current?.select();
    }
  }, [manualCopy]);

  async function copyLink() {
    const request = ++copyRequest.current;
    clearTimeout(timer.current);
    setCopied(false);
    setManualCopy(false);
    try {
      await navigator.clipboard.writeText(url);
      if (!mounted.current || request !== copyRequest.current) return;
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      if (mounted.current && request === copyRequest.current) setManualCopy(true);
    }
  }

  return (
    <div>
      <div className={`${styles['title']} flex items-start gap-1`}>
        <h3 className='min-w-0 text-lg font-medium leading-snug tracking-tight text-[#f5f5f0] sm:text-xl'>
          <a
            href={project.link}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex min-h-11 items-center transition-colors hover:text-[#a5c9bd]'
          >
            {project.title}
          </a>
        </h3>
        <button
          type='button'
          onClick={copyLink}
          aria-label={`Copy link to ${project.title}`}
          title={copied ? 'Link copied' : 'Copy project link'}
          data-feedback={copied || manualCopy}
          className={`${styles['copy']} inline-flex h-11 w-11 shrink-0 items-center justify-center rounded text-[#999] hover:text-[#a5c9bd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]`}
        >
          {copied ? (
            <Check aria-hidden='true' className='h-5 w-5 text-[#a5c9bd]' />
          ) : (
            <Link2 aria-hidden='true' className='h-5 w-5' />
          )}
        </button>
      </div>
      <p role='status' className='sr-only'>
        {copied ? `Link to ${project.title} copied.` : ''}
        {manualCopy ? 'Clipboard unavailable. Select the link below to copy it manually.' : ''}
      </p>
      {manualCopy && (
        <input
          ref={fallback}
          aria-label={`Link to ${project.title} to copy manually`}
          readOnly
          value={url}
          onFocus={event => event.currentTarget.select()}
          className='mt-2 min-h-11 w-full min-w-0 rounded border border-[#404040] bg-transparent px-3 text-sm text-[#d4d4cd] focus:outline focus:outline-2 focus:outline-[#a5c9bd]'
        />
      )}
    </div>
  );
}
