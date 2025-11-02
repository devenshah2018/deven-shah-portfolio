'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/about/skill-modal';
import { RotatingTweets } from '@/components/about/rotating-tweets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/lib/content-registry';
import { ActivityDashboard } from './activity-dashboard';
import Timeline from './timeline';

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
      (skillMapping.experienceIds || skillMapping.projectIds || skillMapping.educationIds)
    ) {
      setSelectedSkill(skill);
      setModalOpen(true);
    }
  };

  const hasMapping = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find(mapping => mapping.skill === skill);
    return (
      skillMapping && (skillMapping.experienceIds || skillMapping.projectIds || skillMapping.educationIds)
    );
  };

  const getMappingCount = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find(mapping => mapping.skill === skill);
    if (!skillMapping) return 0;
    const experienceCount = skillMapping.experienceIds?.length || 0;
    const projectCount = skillMapping.projectIds?.length || 0;
    const educationCount = skillMapping.educationIds?.length || 0;
    return experienceCount + projectCount + educationCount;
  };

  // Listen for post type changes from RotatingTweets
  const handlePostTypeChange = (type: 'tweet' | 'linkedin') => setCurrentPostType(type);

  return (
    <section id='about' className='bg-gradient-to-b from-slate-950 to-slate-900 py-20'>
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
          <Timeline />

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
                    className={`inline-flex items-center rounded-md border-none border-slate-600 bg-slate-900/80 px-3 py-1.5 text-sm font-medium text-slate-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                      hasMapping(skill)
                      ? 'hover:bg-gradient-to-r hover:from-blue-900/80 hover:to-blue-700/60 hover:text-white hover:shadow-lg focus:bg-gradient-to-r focus:from-blue-900/90 focus:to-blue-700/70 focus:text-white focus:shadow-lg'
                      : 'cursor-default opacity-80'
                    }`}
                    style={{
                      minWidth: 0,
                      minHeight: 0,
                      fontSize: '1rem',
                      letterSpacing: '0.02em',
                      lineHeight: 1.25,
                      fontWeight: 500,
                    }}
                    aria-label={
                      skill + (hasMapping(skill) ? `, ${getMappingCount(skill)} related items` : '')
                    }
                    onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                    tabIndex={0}
                    >
                    <span className='max-w-[110px] truncate'>{skill}</span>
                    {hasMapping(skill) && (
                        <span className="ml-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 border border-blue-300/40 text-[0.70em] font-semibold text-blue-100 leading-none">
                          <span className="flex items-center justify-center w-full h-full">{getMappingCount(skill)}</span>
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
