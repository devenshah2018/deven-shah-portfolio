'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

const educationData = [
  {
    id: 'bu-masters',
    degree: 'M.S. in Computer Science',
    institution: 'Boston University',
    period: '2025 – Present',
    status: 'Current',
    concentration: 'Data Analytics',
    gradient: 'from-blue-500 to-cyan-500',
    icon: GraduationCap,
    logo: '/bu-logo.png',
    isActive: true,
  },
  {
    id: 'sjsu-bachelors',
    degree: 'B.S. in Software Engineering',
    institution: 'San Jose State University',
    period: '2018 – 2022',
    status: 'Graduated',
    coursework: [
      'Data Structures & Algorithms',
      'Assembly Language Programming',
      'Operating Systems',
      'Object Oriented Design',
      'Information Security',
      'Machine Learning & Big Data',
      'Computer Networks',
      'Software Architecture & Design',
      'Database Management Systems',
      'Web Development Technologies',
    ],
    gradient: 'from-indigo-500 to-purple-500',
    icon: GraduationCap,
    logo: '/sjsu-logo.png',
    isActive: false,
  },
];

const certificationData = [
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    period: '2023',
    status: 'Active',
    credentialId: 'ZEM1DCJCTEFEQEKT',
    validUntil: 'Feb 2026',
    gradient: 'from-orange-500 to-yellow-500',
    icon: Award,
    logo: '/aws-logo.jpg',
    verificationUrl: 'https://aws.amazon.com/verification',
  },
];

