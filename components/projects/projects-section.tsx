'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Calendar, ExternalLink, Star, Grid3x3, List, CheckCircle2, Clock, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/content-registry';
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

function getAccessibleAtIcons(accessible_at: string[]) {
  const iconMap: Record<string, { src: string; alt: string }> = {
    github: { src: '/github-icon.svg', alt: 'GitHub' },
    kaggle: { src: '/kaggle-icon.png', alt: 'Kaggle' },
    vscode: { src: '/vscode-icon.png', alt: 'VSCode' },
    hosted: { src: '/globe.svg', alt: 'Web' },
    web: { src: '/globe.svg', alt: 'Web' },
  };
  return (
    <div className='mr-2 flex -space-x-2'>
      {accessible_at.map((val: string, i: number) => {
        const icon = iconMap[val];
        if (!icon) return null;
        return (
          <img
            key={i}
            src={icon.src}
            alt={icon.alt}
            className='h-6 w-6 rounded-full border-2 border-slate-400 bg-slate-100 p-1 shadow'
            style={{ zIndex: 10 - i }}
          />
        );
      })}
    </div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project: Project) => {
      const matchesCategory =
        activeCategory === 'all' || getProjectCategories(project).includes(activeCategory);
      return matchesCategory;
    }).sort((a, b) => {
      // Sort by descending start date (sortDate field, format: YYYY-MM)
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
              <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
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

          {/* Category Filter Bar with View Toggle */}
          <div className='mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <div className='flex flex-wrap gap-2'>
              {/* All category first */}
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
            
            {/* Featured category second with special styling */}
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
            
            {/* Rest of the categories sorted alphabetically */}
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
            </div>

            {/* View Mode Toggle */}
            <div className='flex gap-2'>
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

          {/* Projects Display - Grid or List */}
          {filteredProjects.length === 0 ? (
            <div className='py-12 text-center text-slate-500'>
              No projects found.
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
              {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className='group'
              >
                <Card className={`relative flex h-full flex-col overflow-hidden rounded-xl border-none bg-transparent transition-all duration-300 gap-2 ${
                  isProjectFeatured(project) 
                    ? 'ring-2 ring-amber-500/20' 
                    : ''
                }`}>
                  {isProjectFeatured(project) && (
                    <div className='absolute top-3 right-3 z-10'>
                      <Star className='h-5 w-5 text-amber-400 fill-amber-400/50' />
                    </div>
                  )}
                  <CardHeader className='flex flex-col gap-2 pb-3'>
                    <div className='flex min-w-0 flex-1 items-start gap-3'>
                      <CardTitle className='whitespace-normal break-words text-lg font-bold text-white leading-tight'>
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Calendar className='h-3 w-3 text-slate-400' />
                      <span className='text-xs font-medium text-slate-400'>
                        {project.period}
                      </span>
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
                      <p className='mb-2 text-sm text-slate-300'>{project.description}</p>
                    </div>
                    <div className='mt-2 flex items-center justify-between'>
                      {getStatusBadge(project.status, 'md')}
                      <div className='ml-2 flex items-center gap-1'>
                        {/* Accessible At Icons Row - now on the left of the button */}
                        {Array.isArray(project.accessible_at) &&
                          project.accessible_at.length > 0 &&
                          getAccessibleAtIcons(project.accessible_at)}
                        <Button
                          asChild
                          variant='outline'
                          className='flex h-9 items-center gap-2 rounded-full border-2 border-blue-700/80 bg-transparent px-4 py-2 text-xs font-semibold text-blue-200 shadow-lg transition-all duration-200 hover:border-blue-400 hover:from-blue-900 hover:to-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                        >
                          <a
                            href={project.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2'
                          >
                            {(() => {
                              const entry = project.entry_point;
                              const icons: Record<
                                string,
                                { icon: React.ReactNode; label: string }
                              > = {
                                github: {
                                  icon: <Code className='mr-1 inline h-4 w-4' />,
                                  label: 'Code',
                                },
                                kaggle: {
                                  icon: <ExternalLink className='mr-1 inline h-4 w-4' />,
                                  label: 'Kaggle',
                                },
                                vscode: {
                                  icon: <ExternalLink className='mr-1 inline h-4 w-4' />,
                                  label: 'VSCode',
                                },
                                live: {
                                  icon: <ExternalLink className='mr-1 inline h-4 w-4' />,
                                  label: 'Live',
                                },
                              };
                              const { icon, label } = icons[entry] || {
                                icon: <ExternalLink className='mr-1 inline h-4 w-4' />,
                                label: 'View',
                              };
                              return (
                                <>
                                  {icon}
                                  <span className='text-sm font-medium tracking-wide'>{label}</span>
                                </>
                              );
                            })()}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className='flex flex-col gap-4'>
              {filteredProjects.map((project: Project, idx: number) => (
                <motion.div
                  key={project.id}
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
                    
                    {/* Left Section - Title, Date, Technologies */}
                    <div className='flex-1 min-w-0'>
                      <CardHeader className='pb-2'>
                        <CardTitle className='whitespace-normal break-words text-lg font-bold text-white leading-tight pr-8 mb-2'>
                          {project.title}
                        </CardTitle>
                        <div className='flex items-center gap-2 flex-wrap'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='h-3 w-3 text-slate-400' />
                            <span className='text-xs font-medium text-slate-400'>
                              {project.period}
                            </span>
                          </div>
                          {getStatusBadge(project.status, 'sm')}
                          {/* Skill badges inline */}
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
                      </CardHeader>
                      <CardContent className='pt-0 pb-3'>
                        <p className='text-sm text-slate-300 leading-relaxed'>{project.description}</p>
                      </CardContent>
                    </div>

                    {/* Right Section - Actions */}
                    <div className='flex items-center gap-2 px-4 py-3 sm:py-0 sm:pr-6'>
                      {Array.isArray(project.accessible_at) &&
                        project.accessible_at.length > 0 &&
                        getAccessibleAtIcons(project.accessible_at)}
                      <Button
                        asChild
                        variant='outline'
                        className='flex h-9 items-center gap-2 rounded-full border-2 border-blue-700/80 bg-transparent px-5 py-2 text-xs font-semibold text-blue-200 shadow-lg transition-all duration-200 hover:border-blue-400 hover:bg-blue-900/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                      >
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2'
                        >
                          {(() => {
                            const entry = project.entry_point;
                            const icons: Record<
                              string,
                              { icon: React.ReactNode; label: string }
                            > = {
                              github: {
                                icon: <Code className='h-4 w-4' />,
                                label: 'View Code',
                              },
                              kaggle: {
                                icon: <ExternalLink className='h-4 w-4' />,
                                label: 'View on Kaggle',
                              },
                              vscode: {
                                icon: <ExternalLink className='h-4 w-4' />,
                                label: 'Get Extension',
                              },
                              live: {
                                icon: <ExternalLink className='h-4 w-4' />,
                                label: 'View Live',
                              },
                            };
                            const { icon, label } = icons[entry] || {
                              icon: <ExternalLink className='h-4 w-4' />,
                              label: 'View Project',
                            };
                            return (
                              <>
                                {icon}
                                <span className='font-medium'>{label}</span>
                              </>
                            );
                          })()}
                        </a>
                      </Button>
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
