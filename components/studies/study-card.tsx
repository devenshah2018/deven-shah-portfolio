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
          className='block overflow-hidden border border-slate-800/50 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:border-slate-700/50 hover:shadow-2xl hover:shadow-cyan-500/5'
        >
          {/* Featured Badge */}
          <div className='mb-6 inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-500/30 bg-cyan-500/10 rounded-full text-xs font-semibold text-cyan-400'>
            <span className='w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse' />
            Featured
          </div>

          {/* Title */}
          <h2 className='mb-4 text-3xl lg:text-4xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-100'>
            {study.title}
          </h2>

          {/* Excerpt */}
          <p className='mb-8 text-lg leading-relaxed text-slate-300 line-clamp-3'>
            {study.excerpt}
          </p>

          {/* Metadata */}
          <div className='mb-6 flex flex-wrap items-center gap-6 text-sm text-slate-400'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-slate-500' />
              <span>{study.date}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-slate-500' />
              <span>{study.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {study.tags && study.tags.length > 0 && (
            <div className='mb-6 flex flex-wrap gap-2'>
              {study.tags.slice(0, 4).map((tag, i) => (
                <span
                  key={i}
                  className='px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-800/50 rounded-lg'
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
        className='block h-full overflow-hidden border border-slate-800/50 bg-slate-900/30 rounded-xl p-6 transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-900/50 hover:shadow-xl hover:shadow-black/20'
      >
        {/* Title */}
        <h3 className='mb-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-400'>
          {study.title}
        </h3>

        {/* Excerpt */}
        <p className='mb-4 line-clamp-2 text-base leading-relaxed text-slate-400'>
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
          <div className='mb-4 flex flex-wrap gap-2'>
            {study.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className='px-2 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-800/50 rounded-md'
              >
                {tag}
              </span>
            ))}
            {study.tags.length > 3 && (
              <span className='px-2 py-1 text-xs font-medium text-slate-500'>
                +{study.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className='flex items-center justify-between border-t border-slate-800/50 pt-4'>
          <span className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
            Read Article
          </span>
          <ArrowRight className='h-4 w-4 text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-cyan-400' />
        </div>
      </Link>
    </motion.div>
  );
}
