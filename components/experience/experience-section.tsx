'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { MapPin, ChevronRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  groupExperiencesByOrg,
  formatPeriodDisplay,
  getSkillsForExperienceId,
  getExperienceDate,
  hasFutureStart,
  type OrgGroup,
} from '@/database/content-registry';
import { scrollToExperience, REQUEST_SCROLL_TO_EXPERIENCE } from '@/lib/url-utils';
import { Badge } from '@/components/ui/badge';
import { EducationOrganizationsSidebar } from './education-organizations-sidebar';

function getEndYear(org: OrgGroup): number {
  return Math.floor(getExperienceDate(org.positions[0]?.period ?? '') / 100);
}

function addYearLabels<T extends { org: OrgGroup }>(
  items: T[]
): (T & { yearLabel: string | null })[] {
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
  viewMode: 'detailed' | 'compact';
  isExpandedContent?: boolean;
}

function ExperienceCard({
  org,
  yearLabel,
  index,
  flippedIds,
  toggleFlip,
  viewMode,
  isExpandedContent = false,
}: ExperienceCardProps) {
  const isDetailed = viewMode === 'detailed';
  const isCompact = !isDetailed;
  return (
    <motion.article
      initial={isExpandedContent ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isExpandedContent ? 0.25 : 0.35,
        delay: isExpandedContent ? 0 : index * 0.04,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`grid grid-cols-[0rem_2.5rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[0rem_3rem_minmax(0,1fr)] sm:gap-5`}
    >
      <div className={isCompact ? 'min-h-[1rem]' : 'min-h-[1.5rem]'} aria-hidden />
      <div
        data-year-cell
        data-has-year={yearLabel ? 'true' : undefined}
        className={`flex items-start justify-end ${isCompact ? 'min-h-[1rem] pt-0.5' : 'min-h-[1.5rem] pt-1'}`}
      >
        {yearLabel && (
          <span className='text-base font-medium tabular-nums tracking-tight text-[#737373]'>
            {yearLabel}
          </span>
        )}
      </div>
      <div className='min-w-0 pl-1'>
        <div className={`${isCompact ? 'mb-3 space-y-2' : 'mb-4 space-y-1.5'}`}>
          <div
            data-logo-row
            className={`flex flex-wrap items-center ${isCompact ? 'gap-2 gap-x-4' : 'gap-2.5'}`}
          >
            <div className='flex min-w-0 items-center gap-3'>
              {org.companyLogo && (
                <motion.img
                  layoutId={`logo-bottom-${org.company}`}
                  src={org.companyLogo}
                  alt=''
                  className={`flex-shrink-0 rounded object-contain ${isCompact ? 'h-8 w-8 rounded-sm' : 'h-9 w-9 rounded-lg'}`}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <a
                href={org.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-base font-semibold text-[#f5f5f0] transition-colors hover:text-[#d4d4d4]'
              >
                {org.company}
              </a>
            </div>
            {isCompact && (
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#999]'>
                <span className='flex items-center gap-1'>
                  <MapPin className='h-3 w-3 flex-shrink-0' />
                  {org.location}
                </span>
                {org.duration && (
                  <>
                    <span className='text-[#525252]'>·</span>
                    <span className='tabular-nums'>{org.duration}</span>
                  </>
                )}
              </div>
            )}
          </div>
          {!isCompact && (
            <div className='flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#a3a3a3]'>
              <span className='flex items-center gap-1'>
                <MapPin className='h-3 w-3 flex-shrink-0' />
                {org.location}
              </span>
              {org.duration && (
                <>
                  <span className='text-[#525252]'>·</span>
                  <span className='tabular-nums'>{org.duration}</span>
                </>
              )}
            </div>
          )}
        </div>

        {isCompact ? (
          <div className='mt-3 space-y-3'>
            {org.positions.map(pos => {
              const periodDisplay = formatPeriodDisplay(pos.period);
              return (
                <span
                  key={pos.id}
                  id={`experience-${pos.id}`}
                  className='flex flex-col gap-1 text-sm text-[#d4d4d4] sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4'
                >
                  <span className='leading-relaxed'>{pos.title}</span>
                  <span className='flex-shrink-0 text-xs tabular-nums text-[#999]'>
                    {periodDisplay}
                  </span>
                </span>
              );
            })}
          </div>
        ) : (
          <div className='space-y-4'>
            {org.positions.map(pos => {
              const isFlipped = flippedIds.has(pos.id);
              const achievements = pos.achievements ?? [];
              const skills = getSkillsForExperienceId(pos.id);
              const hasMore = achievements.length > 0;
              const periodDisplay = formatPeriodDisplay(pos.period);

              return (
                <div key={pos.id} id={`experience-${pos.id}`} data-card className='relative py-3'>
                  <div className='flex flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3'>
                    <div className='flex min-w-0 items-start gap-2 sm:flex-1 sm:items-center'>
                      <User
                        className='mt-0.5 h-4 w-4 flex-shrink-0 text-[#5a5a5a] sm:mt-0'
                        strokeWidth={2}
                        aria-hidden
                      />
                      <h3 className='min-w-0 text-base font-semibold text-[#f5f5f0] sm:truncate'>
                        {pos.title}
                      </h3>
                    </div>
                    <Badge
                      variant='outline'
                      className='w-fit shrink-0 rounded-none border-0 bg-transparent px-0 py-1 text-xs font-normal tabular-nums text-[#999]'
                    >
                      {periodDisplay}
                    </Badge>
                  </div>
                  {isDetailed && !hasFutureStart(pos.period) && pos.description && (
                    <p className='mt-2 text-[15px] leading-[1.7] text-[#d4d4d4]'>
                      {pos.description}
                    </p>
                  )}
                  {isDetailed && skills.length > 0 && (
                    <div className='mt-2.5 flex flex-wrap gap-2'>
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className='inline-flex items-center py-1 pr-3 text-xs text-[#999]'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {isDetailed && hasMore && (
                    <>
                      <button
                        type='button'
                        onClick={() => toggleFlip(pos.id)}
                        aria-expanded={isFlipped}
                        aria-controls={`achievements-${pos.id}`}
                        className='mt-2.5 flex min-h-11 items-center gap-1 text-sm font-medium text-[#a3a3a3] underline decoration-[#525252] underline-offset-2 transition-colors hover:text-[#f5f5f0]'
                      >
                        {isFlipped ? 'Less' : 'More'}
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${isFlipped ? 'rotate-90' : ''}`}
                        />
                      </button>
                      <motion.div
                        id={`achievements-${pos.id}`}
                        aria-hidden={!isFlipped}
                        initial={false}
                        animate={{ height: isFlipped ? 'auto' : 0, opacity: isFlipped ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className='overflow-hidden'
                      >
                        <div className='mt-3 pl-4'>
                          <ul className='space-y-2'>
                            {achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className='flex gap-2 text-sm leading-[1.6] text-[#d4d4d4]'
                              >
                                <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#525252]' />
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
        )}
      </div>
    </motion.article>
  );
}

export function ExperienceSection() {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('compact');
  const scrollToExperienceIdRef = useRef<string | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const timelineMaskId = useRef(`timeline-mask-${Math.random().toString(36).slice(2)}`).current;
  const [timelineSvg, setTimelineSvg] = useState<{
    top: number;
    left: number;
    height: number;
    gapRects: { y: number; height: number }[];
    ticks: { y: number }[];
  } | null>(null);

  const updateTimelineLine = useCallback(() => {
    const container = timelineContainerRef.current;
    if (!container) return;
    const cardsWrapper = container.querySelector<HTMLElement>('[data-timeline-cards]');
    const yearCells = cardsWrapper?.querySelectorAll<HTMLElement>('[data-year-cell]') ?? [];
    if (yearCells.length < 2) {
      setTimelineSvg(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const GAP = 4;
    const first = yearCells[0]!;
    const last = yearCells[yearCells.length - 1]!;
    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();
    const yearCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
    const lineTop = firstRect.bottom - containerRect.top + GAP;
    const lineBottom = lastRect.top - containerRect.top - GAP;
    const lineHeight = Math.max(0, lineBottom - lineTop);

    const gapRects: { y: number; height: number }[] = [];
    const ticks: { y: number }[] = [];
    for (let i = 0; i < yearCells.length; i++) {
      const cell = yearCells[i]!;
      const rect = cell.getBoundingClientRect();

      if (cell.hasAttribute('data-has-year')) {
        const gapTop = rect.top - containerRect.top - GAP;
        const gapHeight = rect.height + GAP * 2;
        const gapBottom = gapTop + gapHeight;
        if (gapBottom <= lineTop || gapTop >= lineTop + lineHeight) continue;
        const clipTop = Math.max(0, gapTop - lineTop);
        const clipBottom = Math.min(lineHeight, gapBottom - lineTop);
        gapRects.push({
          y: clipTop,
          height: Math.max(0, clipBottom - clipTop),
        });
      } else {
        const card = cell.closest('article');
        const logoRow = card?.querySelector<HTMLElement>('[data-logo-row]');
        const anchorRect = logoRow?.getBoundingClientRect();
        const cellCenterY = rect.top + rect.height / 2 - containerRect.top;
        const centerY = anchorRect
          ? anchorRect.top + anchorRect.height / 2 - containerRect.top
          : cellCenterY;
        const tickY = centerY - lineTop;
        if (tickY >= 0 && tickY <= lineHeight) {
          ticks.push({ y: tickY });
        }
      }
    }

    setTimelineSvg({
      top: lineTop,
      left: yearCenterX,
      height: lineHeight,
      gapRects,
      ticks,
    });
  }, [viewMode]);

  useEffect(() => {
    updateTimelineLine();
    const t = setTimeout(updateTimelineLine, 400);
    const container = timelineContainerRef.current;
    if (!container) return () => clearTimeout(t);
    const obs = new ResizeObserver(updateTimelineLine);
    obs.observe(container);
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, [viewMode, updateTimelineLine]);

  useEffect(() => {
    if (scrollToExperienceIdRef.current) {
      const id = scrollToExperienceIdRef.current;
      scrollToExperienceIdRef.current = null;
      setTimeout(() => scrollToExperience(id), 400);
    }
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent<{ experienceId: string }>) => {
      const { experienceId } = e.detail;
      scrollToExperienceIdRef.current = experienceId;
      setTimeout(() => scrollToExperience(experienceId), 100);
    };
    window.addEventListener(REQUEST_SCROLL_TO_EXPERIENCE, handler as EventListener);
    return () => window.removeEventListener(REQUEST_SCROLL_TO_EXPERIENCE, handler as EventListener);
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const allOrgsSorted = useMemo(() => {
    const all = groupExperiencesByOrg();
    return addYearLabels(all.map(org => ({ org })));
  }, []);

  return (
    <section id='experience' className='bg-[#141414] py-12 sm:py-16'>
      <div className='container mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='mx-auto'
        >
          <div className='w-full max-w-6xl xl:max-w-7xl'>
            <p className='section-eyebrow'>02 / Experience</p>
            <h2 className='section-title mb-10'>A career of building.</h2>

            <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-16'>
              <div className='min-w-0'>
                <div className='mb-8 flex min-h-11 flex-wrap items-center justify-between gap-3'>
                  <h3 className='text-left text-xs font-medium uppercase tracking-[0.15em] text-[#999]'>
                    Professional Journey
                  </h3>
                  <div
                    role='group'
                    aria-label='View mode'
                    className='inline-flex shrink-0 items-center gap-6'
                  >
                    <button
                      type='button'
                      aria-pressed={viewMode === 'compact'}
                      onClick={() => setViewMode('compact')}
                      className={`relative min-h-11 border-b-2 px-0.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5c9bd] ${
                        viewMode === 'compact'
                          ? 'border-[#a5c9bd] text-[#f5f5f0]'
                          : 'border-transparent text-[#999] hover:border-[#555] hover:text-[#e5e5df]'
                      }`}
                    >
                      Compact
                    </button>
                    <button
                      type='button'
                      aria-pressed={viewMode === 'detailed'}
                      onClick={() => setViewMode('detailed')}
                      className={`relative min-h-11 border-b-2 px-0.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a5c9bd] ${
                        viewMode === 'detailed'
                          ? 'border-[#a5c9bd] text-[#f5f5f0]'
                          : 'border-transparent text-[#999] hover:border-[#555] hover:text-[#e5e5df]'
                      }`}
                    >
                      Detailed
                    </button>
                  </div>
                </div>
                <div
                  ref={timelineContainerRef}
                  className='relative -ml-3 min-w-0'
                  style={{ overflowAnchor: 'none' }}
                >
                  {/* Vertical timeline - single line, SVG mask cuts gaps at years (no discoloration, true gaps) */}
                  {timelineSvg && timelineSvg.height > 0 && (
                    <svg
                      className='pointer-events-none absolute overflow-visible'
                      style={{
                        top: timelineSvg.top,
                        left: timelineSvg.left,
                        width: 12,
                        height: timelineSvg.height,
                        transform: 'translateX(-50%)',
                      }}
                      aria-hidden
                    >
                      <defs>
                        <mask id={timelineMaskId}>
                          <rect x='0' y='0' width='12' height={timelineSvg.height} fill='white' />
                          {timelineSvg.gapRects.map((g, i) => (
                            <rect key={i} x='0' y={g.y} width='12' height={g.height} fill='black' />
                          ))}
                        </mask>
                      </defs>
                      <rect
                        x='1'
                        y='0'
                        width='1'
                        height={timelineSvg.height}
                        fill='#404040'
                        fillOpacity='0.4'
                        mask={
                          timelineSvg.gapRects.length > 0 ? `url(#${timelineMaskId})` : undefined
                        }
                      />
                      {timelineSvg.ticks.map((tick, i) => (
                        <line
                          key={i}
                          x1='1'
                          y1={tick.y}
                          x2='8'
                          y2={tick.y}
                          stroke='#525252'
                          strokeOpacity='0.5'
                          strokeWidth='1'
                        />
                      ))}
                    </svg>
                  )}
                  <div
                    className={viewMode === 'compact' ? 'space-y-9' : 'space-y-14'}
                    data-timeline-cards
                  >
                    {allOrgsSorted.map(({ org, yearLabel }, index) => (
                      <ExperienceCard
                        key={org.company}
                        org={org}
                        yearLabel={yearLabel}
                        index={index}
                        flippedIds={flippedIds}
                        toggleFlip={toggleFlip}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <aside id='education' aria-labelledby='education-heading' className='min-w-0'>
                <h3
                  id='education-heading'
                  className='mb-8 flex min-h-11 items-center text-left text-xs font-medium uppercase tracking-[0.15em] text-[#999]'
                >
                  Education
                </h3>
                <EducationOrganizationsSidebar />
              </aside>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
