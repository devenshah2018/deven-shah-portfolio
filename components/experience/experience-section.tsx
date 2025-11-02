'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/content-registry';

export function ExperienceSection() {
  const [flippedIndexes, setFlippedIndexes] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen for clicks outside the experience section to unflip all cards
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFlippedIndexes(new Set());
      }
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  return (
    <section
      id='experience'
      className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'
    >
      <div className='container mx-auto px-3 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='mb-10 text-center sm:mb-14'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 py-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                Professional Journey
              </h2>
              <div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto max-w-3xl text-base font-light leading-relaxed text-slate-400 sm:text-lg'
            >
              Intern to co-founder—driving innovation, building teams, and delivering transformative
              technology across fintech, AI, and enterprise platforms.
            </motion.p>
          </div>
          {/* Centered grid for experience cards */}
          <div className='flex justify-center'>
            <div ref={containerRef} className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full max-w-6xl'>
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  viewport={{ once: true }}
                  className='relative w-full max-w-xs group perspective'
                  onClick={e => e.stopPropagation()}
                >
                  <div
                    className={`relative h-[320px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${flippedIndexes.has(index) ? '[transform:rotateY(180deg)]' : ''}`}
                    onClick={() => {
                      setFlippedIndexes(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(index)) {
                          newSet.delete(index);
                        } else {
                          newSet.add(index);
                        }
                        return newSet;
                      });
                    }}
                    tabIndex={0}
                    aria-pressed={flippedIndexes.has(index)}
                    role='button'
                  >
                    <Card className='absolute inset-0 z-10 flex h-full w-full flex-col overflow-hidden rounded-xl bg-transparent shadow-lg transition-all duration-300 border-transparent border-2 group-hover:border-blue-500 [backface-visibility:hidden] group-hover:scale-[1.015] group-hover:shadow-xl'>
                      <CardContent className='flex h-full flex-col p-5'>
                        <div className='mb-3 flex items-center gap-3'>
                          {exp.companyLogo && (
                            <img
                              src={exp.companyLogo}
                              alt={exp.company + ' logo'}
                              className='h-9 w-9 rounded-lg border border-slate-200/20 bg-white/80 object-contain shadow-sm'
                            />
                          )}
                          <div className='min-w-0 flex-1'>
                            <h3 className='mb-0.5 break-words text-base font-semibold tracking-tight text-white sm:text-lg'>
                              {exp.title}
                            </h3>
                            <a
                              href={exp.link}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/link inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-sm font-medium text-transparent transition-all duration-300 hover:from-blue-300 hover:to-indigo-300'
                            >
                              {exp.company}
                              <ExternalLink className='h-4 w-4 text-slate-400 transition-colors group-hover/link:text-blue-400' />
                            </a>
                          </div>
                          {exp.featured && (
                            <Badge className='border-0 bg-gradient-to-r from-yellow-500 to-orange-500 px-2 py-0.5 text-xs text-white'>
                              <Star className='h-3 w-3' />
                            </Badge>
                          )}
                        </div>
                        <div className='mb-8 flex flex-wrap gap-2'>
                          <Badge
                            variant='outline'
                            className='border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-300'
                          >
                            <Calendar className='mr-1 h-3 w-3' />
                            {exp.period}
                          </Badge>
                          <Badge
                            variant='outline'
                            className='border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-300'
                          >
                            <MapPin className='mr-1 h-3 w-3' />
                            {exp.location}
                          </Badge>
                        </div>
                        <p className='mb-8 text-sm font-normal leading-relaxed text-slate-200 overflow-hidden text-ellipsis line-clamp-4'>
                          {exp.description}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className='absolute inset-0 z-20 flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-700/40 bg-gradient-to-br from-blue-900/95 to-indigo-900/90 shadow-xl transition-all duration-300 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                      <CardContent className='flex h-full flex-col p-5'>
                        <div className='mb-3 flex items-center gap-2'>
                          <TrendingUp className='h-5 w-5 text-emerald-400' />
                          <h4 className='text-base font-semibold text-white tracking-tight'>Key Achievements</h4>
                        </div>
                        <ul className='mb-5 space-y-2 overflow-y-auto pr-1'>
                          {exp.achievements.map((achievement, i) => (
                            <li key={exp.id + '-' + i} className='flex items-start gap-2'>
                              <div className={`h-2 w-2 bg-gradient-to-r ${exp.gradient} mt-2 flex-shrink-0 rounded-full`} />
                              <span className='text-xs font-normal leading-relaxed text-slate-100 break-words'>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
