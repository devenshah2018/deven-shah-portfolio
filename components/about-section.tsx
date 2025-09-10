'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/skill-modal';
import { RotatingTweets } from '@/components/rotating-tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/lib/content-registry';
import { ActivityDashboard } from './activity-dashboard';

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [currentPostType, setCurrentPostType] = useState<'tweet' | 'linkedin'>('tweet');

  const pastAchievements = [
    { name: 'Spartan Sprint', date: '06/2022', type: 'Obstacle Racing' },
    { name: 'Spartan Sprint', date: '04/2023', type: 'Obstacle Racing' },
    { name: 'Spartan Super', date: '08/2024', type: 'Obstacle Racing' },
    { name: 'Olympic Triathlon', date: '06/2025', type: 'Triathlon' },
  ];

  useEffect(() => {
    if (pastAchievements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAchievementIndex(prev => (prev + 1) % pastAchievements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [pastAchievements.length]);

  const handleSkillClick = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find(mapping => mapping.skill === skill);
    if (
      skillMapping &&
      (skillMapping.experiences || skillMapping.projects || skillMapping.education)
    ) {
      setSelectedSkill(skill);
      setModalOpen(true);
    }
  };

  const hasMapping = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find(mapping => mapping.skill === skill);
    return (
      skillMapping && (skillMapping.experiences || skillMapping.projects || skillMapping.education)
    );
  };

  const getMappingCount = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find(mapping => mapping.skill === skill);
    if (!skillMapping) return 0;
    const experienceCount = skillMapping.experiences?.length || 0;
    const projectCount = skillMapping.projects?.length || 0;
    const educationCount = skillMapping.education?.length || 0;
    return experienceCount + projectCount + educationCount;
  };

  // Listen for post type changes from RotatingTweets
  const handlePostTypeChange = (type: 'tweet' | 'linkedin') => setCurrentPostType(type);

  return (
    <section id='about' className='bg-gradient-to-b from-slate-950 to-slate-900 py-32'>
      <div className='container mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='mb-10 text-center sm:mb-14'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-4'
            >
              <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                About Me
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
              Passionate builder bridging advanced technology with real-world impact. I architect,
              code, and launch products at the intersection of AI, analytics, and security. As a
              frequent Spartan Race competitor, physical fitness has become a cornerstone of my
              life, driving my discipline and resilience.
            </motion.p>
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='mb-16'
          >
            <h3 className='mb-8 text-2xl font-bold text-white'>Career Timeline</h3>

            {/* Timeline Container */}
            <div className='relative'>
              {/* Mobile Vertical Timeline Line */}
              <div className='absolute bottom-0 left-6 top-0 w-0.5 bg-slate-600 sm:hidden'></div>

              {/* Desktop Horizontal Timeline Line */}
              <div className='absolute left-0 right-0 top-10 hidden h-1 bg-slate-300 sm:block'></div>

              {/* Timeline Items - Responsive grid with better mobile layout */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6'>
                {/* University */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-amber-400 sm:hidden'></div>

                  <div className='flex h-20 flex-col justify-between rounded-lg border border-slate-500 bg-slate-900 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-amber-400/50'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-amber-400/60 sm:block'></div>
                    <div className='mb-1 truncate text-xs font-semibold text-amber-400'>
                      2018-2022
                    </div>
                    <div className='mb-1 line-clamp-2 text-xs font-bold leading-tight text-white'>
                      B.S. Software Engineering
                    </div>
                    <div className='truncate text-xs text-slate-400'>San Jose State University</div>
                  </div>
                </motion.div>

                {/* NetApp */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-blue-400 sm:hidden'></div>

                  <div className='flex h-20 flex-col justify-between rounded-lg border border-slate-500 bg-slate-900 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-blue-400/50'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-blue-400/60 sm:block'></div>
                    <div className='mb-1 truncate text-xs font-semibold text-blue-400'>
                      2021-2022
                    </div>
                    <div className='mb-1 line-clamp-2 text-xs font-bold leading-tight text-white sm:text-sm'>
                      Solutions Architect
                    </div>
                    <div className='truncate text-xs text-slate-400'>NetApp</div>
                  </div>
                </motion.div>

                {/* AWS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-amber-400 sm:hidden'></div>

                  <div className='flex h-20 flex-col justify-between rounded-lg border border-slate-500 bg-slate-900 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-amber-400/50'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-amber-400/60 sm:block'></div>
                    <div className='mb-1 truncate text-xs font-semibold text-amber-400'>
                      Feb 2023
                    </div>
                    <div className='mb-1 line-clamp-2 text-xs font-bold leading-tight text-white'>
                      Certified Cloud Practitioner
                    </div>
                    <div className='truncate text-xs text-slate-400'>Amazon Web Services</div>
                  </div>
                </motion.div>

                {/* Patelco */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-blue-400 sm:hidden'></div>

                  <div className='flex h-20 flex-col justify-between rounded-lg border border-slate-500 bg-slate-900 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-blue-400/50'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-blue-400/60 sm:block'></div>
                    <div className='mb-1 truncate text-xs font-semibold text-blue-400'>
                      2023-2024
                    </div>
                    <div className='mb-1 line-clamp-2 text-xs font-bold leading-tight text-white sm:text-sm'>
                      Application Developer
                    </div>
                    <div className='truncate text-xs text-slate-400'>Patelco</div>
                  </div>
                </motion.div>

                {/* Suno Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-blue-400 sm:hidden'></div>

                  <div className='group relative flex h-20 flex-col justify-between overflow-hidden rounded-lg border border-slate-500 bg-slate-900/90 p-3 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/60 hover:bg-slate-900/95 hover:shadow-lg hover:shadow-blue-500/10'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-blue-400/60 sm:block'></div>

                    {/* Live indicator subtle glow */}
                    <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 opacity-60'></div>

                    <div className='relative z-10 mb-1 flex min-w-0 items-center justify-between gap-2 text-xs font-semibold text-blue-400'>
                      <span className='truncate'>2024</span>
                      <div className='flex items-center gap-1'>
                        <div className='relative flex h-2 w-2 items-center justify-center'>
                          <div className='absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/75'></div>
                          <div className='relative h-1.5 w-1.5 rounded-full bg-emerald-400'></div>
                        </div>
                        <span className='text-[10px] font-medium uppercase tracking-wider text-emerald-400/90'>
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    <div className='relative z-10 mb-1 line-clamp-2 text-xs font-bold leading-tight text-white sm:text-sm'>
                      Co-Founder & CTO
                    </div>
                    <div className='relative z-10 truncate text-xs text-slate-400'>
                      Suno Analytics
                    </div>
                  </div>
                </motion.div>

                {/* Boston University */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                  className='relative pl-12 sm:pl-0'
                >
                  {/* Mobile Timeline Connector */}
                  <div className='absolute left-6 top-10 h-3 w-3 -translate-x-1/2 transform rounded-full border-2 border-slate-900 bg-amber-400 sm:hidden'></div>

                  <div className='group relative flex h-20 flex-col justify-between overflow-hidden rounded-lg border border-slate-500 bg-slate-900/90 p-3 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/60 hover:bg-slate-900/95 hover:shadow-lg hover:shadow-amber-500/10'>
                    <div className='absolute -top-0.5 left-3 right-3 hidden h-1 rounded-full bg-amber-400/60 sm:block'></div>

                    {/* Live indicator subtle glow */}
                    <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/5 via-transparent to-blue-500/5 opacity-60'></div>

                    <div className='relative z-10 mb-1 flex min-w-0 items-center justify-between gap-2 text-xs font-semibold text-amber-400'>
                      <span className='truncate'>2025</span>
                      <div className='flex items-center gap-1'>
                        <div className='relative flex h-2 w-2 items-center justify-center'>
                          <div className='absolute h-2 w-2 animate-ping rounded-full bg-emerald-400/75'></div>
                          <div className='relative h-1.5 w-1.5 rounded-full bg-emerald-400'></div>
                        </div>
                        <span className='text-[10px] font-medium uppercase tracking-wider text-emerald-400/90'>
                          ACTIVE
                        </span>
                      </div>
                    </div>
                    <div className='relative z-10 mb-1 line-clamp-2 text-xs font-bold leading-tight text-white sm:text-sm'>
                      M.S. Computer Science
                    </div>
                    <div className='relative z-10 truncate text-xs text-slate-400'>
                      Boston University
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Twitter and Strava Section */}
          <div className='mb-20 grid grid-cols-1 gap-12 lg:grid-cols-5'>
            <div className='flex lg:col-span-2'>
              <div className='relative min-h-[320px] w-full max-w-md overflow-visible'>
                <h3 className='mb-3 flex items-center gap-2 text-2xl font-bold text-white'>
                  <FontAwesomeIcon
                    icon={currentPostType === 'linkedin' ? faLinkedin : faXTwitter}
                    className='h-6 w-6 text-blue-400'
                  />
                  Recent Thoughts
                </h3>
                <div>
                  <RotatingTweets onPostTypeChange={handlePostTypeChange} />
                </div>
              </div>
            </div>

            {/* Add extra space only on mobile */}
            <div className='block h-4 lg:hidden'></div>

            <div className='lg:col-span-3'>
              <ActivityDashboard
                pastAchievements={pastAchievements}
                currentAchievementIndex={currentAchievementIndex}
                setCurrentAchievementIndex={setCurrentAchievementIndex}
              />
            </div>
          </div>

          {/* Technical Skills Section - Full Width */}
          <div>
            <h3 className='mb-3 flex items-center gap-2 text-2xl font-bold text-white'>
              Technical Skills
            </h3>

            {/* Category Toggles - Top Horizontal */}
            <div className='mb-6 flex flex-wrap gap-2'>
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  type='button'
                  className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    activeCategory === cat.key
                      ? 'border-blue-400 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                      : 'border-blue-800/50 bg-slate-900 text-blue-200 hover:border-blue-400 hover:bg-blue-900/40 hover:text-white'
                  }`}
                  style={{ letterSpacing: '0.08em' }}
                  onClick={() => setActiveCategory(cat.key)}
                  aria-pressed={activeCategory === cat.key}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className='flex flex-wrap gap-2'>
              {(CATEGORIZED_SKILLS[activeCategory as keyof typeof CATEGORIZED_SKILLS] as string[])
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .map((skill: string) => (
                  <button
                    key={skill}
                    type='button'
                    className={`inline-flex items-center rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-1.5 text-sm font-medium text-slate-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                      hasMapping(skill)
                        ? 'hover:border-blue-400 hover:bg-blue-900/30 hover:text-blue-200 focus:border-blue-400 focus:bg-blue-900/30 focus:text-blue-200'
                        : 'cursor-default opacity-80'
                    }`}
                    style={{
                      minWidth: 0,
                      minHeight: 0,
                      fontSize: '0.98rem',
                      letterSpacing: '0.01em',
                      lineHeight: 1.2,
                    }}
                    aria-label={
                      skill + (hasMapping(skill) ? `, ${getMappingCount(skill)} related items` : '')
                    }
                    onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                    tabIndex={0}
                  >
                    <span className='max-w-[90px] truncate'>{skill}</span>
                    {hasMapping(skill) && (
                      <span className='ml-2 rounded border border-blue-400/30 bg-blue-800 px-1.5 py-0.5 text-[0.7em] font-semibold text-blue-200'>
                        {getMappingCount(skill)}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
      <SkillModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        skillName={selectedSkill}
        skillMappings={SKILL_MAPPINGS}
      />
    </section>
  );
}
