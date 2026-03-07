'use client';

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { MapPin, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getTopOrgGroups,
  getOtherOrgGroups,
  formatPeriodDisplay,
  getSkillsForExperienceId,
  type OrgGroup,
} from '@/lib/content-registry';
import { scrollToExperience } from '@/lib/url-utils';
import { Badge } from '@/components/ui/badge';
import { EducationResearchSidebar } from './education-research-sidebar';

function getEndYear(org: OrgGroup): number {
  const p = org.positions[0]?.period;
  if (!p?.includes('Present')) {
    const dates = p?.match(/(\d{2})\/(\d{4})/g);
    if (dates && dates.length >= 2) {
      const m = dates[dates.length - 1]!.match(/(\d{4})/);
      if (m?.[1]) return parseInt(m[1], 10);
    }
  }
  return new Date().getFullYear();
}

function addYearLabels<T extends { org: OrgGroup }>(items: T[]): (T & { yearLabel: string | null })[] {
  let lastYear: number | null = null;
  return items.map(item => {
    const y = getEndYear(item.org);
    const showYear = lastYear !== y;
    if (showYear) lastYear = y;
    return { ...item, yearLabel: showYear ? String(y) : null };
  });
}

interface ExperienceCardProps {
  org: OrgGroup;
  yearLabel: string | null;
  index: number;
  flippedIds: Set<string>;
  toggleFlip: (id: string) => void;
  isExpandedContent?: boolean;
}

