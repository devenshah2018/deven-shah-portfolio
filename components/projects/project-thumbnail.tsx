'use client';

import Image from 'next/image';
import { Github, Globe } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/lib/types';

function SourcePreview({ url, title }: { url: string; title: string }) {
  const source = new URL(url);
  const isGithub = source.hostname === 'github.com';
  const [owner, repository] = source.pathname.split('/').filter(Boolean);
  const Icon = isGithub ? Github : Globe;

  return (
    <div className='relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#252a30] via-[#1c2025] to-[#15181c] p-2 text-left sm:p-3.5'>
      <Icon
        aria-hidden='true'
        className='pointer-events-none absolute -right-3 -top-3 h-24 w-24 rotate-[-12deg] text-white/[0.035]'
      />
      <div className='relative flex shrink-0 items-center gap-1.5 text-[9px] font-medium leading-3 text-[#a5c9bd] sm:text-[10px] sm:leading-normal'>
        <Icon className='h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5' aria-hidden='true' />
        {isGithub ? 'GitHub' : 'Live site'}
      </div>
      <p className='relative line-clamp-3 shrink-0 text-[10px] font-medium leading-3 text-[#e5e8e6] [overflow-wrap:anywhere] sm:text-xs sm:leading-snug'>
        {isGithub ? repository : title}
      </p>
      <p className='relative hidden truncate text-[9px] text-[#939d99] sm:block'>
        {isGithub ? owner : source.hostname.replace(/^www\./, '')}
      </p>
    </div>
  );
}

export function ProjectThumbnail({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hosted = project.access_points?.find(link => link.type === 'hosted' || link.type === 'web');
  const destination = hosted?.url ?? project.link;
  const isGithub = new URL(destination).hostname === 'github.com';

  return (
    <a
      href={destination}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${project.title} preview — ${isGithub ? 'GitHub repository' : 'live site'}`}
      className='block aspect-[16/10] w-full overflow-hidden rounded-md bg-[#1c2025] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5c9bd]'
    >
      {project.thumbnail && !imageFailed ? (
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt}
          width={640}
          height={400}
          sizes='(min-width: 1024px) 176px, (min-width: 640px) 160px, 104px'
          loading='lazy'
          className='h-full w-full object-contain'
          onError={() => setImageFailed(true)}
        />
      ) : (
        <SourcePreview url={destination} title={project.title} />
      )}
    </a>
  );
}
