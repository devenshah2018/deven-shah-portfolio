'use client';

import { useState, useMemo } from 'react';
import { Calendar, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '@/lib/content-registry';

export function ExperienceSection() {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Sort by timeline order (newest first, by end date)
  const sortedExperiences = useMemo(() => {
    return [...EXPERIENCES].sort((a, b) => {
      const getEndDate = (period: string) => {
        // If "Present", treat as very high number (most recent)
        if (period.includes('Present')) {
          return 999999;
        }
        // Extract end date (second date in period string like "04/2023 – 04/2024")
        const dates = period.match(/(\d{2})\/(\d{4})/g);
        if (dates && dates.length >= 2) {
          // Get the last date (end date)
          const lastDate = dates[dates.length - 1];
          if (lastDate) {
            const endDateMatch = lastDate.match(/(\d{2})\/(\d{4})/);
            if (endDateMatch && endDateMatch[1] && endDateMatch[2]) {
              return parseInt(endDateMatch[2] + endDateMatch[1]);
            }
          }
        }
        // If only one date found, use it as end date
        if (dates && dates.length === 1) {
          const dateMatch = dates[0].match(/(\d{2})\/(\d{4})/);
          if (dateMatch && dateMatch[1] && dateMatch[2]) {
            return parseInt(dateMatch[2] + dateMatch[1]);
          }
        }
        return 0;
      };
      
      return getEndDate(b.period) - getEndDate(a.period);
    });
  }, []);

  return (
    <section
      id='experience'
      className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'
    >
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          {/* Section Header */}
          <div className='mb-12 text-center'>
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

          {/* Snaking Timeline Grid */}
          <div className='relative'>
            {/* Grid Container with padding for dots */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8'>
              {sortedExperiences.map((exp, index) => {
                const isFlipped = flippedIds.has(exp.id);
                const isLastCard = index === sortedExperiences.length - 1;

                return (
                  <motion.div
                    id={`experience-${exp.id}`}
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='relative'
                  >
                    {/* Timeline Connector - Simple line to next card (centered between cards) */}
                    {!isLastCard && (
                      <div className='hidden lg:block absolute top-1/2 right-0 w-6 h-0.5 bg-blue-500/30' 
                        style={{ 
                          transform: 'translate(100%, -50%)',
                          zIndex: 0,
                        }} 
                      />
                    )}

                    {/* Flip Card Container */}
                    <div className='relative h-64 perspective-1000' style={{ zIndex: 10 }} data-card>
                      <motion.div
                        className='relative w-full h-full preserve-3d'
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Front Side */}
                        <div
                          className='absolute inset-0 backface-hidden cursor-pointer'
                          style={{ backfaceVisibility: 'hidden' }}
                          onClick={() => toggleFlip(exp.id)}
                        >
                          <div className='h-full border border-slate-800/60 bg-slate-900/50 p-4 flex flex-col transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-900/70 relative' style={{ zIndex: 10 }}>
                            {/* Timeline Dot - positioned above card, fully visible */}
                            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-2 border-slate-900 z-20 hidden lg:block' />

                            {/* Company Logo */}
                            {exp.companyLogo && (
                              <div className='mb-3 flex items-center justify-center'>
                                <div className='h-12 w-12 overflow-hidden'>
                                  <img
                                    src={exp.companyLogo}
                                    alt={exp.company + ' logo'}
                                    className='h-full w-full object-contain'
                                  />
                                </div>
                              </div>
                            )}

                            {/* Title and Company */}
                            <div className='mb-3 text-center'>
                              <h3 className='text-base font-bold text-white mb-1 leading-tight'>
                                {exp.title}
                              </h3>
                              <a
                                href={exp.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={(e) => e.stopPropagation()}
                                className='text-sm font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all inline-flex items-center gap-1'
                              >
                                {exp.company}
                                <ExternalLink className='h-3 w-3' />
                              </a>
                            </div>

                            {/* Metadata */}
                            <div className='flex flex-col gap-1.5 mb-3 text-xs text-slate-400'>
                              <div className='flex items-center justify-center gap-1.5'>
                                <Calendar className='h-3 w-3' />
                                <span>{exp.period}</span>
                              </div>
                              <div className='flex items-center justify-center gap-1.5'>
                                <MapPin className='h-3 w-3' />
                                <span>{exp.location}</span>
                              </div>
                            </div>

                            {/* Flip Hint */}
                            <div className='mt-3 text-center'>
                              <span className='text-xs text-slate-500'>Click to view achievements</span>
                            </div>
                          </div>
                        </div>

                        {/* Back Side - Achievements */}
                        <div
                          className='absolute inset-0 backface-hidden cursor-pointer'
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                          onClick={() => toggleFlip(exp.id)}
                        >
                          <div className='h-full border border-slate-800/60 bg-slate-900/50 p-4 flex flex-col transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-900/70 relative' style={{ zIndex: 10 }}>
                            {/* Timeline Dot - positioned above card, fully visible */}
                            <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-2 border-slate-900 z-20 hidden lg:block' />

                            {/* Header */}
                            <div className='mb-3 text-center'>
                              <div className='flex items-center justify-center gap-2 mb-2'>
                                <Briefcase className='h-4 w-4 text-blue-400' />
                                <h3 className='text-base font-bold text-white'>
                                  Key Achievements
                                </h3>
                              </div>
                              <p className='text-xs text-slate-400'>{exp.company}</p>
                            </div>

                            {/* Achievements List */}
                            {exp.achievements && exp.achievements.length > 0 && (
                              <div className='flex-1 overflow-y-auto space-y-2'>
                                {exp.achievements.map((achievement, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className='flex items-start gap-2 text-xs leading-relaxed text-slate-300'
                                  >
                                    <div className='mt-1.5 h-1 w-1 rounded-full bg-blue-400 flex-shrink-0' />
                                    <span>{achievement}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {/* Flip Hint */}
                            <div className='mt-3 text-center'>
                              <span className='text-xs text-slate-500'>Click to flip back</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
