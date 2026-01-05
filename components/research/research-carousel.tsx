'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';
import type { ResearchPaper, Study } from '@/lib/types';

interface ResearchCarouselProps {
  papers: ResearchPaper[];
  studies: Study[];
}

type CarouselItem = (ResearchPaper & { type: 'paper' }) | (Study & { type: 'study' });

export function ResearchCarousel({ papers, studies }: ResearchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<CarouselItem[]>([]);

  // Combine and randomly shuffle papers and studies
  useEffect(() => {
    const combined: CarouselItem[] = [
      ...papers.map((p) => ({ ...p, type: 'paper' as const })),
      ...studies.map((s) => ({ ...s, type: 'study' as const })),
    ];

    // Fisher-Yates shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = combined[i];
      combined[i] = combined[j]!;
      combined[j] = temp!;
    }

    setItems(combined.slice(0, 10)); // Show up to 10 items
  }, [papers, studies]);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className='border border-slate-800/50 bg-slate-900/30 rounded-xl p-8 text-center'>
        <FileText className='mx-auto h-8 w-8 mb-3 text-slate-600' />
        <p className='text-sm font-semibold text-white mb-1'>No Content Available</p>
        <p className='text-xs font-mono text-slate-500'>STANDBY</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const nextIndex = (currentIndex + 1) % items.length;
  const prevIndex = (currentIndex - 1 + items.length) % items.length;

  return (
    <div className='relative border border-slate-800/50 bg-slate-900/30 rounded-xl overflow-hidden group/carousel'>
      {/* Header */}
      <div className='flex items-center gap-2.5 p-4 border-b border-slate-800/50 bg-slate-900/50'>
        <div className='p-2 rounded-lg bg-slate-900/50 border border-slate-800/50'>
          {currentItem.type === 'paper' ? (
            <FileText className='h-4 w-4 text-slate-400' />
          ) : (
            <BookOpen className='h-4 w-4 text-slate-400' />
          )}
        </div>
        <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-400'>
          Featured {currentItem.type === 'paper' ? 'Paper' : 'Study'}
        </h3>
        <div className='ml-auto flex items-center gap-2'>
          <span className='text-xs font-mono text-slate-500'>
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Carousel Content */}
      <div className='relative h-[280px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 p-5 pr-12 pl-12'
          >
            <Link
              href={
                currentItem.type === 'paper'
                  ? `/${currentItem.slug || currentItem.id}`
                  : `/studies/${currentItem.slug || currentItem.id}`
              }
              className='block h-full group'
            >
              <div className='flex flex-col h-full'>
                {/* Type Badge */}
                <div className='mb-3'>
                  <span className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300'>
                    {currentItem.type === 'paper' ? (
                      <>
                        <FileText className='h-3 w-3' />
                        Paper
                      </>
                    ) : (
                      <>
                        <BookOpen className='h-3 w-3' />
                        Study
                      </>
                    )}
                  </span>
                </div>

                {/* Title */}
                <h4 className='text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors'>
                  {currentItem.title}
                </h4>

                {/* Date */}
                <div className='mb-3'>
                  <span className='text-xs font-mono text-slate-500'>
                    {currentItem.sortDate || currentItem.date}
                  </span>
                </div>

                {/* Abstract/Excerpt */}
                <div className='flex-1 overflow-hidden'>
                  <p className='text-sm leading-relaxed text-slate-400 line-clamp-4'>
                    {currentItem.type === 'paper'
                      ? (currentItem as ResearchPaper & { type: 'paper' }).abstract || ''
                      : (currentItem as Study & { type: 'study' }).excerpt || ''}
                  </p>
                </div>

                {/* Tags (for studies) */}
                {currentItem.type === 'study' && 'tags' in currentItem && currentItem.tags && currentItem.tags.length > 0 && (
                  <div className='mt-3 flex flex-wrap gap-1.5'>
                    {currentItem.tags.slice(0, 3).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className='px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-800/50 rounded border border-slate-800/50'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Institution (for papers) */}
                {currentItem.type === 'paper' && 'institution' in currentItem && currentItem.institution && (
                  <div className='mt-3'>
                    <p className='text-xs text-slate-500'>{currentItem.institution}</p>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only visible on hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentIndex(prevIndex);
          }}
          className='absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/80 border border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700/50 transition-all duration-200 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 z-10'
          aria-label='Previous item'
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentIndex(nextIndex);
          }}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/80 border border-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700/50 transition-all duration-200 backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 z-10'
          aria-label='Next item'
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className='flex items-center justify-center gap-1.5 p-4 border-t border-slate-800/50 bg-slate-900/50'>
        {items.slice(0, 10).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              idx === currentIndex
                ? 'w-6 bg-cyan-400'
                : 'w-1.5 bg-slate-700 hover:bg-slate-600'
            }`}
            aria-label={`Go to item ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

