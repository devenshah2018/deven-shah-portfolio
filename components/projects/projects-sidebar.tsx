'use client';

import {
  Calendar,
  Star,
  CheckCircle2,
  Clock,
  Pause,
  Link,
  Building2,
  GraduationCap,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getExperienceById,
  getEducationById,
} from '@/lib/content-registry';
import { Project } from '@/lib/types';

function getProjectCategories(project: Project): string[] {
  return project.categories || ['other'];
}

function isProjectFeatured(project: Project): boolean {
  return getProjectCategories(project).includes('featured');
}

function getRelatedLabels(project: Project): { name: string; type: 'experience' | 'education'; logo?: string }[] {
  if (!project.related_experiences || project.related_experiences.length === 0) return [];
  const seen = new Set<string>();
  return project.related_experiences
    .map(id => {
      const experience = getExperienceById(id);
      if (experience && !seen.has(experience.company)) {
        seen.add(experience.company);
        return { name: experience.company, type: 'experience' as const, logo: experience.companyLogo };
      }
      const education = getEducationById(id);
      if (education && !seen.has(education.institution)) {
        seen.add(education.institution);
        return { name: education.institution, type: 'education' as const, logo: education.logo };
      }
      return null;
    })
    .filter(Boolean) as { name: string; type: 'experience' | 'education'; logo?: string }[];
}

function getStatusBadge(status: string) {
  const iconCls = 'h-2.5 w-2.5';
  const base = 'inline-flex items-center gap-1 text-[10px] font-medium text-slate-500';
  if (status === 'Live' || status === 'Completed') {
    return (
      <span className={`${base} text-emerald-500/90`}>
        <CheckCircle2 className={iconCls} />
        {status}
      </span>
    );
  }
  if (status === 'In Progress') {
    return (
      <span className={`${base} text-blue-400/90`}>
        <Clock className={iconCls} />
        {status}
      </span>
    );
  }
  if (status === 'Paused') {
    return (
      <span className={`${base} text-amber-400/90`}>
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
    }).sort((a, b) => {
      const aCurrent = a.period?.includes('Present') ?? false;
      const bCurrent = b.period?.includes('Present') ?? false;
      if (aCurrent && !bCurrent) return -1;
      if (!aCurrent && bCurrent) return 1;
      return (b.sortDate || '').localeCompare(a.sortDate || '');
    });
  }, [activeCategory]);

  const activeLabel = PROJECT_CATEGORIES.find(c => c.key === activeCategory)?.label ?? 'All';

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold uppercase tracking-wider text-slate-400'>
          Projects
        </h3>

        {/* Expandable filter */}
        <div className='relative'>
          <button
            type='button'
            onClick={() => setFilterOpen(!filterOpen)}
            className='flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-300'
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
                className='absolute right-0 top-full z-20 mt-1 min-w-[140px] rounded-md border border-slate-700/60 bg-slate-900/95 py-1 shadow-xl backdrop-blur-sm'
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
                        ? 'bg-slate-700/50 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-300'
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
          <p className='py-8 text-center text-sm text-slate-500'>No projects found.</p>
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
                className='group border-b border-slate-800/60 py-4 first:pt-0 last:border-b-0 transition-colors hover:border-slate-700/40'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-semibold text-white leading-tight'>
                        {project.title}
                      </h4>
                      {isProjectFeatured(project) && (
                        <Star className='h-3 w-3 flex-shrink-0 text-amber-500/80 fill-amber-500/30' />
                      )}
                    </div>

                    {related.length > 0 && (
                      <div className='mt-1.5 flex flex-wrap items-center gap-1.5'>
                        {related.map((r, i) => (
                          <button
                            key={`${r.name}-${i}`}
                            type='button'
                            onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                            className='inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 transition-colors hover:text-blue-400'
                          >
                            {r.logo ? (
                              <img src={r.logo} alt='' className='h-3 w-3 rounded object-contain' />
                            ) : r.type === 'experience' ? (
                              <Building2 className='h-2.5 w-2.5' />
                            ) : (
                              <GraduationCap className='h-2.5 w-2.5' />
                            )}
                            <span>{r.name}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <div className='mt-1.5 flex items-center gap-3 text-[10px] text-slate-500'>
                      <span className='flex items-center gap-0.5'>
                        <Calendar className='h-2.5 w-2.5' />
                        {project.period}
                      </span>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>

                  <div className='flex flex-shrink-0 items-center gap-0.5'>
                    {getWebLink(project) && (
                      <a
                        href={getWebLink(project)!.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex h-7 w-7 items-center justify-center rounded text-slate-500 transition-colors hover:text-blue-400'
                        aria-label='View live'
                      >
                        <Link className='h-3.5 w-3.5' />
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
                            className='flex h-7 w-7 items-center justify-center rounded text-slate-500 transition-colors hover:text-slate-300'
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

                {project.description && (
                  <p className='mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2'>
                    {project.description}
                  </p>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className='mt-2 flex flex-wrap gap-1.5'>
                    {project.technologies.slice(0, 4).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className='text-[10px] font-medium text-slate-600'
                      >
                        {tech}
                        {i < Math.min(3, project.technologies!.length - 1) && ','}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className='text-[10px] text-slate-600'>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </motion.article>
            );
          })
        )}
      </div>
    </div>
  );
}
