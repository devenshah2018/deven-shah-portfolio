'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

// 11ty screenshot API - returns image directly, no fetch needed (1200×630 opengraph size)
// Optional: set NEXT_PUBLIC_THUMBNAIL_CACHE_BUST (e.g. "20250304" or "v2") and redeploy to force refetch all thumbnails
// See https://v1-0-0.11ty.dev/docs/services/screenshots/ for wait/timeout options
function getScreenshotSrc(url: string): string {
  const encoded = encodeURIComponent(url);
  const cacheBust = typeof process !== 'undefined' && process.env?.['NEXT_PUBLIC_THUMBNAIL_CACHE_BUST'];
  const options = [
    'wait:3',      // wait for network idle (helps capture full render)
    'timeout:9',   // 9s timeout for slow sites
    ...(cacheBust ? [cacheBust] : []),
  ].join('_');
  return `https://v1.screenshot.11ty.dev/${encoded}/opengraph/_${options}/`;
}

interface LinkThumbnailProps {
  url: string;
  title: string;
  className?: string;
}

export function LinkThumbnail({ url, title, className = '' }: LinkThumbnailProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imgSrc = getScreenshotSrc(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/link group relative block flex-shrink-0 overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-zinc-600/80 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-950 ${className}`}
      aria-label={`Visit ${title}`}
    >
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-zinc-950">
        {/* Loading skeleton - enterprise style */}
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-zinc-700/60 animate-pulse" />
              <div className="h-1.5 w-24 rounded-full bg-zinc-700/50 animate-pulse" />
            </div>
          </div>
        )}
        {/* Error fallback - polished */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <div className="rounded-xl bg-zinc-800/80 p-4 ring-1 ring-zinc-700/50">
              <ExternalLink className="h-9 w-9 text-zinc-500" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Visit site</span>
          </div>
        )}
        <img
          src={imgSrc}
          alt={`${title} preview`}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500"
          style={{ opacity: loaded && !error ? 1 : 0 }}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/link:opacity-100 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-zinc-950/90 px-2.5 py-1.5 opacity-0 shadow-lg ring-1 ring-zinc-700/50 transition-opacity duration-300 group-hover/link:opacity-100 pointer-events-none">
          <ExternalLink className="h-3.5 w-3.5 text-zinc-300" />
        </div>
      </div>
    </a>
  );
}
