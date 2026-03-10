'use client';

import {
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  Pause,
  ExternalLink,
  Building2,
  GraduationCap,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { LinkThumbnail } from '@/components/projects/link-thumbnail';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getExperienceById,
  getEducationById,
} from '@/lib/content-registry';
import { scrollToExperience, scrollToEducation } from '@/lib/url-utils';
import { Project } from '@/lib/types';

function getProjectCategories(project: Project): string[] {
  return project.categories || ['other'];
}

function isProjectFeatured(project: Project): boolean {
  return getProjectCategories(project).includes('featured');
}

function getRelatedLabels(project: Project): { name: string; type: 'experience' | 'education'; id: string; logo?: string }[] {
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
      return null;
    })
    .filter(Boolean) as { name: string; type: 'experience' | 'education'; id: string; logo?: string }[];
}

function getStatusBadge(status: string, size: 'sm' | 'md' | 'lg' = 'sm') {
  const iconCls = size === 'lg' ? 'h-4 w-4' : size === 'md' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5';
  const textCls = size === 'lg' ? 'text-base' : size === 'md' ? 'text-[15px] leading-[1.7]' : 'text-[10px]';
  const base = `inline-flex items-center gap-1 ${textCls} font-medium text-[#a3a3a3]`;
  if (status === 'Live' || status === 'Completed') {
    return (
      <span className={base}>
        <CheckCircle2 className={iconCls} />
        {status}
      </span>
    );
  }
  if (status === 'In Progress') {
    return (
      <span className={base}>
        <Clock className={iconCls} />
        {status}
      </span>
    );
  }
  if (status === 'Paused') {
    return (
      <span className={base}>
        <Pause className={iconCls} />
        {status}
      </span>
    );
  }
  return <span className={base}>{status}</span>;
}

function getAccessPoints(project: Project) {
  if (project.access_points && project.access_points.length > 0) {
    return project.access_points;
  }
  return project.accessible_at.map(type => ({
    type,
    url: project.link,
    label: undefined,
  }));
}

function getWebLink(project: Project) {
  if (project.access_points && project.access_points.length > 0) {
    return project.access_points.find(ap => ap.type === 'hosted' || ap.type === 'web');
  }
  if (project.accessible_at.includes('hosted')) {
    return { type: 'hosted' as const, url: project.link, label: undefined };
  }
  return null;
}

const iconMap: Record<string, { src: string; alt: string }> = {
  github: { src: '/github-icon.svg', alt: 'GitHub' },
  kaggle: { src: '/kaggle-icon.png', alt: 'Kaggle' },
  vscode: { src: '/vscode-icon.png', alt: 'VSCode' },
};

