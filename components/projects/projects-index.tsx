'use client';

import { ArrowUpRight, Download, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  getExperienceById,
  getEducationById,
  getOrganizationById,
} from '@/database/content-registry';
import { requestScrollToExperience, scrollToEducation, scrollToSection } from '@/lib/url-utils';
import { Project } from '@/lib/types';

type RelatedLabel = {
  name: string;
  type: 'experience' | 'education' | 'organization';
  id: string;
  logo?: string;
};

/** Resolve a project's related_experiences to org/school/company labels (deduped by name). */
function getRelatedLabels(project: Project): RelatedLabel[] {
  if (!project.related_experiences || project.related_experiences.length === 0) return [];
  const seen = new Set<string>();
  return project.related_experiences
    .map(id => {
      const experience = getExperienceById(id);
      if (experience && !seen.has(experience.company)) {
        seen.add(experience.company);
        return {
          name: experience.company,
          type: 'experience' as const,
          id,
          logo: experience.companyLogo,
        };
      }
      const education = getEducationById(id);
      if (education && !seen.has(education.institution)) {
        seen.add(education.institution);
        return {
          name: education.institution,
          type: 'education' as const,
          id,
          logo: education.logo,
        };
      }
      const organization = getOrganizationById(id);
      if (organization && !seen.has(organization.name)) {
        seen.add(organization.name);
        return {
          name: organization.name,
          type: 'organization' as const,
          id,
          logo: organization.logo,
        };
      }
      return null;
    })
    .filter(Boolean) as RelatedLabel[];
}

