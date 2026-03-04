'use client';

import { useState, useMemo } from 'react';
import { MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { groupExperiencesByOrg, formatPeriodDisplay, getSkillsForExperienceId } from '@/lib/content-registry';
import { Badge } from '@/components/ui/badge';
import { ProjectsSidebar } from '@/components/projects/projects-sidebar';

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
    <section id="experience" className="bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <h2 className="mb-16 text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] sm:text-lg">Experience</h2>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1.2fr_420px]">
            <div className="min-w-0">
              <h3 className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
                Professional Journey
              </h3>

              <div className="relative">
                <div className="absolute left-[3.5rem] top-2 bottom-2 w-px bg-[#404040]/40" aria-hidden />
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
                      <span className="text-base font-medium tabular-nums tracking-tight text-[#737373]">
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
                            alt=""
                            className="h-9 w-9 flex-shrink-0 rounded-lg object-contain ring-1 ring-[#404040]/40"
                          />
                        )}
                        <a
                          href={org.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-base font-semibold text-[#f5f5f0] transition-colors hover:text-[#d4d4d4]"
                        >
                          {org.company}
                          <ExternalLink className='h-3.5 w-3.5 opacity-50' />
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#a3a3a3]">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          {org.location}
                        </span>
                        {org.duration && (
                          <>
                            <span className="text-[#525252]">·</span>
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
                              <h3 className="text-base font-semibold text-[#f5f5f0]">{pos.title}</h3>
                              <Badge
                                variant="outline"
                                className="w-fit flex-shrink-0 border-[#404040]/50 bg-[#262626] px-2.5 py-1 text-xs font-medium tabular-nums text-[#a3a3a3]"
                              >
                                {periodDisplay}
                              </Badge>
                            </div>
                            {pos.description && (
                              <p className="mt-2 text-[15px] leading-[1.7] text-[#d4d4d4]">
                                {pos.description}
                              </p>
                            )}
                            {skills.length > 0 && (
                              <div className="mt-2.5 flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="inline-flex items-center rounded-md border border-[#404040]/50 bg-[#262626] px-2 py-1 text-xs font-medium text-[#a3a3a3]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                            {hasMore && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => toggleFlip(pos.id)}
                                  className="mt-2.5 flex items-center gap-1 text-sm font-medium text-[#a3a3a3] underline decoration-[#525252] underline-offset-2 transition-colors hover:text-[#f5f5f0]"
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
                                  <div className="mt-3 border-l border-[#404040]/40 pl-4">
                                    <ul className="space-y-2">
                                      {achievements.map((achievement, i) => (
                                        <li key={i} className="flex gap-2 text-sm leading-[1.6] text-[#d4d4d4]">
                                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#525252]" />
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
            </div>

            {/* Right: Projects */}
            <div id='projects' className='lg:sticky lg:top-24 self-start'>
              <ProjectsSidebar />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
