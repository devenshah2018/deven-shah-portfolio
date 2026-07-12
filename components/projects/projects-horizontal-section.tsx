'use client';

import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  PROJECTS,
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

/** Category filters shown next to the org filters. */
const CATEGORY_FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'products', label: 'Products' },
  { key: 'apps', label: 'Apps & Tools' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'theory', label: 'Theory' },
];

type RelatedLabel = { name: string; type: 'experience' | 'education' | 'organization'; id: string; logo?: string };

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

/** Display year for the right column: "2026 —" while ongoing, else the end year. */
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
    <span className="inline-flex items-center gap-2 text-[13px] text-[#a3a3a3]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 0 3px ${color}1f` }}
      />
      {status}
    </span>
  );
}

function ProjectIndexRow({ project, number }: { project: Project; number: number }) {
  const relatedLogos = getRelatedLabels(project).filter((r) => r.logo);
  const webLink = getProjectWebLink(project);
  const primaryLink = webLink?.url ?? project.link;
  const codeAccessPoints = getProjectCodeAccessPoints(project);

  return (
    <motion.article
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24 border-b border-[#242424] py-8 sm:py-10"
    >
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[2.5rem_minmax(0,1fr)_13rem] lg:gap-x-8">
        {/* Index number */}
        <div className="text-sm font-medium tabular-nums text-[#6b6b6b]">
          {String(number).padStart(2, '0')}
        </div>

        {/* Main: text column + floating media */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="min-w-0 flex-1 sm:max-w-[17rem]">
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/title inline-block"
            >
              <h3 className="text-xl font-semibold leading-tight text-[#f5f5f0] transition-colors sm:text-2xl group-hover/title:text-white">
                {project.title}
              </h3>
            </a>
            {project.subtitle && (
              <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-[#737373]">
                {project.subtitle}
              </p>
            )}
            {project.description && (
              <p className="mt-3 text-[15px] leading-relaxed text-[#a3a3a3]">{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-[#2a2a2a] bg-transparent px-3 py-1 text-[12px] text-[#a3a3a3]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {(project.demoVideo || webLink || codeAccessPoints.length > 0) && (
            <div className="w-full sm:flex-1 sm:max-w-[480px]">
              <ProjectMedia project={project} />
            </div>
          )}
        </div>

        {/* Right meta column */}
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium tabular-nums tracking-tight text-[#e5e5e5]">
              {displayYear(project.period)}
            </span>
            <StatusPill status={project.status} />
          </div>

          {/* Access: "@" + live link + source */}
          {(webLink || codeAccessPoints.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#5a5a5a]">@</span>
              {webLink && (
                <a
                  href={webLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-w-0 max-w-full items-center gap-1 text-[13px] text-blue-400 transition-colors hover:text-blue-300"
                >
                  <span className="truncate">{hostname(webLink.url)}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#161616] transition-colors hover:border-[#3d3d3d] hover:bg-[#1f1f1f]"
                    aria-label={config.alt}
                    title={config.alt}
                  >
                    <img
                      src={config.src}
                      alt={config.alt}
                      className={`h-[18px] w-[18px] object-contain ${ap.type === 'github' ? 'invert' : ''}`}
                    />
                  </a>
                );
              })}
            </div>
          )}

          {/* Associated orgs — soft "with" + logo chips */}
          {relatedLogos.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-[11px] text-[#5a5a5a]">with</span>
              {relatedLogos.map((r, i) => (
                <button
                  key={`rel-${i}`}
                  type="button"
                  onClick={() => {
                    if (r.type === 'experience') requestScrollToExperience(r.id);
                    else if (r.type === 'education') scrollToEducation(r.id);
                    else
                      document
                        .getElementById('organizations')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="h-8 w-8 shrink-0 overflow-hidden rounded-[9px] opacity-95 ring-1 ring-white/10 transition-all hover:opacity-100 hover:ring-white/25"
                  aria-label={`View ${r.name}`}
                  title={r.name}
                >
                  <img src={r.logo} alt={r.name} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsHorizontalSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedOrgs, setSelectedOrgs] = useState<Set<string>>(new Set());

  // Cross-page navigation (papers page, hash links) resets filters so the target project is visible.
  useEffect(() => {
    const handleReset = () => {
      setActiveCategory('all');
      setSelectedOrgs(new Set());
    };
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

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const cats = project.categories || [];
      const matchesCategory = activeCategory === 'all' || cats.includes(activeCategory);
      const matchesOrg =
        selectedOrgs.size === 0 ||
        getRelatedLabels(project).some((r) => selectedOrgs.has(r.name));
      return matchesCategory && matchesOrg;
    }).sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));
  }, [activeCategory, selectedOrgs]);

  return (
    <section id="projects" className="bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
            Projects
          </h2>

          {/* Filters: attached org logos, then category pills */}
          <div className="mb-2 flex flex-wrap items-center gap-x-5 gap-y-3">
            {attachedOrgs.length > 0 && (
              <div className="flex items-center gap-2">
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
                      <img src={org.logo} alt={org.name} className="h-full w-full object-contain" />
                    </button>
                  );
                })}
              </div>
            )}

            {attachedOrgs.length > 0 && (
              <span className="hidden h-6 w-px bg-[#2a2a2a] sm:block" aria-hidden />
            )}

            <div className="flex flex-wrap gap-2">
              {CATEGORY_FILTERS.map((cat) => {
                const active = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategory(cat.key)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                      active
                        ? 'border-[#404040] bg-[#262626] text-[#f5f5f0]'
                        : 'border-[#333]/60 bg-transparent text-[#a3a3a3] hover:border-[#3a3a3a]/80 hover:bg-[#1f1f1f] hover:text-[#c4c4c4]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project index */}
          <div className="mt-8 border-t border-[#242424]">
            {filteredProjects.length === 0 ? (
              <p className="py-16 text-center text-sm text-[#737373]">No projects found.</p>
            ) : (
              filteredProjects.map((project, idx) => (
                <ProjectIndexRow key={project.id} project={project} number={idx + 1} />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
