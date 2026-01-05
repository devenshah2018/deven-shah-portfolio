'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Grid3x3, List, CheckCircle2, Clock, Pause, ExternalLink, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { PROJECTS, PROJECT_CATEGORIES, getExperienceById, getEducationById } from '@/lib/content-registry';
import { Project } from '@/lib/types';

function getProjectCategories(project: Project): string[] {
  return project.categories || ['other'];
}

function isProjectFeatured(project: Project): boolean {
  return getProjectCategories(project).includes('featured');
}

function getStatusBadge(status: string, size: 'sm' | 'md' = 'sm') {
  const baseClasses = size === 'sm' 
    ? 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium shadow-sm'
    : 'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium shadow-sm';
  
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';
  
  if (status === 'Live' || status === 'Completed') {
    return (
      <span className={`${baseClasses} bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20`}>
        <CheckCircle2 className={iconSize} />
        {status}
      </span>
    );
  } else if (status === 'In Progress') {
    return (
      <span className={`${baseClasses} bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20`}>
        <Clock className={iconSize} />
        {status}
      </span>
    );
  } else if (status === 'Paused') {
    return (
      <span className={`${baseClasses} bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20`}>
        <Pause className={iconSize} />
        {status}
      </span>
    );
  }
  return (
    <span className={`${baseClasses} bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20`}>
      {status}
    </span>
  );
}

function AccessPointBadge({ 
  type, 
  url, 
  label,
  index,
}: { 
  type: string; 
  url: string; 
  label?: string | undefined;
  index: number;
}) {
  if (type === 'hosted' || type === 'web') return null;
  const iconMap: Record<string, { src: string; alt: string; defaultLabel: string }> = {
    github: { src: '/github-icon.svg', alt: 'GitHub', defaultLabel: 'Github' },
    kaggle: { src: '/kaggle-icon.png', alt: 'Kaggle', defaultLabel: 'Kaggle' },
    vscode: { src: '/vscode-icon.png', alt: 'VSCode', defaultLabel: 'VSCode' },
    hosted: { src: '/globe.svg', alt: 'Web', defaultLabel: 'Live' },
    web: { src: '/globe.svg', alt: 'Web', defaultLabel: 'Live' },
  };

  const config = iconMap[type];
  if (!config) return null;
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      tabIndex={0}
      aria-label={label || config.defaultLabel}
      className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-700 bg-slate-800/70 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none transition-colors duration-200 hover:border-blue-400 hover:bg-blue-900/80 active:bg-blue-950"
      style={{
        zIndex: 10 - index,
        outline: 'none',
        marginLeft: index !== 0 ? '0.5rem' : 0,
        boxShadow: '0 1px 4px 0 rgba(30,41,59,0.06)',
      }}
    >
      <span className="flex items-center justify-center h-8 w-8">
        <img
          src={config.src}
          alt={config.alt}
          className={`h-4 w-4 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200${type === 'github' ? ' invert' : ''}`}
          draggable={false}
        />
      </span>
    </a>
  );
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

function getRelatedLogos(project: Project) {
  if (!project.related_experiences || project.related_experiences.length === 0) {
    return [];
  }

  return project.related_experiences
    .map(id => {
      const experience = getExperienceById(id);
      if (experience && experience.companyLogo) {
        return {
          logo: experience.companyLogo,
          alt: `${experience.company} logo`,
          name: experience.company,
          type: 'experience' as const,
          id: id,
        };
      }
      
      const education = getEducationById(id);
      if (education && education.logo) {
        return {
          logo: education.logo,
          alt: `${education.institution} logo`,
          name: education.institution,
          type: 'education' as const,
          id: id,
        };
      }
      
      return null;
    })
    .filter(Boolean) as Array<{ logo: string; alt: string; name: string; type: 'experience' | 'education'; id: string }>;
}