function ExperienceCard({
  org,
  yearLabel,
  index,
  flippedIds,
  toggleFlip,
  isExpandedContent = false,
}: ExperienceCardProps) {
  return (
    <motion.article
      initial={isExpandedContent ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isExpandedContent ? 0.25 : 0.35,
        delay: isExpandedContent ? 0 : index * 0.04,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="grid grid-cols-[2rem_3rem_1fr] gap-4 items-start"
    >
      <div className="min-h-[1.5rem] flex items-center pt-1">
        <div className="h-full min-h-[2rem] w-px bg-[#404040]/40" aria-hidden />
      </div>
      <div className="min-h-[1.5rem] flex items-start justify-end pt-1">
        {yearLabel && (
          <span className="text-base font-medium tabular-nums tracking-tight text-[#737373]">
            {yearLabel}
          </span>
        )}
      </div>
      <div className="min-w-0 pl-1">
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2.5">
            {org.companyLogo && (
              <motion.img
                layoutId={`logo-${org.company}`}
                src={org.companyLogo}
                alt=""
                className="h-9 w-9 flex-shrink-0 rounded-lg object-contain ring-1 ring-[#404040]/40"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <a
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-[#f5f5f0] transition-colors hover:text-[#d4d4d4]"
            >
              {org.company}
              <ExternalLink className="h-3.5 w-3.5 opacity-50" />
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
                <span className="tabular-nums">{org.duration}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {org.positions.map((pos) => {
            const isFlipped = flippedIds.has(pos.id);
            const achievements = pos.achievements ?? [];
            const skills = getSkillsForExperienceId(pos.id);
            const hasMore = achievements.length > 0;
            const periodDisplay = formatPeriodDisplay(pos.period);

            return (
              <div key={pos.id} id={`experience-${pos.id}`} data-card className="relative overflow-hidden rounded-xl">
                <div className="flex flex-row items-center justify-between gap-3">
                  <h3 className="min-w-0 truncate text-base font-semibold text-[#f5f5f0]">{pos.title}</h3>
                  <Badge
                    variant="outline"
                    className="w-fit flex-shrink-0 border-[#404040]/50 bg-[#262626] px-2.5 py-1 text-xs font-medium tabular-nums text-[#a3a3a3]"
                  >
                    {periodDisplay}
                  </Badge>
                </div>
                {pos.description && (
                  <p className="mt-2 text-[15px] leading-[1.7] text-[#d4d4d4]">{pos.description}</p>
                )}
                {skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md border border-[#404040]/50 bg-[#262626] px-2 py-1 text-[0.6875rem] font-medium text-[#a3a3a3]"
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
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isFlipped ? 'rotate-90' : ''}`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isFlipped ? 'auto' : 0, opacity: isFlipped ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
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
  );
}

export function ExperienceSection() {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const scrollYRef = useRef<number | null>(null);
  const scrollToExperienceIdRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (scrollYRef.current === null || scrollToExperienceIdRef.current !== null) return;
    const y = scrollYRef.current;
    scrollYRef.current = null;
    const restore = () => window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    // Delay restores until after collapse animation (~350ms) so we don't fight the layout
    const t1 = setTimeout(restore, 380);
    const t2 = setTimeout(restore, 450);
    const t3 = setTimeout(restore, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded || !scrollToExperienceIdRef.current) return;
    const id = scrollToExperienceIdRef.current;
    scrollToExperienceIdRef.current = null;
    // Single scroll after expand animation settles (~350ms)
    const t = setTimeout(() => scrollToExperience(id), 380);
    return () => clearTimeout(t);
  }, [expanded]);

  const handleExpandToExperience = (experienceId: string) => {
    scrollToExperienceIdRef.current = experienceId;
    setExpanded(true);
  };

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const topOrgs = useMemo(() => {
    const top = getTopOrgGroups();
    return addYearLabels(top.map((org) => ({ org })));
  }, []);

  const otherOrgs = useMemo(() => {
    const other = getOtherOrgGroups();
    return addYearLabels(other.map((org) => ({ org })));
  }, []);

  const hasMore = otherOrgs.length > 0;

  return (
    <section id="experience" className="bg-[#141414] py-12 sm:py-16">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <div className="w-full max-w-6xl xl:max-w-7xl">
            <h2 className="mb-8 text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
              Experience
            </h2>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_3fr] lg:gap-10 items-start lg:items-start">
              <h3 className="text-left text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] lg:mb-4">
                Professional Journey
              </h3>
              <h3 className="text-left text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] lg:mb-4">
                Education
              </h3>
              <div className="relative min-w-0" style={{ overflowAnchor: 'none' }}>
              <div className="space-y-14">
                {/* More/Less button row */}
                {hasMore && (
                  <div className="mb-6 flex justify-start">
                    {expanded ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          scrollYRef.current = window.scrollY;
                          setExpanded(false);
                        }}
                        className="flex items-center gap-1.5 rounded-md py-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] focus:outline-none focus:ring-0"
                      >
                        Less
                        <ChevronDown className="h-4 w-4 rotate-180" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollYRef.current = window.scrollY;
                            setExpanded(true);
                          }}
                          className="flex items-center gap-1.5 rounded-md py-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:text-[#f5f5f0] focus:outline-none focus:ring-0"
                        >
                          More
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          {otherOrgs.map(({ org }) =>
                            org.companyLogo ? (
                              <button
                                key={org.company}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleExpandToExperience(org.positions[0]!.id);
                                }}
                                className="rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#525252] focus:ring-offset-2 focus:ring-offset-[#141414]"
                                aria-label={`Expand to ${org.company}`}
                              >
                                <motion.img
                                  layoutId={`logo-${org.company}`}
                                  src={org.companyLogo}
                                  alt={org.company}
                                  className="h-10 w-10 flex-shrink-0 rounded-lg object-contain ring-1 ring-[#404040]/40"
                                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                              </button>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Top orgs - always visible, never unmount */}
                {topOrgs.map(({ org, yearLabel }, index) => (
                  <ExperienceCard
                    key={org.company}
                    org={org}
                    yearLabel={yearLabel}
                    index={index}
                    flippedIds={flippedIds}
                    toggleFlip={toggleFlip}
                  />
                ))}

                {/* Other orgs - animate in/out when expanding/collapsing */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      key="other-orgs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-14 pt-0">
                        {otherOrgs.map(({ org, yearLabel }, index) => (
                          <ExperienceCard
                            key={org.company}
                            org={org}
                            yearLabel={yearLabel}
                            index={index}
                            flippedIds={flippedIds}
                            toggleFlip={toggleFlip}
                            isExpandedContent
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
              <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
                <EducationResearchSidebar />
              </aside>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
