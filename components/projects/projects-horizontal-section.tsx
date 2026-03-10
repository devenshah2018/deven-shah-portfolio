'use client';

import {
  Calendar,
  CheckCircle2,
  Clock,
  Pause,
  ExternalLink,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { LinkThumbnail } from '@/components/projects/link-thumbnail';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import {
  PROJECTS,
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

function getStatusBadge(status: string, size: 'sm' | 'md' = 'sm') {
  const iconCls = size === 'md' ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5';
  const textCls = size === 'md' ? 'text-sm' : 'text-xs';
  const base = `inline-flex items-center gap-1 ${textCls} font-medium text-[#a3a3a3]`;
  if (status === 'Live' || status === 'Completed') {
    return <span className={base}><CheckCircle2 className={iconCls} />{status}</span>;
  }
  if (status === 'In Progress') {
    return <span className={base}><Clock className={iconCls} />{status}</span>;
  }
  if (status === 'Paused') {
    return <span className={base}><Pause className={iconCls} />{status}</span>;
  }
  return <span className={base}>{status}</span>;
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

function getAccessPoints(project: Project) {
  if (project.access_points && project.access_points.length > 0) {
    return project.access_points;
  }
  return project.accessible_at.map(type => ({ type, url: project.link, label: undefined }));
}

const iconMap: Record<string, { src: string; alt: string }> = {
  github: { src: '/github-icon.svg', alt: 'GitHub' },
  kaggle: { src: '/kaggle-icon.png', alt: 'Kaggle' },
  vscode: { src: '/vscode-icon.png', alt: 'VSCode' },
};

function FeaturedProjectCard({ project, index, size = 'normal' }: { project: Project; index: number; size?: 'large' | 'small' | 'normal' }) {
  const related = getRelatedLabels(project);
  const webLink = getWebLink(project);
  const isLarge = size === 'large';

  return (
    <motion.article
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`group flex h-full w-full flex-col scroll-mt-20 ${isLarge ? 'min-h-0' : ''}`}
    >
      <a
        href={webLink?.url ?? project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full w-full flex-col overflow-hidden rounded-xl border-none bg-transparent transition-colors"
      >
        {webLink && (
          <div className="w-full flex-shrink-0 overflow-hidden aspect-[40/21]">
            <LinkThumbnail url={webLink.url} title={project.title} className="h-full w-full transition-transform duration-300 group-hover:scale-[1.02]" objectFit="contain" />
          </div>
        )}
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <div className="flex items-center gap-2">
            <h4 className={`font-semibold text-[#f5f5f0] ${isLarge ? 'text-base sm:text-lg' : ''}`}>{project.title}</h4>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#a3a3a3]">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" />
              {project.period}
            </span>
            {getStatusBadge(project.status, 'md')}
          </div>
          <div className="mt-2 min-h-[2.5rem]">
            {project.description && (
              <p className="line-clamp-2 text-sm leading-[1.6] text-[#a3a3a3]">{project.description}</p>
            )}
          </div>
          <div className="mt-2 min-h-[1.75rem] flex flex-wrap gap-1.5">
            {related.slice(0, 2).map((r, i) => (
              <button
                key={`${r.name}-${i}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  r.type === 'experience'
                    ? scrollToExperience(r.id)
                    : scrollToEducation(r.id);
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#a3a3a3] underline decoration-[#404040] underline-offset-1 transition-colors hover:text-[#f5f5f0]"
              >
                {r.logo ? (
                  <img src={r.logo} alt="" className="h-4 w-4 rounded object-contain" />
                ) : r.type === 'experience' ? (
                  <Building2 className="h-2.5 w-2.5" />
                ) : (
                  <GraduationCap className="h-2.5 w-2.5" />
                )}
                <span>{r.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-2 pt-3">
            {webLink && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#737373]">
                <ExternalLink className="h-3 w-3" />
                Visit
              </span>
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
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                    aria-label={config.alt}
                  >
                    <img src={config.src} alt={config.alt} className={`h-3.5 w-3.5 object-contain ${ap.type === 'github' ? 'invert' : ''}`} />
                  </a>
                );
              })}
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function OtherProjectCard({ project, index }: { project: Project; index: number }) {
  const related = getRelatedLabels(project);
  const webLink = getWebLink(project);

  return (
    <motion.article
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group flex h-full flex-col scroll-mt-20 rounded-xl border-none bg-transparent p-4 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-[#f5f5f0]">{project.title}</h4>
        <div className="flex items-center gap-1">
          {webLink && (
            <a
              href={webLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
              aria-label="Visit"
            >
              <ExternalLink className="h-3.5 w-3.5" />
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]"
                  aria-label={config.alt}
                >
                  <img src={config.src} alt={config.alt} className={`h-3.5 w-3.5 object-contain ${ap.type === 'github' ? 'invert' : ''}`} />
                </a>
              );
            })}
        </div>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[#a3a3a3]">
        <span className="flex items-center gap-1">
          <Calendar className="h-2.5 w-2.5 shrink-0" />
          {project.period}
        </span>
        {getStatusBadge(project.status)}
        {related.length > 0 && (
          <>
            <span className="text-[#525252]">·</span>
            {related.slice(0, 2).map((r, i) => (
              <button
                key={`${r.name}-${i}`}
                type="button"
                onClick={() =>
                  r.type === 'experience'
                    ? scrollToExperience(r.id)
                    : scrollToEducation(r.id)
                }
                className="font-medium underline decoration-[#404040] underline-offset-1 transition-colors hover:text-[#f5f5f0]"
              >
                {r.name}
              </button>
            ))}
          </>
        )}
      </div>
      {project.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-[1.6] text-[#a3a3a3]">{project.description}</p>
      )}
    </motion.article>
  );
}

export function ProjectsHorizontalSection() {
  const { featuredProjects, otherProjects } = useMemo(() => {
    const featured: Project[] = [];
    const other: Project[] = [];
    const sorted = [...PROJECTS].sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));
    for (const p of sorted) {
      if (isProjectFeatured(p)) featured.push(p);
      else other.push(p);
    }
    return { featuredProjects: featured, otherProjects: other };
  }, []);

  return (
    <section id="projects" className="bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-12 text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
            Projects
          </h2>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[7fr_3fr] lg:gap-10">
            {/* Left: Featured block grid - big + 2 small */}
            {featuredProjects.length > 0 && (
              <div>
                <h3 className="mb-6 text-base font-medium uppercase tracking-[0.2em] text-[#737373]">
                  Featured
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {featuredProjects[0] && (
                    <div className="col-span-2 min-h-0">
                      <FeaturedProjectCard key={featuredProjects[0].id} project={featuredProjects[0]} index={0} size="large" />
                    </div>
                  )}
                  {featuredProjects[1] && (
                    <div className="min-h-0">
                      <FeaturedProjectCard key={featuredProjects[1].id} project={featuredProjects[1]} index={1} size="small" />
                    </div>
                  )}
                  {featuredProjects[2] && (
                    <div className="min-h-0">
                      <FeaturedProjectCard key={featuredProjects[2].id} project={featuredProjects[2]} index={2} size="small" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right: More projects - 2 column grid */}
            {otherProjects.length > 0 && (
              <div>
                <h3 className="mb-6 text-base font-medium uppercase tracking-[0.2em] text-[#737373]">
                  More Projects
                </h3>
                <div className="grid grid-cols-1 gap-4 items-stretch">
                  {otherProjects.map((project, idx) => (
                    <OtherProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
