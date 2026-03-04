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
  const [expandedCoursework, setExpandedCoursework] = useState<Set<string>>(new Set());

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
      const projectCard = document.getElementById(`project-${projectId}`);
      if (projectCard) {
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        projectCard.classList.add('scroll-highlight');
        setTimeout(() => projectCard.classList.remove('scroll-highlight'), 3000);
      }
    }, 100);
  };

  const getProjectById = (projectId: string) => {
    return PROJECTS.find(p => p.id === projectId);
  };

  return (
    <section id="education" className="bg-[#141414] py-24 sm:py-32">
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          {/* Section Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className="mb-16 text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] sm:text-lg">
                Education & Research
              </h2>
            </motion.div>
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
                  <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[#a3a3a3]">
                    <FileText className="h-4 w-4" />
                    Research Papers
                  </h3>
                  <span className="text-sm text-[#a3a3a3]">{RESEARCH_PAPERS.length} {RESEARCH_PAPERS.length === 1 ? 'Paper' : 'Papers'}</span>
                </div>
                <div className='space-y-3'>
                  {RESEARCH_PAPERS.sort((a, b) => b.sortDate.localeCompare(a.sortDate)).map((paper, index) => {
                    const relatedProject = paper.relatedProjectId ? getProjectById(paper.relatedProjectId) : null;
                    const articleSchema = generateArticleSchema(paper);
                    
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
                        <Card className='group relative overflow-hidden bg-transparent border-none rounded-none shadow-none'>
                          <CardContent className='p-4'>
                            {/* Compact Header Row */}
                            <div className='mb-3 flex items-start justify-between gap-3'>
                              <div className='min-w-0 flex-1 space-y-1'>
                                <h4 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-white/90">
                                  {paper.title}
                                </h4>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-white/60">
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
                                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition-all duration-200 hover:border-white/50 hover:bg-white/10 hover:text-white"
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

                            {/* Related Project Link - Compact */}
                            {relatedProject && (
                              <button
                                onClick={() => scrollToProject(relatedProject.id)}
                                className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/80 transition-colors hover:text-white"
                                title={`View related project: ${relatedProject.title}`}
                              >
                                <Link className='h-3 w-3' />
                                <span>{relatedProject.title}</span>
                              </button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}

                  {RESEARCH_PAPERS.length === 0 && (
                    <Card className="rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-none">
                      <CardContent className='p-8 text-center'>
                        <FileText className="mx-auto mb-3 h-10 w-10 text-white/40" />
                        <p className="text-sm font-medium text-white/60">
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
                <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
                  <GraduationCap className="h-6 w-6 text-white" />
                  Education
                </h3>
                <div className='space-y-4'>
                  {EDUCATION.map((edu) => (
                    <Card
                      id={`education-${edu.id}`}
                      key={edu.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
                      data-card
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
                            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-0 shadow-md">
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
                            <p className="text-sm font-semibold text-white/80">
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
                                ? 'border-white/20 bg-white/10 text-white'
                                : 'border-white/15 bg-white/5 text-white/90'
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
                              className="flex w-full items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
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
                                    className="flex items-start gap-2 rounded-md bg-white/5 px-2.5 py-1.5 text-[10px] text-white/80"
                                  >
                                    <span className="mt-0.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/50" />
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
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                  <Award className="h-5 w-5 text-white" />
                  Certifications
                </h3>
                <div className='space-y-4'>
                  {CERTIFICATIONS.map((cert) => (
                    <Card
                      key={cert.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
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
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-0.5 text-sm font-semibold text-white/80 transition-all hover:text-white"
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
                          <Badge className="border-white/20 bg-white/10 px-1.5 py-0.5 text-xs font-semibold text-white">
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
