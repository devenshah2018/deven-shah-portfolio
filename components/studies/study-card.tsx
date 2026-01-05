'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { Study } from '@/lib/types';

interface StudyCardProps {
  study: Study;
  index?: number;
  featured?: boolean;
}

export function StudyCard({ study, index = 0, featured = false }: StudyCardProps) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='group'
      >
        <Link
          href={`/studies/${study.slug || study.id}`}
          className='block overflow-hidden border border-slate-800/50 bg-slate-900/30 rounded-xl p-6 lg:p-7 transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-black/10'
        >
          {/* Featured Badge */}
          <div className='mb-4 inline-flex items-center gap-2 px-2.5 py-1 border border-cyan-500/30 bg-cyan-500/10 rounded-md text-xs font-semibold text-cyan-400'>
            <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse' />
            Featured
          </div>

          {/* Title */}
          <h2 className='mb-3 text-2xl lg:text-2xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-400'>
            {study.title}
          </h2>

          {/* Excerpt */}
          <p className='mb-5 text-base leading-relaxed text-slate-400 line-clamp-2'>
            {study.excerpt}
          </p>

          {/* Metadata */}
          <div className='mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500'>
            <div className='flex items-center gap-1.5'>
              <Calendar className='h-3.5 w-3.5' />
              <span>{study.date}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-3.5 w-3.5' />
              <span>{study.readingTime} min</span>
            </div>
          </div>

          {/* Tags */}
          {study.tags && study.tags.length > 0 && (
            <div className='mb-4 flex flex-wrap gap-1.5'>
              {study.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className='px-2 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-800/50 rounded-md'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className='flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors'>
            <span>Read more</span>
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className='group h-full'
    >
      <Link
        href={`/studies/${study.slug || study.id}`}
        className='block h-full overflow-hidden border border-slate-800/50 bg-slate-900/30 rounded-lg p-5 transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/50 hover:shadow-lg hover:shadow-black/10'
      >
        {/* Title */}
        <h3 className='mb-2.5 text-lg font-bold leading-snug text-white transition-colors group-hover:text-cyan-400 line-clamp-2'>
          {study.title}
        </h3>

        {/* Excerpt */}
        <p className='mb-3 line-clamp-2 text-sm leading-relaxed text-slate-400'>
          {study.excerpt}
        </p>

        {/* Metadata */}
        <div className='mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500'>
          <div className='flex items-center gap-1.5'>
            <Calendar className='h-3 w-3' />
            <span>{study.date}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock className='h-3 w-3' />
            <span>{study.readingTime} min</span>
          </div>
        </div>

        {/* Tags */}
        {study.tags && study.tags.length > 0 && (
          <div className='mb-3 flex flex-wrap gap-1.5'>
            {study.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className='px-2 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-800/50 border border-slate-800/50 rounded'
              >
                {tag}
              </span>
            ))}
            {study.tags.length > 2 && (
              <span className='px-2 py-0.5 text-[10px] font-medium text-slate-500'>
                +{study.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className='flex items-center justify-between border-t border-slate-800/50 pt-3'>
          <span className='text-[10px] font-semibold uppercase tracking-wider text-slate-500'>
            Read
          </span>
          <ArrowRight className='h-3.5 w-3.5 text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-400' />
        </div>
      </Link>
    </motion.div>
  );
}
