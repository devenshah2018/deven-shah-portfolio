'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import { CERTIFICATIONS, EDUCATION } from '@/lib/content-registry';

export function EducationSection() {
  const [activeTab, setActiveTab] = useState('education');
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <section id='education' className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'>
      <div className='container mx-auto px-2 sm:px-4 md:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto w-full max-w-none'
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
                Education & Certifications
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
              Academic foundation and professional certifications driving continuous learning and
              expertise development.
            </motion.p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
            <TabsList className='mx-auto mb-8 flex h-11 w-full max-w-2xl rounded-xl bg-slate-800/60 p-1 shadow-lg backdrop-blur-md sm:h-12 sm:max-w-2xl sm:rounded-2xl'>
              <TabsTrigger
                value='education'
                className='relative flex h-9 flex-1 items-center justify-center gap-2 rounded-lg text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-200 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 sm:h-10 sm:gap-2 sm:rounded-xl sm:text-lg'
              >
                <GraduationCap className='h-5 w-5' />
                <span>Education</span>
                {activeTab === 'education' && (
                  <motion.div
                    layoutId='tabIndicator'
                    className='absolute inset-0 -z-10 rounded-lg bg-blue-600 sm:rounded-xl'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger
                value='certifications'
                className='relative flex h-9 flex-1 items-center justify-center gap-2 rounded-lg text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:text-slate-200 data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/20 sm:h-10 sm:gap-2 sm:rounded-xl sm:text-lg'
              >
                <Award className='h-5 w-5' />
                <span>Certifications</span>
                {activeTab === 'certifications' && (
                  <motion.div
                    layoutId='tabIndicator'
                    className='absolute inset-0 -z-10 rounded-lg bg-orange-500 sm:rounded-xl'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Education as single column vertical list */}
            <TabsContent value='education' className='flex flex-col gap-6'>
              {EDUCATION.map((edu, index) => {
                const displayedCourses = showAllCourses
                  ? edu.coursework
                  : edu.coursework
                  ? edu.coursework.slice(0, 6)
                  : null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    <Card className='group relative flex h-full flex-col overflow-hidden rounded-2xl bg-transparent border-none transition-all duration-300'>
                      {edu.isActive && (
                        <div className='absolute right-6 top-6 flex items-center gap-2'>
                          <div className='relative flex h-3 w-3 items-center justify-center'>
                            <div className='absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/75' />
                            <div className='relative h-2 w-2 rounded-full bg-emerald-400' />
                          </div>
                          <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                            Current
                          </span>
                        </div>
                      )}
                      <CardContent className='relative flex flex-1 flex-col gap-6 p-8 md:flex-row md:items-center'>
                        <div className='flex-shrink-0'>
                          <div className='bg-white/8 relative h-20 w-20 rounded-2xl p-4 shadow-lg backdrop-blur-sm'>
                            <img
                              src={edu.logo}
                              alt={`${edu.institution} logo`}
                              className='contrast-110 h-full w-full object-contain brightness-110 filter'
                            />
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                            <div className='min-w-0'>
                              <h3 className='mb-1 text-2xl font-bold leading-tight text-white'>
                                {edu.degree}
                              </h3>
                              <a
                                href={
                                  edu.institution === 'Boston University'
                                    ? 'https://www.bu.edu'
                                    : edu.institution === 'San Jose State University'
                                    ? 'https://www.sjsu.edu'
                                    : '#'
                                }
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group/link inline-flex items-center gap-1.5 text-lg font-semibold text-slate-300 transition-all duration-300 hover:text-blue-400'
                              >
                                <span className='truncate'>{edu.institution}</span>
                                <ExternalLink className='h-4 w-4 flex-shrink-0 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
                              </a>
                              {edu.concentration && (
                                <p className='mt-1 flex items-center gap-1.5 text-sm text-slate-400'>
                                  <span className='h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400' />
                                  <span className='font-medium text-slate-300'>Concentration:</span>
                                  <span className='truncate'>{edu.concentration}</span>
                                </p>
                              )}
                            </div>
                            <div className='mt-3 flex flex-wrap items-center gap-2 sm:mt-0 sm:justify-end'>
                              <Badge className='bg-transparent px-3 py-1.5 text-sm font-semibold text-slate-200 backdrop-blur-sm'>
                                <Calendar className='mr-1.5 h-4 w-4' />
                                {edu.period}
                              </Badge>
                              <Badge
                                className={`px-4 py-1.5 text-sm font-semibold shadow backdrop-blur-sm ${
                                  edu.status === 'Current'
                                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                                    : 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {edu.status}
                              </Badge>
                            </div>
                          </div>
                          {edu.coursework && edu.coursework.length > 0 && (
                            <div className='mt-4 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 shadow-lg border border-slate-700/40'>
                              <div className='mb-4 flex items-center justify-between'>
                                <h4 className='text-lg font-bold text-white tracking-tight'>Academic Coursework</h4>
                                {edu.coursework.length > 6 && (
                                  <button
                                    onClick={() => setShowAllCourses(!showAllCourses)}
                                    className='flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold text-blue-400 transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-slate-800/60 hover:bg-blue-900/30 shadow-sm'
                                  >
                                    <span>{showAllCourses ? 'Show Less' : `View All`}</span>
                                    <motion.div
                                      animate={{ rotate: showAllCourses ? 180 : 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                      <svg
                                        className='h-4 w-4'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth={2}
                                          d='M19 9l-7 7-7-7'
                                        />
                                      </svg>
                                    </motion.div>
                                  </button>
                                )}
                              </div>
                              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                                {displayedCourses &&
                                  displayedCourses.map((course, courseIndex) => (
                                    <div
                                      key={courseIndex}
                                      className='flex items-center gap-3 rounded-xl border border-blue-500/10 bg-slate-800/80 px-4 py-3 shadow-sm transition-all duration-200 hover:border-blue-500/40 hover:bg-blue-900/30 group'
                                    >
                                      <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold text-xs shadow group-hover:scale-105 transition-transform duration-200'>
                                        {courseIndex + 1}
                                      </span>
                                      <span className='truncate text-base font-medium text-slate-100'>{course}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>

            {/* Certifications as grid */}
            <TabsContent value='certifications' className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <Card className='group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/80 shadow-lg transition-all duration-300'>
                    {/* Active indicator */}
                    <div className='absolute right-4 top-4 flex items-center gap-2'>
                      <div className='relative flex h-3 w-3 items-center justify-center'>
                        <div className='absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/75' />
                        <div className='relative h-2 w-2 rounded-full bg-emerald-400' />
                      </div>
                      <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                        Valid
                      </span>
                    </div>

                    <CardContent className='relative flex flex-1 flex-col gap-4 p-6'>
                      <div className='flex items-center gap-4'>
                        {/* Enhanced logo section */}
                        <div className='bg-white/8 relative h-14 w-14 rounded-xl border border-slate-600/30 p-2 shadow-md backdrop-blur-sm'>
                          <img
                            src={cert.logo}
                            alt={`${cert.issuer} logo`}
                            className='contrast-110 h-full w-full object-contain brightness-110 filter'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='mb-1 text-lg font-bold leading-tight text-white'>
                            {cert.title}
                          </h3>
                          <a
                            href={cert.verificationUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group/link inline-flex items-center gap-1.5 text-base font-semibold text-slate-300 transition-all duration-300 hover:text-orange-400'
                          >
                            <span className='truncate'>{cert.issuer}</span>
                            <ExternalLink className='h-4 w-4 flex-shrink-0 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
                          </a>
                          {cert.credentialId && (
                            <div className='mt-2 flex flex-col items-start gap-2 text-xs text-slate-400'>
                              <span className='font-medium text-slate-300'>Credential ID:</span>
                              <div className='group/copy relative'>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(cert.credentialId);
                                  }}
                                  className='inline-flex items-center gap-1.5 rounded-md border border-slate-700/50 bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/90 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/50'
                                >
                                  <span className='max-w-[120px] truncate'>
                                    {cert.credentialId}
                                  </span>
                                  <svg
                                    className='h-3 w-3 flex-shrink-0 transition-all duration-200 group-hover/copy:scale-110'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                                    />
                                  </svg>
                                </button>
                                <div className='pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover/copy:opacity-100'>
                                  Click to copy
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='flex flex-wrap items-center gap-2'>
                        <Badge className='bg-transparent px-2 py-1 text-xs font-semibold text-slate-200 backdrop-blur-sm'>
                          <Calendar className='mr-1.5 h-3 w-3' />
                          {cert.period}
                        </Badge>
                        <Badge className='border-emerald-500/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm'>
                          {cert.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