export function EducationSection() {
  const [activeTab, setActiveTab] = useState('education');
  const [showAllCourses, setShowAllCourses] = useState(false);

  return (
    <section id='education' className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'>
      <div className='container mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-4xl'
        >
          <div className='mb-12 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-6'
            >
              <h2 className='mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
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
            <TabsList
              className='mx-auto mb-8 flex h-12 w-full max-w-md rounded-2xl bg-transparent p-1 backdrop-blur-md'
              style={{ minWidth: 320 }}
            >
              <TabsTrigger
                value='education'
                className='relative flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-200 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25'
                role='tab'
                aria-selected={activeTab === 'education'}
              >
                <GraduationCap className='h-5 w-5' />
                Education
                {activeTab === 'education' && (
                  <motion.div
                    layoutId='tabIndicator'
                    className='absolute inset-0 -z-10 rounded-xl bg-blue-600'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger
                value='certifications'
                className='relative flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=inactive]:text-slate-200 data-[state=active]:shadow-lg data-[state=active]:shadow-slate-500/20'
                role='tab'
                aria-selected={activeTab === 'certifications'}
              >
                <Award className='h-5 w-5' />
                Certifications
                {activeTab === 'certifications' && (
                  <motion.div
                    layoutId='tabIndicator'
                    className='absolute inset-0 -z-10 rounded-xl bg-orange-500'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value='education' className='space-y-8'>
              {educationData.map((edu, index) => {
                const displayedCourses = showAllCourses
                  ? edu.coursework
                  : edu.coursework ? edu.coursework.slice(0, 6) : null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    viewport={{ once: true }}
                  >
                    <Card className='group relative overflow-hidden rounded-2xl border-none bg-transparent transition-all duration-500'>
                      {/* Enterprise glow effect */}
                      
                      {/* Active indicator for current education */}
                      {edu.isActive && (
                        <>
                          <div className='absolute right-6 top-6 flex items-center gap-2'>
                            <div className='relative flex h-3 w-3 items-center justify-center'>
                              <div className='absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/75' />
                              <div className='relative h-2 w-2 rounded-full bg-emerald-400' />
                            </div>
                            <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                              Current
                            </span>
                          </div>
                        </>
                      )}

                      <CardContent className='relative p-8'>
                        <div className='flex items-start gap-6'>
                          {/* Enhanced logo section */}
                          <div className='relative flex-shrink-0'>
                            <div className='relative h-20 w-20 rounded-2xl border border-slate-600/30 bg-white/8 p-4 shadow-xl backdrop-blur-sm'>
                              <img
                                src={edu.logo}
                                alt={`${edu.institution} logo`}
                                className='h-full w-full object-contain brightness-110 contrast-110 filter'
                              />
                            </div>
                            <div className='absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg'>
                              <edu.icon className='h-4 w-4 text-white' />
                            </div>
                          </div>

                          <div className='min-w-0 flex-1'>
                            {/* Header section */}
                            <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                              <div className='min-w-0 flex-1'>
                                <h3 className='mb-2 text-2xl font-bold leading-tight text-white'>
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
                                  className='group/link inline-flex items-center gap-2 text-lg font-semibold text-slate-300 transition-all duration-300 hover:text-blue-400'
                                >
                                  {edu.institution}
                                  <ExternalLink className='h-4 w-4 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
                                </a>
                                {edu.concentration && (
                                  <p className='mt-2 flex items-center gap-2 text-sm text-slate-400'>
                                    <span className='h-1.5 w-1.5 rounded-full bg-blue-400' />
                                    <span className='font-medium text-slate-300'>Concentration:</span>
                                    {edu.concentration}
                                  </p>
                                )}
                              </div>
                              
                              {/* Professional badges */}
                              <div className='flex flex-wrap gap-3 lg:flex-col lg:items-end'>
                                <Badge className='bg-transparent px-0 py-2 border border-none text-sm font-semibold text-slate-200 backdrop-blur-sm'>
                                  <Calendar className='mr-2 h-4 w-4' />
                                  {edu.period}
                                </Badge>
                                <Badge
                                  className={`px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-sm ${
                                    edu.status === 'Current'
                                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                                      : 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                                  }`}
                                >
                                  {edu.status}
                                </Badge>
                              </div>
                            </div>

                            {/* Coursework section */}
                            {edu.coursework && edu.coursework.length > 0 && (
                              <div className='rounded-xl bg-transparent pt-6 backdrop-blur-sm'>
                                <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                                  <h4 className='flex items-center gap-3 text-lg font-semibold text-white'>
                                    Academic Coursework
                                    <span className='rounded-full bg-slate-700/80 px-3 py-1 text-sm font-medium text-slate-300'>
                                      {edu.coursework.length} courses
                                    </span>
                                  </h4>
                                  {edu.coursework.length > 6 && (
                                    <button
                                      onClick={() => setShowAllCourses(!showAllCourses)}
                                      className='flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-blue-400 shadow-lg backdrop-blur-sm transition-all duration-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400/50'
                                    >
                                      <span>
                                        {showAllCourses
                                          ? 'Show Less'
                                          : `View All`}
                                      </span>
                                      <motion.div
                                        animate={{ rotate: showAllCourses ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                      >
                                        <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                        </svg>
                                      </motion.div>
                                    </button>
                                  )}
                                </div>
                                
                                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                                  {displayedCourses && displayedCourses.map((course, courseIndex) => (
                                    <motion.div
                                      key={courseIndex}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                      duration: 0.3,
                                      delay: courseIndex * 0.05,
                                      ease: [0.22, 1, 0.36, 1]
                                      }}
                                      className='group/course relative flex items-center gap-3 rounded-lg border border-transparent bg-transparent px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50'
                                    >
                                      <div className='h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300 group-hover/course:scale-110' />
                                      <span className='text-sm font-medium leading-tight text-slate-200 group-hover/course:text-white'>
                                      {course}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </TabsContent>

            <TabsContent value='certifications' className='space-y-8'>
              {certificationData.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  viewport={{ once: true }}
                >
                  <Card className='group relative overflow-hidden rounded-2xl border-none bg-transparent transition-all duration-500'>
                    {/* Enterprise glow effect */}
                    
                    {/* Active indicator */}
                    <div className='absolute right-6 top-6 flex items-center gap-2'>
                      <div className='relative flex h-3 w-3 items-center justify-center'>
                        <div className='absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/75' />
                        <div className='relative h-2 w-2 rounded-full bg-emerald-400' />
                      </div>
                      <span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
                        Valid
                      </span>
                    </div>

                    <CardContent className='relative p-8'>
                      <div className='flex items-start gap-6'>
                        {/* Enhanced logo section */}
                        <div className='relative flex-shrink-0'>
                          <div className='relative h-20 w-20 rounded-2xl border border-slate-600/30 bg-white/8 p-4 shadow-xl backdrop-blur-sm'>
                            <img
                              src={cert.logo}
                              alt={`${cert.issuer} logo`}
                              className='h-full w-full object-contain brightness-110 contrast-110 filter'
                            />
                          </div>
                          <div className='absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-slate-900 bg-gradient-to-br from-orange-600 to-yellow-600 shadow-lg'>
                            <cert.icon className='h-4 w-4 text-white' />
                          </div>
                        </div>

                        <div className='min-w-0 flex-1'>
                          {/* Header section */}
                          <div className='mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                            <div className='min-w-0 flex-1'>
                              <h3 className='mb-2 text-2xl font-bold leading-tight text-white'>
                                {cert.title}
                              </h3>
                              <a
                                href={cert.verificationUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group/link inline-flex items-center gap-2 text-lg font-semibold text-slate-300 transition-all duration-300 hover:text-orange-400'
                              >
                                {cert.issuer}
                                <ExternalLink className='h-4 w-4 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
                              </a>
                              {cert.credentialId && (
                                <div className='mt-2 flex items-center gap-2 text-sm text-slate-400'>
                                  <span className='font-medium text-slate-300'>Credential ID:</span>
                                  <div className='group/copy relative'>
                                    <button
                                      onClick={() => {
                                        navigator.clipboard.writeText(cert.credentialId);
                                      }}
                                      className='inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/80 px-3 py-1.5 font-mono text-xs text-orange-400 transition-all duration-300 hover:border-orange-500/50 hover:bg-slate-800/90 hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400/50'
                                    >
                                      <span>{cert.credentialId}</span>
                                      <svg 
                                        className='h-3.5 w-3.5 transition-all duration-200 group-hover/copy:scale-110' 
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
                            
                            {/* Professional badges */}
                            <div className='flex flex-wrap gap-3 lg:flex-col lg:items-end'>
                              <Badge className='bg-transparent px-0 py-2 border border-none text-sm font-semibold text-slate-200 backdrop-blur-sm'>
                                <Calendar className='mr-2 h-4 w-4' />
                                {cert.period}
                              </Badge>
                              <Badge className='border-emerald-500/50 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-300 shadow-lg backdrop-blur-sm'>
                                {cert.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
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
