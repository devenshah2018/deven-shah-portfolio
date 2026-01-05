'use client';

import type { Study } from '@/lib/types';
import { StudyCard } from './study-card';

interface StudyListProps {
  studies: Study[];
  featuredStudy?: Study | undefined;
}

export function StudyList({ studies, featuredStudy }: StudyListProps) {
  // Filter out featured study from the list if provided
  const regularStudies = featuredStudy
    ? studies.filter((s) => s.id !== featuredStudy.id)
    : studies;

  return (
    <div className='space-y-8'>
      {/* Featured Study */}
      {featuredStudy && (
        <div>
          <StudyCard study={featuredStudy} featured />
        </div>
      )}

      {/* Regular Studies Grid */}
      {regularStudies.length > 0 && (
        <div className='space-y-6'>
          {featuredStudy && (
            <div className='flex items-center gap-3'>
              <div className='h-px flex-1 bg-slate-800/50' />
              <h2 className='text-sm font-semibold uppercase tracking-wider text-slate-500'>More Studies</h2>
              <div className='h-px flex-1 bg-slate-800/50' />
            </div>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {regularStudies.map((study, index) => (
              <StudyCard key={study.id} study={study} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {studies.length === 0 && (
        <div className='text-center py-24 border border-slate-800/50 bg-slate-900/30 rounded-2xl p-12'>
          <p className='text-xl font-semibold mb-2 text-white'>No Studies Found</p>
          <p className='text-sm font-mono text-slate-500'>SYSTEM: STANDBY</p>
        </div>
      )}
    </div>
  );
}
