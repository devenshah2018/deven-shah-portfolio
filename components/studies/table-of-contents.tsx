'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeaders(content: string): TocItem[] {
  const headerRegex = /^(#{2,4})\s+(.+)$/gm;
  const headers: TocItem[] = [];
  let match;

  while ((match = headerRegex.exec(content)) !== null) {
    const level = match[1]!.length;
    const text = match[2]!.trim();
    const id = slugify(text);

    // Skip if it's the main title (single #)
    if (level >= 2) {
      headers.push({ id, text, level });
    }
  }

  return headers;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headers, setHeaders] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extractedHeaders = extractHeaders(content);
    setHeaders(extractedHeaders);

    // Add IDs to headers in the DOM
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    // Wait for content to render, then observe headers
    const timeoutId = setTimeout(() => {
      extractedHeaders.forEach((header) => {
        const element = document.getElementById(header.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [content]);

  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headers.length === 0) {
    return null;
  }

  return (
    <div className='mb-12 lg:mb-0 rounded-xl border border-slate-800/50 bg-slate-900/30 p-5'>
      <div className='flex items-center gap-2 mb-4'>
        <List className='h-4 w-4 text-cyan-400' />
        <h2 className='text-xs font-semibold uppercase tracking-wider text-slate-300'>
          Contents
        </h2>
      </div>
      <nav className='space-y-0.5'>
        {headers.map((header) => (
          <button
            key={header.id}
            onClick={() => scrollToHeader(header.id)}
            className={`block w-full text-left transition-colors duration-200 rounded px-2.5 py-1.5 text-xs relative ${
              header.level === 2
                ? 'font-semibold text-slate-200'
                : header.level === 3
                ? 'font-medium text-slate-300 ml-3'
                : 'text-slate-400 ml-6'
            } ${
              activeId === header.id
                ? 'text-white bg-slate-800/80'
                : 'hover:bg-slate-800/40 hover:text-slate-100'
            }`}
          >
            {activeId === header.id && (
              <span className='absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-blue-500 rounded-r' />
            )}
            <span className={activeId === header.id ? 'ml-1.5' : ''}>{header.text}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