function ProjectRow({ project }: { project: Project }) {
  const related = getRelatedLabels(project);
  const links = project.access_points?.length
    ? project.access_points
    : [{ type: project.entry_point, url: project.link, label: 'View project' }];
  return (
    <li id={`project-${project.id}`} className='project-index-row group py-7 sm:py-8'>
      <div className='grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-10'>
        <div className='min-w-0'>
          <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#999]'>
            <span className='tabular-nums'>
              {project.period.match(/\d{4}/g)?.at(-1) ?? project.period}
            </span>
            <span className='inline-flex items-center gap-2'>
              <span
                aria-hidden='true'
                className={`h-1.5 w-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-sky-300' : 'bg-emerald-300'}`}
              />
              {project.status}
            </span>
          </div>
          <h3 className='text-lg font-medium leading-snug tracking-tight text-[#f5f5f0] sm:text-xl'>
            <a
              href={project.link}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex min-h-11 items-center transition-colors hover:text-[#a5c9bd]'
            >
              {project.title}
            </a>
          </h3>
          {related.length > 0 && (
            <div className='mt-3 flex flex-wrap gap-3'>
              {related.map(item => (
                <button
                  key={item.id}
                  type='button'
                  className='inline-flex min-h-11 items-center gap-2 py-1 text-sm text-[#999] transition-colors hover:text-white'
                  onClick={() => {
                    if (item.type === 'experience') requestScrollToExperience(item.id);
                    else if (item.type === 'education') scrollToEducation(item.id);
                    else scrollToSection('organizations');
                  }}
                >
                  {item.logo && (
                    <img src={item.logo} alt='' className='h-4 w-4 rounded-sm object-contain' />
                  )}
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className='min-w-0'>
          <p className='text-sm leading-7 text-[#b1b1ad]'>{project.description}</p>
          <p className='mt-3 text-xs leading-6 text-[#888]'>{project.technologies.join(' · ')}</p>
          <div className='mt-3 flex flex-wrap items-center gap-x-6 gap-y-2'>
            {links.map(link => (
              <a
                key={link.url}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${link.label || link.type} for ${project.title}`}
                className='inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-[#d4d4cd] transition-colors hover:text-[#a5c9bd]'
              >
                {link.label || link.type}
                <ArrowUpRight className='h-3.5 w-3.5' aria-hidden='true' />
              </a>
            ))}
            {project.paper && (
              <a
                href={project.paper}
                download
                aria-label={`Download paper for ${project.title} (PDF)`}
                className='inline-flex min-h-11 items-center gap-2 text-xs font-medium text-[#a5c9bd] transition-colors hover:text-white'
              >
                <Download className='h-3.5 w-3.5' aria-hidden='true' />
                Paper <span className='text-[#888]'>PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProjectsIndex() {
  const [category, setCategory] = useState('featured');
  const [query, setQuery] = useState('');
  useEffect(() => {
    const reset = () => {
      setCategory('all');
      setQuery('');
    };
    window.addEventListener('resetProjectFilter', reset);
    return () => window.removeEventListener('resetProjectFilter', reset);
  }, []);
  const search = query.trim().toLowerCase();
  const projects = PROJECTS.filter(project => {
    if (search)
      return [
        project.title,
        project.description,
        ...project.technologies,
        ...getRelatedLabels(project).map(item => item.name),
      ]
        .join(' ')
        .toLowerCase()
        .includes(search);
    return category === 'all' || project.categories?.includes(category);
  }).sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  return (
    <section id='projects' className='bg-[#141414] py-20 sm:py-24'>
      <div className='container mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16'>
        <div className='mb-9 flex flex-col justify-between gap-6 sm:flex-row sm:items-end'>
          <div>
            <p className='section-eyebrow'>03 / Projects</p>
            <h2 className='section-title'>Ideas, built into practice.</h2>
            <p className='mt-4 max-w-xl text-sm leading-7 text-[#999]'>
              Products, applied research, and the algorithms underneath.
            </p>
          </div>
          <label className='flex w-full items-center gap-3 border-b border-[#3a3a37] py-3 sm:w-60'>
            <Search className='h-4 w-4 shrink-0 text-[#999]' aria-hidden='true' />
            <input
              aria-label='Search projects'
              type='search'
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder='Search all projects'
              className='min-w-0 flex-1 bg-transparent text-base text-[#f5f5f0] placeholder:text-[#888] focus:outline-none'
            />
            {query && (
              <button
                type='button'
                onClick={() => setQuery('')}
                aria-label='Clear project search'
                className='flex h-11 w-11 shrink-0 items-center justify-center text-[#999]'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </label>
        </div>
        <div
          role='group'
          aria-label='Project categories'
          className='flex flex-wrap gap-x-7 gap-y-1 border-b border-[#333330]'
        >
          {PROJECT_CATEGORIES.map(item => (
            <button
              key={item.key}
              type='button'
              aria-pressed={!search && category === item.key}
              onClick={() => {
                setCategory(item.key);
                setQuery('');
              }}
              className={`-mb-px inline-flex min-h-12 items-center gap-2 border-b-2 py-3 text-xs font-medium transition-colors sm:text-sm ${!search && category === item.key ? 'border-[#a5c9bd] text-[#f5f5f0]' : 'border-transparent text-[#999] hover:text-white'}`}
            >
              {item.key === 'all' ? 'All projects' : item.label}
              <span className='text-[10px] tabular-nums text-[#888]'>
                {item.key === 'all'
                  ? PROJECTS.length
                  : PROJECTS.filter(p => p.categories?.includes(item.key)).length}
              </span>
            </button>
          ))}
        </div>
        <div aria-live='polite' className='mt-5 text-xs text-[#888]'>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          {search ? ` matching “${query.trim()}”` : ''}
        </div>
        <ul className='divide-y divide-[#2c2c29]'>
          {projects.map(project => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
        {projects.length === 0 && (
          <div className='py-14'>
            <p className='text-[#b1b1ad]'>No projects match your search.</p>
            <button
              type='button'
              onClick={() => {
                setQuery('');
                setCategory('all');
              }}
              className='mt-4 min-h-11 text-sm text-[#a5c9bd] underline underline-offset-4'
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
