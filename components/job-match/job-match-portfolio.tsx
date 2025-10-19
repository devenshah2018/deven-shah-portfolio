'use client';

import { useJobMatch } from './job-match-context';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { LINKS } from '@/lib/content-registry';
import { useEffect, useState, useRef } from 'react';

export function JobMatchPortfolio() {
  const { matchResult, isMatchView, clearMatch } = useJobMatch();
    const [showName, setShowName] = useState(true); // Start with name showing at top
    const [currentTime, setCurrentTime] = useState('');
    const [timeZoneAbbr, setTimeZoneAbbr] = useState('');
    const [timeZoneFull, setTimeZoneFull] = useState('');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      console.log('scrollContainer ref:', scrollContainer);
      if (!scrollContainer) return;

      const handleScroll = () => {
        // Show name only when at the very top, show clock when scrolled at all
        const shouldShowName = scrollContainer.scrollTop === 0;
        console.log('Scroll position:', scrollContainer.scrollTop, 'Show name:', shouldShowName);
        setShowName(shouldShowName);
      };
  
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Set initial state based on current scroll position
      handleScroll();
      
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

      useEffect(() => {
    const updateClock = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date();
      const abbr =
        now
          .toLocaleTimeString('en-US', {
            timeZoneName: 'short',
            timeZone: tz,
          })
          .split(' ')
          .pop() || tz;
      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: tz,
      });
      setCurrentTime(time);
      setTimeZoneAbbr(abbr);
      setTimeZoneFull(tz);
      console.log('Clock updated:', time, abbr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMatchView || !matchResult) return null;

  console.log('Rendering JobMatchPortfolio - showName:', showName, 'currentTime:', currentTime);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950"
      >
        <div ref={scrollContainerRef} className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-800/50 bg-slate-950/90 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                             <AnimatePresence mode='wait'>
                {showName ? (
                  <motion.div
                    key='deven-shah'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className='group relative'
                  >
                    <span className='block cursor-pointer bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent'>
                      Deven Shah
                    </span>

                    <div className='pointer-events-none absolute left-0 top-full z-50 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100'>
                      <div className='absolute -top-2 left-0 h-2 w-full bg-transparent'></div>

                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='relative mt-2'
                      >
                        <div className='rounded-lg border border-slate-700/40 bg-slate-950/90 p-2 shadow-xl backdrop-blur-lg'>
                          <div className='flex items-center gap-2'>
                            <a
                              href={LINKS.github}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-700/50 hover:text-slate-200'
                              aria-label='GitHub Profile'
                            >
                              <svg className='h-3.5 w-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                              </svg>
                            </a>

                            <a
                              href={LINKS.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-blue-600/15 hover:text-blue-400'
                              aria-label='LinkedIn Profile'
                            >
                              <svg className='h-3.5 w-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                              </svg>
                            </a>

                            <a
                              href={`mailto:${LINKS.email}`}
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-green-600/15 hover:text-green-400'
                              aria-label='Email Contact'
                            >
                              <svg
                                className='h-3.5 w-3.5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                              </svg>
                            </a>

                            <a
                              href={LINKS.x}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-600/20 hover:text-slate-200'
                              aria-label='X (Twitter) Profile'
                            >
                              <svg className='h-3 w-3' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                              </svg>
                            </a>
                            <a
                              href={LINKS.kaggle}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-600/20 hover:text-slate-200'
                              aria-label='Kaggle Profile'
                            >
                              <FontAwesomeIcon icon={faKaggle} className='h-3 w-3' />
                            </a>
                          </div>
                        </div>

                        <div className='absolute -top-1 left-4 h-2 w-2 rotate-45 transform border-l border-t border-slate-700/40 bg-slate-950/90'></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    key='clock'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className='block'
                  >
                    {currentTime ? (
                      <span
                        className='inline-flex select-none items-center rounded-lg bg-slate-900/80 px-3 py-1 font-mono text-lg font-semibold tracking-widest text-slate-100'
                        title={timeZoneFull}
                      >
                        <svg
                          className='mr-2 h-5 w-5 text-blue-400'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                        >
                          <circle
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='2'
                            fill='none'
                          />
                          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' />
                        </svg>
                        <span className='tabular-nums'>{currentTime}</span>
                        <span className='ml-2 text-xs font-bold uppercase tracking-wider text-blue-300'>
                          {timeZoneAbbr}
                        </span>
                      </span>
                    ) : (
                      <span className='inline-flex select-none items-center rounded-lg bg-slate-900/80 px-3 py-1 font-mono text-lg font-semibold tracking-widest text-slate-400'>
                        Loading...
                      </span>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
              </div>
            </div>
            <Button
              onClick={clearMatch}
              variant="ghost"
              size="sm"
              className="group relative overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-4 py-2 font-medium text-slate-200 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:from-slate-800 hover:to-slate-900 hover:text-white hover:shadow-blue-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                <span className="text-sm">Exit Match View</span>
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">

        {/* Matched Skills */}
        {matchResult.skills.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Relevant Skills</h2>
            <div className="flex flex-wrap gap-3">
              {matchResult.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Matched Experiences */}
        {matchResult.experiences.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Relevant Experience</h2>
            <div className="space-y-6">
              {matchResult.experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {exp.companyLogo && (
                        <img
                          src={exp.companyLogo}
                          alt={exp.company}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-lg text-blue-400">{exp.company}</p>
                        <p className="text-sm text-slate-500">
                          {exp.period} • {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-300">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Matched Projects */}
        {matchResult.projects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Relevant Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {matchResult.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-slate-700"
                >
                  <h3 className="mb-2 text-lg font-bold text-white">{project.title}</h3>
                  <p className="mb-4 text-sm text-slate-400">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map(tech => (
                        <span
                          key={tech}
                          className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Education</h2>
          <div className="space-y-4">
            {matchResult.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <div className="flex items-start gap-4">
                  {edu.logo && (
                    <img src={edu.logo} alt={edu.institution} className="h-12 w-12 rounded-lg" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                    <p className="text-blue-400">{edu.institution}</p>
                    <p className="text-sm text-slate-500">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Keywords Detected */}
        {matchResult.extractedKeywords.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-slate-800/50 bg-slate-900/30 p-6"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Keywords Detected
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchResult.extractedKeywords.map(keyword => (
                <span
                  key={keyword}
                  className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-400"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.section>
        )}
      </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
