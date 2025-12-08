'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Calendar, ExternalLink, FileText, Building2, Link, ChevronDown, ChevronUp } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION, RESEARCH_PAPERS, PROJECTS } from '@/lib/content-registry';
import { generateArticleSchema } from '@/lib/jsonld';
import { getResearchSiteUrl } from '@/lib/url-utils';
import { useState } from 'react';

export function EducationSection() {
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());
  const [expandedCoursework, setExpandedCoursework] = useState<Set<string>>(new Set());

  const toggleAbstract = (paperId: string) => {
    setExpandedAbstracts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paperId)) {
        newSet.delete(paperId);
      } else {
        newSet.add(paperId);
      }
      return newSet;
    });
  };

  const toggleCoursework = (eduId: string) => {
    setExpandedCoursework(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eduId)) {
        newSet.delete(eduId);
      } else {
        newSet.add(eduId);
      }
      return newSet;
    });
  };
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Published':
        return 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300';
      case 'Under Review':
        return 'border-blue-500/50 bg-blue-500/20 text-blue-300';
      case 'Preprint':
        return 'border-amber-500/50 bg-amber-500/20 text-amber-300';
      case 'In Progress':
        return 'border-slate-500/50 bg-slate-500/20 text-slate-300';
      default:
        return 'border-slate-500/50 bg-slate-500/20 text-slate-300';
    }
  };

  const scrollToProject = (projectId: string) => {
    window.dispatchEvent(new Event('resetProjectFilter'));
    
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
          const projectCard = document.getElementById(`project-${projectId}`);
          if (projectCard) {
            projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            const originalTransition = projectCard.style.transition;
            projectCard.style.transition = 'all 0.3s ease-in-out';
            projectCard.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)';
            projectCard.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
              projectCard.style.boxShadow = '';
              projectCard.style.transform = '';
              setTimeout(() => {
                projectCard.style.transition = originalTransition;
              }, 300);
            }, 3000);
          }
        }, 800); 
      }
    }, 100);
  };

  const getProjectById = (projectId: string) => {
    return PROJECTS.find(p => p.id === projectId);
  };

  return (
    <section id='education' className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'>
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          {/* Section Header */}
          <div className='mb-10 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 py-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                Education & Research
              </h2>
              <div className='mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto max-w-3xl text-lg font-light leading-relaxed text-slate-400'
            >
              Academic foundation, professional certifications, and research contributions advancing the field.
            </motion.p>
          </div>

          {/* Two-Column Layout - Research Papers (Left) and Education/Certs (Right) */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
            {/* Left Column - Research Papers (Main Content) */}
            <div className='lg:col-span-8'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className='mb-6 flex items-center justify-between'>
                  <h3 className='flex items-center gap-2 text-2xl font-bold text-white'>
                    <FileText className='h-6 w-6 text-blue-400' />
                    Research Papers
                  </h3>
                  <span className='text-sm text-slate-400'>{RESEARCH_PAPERS.length} {RESEARCH_PAPERS.length === 1 ? 'Paper' : 'Papers'}</span>
                </div>
                <div className='space-y-3'>
                  {RESEARCH_PAPERS.sort((a, b) => b.sortDate.localeCompare(a.sortDate)).map((paper, index) => {
                    const relatedProject = paper.relatedProjectId ? getProjectById(paper.relatedProjectId) : null;
                    const articleSchema = generateArticleSchema(paper);
                    const isExpanded = expandedAbstracts.has(paper.id);
                    
                    return (
                      <motion.div
                        key={paper.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <script
                          type='application/ld+json'
                          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                        />
                        <Card className='group relative overflow-hidden rounded-lg border border-slate-800/60 bg-slate-900/50 transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-900/70'>
                          <CardContent className='p-4'>
                            {/* Compact Header Row */}
                            <div className='mb-3 flex items-start justify-between gap-3'>
                              <div className='min-w-0 flex-1 space-y-1'>
                                <h4 className='text-lg font-semibold leading-snug text-white group-hover:text-blue-200 transition-colors'>
                                  {paper.title}
                                </h4>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400'>
                                  {paper.institution && (
                                    <span className='flex items-center gap-1'>
                                      <Building2 className='h-3 w-3' />
                                      {paper.institution}
                                    </span>
                                  )}
                                  <span className='flex items-center gap-1'>
                                    <Calendar className='h-3 w-3' />
                                    {paper.date}
                                  </span>
                                  {paper.status && (
                                    <Badge className={`h-5 px-1.5 py-0 text-xs font-medium ${getStatusBadgeStyle(paper.status)}`}>
                                      {paper.status}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <a
                                href={`${getResearchSiteUrl()}/${paper.slug || paper.id}`}
                                className='flex-shrink-0 inline-flex items-center gap-1.5 rounded-md border border-slate-700/50 bg-slate-800/40 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-950/30 hover:text-blue-300'
                                onClick={(e) => e.stopPropagation()}
                              >
                                <FileText className='h-3.5 w-3.5' />
                                <span>Read</span>
                                <ExternalLink className='h-3 w-3 opacity-60' />
                              </a>
                            </div>

                            {/* Compact Keywords Row */}
                            {paper.keywords && paper.keywords.length > 0 && (
                              <div className='mb-3 flex flex-wrap gap-1.5'>
                                {paper.keywords.slice(0, 5).map((keyword, i) => (
                                  <Badge
                                    key={`${paper.id}-keyword-${i}`}
                                    variant='outline'
                                    className='h-5 border-slate-700/50 bg-slate-800/30 px-2 py-0 text-[10px] font-normal text-slate-400'
                                  >
                                    {keyword}
                                  </Badge>
                                ))}
                                {paper.keywords.length > 5 && (
                                  <Badge
                                    variant='outline'
                                    className='h-5 border-slate-700/50 bg-slate-800/30 px-2 py-0 text-[10px] font-normal text-slate-400'
                                  >
                                    +{paper.keywords.length - 5}
                                  </Badge>
                                )}
                              </div>
                            )}

                            {/* Collapsible Abstract - Compact */}
                            {paper.abstract && (
                              <div className='mb-2'>
                                <button
                                  onClick={() => toggleAbstract(paper.id)}
                                  className='w-full flex items-center justify-between rounded-md px-2 py-1.5 text-left transition-colors hover:bg-slate-800/30'
                                  aria-expanded={isExpanded}
                                >
                                  <span className='text-xs font-medium text-slate-300'>
                                    {isExpanded ? 'Hide Abstract' : 'Show Abstract'}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronUp className='h-3.5 w-3.5 text-slate-400' />
                                  ) : (
                                    <ChevronDown className='h-3.5 w-3.5 text-slate-400' />
                                  )}
                                </button>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className='overflow-hidden'
                                  >
                                    <p className='mt-2 rounded-md bg-slate-800/20 px-2.5 py-2 text-xs leading-relaxed text-slate-300'>
                                      {paper.abstract}
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                            )}

                            {/* Related Project Link - Compact */}
                            {relatedProject && (
                              <button
                                onClick={() => scrollToProject(relatedProject.id)}
                                className='mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400/80 transition-colors hover:text-blue-300'
                                title={`View related project: ${relatedProject.title}`}
                              >
                                <Link className='h-3 w-3' />
                                <span>Related: {relatedProject.title}</span>
                              </button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}

                  {RESEARCH_PAPERS.length === 0 && (
                    <Card className='rounded-lg border border-slate-800/60 bg-slate-900/50'>
                      <CardContent className='p-8 text-center'>
                        <FileText className='mx-auto mb-3 h-10 w-10 text-slate-600' />
                        <p className='text-sm font-medium text-slate-400'>
                          No research papers published yet.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Education & Certifications (Sidebar) */}
            <div className='lg:col-span-4 space-y-6'>
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className='mb-6 flex items-center gap-2 text-2xl font-bold text-white'>
                  <GraduationCap className='h-6 w-6 text-blue-400' />
                  Education
                </h3>
                <div className='space-y-4'>
                  {EDUCATION.map((edu) => (
                    <Card
                      key={edu.id}
                      className='group relative overflow-hidden rounded-xl border-2 border-slate-800/50 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/60'
                    >
                      {edu.isActive && (
                        <div className='absolute right-3 top-3 flex items-center gap-1.5'>
                          <div className='relative flex h-2 w-2 items-center justify-center'>
                            <div className='absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/75' />
                            <div className='relative h-1.5 w-1.5 rounded-full bg-emerald-400' />
                          </div>
                          <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                            Current
                          </span>
                        </div>
                      )}
                      <CardContent className='p-3'>
                        <div className='mb-2 flex items-start gap-2'>
                          <div className='flex-shrink-0'>
                            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-0 shadow-md backdrop-blur-sm">
                              <img
                                src={edu.logo}
                                alt={`${edu.institution} logo`}
                                className="h-full w-full object-contain object-center"
                              />
                            </div>
                          </div>
                          <div className='min-w-0 flex-1'>
                            <h4 className='text-md font-bold leading-tight text-white'>
                              {edu.degree}
                            </h4>
                            <p className='text-sm font-semibold text-slate-300'>
                              {edu.institution}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-1.5 text-xs'>
                          <Badge className='bg-transparent px-1.5 py-0.5 text-xs font-semibold text-slate-200'>
                            <Calendar className='mr-1 h-2.5 w-2.5' />
                            {edu.period}
                          </Badge>
                          <Badge
                            className={`px-1.5 py-0.5 text-xs font-semibold ${
                              edu.status === 'Current'
                                ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                                : 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {edu.status}
                          </Badge>
                        </div>

                        {/* Expandable Coursework Section */}
                        {edu.coursework && edu.coursework.length > 0 && (
                          <div className='mt-3 border-t border-slate-700/30 pt-3'>
                            <button
                              onClick={() => toggleCoursework(edu.id)}
                              className='flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800/40 hover:text-blue-300'
                            >
                              <span className='flex items-center gap-1.5'>
                                <GraduationCap className='h-3 w-3' />
                                <span>Relevant Coursework ({edu.coursework.length})</span>
                              </span>
                              {expandedCoursework.has(edu.id) ? (
                                <ChevronUp className='h-3 w-3' />
                              ) : (
                                <ChevronDown className='h-3 w-3' />
                              )}
                            </button>
                            
                            {expandedCoursework.has(edu.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className='mt-2 space-y-1.5 overflow-hidden'
                              >
                                {edu.coursework.map((course: string, idx: number) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                                    className='flex items-start gap-2 rounded-md bg-slate-800/30 px-2.5 py-1.5 text-[10px] text-slate-300 backdrop-blur-sm'
                                  >
                                    <span className='mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-blue-400/60' />
                                    <span className='leading-relaxed'>{course}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-white'>
                  <Award className='h-5 w-5 text-orange-400' />
                  Certifications
                </h3>
                <div className='space-y-4'>
                  {CERTIFICATIONS.map((cert) => (
                    <Card
                      key={cert.id}
                      className='group relative overflow-hidden rounded-xl border-2 border-slate-800/50 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-orange-500/30 hover:bg-slate-800/60'
                    >
                      <div className='absolute right-3 top-3 flex items-center gap-1.5'>
                        <div className='relative flex h-2 w-2 items-center justify-center'>
                          <div className='absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/75' />
                          <div className='relative h-1.5 w-1.5 rounded-full bg-emerald-400' />
                        </div>
                        <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                          Valid
                        </span>
                      </div>
                      <CardContent className='p-3'>
                        <div className='mb-2 flex items-start gap-2'>
                          <div className='flex-shrink-0'>
                            <div className='relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-0 shadow-md backdrop-blur-sm'>
                              <img
                                src={cert.logo}
                                alt={`${cert.issuer} logo`}
                                className='h-full w-full object-contain object-center'
                              />
                            </div>
                          </div>
                          <div className='min-w-0 flex-1'>
                            <h4 className='text-md font-bold leading-tight text-white'>
                              {cert.title}
                            </h4>
                            <a
                              href={cert.verificationUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/link inline-flex items-center gap-0.5 text-sm font-semibold text-slate-300 transition-all hover:text-orange-400'
                            >
                              <span>{cert.issuer}</span>
                              <ExternalLink className='h-2.5 w-2.5' />
                            </a>
                          </div>
                        </div>
                        <div className='flex items-center gap-1.5 text-xs'>
                          <Badge className='bg-transparent px-1.5 py-0.5 text-xs font-semibold text-slate-200'>
                            <Calendar className='mr-1 h-2.5 w-2.5' />
                            {cert.period}
                          </Badge>
                          <Badge className='border-emerald-500/50 bg-emerald-500/20 px-1.5 py-0.5 text-xs font-semibold text-emerald-300'>
                            {cert.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