function RelatedLogos({ project }: { project: Project }) {
  const logos = getRelatedLogos(project);
  
  if (logos.length === 0) {
    return null;
  }

  const scrollToSection = (type: 'experience' | 'education', id?: string) => {
    const sectionId = type === 'experience' ? 'experience' : 'education';
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // If an ID is provided, scroll to and highlight the specific item
      if (id) {
        setTimeout(() => {
          const itemId = type === 'experience' ? `experience-${id}` : `education-${id}`;
          const item = document.getElementById(itemId);
          if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the experience/education card
            const card = item.querySelector('[data-card]') || item;
            const originalTransition = (card as HTMLElement).style.transition;
            (card as HTMLElement).style.transition = 'all 0.3s ease-in-out';
            (card as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)';
            (card as HTMLElement).style.transform = 'scale(1.02)';
            
            setTimeout(() => {
              (card as HTMLElement).style.boxShadow = '';
              (card as HTMLElement).style.transform = '';
              setTimeout(() => {
                (card as HTMLElement).style.transition = originalTransition;
              }, 300);
            }, 3000);
          }
        }, 800);
      }
    }
  };

  return (
    <>
      {logos.map((logoData, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(logoData.type, logoData.id)}
          className='flex items-center justify-center h-8 w-8 rounded-lg bg-transparent object-contain shadow-sm overflow-hidden transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
          style={{
            marginLeft: index !== 0 ? '0.3rem' : 0,
          }}
          title={`${logoData.name} - Click to view ${logoData.type === 'experience' ? 'experience' : 'education'}`}
          aria-label={`Scroll to ${logoData.name} ${logoData.type === 'experience' ? 'experience' : 'education'}`}
        >
          <img
            src={logoData.logo}
            alt={logoData.alt}
            className='h-[85%] w-[85%] object-contain object-center'
            draggable={false}
          />
        </button>
      ))}
    </>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  React.useEffect(() => {
    const handleResetFilter = () => {
      setActiveCategory('all');
    };

    window.addEventListener('resetProjectFilter', handleResetFilter);
    return () => window.removeEventListener('resetProjectFilter', handleResetFilter);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project: Project) => {
      const matchesCategory =
        activeCategory === 'all' || getProjectCategories(project).includes(activeCategory);
      
      return matchesCategory;
    }).sort((a, b) => {
      if (a.sortDate && b.sortDate) {
        return b.sortDate.localeCompare(a.sortDate);
      }
      return 0;
    });
  }, [activeCategory]);

  return (
    <section id='projects' className='bg-gradient-to-b from-slate-950 to-slate-900 py-20'>
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='mb-10 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl py-1'>
                Projects
              </h2>
              <div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto max-w-3xl text-base font-light leading-relaxed text-slate-400 sm:text-lg'
            >
              Explore a wide range of projects—filter, search, and discover.
            </motion.p>
          </div>

          <div className='mb-8'>
            {/* Category Filters and View Mode */}
            <div className='flex flex-wrap items-center gap-2'>
              {PROJECT_CATEGORIES.filter(cat => cat.key === 'all').map(cat => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
            
            {PROJECT_CATEGORIES.filter(cat => cat.key === 'featured').map(cat => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                    : 'border-amber-600/50 bg-gradient-to-r from-amber-900/30 to-orange-900/30 text-amber-300 hover:border-amber-500 hover:text-amber-200 hover:shadow-md hover:shadow-amber-500/20'
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                <Star className="mr-1 h-4 w-4" />
                {cat.label}
              </Button>
            ))}
            
            {PROJECT_CATEGORIES
              .filter(cat => cat.key !== 'all' && cat.key !== 'featured')
              .sort((a, b) => a.label.localeCompare(b.label))
              .map(cat => (
              <Button
                key={cat.key}
                variant={activeCategory === cat.key ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                }`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </Button>
              ))}
              
              {/* View Mode Toggle - Inline with filters */}
              <div className='ml-auto flex gap-2'>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg px-4 py-2 transition-all ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                  }`}
                  aria-label='Grid view'
                >
                  <Grid3x3 className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg px-4 py-2 transition-all ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'border-slate-700 bg-slate-900/50 text-slate-300 hover:border-blue-500 hover:text-blue-400'
                  }`}
                  aria-label='List view'
                >
                  <List className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className='py-12 text-center text-slate-500'>
              No projects found.
            </div>
          ) : viewMode === 'grid' ? (
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className='group'
              >
                <Card className={`relative flex h-full flex-col overflow-hidden rounded-xl border-none bg-transparent transition-all duration-300 gap-2`}>
                  {isProjectFeatured(project) && (
                    <div className='absolute top-3 right-3 z-10'>
                      <Star className='h-5 w-5 text-amber-400 fill-amber-400/50' />
                    </div>
                  )}
                  <CardHeader className='flex flex-col gap-2 pb-3'>
                    <div className='flex min-w-0 flex-1 items-center gap-2'>
                      <CardTitle className='whitespace-normal break-words text-lg font-bold text-white leading-tight'>
                        {project.title}
                      </CardTitle>
                      {getWebLink(project) && (
                        <a
                          href={getWebLink(project)!.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 hover:border-blue-500/50 transition-all duration-200 group/link max-w-[140px]'
                          title={getWebLink(project)!.url}
                        >
                          <Link className='h-3 w-3 flex-shrink-0 text-blue-400 group-hover/link:text-blue-300' />
                          <span className='text-xs font-bold text-blue-400 group-hover/link:text-blue-300 truncate overflow-hidden'>
                            {getWebLink(project)!.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                          </span>
                        </a>
                      )}
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3 text-slate-400' />
                        <span className='text-xs font-medium text-slate-400'>
                          {project.period}
                        </span>
                      </div>
                      <div className='flex items-center -space-x-2'>
                        <RelatedLogos project={project} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='flex flex-1 flex-col justify-between pt-0'>
                    <div>
                      <div className='mb-2 flex flex-wrap gap-1'>
                        {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                          <Badge
                            key={i}
                            variant='outline'
                            className='border-slate-700 bg-slate-800/50 text-xs text-slate-300'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      { project.description && (<p className='mb-2 text-sm text-slate-300'>{project.description}</p>)}
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                      {getStatusBadge(project.status, 'md')}
                      <div className='flex -space-x-2'>
                        {getAccessPoints(project).map((accessPoint, i) => (
                          <AccessPointBadge
                            key={i}
                            index={i}
                            type={accessPoint.type}
                            url={accessPoint.url}
                            label={accessPoint.label}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-4'>
              {filteredProjects.map((project: Project, idx: number) => (
                <motion.div
                  key={project.id}
                  id={`project-${project.id}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className='group'
                >
                  <Card className={`relative flex flex-col sm:flex-row overflow-hidden rounded-xl border-none bg-transparent transition-all duration-300 ${
                    isProjectFeatured(project) 
                      ? 'ring-2 ring-amber-500/20' 
                      : ''
                  }`}>
                    {isProjectFeatured(project) && (
                      <div className='absolute top-3 right-3 z-10'>
                        <Star className='h-5 w-5 text-amber-400 fill-amber-400/50' />
                      </div>
                    )}
                    
                    <div className='flex-1 min-w-0'>
                      <CardHeader className='pb-2'>
                        <div className='flex items-center gap-2 mb-2'>
                          <CardTitle className='whitespace-normal break-words text-lg font-bold text-white leading-tight'>
                            {project.title}
                          </CardTitle>
                          {getWebLink(project) && (
                            <a
                              href={getWebLink(project)!.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 hover:bg-blue-950/30 hover:border-blue-500/50 transition-all duration-200 group/link max-w-[160px]'
                              title={getWebLink(project)!.url}
                            >
                              <ExternalLink className='h-3 w-3 flex-shrink-0 text-blue-400 group-hover/link:text-blue-300' />
                              <span className='text-xs font-bold text-blue-400 group-hover/link:text-blue-300 truncate overflow-hidden'>
                                {getWebLink(project)!.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                              </span>
                            </a>
                          )}
                        </div>
                        <div className='flex items-center justify-between gap-4 flex-wrap'>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3 w-3 text-slate-400' />
                              <span className='text-xs font-medium text-slate-400'>
                                {project.period}
                              </span>
                            </div>
                            {getStatusBadge(project.status, 'sm')}
                            {project.technologies?.slice(0, 4).map((tech: string, i: number) => (
                              <Badge
                                key={i}
                                variant='outline'
                                className='border-slate-700 bg-slate-800/50 text-xs text-slate-300'
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className='flex items-center -space-x-2 ml-auto'>
                            <RelatedLogos project={project} />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='pt-0 pb-3'>
                        <p className='text-sm text-slate-300 leading-relaxed'>{project.description}</p>
                      </CardContent>
                    </div>

                    <div className='flex items-center px-4 py-3 sm:py-0 sm:pr-6'>
                      <div className='flex -space-x-2'>
                        {getAccessPoints(project).map((accessPoint, i) => (
                          <AccessPointBadge
                            key={i}
                            index={i}
                            type={accessPoint.type}
                            url={accessPoint.url}
                            label={accessPoint.label}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
