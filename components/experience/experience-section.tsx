'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '@/lib/content-registry';

export function ExperienceSection() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Sort: featured first, then chronological (newest first)
  const sortedExperiences = useMemo(() => {
    return [...EXPERIENCES].sort((a, b) => {
      // Featured experiences first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by period (extract year and month for comparison)
      const getSortDate = (period: string) => {
        // Extract date from period string like "12/2024 – Present" or "04/2023 – 04/2024"
        const match = period.match(/(\d{2})\/(\d{4})/);
        if (match && match[1] && match[2]) {
          return parseInt(match[2] + match[1]); // YYYYMM format
        }
        return 0;
      };
      
      return getSortDate(b.period) - getSortDate(a.period);
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
          className='mx-auto max-w-5xl'
        >
          {/* Section Header */}
          <div className='mb-10 text-center'>
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

          {/* Compact Experience Cards */}
          <div className='space-y-4'>
            {sortedExperiences.map((exp, index) => {
              const isExpanded = expandedIds.has(exp.id);
              const isFeatured = exp.featured;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card className='border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm shadow-lg overflow-hidden group'>
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div className='absolute top-3 right-3 z-10'>
                        <Badge className='border-0 bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-xs font-semibold text-white shadow-md'>
                          <Star className='h-3 w-3 mr-1 fill-white' />
                          Featured
                        </Badge>
                      </div>
                    )}

                    <CardContent className='p-4'>
                      {/* Compact Header */}
                      <div className='flex items-start gap-3 mb-3'>
                        {/* Company Logo */}
                        {exp.companyLogo && (
                          <div className='flex-shrink-0 mt-0.5'>
                            <div className='flex items-center justify-center h-10 w-10 rounded-lg bg-transparent object-contain shadow-sm overflow-hidden transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'>
                              <img
                                src={exp.companyLogo}
                                alt={exp.company + ' logo'}
                                className='h-full w-full object-contain object-center'
                              />
                            </div>
                          </div>
                        )}

                        {/* Title and Company */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between gap-2 mb-1'>
                            <h3 className='text-lg font-bold text-white leading-tight'>
                              {exp.title}
                            </h3>
                          </div>
                          <a
                            href={exp.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group/link inline-flex items-center gap-1 text-sm font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 hover:from-blue-300 hover:to-indigo-300'
                          >
                            {exp.company}
                            <ExternalLink className='h-3 w-3 text-slate-500 transition-colors group-hover/link:text-blue-400' />
                          </a>
                        </div>
                      </div>

                      {/* Compact Metadata */}
                      <div className='flex flex-wrap items-center gap-2 mb-3'>
                        <Badge
                          variant='outline'
                          className='border-slate-700/50 bg-slate-800/40 px-2 py-0.5 text-xs font-medium text-slate-300'
                        >
                          <Calendar className='mr-1 h-3 w-3' />
                          {exp.period}
                        </Badge>
                        <Badge
                          variant='outline'
                          className='border-slate-700/50 bg-slate-800/40 px-2 py-0.5 text-xs font-medium text-slate-300'
                        >
                          <MapPin className='mr-1 h-3 w-3' />
                          {exp.location}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className='text-sm leading-relaxed text-slate-300 mb-3'>
                        {exp.description}
                      </p>

                      {/* Compact Achievements Section */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className='border-t border-slate-800/50 pt-3'>
                          <button
                            onClick={() => toggleExpanded(exp.id)}
                            className='flex items-center justify-between w-full text-left group/button'
                            aria-expanded={isExpanded}
                          >
                            <h4 className='text-xs font-semibold text-slate-200 flex items-center gap-1.5'>
                              <span className={`h-1 w-1 rounded-full bg-gradient-to-r ${exp.gradient}`} />
                              Key Achievements
                              <span className='text-xs font-normal text-slate-500'>
                                ({exp.achievements.length})
                              </span>
                            </h4>
                            {isExpanded ? (
                              <ChevronUp className='h-3.5 w-3.5 text-slate-400 transition-transform group-hover/button:text-blue-400' />
                            ) : (
                              <ChevronDown className='h-3.5 w-3.5 text-slate-400 transition-transform group-hover/button:text-blue-400' />
                            )}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className='mt-2 space-y-2 overflow-hidden'
                              >
                                {exp.achievements.map((achievement, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className='flex items-start gap-2 text-xs leading-relaxed text-slate-300'
                                  >
                                    <div className={`mt-1.5 h-1 w-1 rounded-full bg-gradient-to-r ${exp.gradient} flex-shrink-0`} />
                                    <span>{achievement}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
