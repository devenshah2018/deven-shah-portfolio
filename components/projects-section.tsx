'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useMemo } from 'react';
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/content-registry';
import { Project } from '@/lib/types';

function getProjectCategories(project: Project): string[] {
  return project.categories || ['other'];
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project: Project) => {
      const matchesCategory =
        activeCategory === 'all' ||
        getProjectCategories(project).includes(activeCategory);
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
    <section
      id='projects'
      className='bg-gradient-to-b from-slate-950 to-slate-900 py-24'
    >
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

          {/* Category Filter Bar */}
          <div className='mb-8 flex flex-wrap gap-2 justify-center'>
            {PROJECT_CATEGORIES.map((cat) => (
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

          {/* Projects Grid */}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
            {filteredProjects.length === 0 && (
              <div className='col-span-full text-center text-slate-500 py-12'>
                No projects found.
              </div>
            )}
            {filteredProjects.map((project: Project, idx: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className='group'
              >
                <Card
                  className='flex flex-col h-full border-none bg-transparent transition-all duration-300 rounded-xl overflow-hidden'
                >
                  <CardHeader className='pb-3 flex flex-row items-start gap-3 justify-between'>
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                      <CardTitle className='text-lg font-bold text-white break-words whitespace-normal'>
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className='flex flex-col items-end flex-shrink-0 min-w-[0]'>
                      <span
                        className='flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium text-slate-400 max-w-[140px] whitespace-nowrap overflow-hidden text-ellipsis'
                        title={project.period}
                      >
                        <Calendar className='h-3 w-3 mr-1 text-slate-400' />
                        {project.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className='flex-1 flex flex-col justify-between pt-0'>
                    <div>
                      <div className='flex flex-wrap gap-1 mb-2'>
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
                      <p className='text-sm text-slate-300 mb-2'>
                        {project.description}
                      </p>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                      <span
                        className={`rounded-full px-2 py-0.5 text-sm ${
                          project.status === 'Live'
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : project.status === 'In Progress'
                            ? 'bg-blue-900/60 text-blue-300'
                            : project.status === 'Paused'
                            ? 'bg-yellow-900/60 text-yellow-300'
                            : 'bg-slate-800/60 text-slate-400'
                        }`}
                      >
                        {project.status}
                      </span>
                      <Button
                        asChild
                        variant='outline'
                        className='border-blue-700 text-blue-300 hover:border-blue-500 hover:text-blue-400 text-xs px-3 py-1 h-8 ml-2'
                      >
                        <a
                          href={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {project.type === 'github' ? (
                            <>
                              <Code className='mr-1 h-4 w-4 inline' />Code
                            </>
                          ) : (
                            <>View</>
                          )}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