export function ProjectsSidebar() {
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  React.useEffect(() => {
    const handler = () => setActiveCategory('all');
    window.addEventListener('resetProjectFilter', handler);
    return () => window.removeEventListener('resetProjectFilter', handler);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p: Project) => {
      const cats = getProjectCategories(p);
      return activeCategory === 'all' || cats.includes(activeCategory);
    }).sort((a, b) => (a.sortDate || '').localeCompare(b.sortDate || ''));
  }, [activeCategory]);

  const activeLabel = PROJECT_CATEGORIES.find(c => c.key === activeCategory)?.label ?? 'All';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
          Projects
        </h3>

        {/* Expandable filter */}
        <div className='relative'>
          <button
            type='button'
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium text-[#a3a3a3] transition-colors hover:bg-[#262626] hover:text-[#f5f5f0]"
            aria-expanded={filterOpen}
            aria-haspopup='listbox'
            aria-label='Filter projects'
          >
            <Filter className='h-3 w-3' />
            <span>{activeLabel}</span>
            <ChevronDown className={`h-3 w-3 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          {filterOpen && (
            <>
              <div
                className='fixed inset-0 z-10'
                aria-hidden
                onClick={() => setFilterOpen(false)}
              />
              <div
                role='listbox'
                className="absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-lg border border-[#404040]/40 bg-[#141414] py-1 shadow-xl"
              >
                {PROJECT_CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    role='option'
                    aria-selected={activeCategory === cat.key}
                    type='button'
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setFilterOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors ${
                      activeCategory === cat.key
                        ? 'bg-[#262626] text-[#f5f5f0]'
                        : 'text-[#a3a3a3] hover:bg-[#262626] hover:text-[#f5f5f0]'
                    }`}
                  >
                    {cat.key === 'featured' && <Star className='h-3 w-3' />}
                    {cat.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className='space-y-0 pt-1'>
        {filteredProjects.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#737373]">No projects found.</p>
        ) : (
          filteredProjects.map((project: Project, idx: number) => {
            const related = getRelatedLabels(project);

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                viewport={{ once: true }}
                className="group min-h-[180px] border-b border-[#404040]/30 py-4 first:pt-0 last:border-b-0 transition-colors hover:border-[#525252]/40"
              >
                <div className={`flex gap-4 ${activeCategory === 'featured' && isProjectFeatured(project) && getWebLink(project) ? 'mb-6 items-start' : ''}`}>
                  {activeCategory === 'featured' && isProjectFeatured(project) && getWebLink(project) && (
                    <div className='flex w-1/2 shrink-0 items-start overflow-hidden rounded-xl'>
                      <LinkThumbnail
                        url={getWebLink(project)!.url}
                        title={project.title}
                        className='block aspect-[40/21] w-full'
                      />
                    </div>
                  )}
                  <div className='flex min-w-0 flex-1 flex-col gap-1'>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex min-w-0 flex-1 items-center gap-2'>
                        <h4 className="truncate text-base font-semibold leading-tight text-[#f5f5f0]">
                          {project.title}
                        </h4>
                      </div>
                      {activeCategory !== 'featured' && (
                        <div className='flex flex-shrink-0 items-center gap-1.5'>
                          {getWebLink(project) && (
                            <a
                              href={getWebLink(project)!.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                              aria-label={`Live: ${getWebLink(project)!.url}`}
                              title={getWebLink(project)!.url}
                            >
                              <ExternalLink className='h-3.5 w-3.5' />
                            </a>
                          )}
                          {getAccessPoints(project)
                            .filter(ap => ap.type !== 'hosted' && ap.type !== 'web')
                            .map((ap, i) => {
                              const config = iconMap[ap.type];
                              if (!config) return null;
                              return (
                                <a
                                  key={i}
                                  href={ap.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                                  aria-label={config.alt}
                                >
                                  <img
                                    src={config.src}
                                    alt={config.alt}
                                    className={`h-3.5 w-3.5 object-contain ${ap.type === 'github' ? 'invert' : ''}`}
                                  />
                                </a>
                              );
                            })}
                        </div>
                      )}
                    </div>
                    {activeCategory === 'featured' && isProjectFeatured(project) ? (
                      <div className='flex flex-col gap-1'>
                        <span className='flex items-center gap-1 text-[15px] text-[#d4d4d4]'>
                          <Calendar className='h-3.5 w-3.5 shrink-0' />
                          {project.period}
                        </span>
                        {getStatusBadge(project.status, 'md')}
                        {related.length > 0 && (
                          <div className='flex flex-wrap gap-1'>
                            {related.map((r, i) => (
                              <button
                                key={`${r.name}-${i}`}
                                type="button"
                                onClick={() =>
                                    r.type === 'experience'
                                    ? scrollToExperience(r.id)
                                    : scrollToEducation(r.id)
                                }
                                className="inline-flex items-center gap-1 text-[15px] font-medium text-[#d4d4d4] underline decoration-[#404040] underline-offset-1 transition-colors hover:text-[#f5f5f0] hover:underline-[#525252]"
                              >
                                {r.logo ? (
                                  <img src={r.logo} alt='' className='h-5 w-5 rounded object-contain shrink-0' />
                                ) : r.type === 'experience' ? (
                                  <Building2 className='h-2.5 w-2.5 shrink-0' />
                                ) : (
                                  <GraduationCap className='h-2.5 w-2.5 shrink-0' />
                                )}
                                <span>{r.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        <div className='flex items-center gap-1.5'>
                          {getWebLink(project) && (
                            <a
                              href={getWebLink(project)!.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                              aria-label={`Live: ${getWebLink(project)!.url}`}
                              title={getWebLink(project)!.url}
                            >
                              <ExternalLink className='h-3.5 w-3.5' />
                            </a>
                          )}
                          {getAccessPoints(project)
                            .filter(ap => ap.type !== 'hosted' && ap.type !== 'web')
                            .map((ap, i) => {
                              const config = iconMap[ap.type];
                              if (!config) return null;
                              return (
                                <a
                                  key={i}
                                  href={ap.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                                  aria-label={config.alt}
                                >
                                  <img
                                    src={config.src}
                                    alt={config.alt}
                                    className={`h-3.5 w-3.5 object-contain ${ap.type === 'github' ? 'invert' : ''}`}
                                  />
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[15px] text-[#d4d4d4]">
                          <span className='flex items-center gap-1'>
                            <Calendar className='h-2.5 w-2.5 shrink-0' />
                            {project.period}
                          </span>
                          {getStatusBadge(project.status, 'md')}
                          {related.length > 0 && (
                            <>
                              <span className='text-[#525252]'>·</span>
                              {related.map((r, i) => (
                                <button
                                  key={`${r.name}-${i}`}
                                  type="button"
                                  onClick={() =>
                                    r.type === 'experience'
                                    ? scrollToExperience(r.id)
                                    : scrollToEducation(r.id)
                                  }
                                  className="inline-flex items-center gap-1 font-medium underline decoration-[#404040] underline-offset-1 transition-colors hover:text-[#f5f5f0] hover:underline-[#525252]"
                                >
                                  {r.logo ? (
                                    <img src={r.logo} alt='' className='h-5 w-5 rounded object-contain shrink-0' />
                                  ) : r.type === 'experience' ? (
                                    <Building2 className='h-2.5 w-2.5 shrink-0' />
                                  ) : (
                                    <GraduationCap className='h-2.5 w-2.5 shrink-0' />
                                  )}
                                  <span>{r.name}</span>
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {project.description && (
                  <p className="mt-1 break-words text-[15px] leading-[1.7] text-[#d4d4d4]">
                    {project.description}
                  </p>
                )}
              </motion.article>
            );
          })
        )}
      </div>
    </div>
  );
}
