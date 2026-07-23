'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getExperienceById,
  getEducationById,
  getOrganizationById,
} from '@/database/content-registry';
import { requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';
import { Project } from '@/lib/types';
import {
  ProjectMedia,
  getProjectWebLink,
  getProjectCodeAccessPoints,
  hostname,
  iconMap,
} from '@/components/projects/project-media';

/** Gap between cards in a lane, in px — kept in sync with the `gap-5` utility so arrows step one card. */
const LANE_GAP = 20;

/** Lanes are the category taxonomy minus the "All" pseudo-category. */
const LANE_CATEGORIES = PROJECT_CATEGORIES.filter((cat) => cat.key !== 'all');

type RelatedLabel = { name: string; type: 'experience' | 'education' | 'organization'; id: string; logo?: string };

type Lane = { key: string; label: string; projects: Project[] };

/** Resolve a project's related_experiences to org/school/company labels (deduped by name). */
function getRelatedLabels(project: Project): RelatedLabel[] {
  if (!project.related_experiences || project.related_experiences.length === 0) return [];
  const seen = new Set<string>();
  return project.related_experiences
    .map((id) => {
      const experience = getExperienceById(id);
      if (experience && !seen.has(experience.company)) {
        seen.add(experience.company);
        return { name: experience.company, type: 'experience' as const, id, logo: experience.companyLogo };
      }
      const education = getEducationById(id);
      if (education && !seen.has(education.institution)) {
        seen.add(education.institution);
        return { name: education.institution, type: 'education' as const, id, logo: education.logo };
      }
      const organization = getOrganizationById(id);
      if (organization && !seen.has(organization.name)) {
        seen.add(organization.name);
        return { name: organization.name, type: 'organization' as const, id, logo: organization.logo };
      }
      return null;
    })
    .filter(Boolean) as RelatedLabel[];
}

/** Display year for the card meta: "2026 —" while ongoing, else the end year. */
function displayYear(period: string): string {
  const years = period.match(/\d{4}/g);
  if (!years || years.length === 0) return period;
  if (/present/i.test(period)) return `${years[0]} —`;
  return years[years.length - 1] as string;
}

/** Status dot colors aligned to the site's status palette (emerald / blue / amber). */
function statusColor(status: string): string {
  if (status === 'In Progress') return '#60a5fa'; // blue-400
  if (status === 'Paused') return '#fbbf24'; // amber-400
  return '#34d399'; // emerald-400 — Live / Completed
}

function StatusPill({ status }: { status: string }) {
  const color = statusColor(status);
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[#a3a3a3]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 0 3px ${color}1f` }}
      />
      {status}
    </span>
  );
}

/** Jump to the experience/education/organization a project is attached to. */
function scrollToRelated(related: RelatedLabel) {
  if (related.type === 'experience') requestScrollToExperience(related.id);
  else if (related.type === 'education') scrollToEducation(related.id);
  else document.getElementById('organizations')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function ProjectCard({ project }: { project: Project }) {
  const webLink = getProjectWebLink(project);
  const primaryLink = webLink?.url ?? project.link;
  const codeAccessPoints = getProjectCodeAccessPoints(project);
  const relatedLogos = getRelatedLabels(project).filter((r) => r.logo);
  const allTags = project.technologies ?? [];
  const tags = allTags.slice(0, 3);
  const overflowTags = allTags.slice(tags.length);
  // `summary` is the purpose-written one-liner; descriptions are paragraph-length and would
  // truncate to noise in a card this narrow.
  const blurb = project.summary || project.description;

  return (
    // Cards hold a 20rem floor and grow to fill a short lane, so a 2-project shelf doesn't
    // strand half a row of dead space; once they'd overflow, the lane scrolls instead.
    <li
      id={`project-${project.id}`}
      data-lane-card
      className="group/card flex w-[74vw] shrink-0 snap-start scroll-mt-28 flex-col gap-4 sm:w-auto sm:max-w-[26rem] sm:flex-[1_0_20rem]"
    >
      <ProjectMedia project={project} aspectClass="aspect-[16/10]" />

      {/* `relative` scopes the title's stretched link to the text block, leaving the media its own link. */}
      <div className="relative flex flex-1 flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12px] font-medium tabular-nums text-[#8a8a8a]">
            {displayYear(project.period)}
          </span>
          <StatusPill status={project.status} />
        </div>

        <div>
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/40"
          >
            <h4 className="text-[19px] font-semibold leading-tight text-[#f5f5f0] transition-colors group-hover/card:text-white">
              {project.title}
            </h4>
          </a>
          {project.subtitle && (
            <p className="mt-1.5 line-clamp-2 text-[10px] uppercase leading-relaxed tracking-[0.15em] text-[#8a8a8a]">
              {project.subtitle}
            </p>
          )}
        </div>

        {blurb && (
          <p className="line-clamp-2 text-[13.5px] leading-relaxed text-[#a3a3a3]" title={project.description}>
            {blurb}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tech, i) => (
              <span
                key={i}
                className="rounded-full border border-[#2a2a2a] px-2.5 py-0.5 text-[11px] text-[#a3a3a3]"
              >
                {tech}
              </span>
            ))}
            {overflowTags.length > 0 && (
              <span
                className="px-1 py-0.5 text-[11px] tabular-nums text-[#8a8a8a]"
                title={overflowTags.join(', ')}
              >
                +{overflowTags.length}
              </span>
            )}
          </div>
        )}

        {/* `mt-auto` keeps footers aligned across cards of unequal text length. */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1.5">
          {webLink && (
            <a
              href={webLink.url}
              target="_blank"
              rel="noopener noreferrer"
              title={webLink.url}
              className="group/link relative z-10 inline-flex min-w-0 items-center gap-1 text-[12.5px] text-blue-400 transition-colors hover:text-blue-300"
            >
              <span className="max-w-[9.5rem] truncate">{hostname(webLink.url)}</span>
              <ArrowUpRight className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}

          {codeAccessPoints.map((ap, i) => {
            const config = iconMap[ap.type];
            if (!config) return null;
            return (
              <a
                key={`ap-${i}`}
                href={ap.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#161616] transition-colors hover:border-[#3d3d3d] hover:bg-[#1f1f1f]"
                aria-label={`${project.title} on ${config.alt}`}
                title={config.alt}
              >
                <img
                  src={config.src}
                  alt=""
                  className={`h-[15px] w-[15px] object-contain ${ap.type === 'github' ? 'invert' : ''}`}
                />
              </a>
            );
          })}

          {relatedLogos.length > 0 && (
            <span className="ml-auto flex items-center gap-1.5">
              {relatedLogos.map((r, i) => (
                <button
                  key={`rel-${i}`}
                  type="button"
                  onClick={() => scrollToRelated(r)}
                  className="relative z-10 h-8 w-8 shrink-0 overflow-hidden rounded-[8px] opacity-90 ring-1 ring-white/10 transition-all hover:opacity-100 hover:ring-white/25"
                  aria-label={`View ${r.name}`}
                  title={r.name}
                >
                  <img src={r.logo} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function ProjectLane({ lane, index }: { lane: Lane; index: number }) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [edges, setEdges] = useState({ overflows: false, atStart: true, atEnd: true });

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      overflows: max > 8,
      atStart: el.scrollLeft <= 8,
      atEnd: el.scrollLeft >= max - 8,
    });
  }, []);

  // Re-measure on scroll and on resize — card widths are viewport-relative, so whether a lane
  // overflows (and therefore whether arrows/fades belong) changes with the window.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncEdges) : null;
    observer?.observe(el);
    return () => {
      el.removeEventListener('scroll', syncEdges);
      observer?.disconnect();
    };
  }, [syncEdges, lane.projects.length]);

  const nudge = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-lane-card]');
    const step = card ? card.offsetWidth + LANE_GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const arrowClass =
    'flex h-8 w-8 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#191919] text-[#a3a3a3] transition-colors hover:border-[#3d3d3d] hover:bg-[#222] hover:text-[#f5f5f0] disabled:pointer-events-none disabled:opacity-30';

  return (
    <motion.section
      aria-labelledby={`projects-lane-${lane.key}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.06 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <h3
          id={`projects-lane-${lane.key}`}
          className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#e5e5e5]"
        >
          {lane.label}
        </h3>
        <span className="text-[12px] tabular-nums text-[#8a8a8a]">
          {String(lane.projects.length).padStart(2, '0')}
        </span>
        <div className="h-px flex-1 bg-[#242424]" aria-hidden />
        {edges.overflows && (
          <div className="hidden items-center gap-1.5 sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={edges.atStart}
              className={arrowClass}
              aria-label={`Scroll ${lane.label} projects left`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={edges.atEnd}
              className={arrowClass}
              aria-label={`Scroll ${lane.label} projects right`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <ul
          ref={scrollerRef}
          className="lane-scroll flex snap-x snap-proximity items-stretch gap-5 overflow-x-auto overflow-y-hidden px-0.5 py-2"
        >
          {lane.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>

        {/* Edge fades signal that the shelf continues past the viewport. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#141414] to-transparent transition-opacity duration-300 ${
            edges.overflows && !edges.atStart ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-[#141414] to-transparent transition-opacity duration-300 ${
            edges.overflows && !edges.atEnd ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </motion.section>
  );
}

export function ProjectsHorizontalSection() {
  const [selectedOrgs, setSelectedOrgs] = useState<Set<string>>(new Set());

  // Cross-page navigation (papers page, hash links) clears filters so the target project is visible.
  useEffect(() => {
    const handleReset = () => setSelectedOrgs(new Set());
    window.addEventListener('resetProjectFilter', handleReset);
    return () => window.removeEventListener('resetProjectFilter', handleReset);
  }, []);

  // Orgs/schools/companies attached to any project (deduped by name, first appearance order).
  const attachedOrgs = useMemo(() => {
    const byName = new Map<string, RelatedLabel>();
    for (const project of PROJECTS) {
      for (const r of getRelatedLabels(project)) {
        if (r.logo && !byName.has(r.name)) byName.set(r.name, r);
      }
    }
    return Array.from(byName.values());
  }, []);

  const toggleOrg = (name: string) => {
    setSelectedOrgs((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const lanes = useMemo<Lane[]>(() => {
    const matching = PROJECTS.filter(
      (project) =>
        selectedOrgs.size === 0 || getRelatedLabels(project).some((r) => selectedOrgs.has(r.name))
    ).sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));

    // Each project lands in exactly one lane (its first matching category). Rendering a
    // multi-category project twice would duplicate its DOM id and break #project-<id> deep links.
    const claimed = new Set<string>();
    const built: Lane[] = [];
    for (const cat of LANE_CATEGORIES) {
      const projects = matching.filter(
        (project) => !claimed.has(project.id) && (project.categories || []).includes(cat.key)
      );
      projects.forEach((project) => claimed.add(project.id));
      built.push({ key: cat.key, label: cat.label, projects });
    }

    // Anything with an unknown/missing category still gets a home rather than silently vanishing.
    const leftovers = matching.filter((project) => !claimed.has(project.id));
    if (leftovers.length > 0) built.push({ key: 'other', label: 'Other', projects: leftovers });

    return built.filter((lane) => lane.projects.length > 0);
  }, [selectedOrgs]);

  const totalShown = lanes.reduce((sum, lane) => sum + lane.projects.length, 0);

  return (
    <section id="projects" className="bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
        >
          <div className="flex items-baseline gap-3">
            <h2 className="text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
              Projects
            </h2>
            <span className="text-[13px] tabular-nums text-[#8a8a8a]">{totalShown}</span>
          </div>

          {attachedOrgs.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {attachedOrgs.map((org) => {
                const active = selectedOrgs.has(org.name);
                return (
                  <button
                    key={org.name}
                    type="button"
                    onClick={() => toggleOrg(org.name)}
                    aria-pressed={active}
                    aria-label={`Filter by ${org.name}`}
                    title={org.name}
                    className={`h-9 w-9 overflow-hidden rounded-[10px] transition-all ${
                      active
                        ? 'opacity-100 ring-2 ring-[#f5f5f0]/70'
                        : 'opacity-70 ring-1 ring-white/10 hover:opacity-100 hover:ring-white/25'
                    }`}
                  >
                    <img src={org.logo} alt="" className="h-full w-full object-contain" />
                  </button>
                );
              })}
              {selectedOrgs.size > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedOrgs(new Set())}
                  className="ml-1 text-[12px] text-[#8a8a8a] underline-offset-4 transition-colors hover:text-[#e5e5e5] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </motion.div>

        {lanes.length === 0 ? (
          <p className="border-t border-[#242424] py-16 text-center text-sm text-[#8a8a8a]">
            No projects match this filter.
          </p>
        ) : (
          <div className="flex flex-col gap-14">
            {lanes.map((lane, idx) => (
              <ProjectLane key={lane.key} lane={lane} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
