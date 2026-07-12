'use client';

import { useEffect, useRef } from 'react';
import { LinkThumbnail } from '@/components/projects/link-thumbnail';
import { Project } from '@/lib/types';

export const iconMap: Record<string, { src: string; alt: string }> = {
  github: { src: '/github-icon.svg', alt: 'GitHub' },
  kaggle: { src: '/kaggle-icon.png', alt: 'Kaggle' },
  vscode: { src: '/vscode-icon.png', alt: 'VSCode' },
};

/** Clean hostname, e.g. https://www.iris-plan.com → iris-plan.com. */
export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  }
}

/** For a GitHub URL, the "owner/repo" path; otherwise the hostname. */
export function sourceLabel(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('github.com')) return u.pathname.replace(/^\/+/, '').replace(/\/$/, '');
    return u.hostname.replace(/^www\./, '');
  } catch {
    return hostname(url);
  }
}

/** The live/hosted link for a project, or null if it's source-only. */
export function getProjectWebLink(project: Project) {
  if (project.access_points && project.access_points.length > 0) {
    return project.access_points.find((ap) => ap.type === 'hosted' || ap.type === 'web');
  }
  if (project.accessible_at.includes('hosted')) {
    return { type: 'hosted' as const, url: project.link, label: undefined };
  }
  return null;
}

export function getProjectAccessPoints(project: Project) {
  if (project.access_points && project.access_points.length > 0) {
    return project.access_points;
  }
  return project.accessible_at.map((type) => ({ type, url: project.link, label: undefined }));
}

/** Source/code access points (excludes hosted/live web links). */
export function getProjectCodeAccessPoints(project: Project) {
  return getProjectAccessPoints(project).filter((ap) => ap.type !== 'hosted' && ap.type !== 'web');
}

/** Autoplaying, muted, looping demo video that only plays while in view (keeps the page light). */
function DemoVideo({ src, title, aspectClass }: { src: string; title: string; aspectClass: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${title} demo`}
      className={`block ${aspectClass} w-full rounded-xl border border-zinc-700/60 bg-zinc-900 object-cover shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 group-hover/media:scale-[1.01]`}
    />
  );
}

/** Fills the media slot for projects with no screenshot/demo (e.g. source-only projects). */
function MediaPlaceholder({ type, url, aspectClass }: { type: string; url: string; aspectClass: string }) {
  const config = iconMap[type];
  const label = type === 'github' ? sourceLabel(url) : config?.alt ?? hostname(url);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group/media block" aria-label={`View ${label}`}>
      <div
        className={`flex ${aspectClass} w-full flex-col items-center justify-center gap-3 rounded-xl border border-[#242424] bg-[#0f0f0f] transition-colors group-hover/media:border-[#333]`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 11px)',
        }}
      >
        {config && (
          <img
            src={config.src}
            alt=""
            className={`h-7 w-7 object-contain opacity-30 transition-opacity group-hover/media:opacity-45 ${type === 'github' ? 'invert' : ''}`}
          />
        )}
        <span className="max-w-[85%] truncate text-[12px] text-[#5f5f5f] transition-colors group-hover/media:text-[#787878]">
          {label}
        </span>
      </div>
    </a>
  );
}

/**
 * Renders a project's media: demo video, live-site screenshot, or a source placeholder.
 * Pass `aspectClass` to force a consistent frame (e.g. in the rotating gallery); otherwise
 * each media type uses its natural aspect.
 */
export function ProjectMedia({ project, aspectClass }: { project: Project; aspectClass?: string }) {
  const webLink = getProjectWebLink(project);
  const code = getProjectCodeAccessPoints(project);
  const primaryLink = webLink?.url ?? project.link;

  if (project.demoVideo) {
    return (
      <a
        href={primaryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group/media block"
        aria-label={`Visit ${project.title}`}
      >
        <DemoVideo src={project.demoVideo} title={project.title} aspectClass={aspectClass ?? 'aspect-[16/10]'} />
      </a>
    );
  }
  if (webLink) {
    return (
      <LinkThumbnail
        url={webLink.url}
        title={project.title}
        className={`block ${aspectClass ?? 'aspect-[40/21]'} w-full`}
        objectFit="cover"
      />
    );
  }
  if (code.length > 0) {
    return <MediaPlaceholder type={code[0]!.type} url={code[0]!.url} aspectClass={aspectClass ?? 'aspect-[16/10]'} />;
  }
  return null;
}
