'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Building2, ArrowRight } from 'lucide-react';
import type { ResearchPaper } from '@/lib/types';

interface ResearchPaperCardProps {
  paper: ResearchPaper;
  index: number;
}

export function ResearchPaperCard({ paper, index }: ResearchPaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/${paper.slug || paper.id}`}
        className='group relative block h-full overflow-hidden border border-gray-800/60 bg-gray-950/60 p-6 transition-all duration-200 hover:border-cyan-500/40 hover:bg-gray-900/60'
      >
        {/* Content */}
        <div className='relative z-10'>
          {/* Header with Number and Date */}
          <div className='mb-4 flex items-center justify-between'>
            <span className='border border-gray-800/60 bg-gray-900/60 px-2 py-0.5 text-xs font-mono text-gray-500'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className='border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-mono text-cyan-400'>
              {paper.sortDate}
            </span>
          </div>

          {/* Title */}
          <h3 className='mb-4 text-xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-400'>
            {paper.title}
          </h3>

          {/* Metadata */}
          <div className='mb-4 space-y-2'>
            {paper.institution && (
              <div className='flex items-center gap-2 text-sm text-gray-400'>
                <Building2 className='h-3.5 w-3.5 flex-shrink-0 text-gray-600' />
                <span>{paper.institution}</span>
              </div>
            )}
            <div className='flex items-center gap-2 text-sm text-gray-400'>
              <Calendar className='h-3.5 w-3.5 flex-shrink-0 text-gray-600' />
              <span>{paper.date}</span>
            </div>
            {paper.status && (
              <div className='inline-block border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-xs font-semibold text-cyan-400'>
                {paper.status}
              </div>
            )}
          </div>

          {/* Abstract Preview */}
          {paper.abstract && (
            <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400'>
              {paper.abstract}
            </p>
          )}

          {/* Keywords */}
          {paper.keywords && paper.keywords.length > 0 && (
            <div className='mb-4 flex flex-wrap gap-1.5'>
              {paper.keywords.slice(0, 3).map((keyword, i) => (
                <span
                  key={i}
                  className='border border-gray-800/60 bg-gray-900/40 px-2 py-0.5 text-xs font-mono text-gray-500'
                >
                  {keyword}
                </span>
              ))}
              {paper.keywords.length > 3 && (
                <span className='px-2 py-0.5 text-xs font-mono text-gray-600'>
                  +{paper.keywords.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className='mt-4 flex items-center justify-between border-t border-gray-800/60 pt-4'>
            <span className='text-xs font-mono uppercase tracking-wider text-gray-500'>
              View
            </span>
            <ArrowRight className='h-4 w-4 text-gray-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cyan-400' />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

