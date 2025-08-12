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
    period: 'Present',
    status: 'In Progress',
    concentration: 'Data Analytics',
    coursework: [],
    gradient: 'from-blue-500 to-cyan-500',
    icon: GraduationCap,
    logo: '/bu-logo.png',
  },
  {
    id: 'sjsu-bachelors',
    degree: 'B.S. in Software Engineering',
    institution: 'San Jose State University',
    period: '08/2018 – 12/2022',
    status: 'Completed',
    coursework: [
      'Data Structures & Algorithms',
      'Assembly Language Programming',
      'Operating Systems',
      'Object Oriented Design',
      'Information Security',
      'Machine Learning & Big Data',
      'Computer Networks',
    ],
    gradient: 'from-indigo-500 to-purple-500',
    icon: GraduationCap,
    logo: '/sjsu-logo.png',
  },
];

const certificationData = [
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner Certification',
    issuer: 'Amazon Web Services',
    period: '02/2023',
    status: 'Active',
    gradient: 'from-orange-500 to-yellow-500',
    icon: Award,
    logo: '/aws-logo.jpg',
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
              className='mx-auto mb-8 flex h-12 w-full max-w-md rounded-2xl border border-slate-600/60 bg-slate-800/90 p-1 shadow-xl ring-1 ring-slate-500/20 backdrop-blur-md'
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
                className='relative flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-base font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=inactive]:text-slate-200 data-[state=active]:shadow-lg data-[state=active]:shadow-slate-500/20'
                role='tab'
                aria-selected={activeTab === 'certifications'}
              >
                <Award className='h-5 w-5' />
                Certifications
                {activeTab === 'certifications' && (
                  <motion.div
                    layoutId='tabIndicator'
                    className='absolute inset-0 -z-10 rounded-xl bg-slate-700'
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value='education'
              className='space-y-4'
              role='tabpanel'
              aria-labelledby='education-tab'
            >
              {educationData.map((edu, index) => {
                const displayedCourses = showAllCourses
                  ? edu.coursework
                  : edu.coursework.slice(0, 4);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      data-item-id={edu.id}
                      className='group overflow-hidden rounded-xl border border-slate-700/30 bg-slate-900/90 shadow-xl backdrop-blur-sm transition-all duration-500'
                    >
                      <CardContent className='p-0'>
                        <div className='flex items-start gap-4 p-6'>
                          <div className='relative flex-shrink-0'>
                            <div className='h-16 w-16 rounded-xl border border-slate-600/30 bg-white/5 p-3 shadow-md backdrop-blur-sm'>
                              <img
                                src={edu.logo}
                                alt={`${edu.institution} logo`}
                                className='h-full w-full object-contain brightness-110 filter'
                              />
                            </div>
                            <div className='absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-slate-900 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md'>
                              <edu.icon className='h-3 w-3 text-white' />
                            </div>
                          </div>

                          <div className='min-w-0 flex-1'>
                            <div className='mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
                              <div className='min-w-0'>
                                <h3 className='mb-1 text-xl font-bold leading-tight text-white'>
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
                                  className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text pl-0.5 pr-1.5 text-base font-semibold text-transparent transition-all duration-300'
                                >
                                  {edu.institution}
                                  <ExternalLink className='h-4 w-4 text-slate-400 transition-colors group-hover/link:text-blue-400' />
                                </a>
                                {edu.concentration && (
                                  <p className='text-sm text-slate-400'>
                                    <span className='font-medium text-slate-300'>
                                      Concentration:
                                    </span>{' '}
                                    {edu.concentration}
                                  </p>
                                )}
                              </div>
                              <div className='flex flex-wrap gap-2 lg:flex-col lg:items-end'>
                                <Badge
                                  variant='outline'
                                  className='border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition-all duration-200'
                                >
                                  <Calendar className='mr-1.5 h-3 w-3' />
                                  {edu.period}
                                </Badge>
                                <Badge
                                  variant='outline'
                                  className={`px-3 py-1.5 text-xs font-medium shadow-sm transition-all duration-200 ${
                                    edu.status === 'In Progress'
                                      ? 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                                      : 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300'
                                  }`}
                                >
                                  {edu.status}
                                </Badge>
                              </div>
                            </div>

                            {edu.coursework.length > 0 && (
                              <div className='border-t border-slate-700/30 pt-4'>
                                <div className='mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                                  <h4 className='flex items-center gap-2 text-sm font-semibold text-slate-200'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500'></div>
                                    Relevant Coursework
                                    <span className='text-xs font-normal text-slate-400'>
                                      ({edu.coursework.length})
                                    </span>
                                  </h4>
                                  {edu.coursework.length > 4 && (
                                    <button
                                      onClick={() => setShowAllCourses(!showAllCourses)}
                                      className='flex w-fit items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-semibold text-blue-500 shadow-sm transition-all duration-200 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/70 sm:w-auto'
                                      aria-label={
                                        showAllCourses ? 'Show fewer courses' : 'Show all courses'
                                      }
                                      tabIndex={0}
                                      style={{
                                        cursor: 'pointer',
                                        minWidth: 110,
                                      }}
                                    >
                                      <span>
                                        {showAllCourses
                                          ? 'Show Less'
                                          : `Show All (${edu.coursework.length})`}
                                      </span>
                                      <motion.div
                                        animate={{
                                          rotate: showAllCourses ? 180 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className='inline-block'
                                      >
                                        <svg
                                          className='h-3 w-3'
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
                                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3'>
                                  {displayedCourses.map((course, courseIndex) => (
                                    <motion.div
                                      key={courseIndex}
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: courseIndex * 0.05,
                                      }}
                                      className='flex h-[32px] min-h-[32px] w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/95 px-2.5 py-1 shadow-sm'
                                      style={{
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <span className='h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700'></span>
                                      <span
                                        className='flex-1 truncate whitespace-normal break-words text-left text-[0.82rem] font-medium leading-tight text-slate-300'
                                        title={course}
                                      >
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

            <TabsContent
              value='certifications'
              className='space-y-4'
              role='tabpanel'
              aria-labelledby='certifications-tab'
            >
              {certificationData.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    data-item-id={cert.id}
                    className='group rounded-xl border border-slate-700/30 bg-slate-900/90 shadow-xl backdrop-blur-sm transition-all duration-300'
                  >
                    <CardContent className='p-0'>
                      <div className='flex items-start gap-4 p-6'>
                        <div className='relative flex-shrink-0'>
                          <div className='h-16 w-16 rounded-xl border border-slate-600/30 bg-white/5 p-3 shadow-md backdrop-blur-sm'>
                            <img
                              src={cert.logo}
                              alt={`${cert.issuer} logo`}
                              className='h-full w-full object-contain brightness-110 filter'
                            />
                          </div>
                          <div className='absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-slate-900 bg-gradient-to-br from-orange-500 to-yellow-500 shadow-md'>
                            <cert.icon className='h-3 w-3 text-white' />
                          </div>
                        </div>

                        <div className='min-w-0 flex-1'>
                          <div className='mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                            <div className='min-w-0'>
                              <h3 className='mb-1 text-xl font-bold leading-tight text-white'>
                                {cert.title}
                              </h3>
                              <a
                                href={
                                  cert.issuer === 'Amazon Web Services'
                                    ? 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
                                    : '#'
                                }
                                target='_blank'
                                rel='noopener noreferrer'
                                className='inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text pl-0.5 pr-1.5 text-base font-semibold text-transparent transition-all duration-300'
                              >
                                {cert.issuer}
                                <ExternalLink className='h-4 w-4 text-slate-400 transition-colors group-hover/link:text-blue-400' />
                              </a>
                            </div>
                            <div className='flex flex-shrink-0 gap-2'>
                              <Badge
                                variant='outline'
                                className='border-slate-600 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm'
                              >
                                <Calendar className='mr-1.5 h-3 w-3' />
                                {cert.period}
                              </Badge>
                              <Badge
                                variant='outline'
                                className='border-emerald-500/40 bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-300 shadow-sm'
                              >
                                {cert.status}
                              </Badge>
                            </div>
                          </div>

                          <div className='border-t border-slate-700/30 pt-3'>
                            <h4 className='mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200'>
                              <div className='h-1.5 w-1.5 rounded-full bg-orange-400'></div>
                              Professional Certification
                            </h4>
                            <p className='text-sm leading-relaxed text-slate-400'>
                              Industry-recognized certification demonstrating expertise in cloud
                              computing fundamentals, AWS services, security, and best practices for
                              cloud architecture.
                            </p>
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
