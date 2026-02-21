'use client';

import { useState, useMemo } from 'react';
import { MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { groupExperiencesByOrg, formatPeriodDisplay, getSkillsForExperienceId } from '@/lib/content-registry';
import { Badge } from '@/components/ui/badge';

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

  const orgGroups = useMemo(() => groupExperiencesByOrg(), []);
  const orgsWithYearLabels = useMemo(() => {
    const getOrgSortKey = (org: (typeof orgGroups)[0]) => {
      const p = org.positions[0]?.period;
      if (!p) return 0;
      if (p.includes('Present')) return 999999;
      const dates = p.match(/(\d{2})\/(\d{4})/g);
      if (dates && dates.length >= 2) {
        const last = dates[dates.length - 1]!.match(/(\d{2})\/(\d{4})/);
        if (last?.[1] && last?.[2]) return parseInt(last[2] + last[1]);
      }
      return 0;
    };
    const sorted = [...orgGroups].sort((a, b) => getOrgSortKey(b) - getOrgSortKey(a));
    const getEndYear = (org: (typeof orgGroups)[0]) => {
      const p = org.positions[0]?.period;
      if (!p?.includes('Present')) {
        const dates = p?.match(/(\d{2})\/(\d{4})/g);
        if (dates && dates.length >= 2) {
          const m = dates[dates.length - 1]!.match(/(\d{4})/);
          if (m?.[1]) return parseInt(m[1], 10);
        }
      }
      return new Date().getFullYear();
    };
    let lastYear: number | null = null;
    return sorted.map(org => {
      const y = getEndYear(org);
      const showYear = lastYear !== y;
      if (showYear) lastYear = y;
      return { org, yearLabel: showYear ? String(y) : null };
    });
  }, [orgGroups]);

  return (
    <section
      id='experience'
      className='bg-gradient-to-b from-slate-900 to-slate-950 py-16'
    >
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-3xl'
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
          </div>

          {/* Timeline */}
          <div className='relative'>
            <div className='absolute left-[3.5rem] top-2 bottom-2 w-px bg-slate-700/60' aria-hidden />
            <div className='space-y-10'>
              {orgsWithYearLabels.map(({ org, yearLabel }, index) => (
                <motion.article
                  key={org.company}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className='grid grid-cols-[3.5rem_1fr] gap-5 items-start'
                >
                  <div className='min-h-[1.5rem] flex items-start pt-1'>
                    {yearLabel && (
                      <span className='text-base font-medium tabular-nums tracking-tight text-slate-500'>
                        {yearLabel}
                      </span>
                    )}
                  </div>
                  <div className='min-w-0'>
                    {/* Org header — two clear rows for hierarchy */}
                    <div className='space-y-1.5 mb-4'>
                      <div className='flex items-center gap-2.5'>
                        {org.companyLogo && (
                          <img
                            src={org.companyLogo}
                            alt=''
                            className='h-9 w-9 flex-shrink-0 rounded-md object-contain ring-1 ring-slate-700/50'
                          />
                        )}
                        <a
                          href={org.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-base font-semibold text-white hover:text-blue-300 transition-colors inline-flex items-center gap-1.5'
                        >
                          {org.company}
                          <ExternalLink className='h-3.5 w-3.5 opacity-50' />
                        </a>
                      </div>
                      <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-slate-500'>
                        <span className='flex items-center gap-1'>
                          <MapPin className='h-3 w-3 flex-shrink-0' />
                          {org.location}
                        </span>
                        {org.duration && (
                          <>
                            <span className='text-slate-600'>·</span>
                            <span className='tabular-nums'>{org.duration}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Positions */}
                    <div className='space-y-4'>
                      {org.positions.map((pos) => {
                        const isFlipped = flippedIds.has(pos.id);
                        const achievements = pos.achievements ?? [];
                        const skills = getSkillsForExperienceId(pos.id);
                        const hasMore = achievements.length > 0;
                        const periodDisplay = formatPeriodDisplay(pos.period);

                        return (
                          <div
                            key={pos.id}
                            id={`experience-${pos.id}`}
                            className='relative'
                          >
                            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3'>
                              <h3 className='text-base font-semibold text-white'>{pos.title}</h3>
                              <Badge
                                variant='outline'
                                className='flex-shrink-0 w-fit border-slate-600/50 bg-slate-800/40 px-2.5 py-1 text-xs font-medium text-slate-400 tabular-nums'
                              >
                                {periodDisplay}
                              </Badge>
                            </div>
                            {pos.description && (
                              <p className='mt-2 text-[15px] text-slate-400 leading-relaxed'>
                                {pos.description}
                              </p>
                            )}
                            {skills.length > 0 && (
                              <div className='mt-2.5 flex flex-wrap gap-2'>
                                {skills.map(skill => (
                                  <span
                                    key={skill}
                                    className='inline-flex items-center rounded-md border border-slate-600/40 bg-slate-800/30 px-2 py-1 text-xs font-medium text-slate-400'
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                            {hasMore && (
                              <>
                                <button
                                  type='button'
                                  onClick={() => toggleFlip(pos.id)}
                                  className='mt-2.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1'
                                >
                                  {isFlipped ? 'Less' : 'More'}
                                  <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${isFlipped ? 'rotate-90' : ''}`} />
                                </button>
                                <motion.div
                                  initial={false}
                                  animate={{ height: isFlipped ? 'auto' : 0, opacity: isFlipped ? 1 : 0 }}
                                  transition={{ duration: 0.25, ease: 'easeOut' }}
                                  className='overflow-hidden'
                                >
                                  <div className='mt-3 pl-4 border-l-2 border-slate-600/60'>
                                    <ul className='space-y-2'>
                                      {achievements.map((achievement, i) => (
                                        <li key={i} className='text-sm text-slate-400 leading-relaxed flex gap-2'>
                                          <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-500/60' />
                                          <span>{achievement}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
