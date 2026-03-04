'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/about/skill-modal';
import { CurrentProjects } from '@/components/about/current-projects';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/lib/content-registry';

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  return (
    <section id="about" className="bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <h2 className="mb-12 text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] sm:text-lg">About Me</h2>

          {/* Simple About + Current Work - use full width */}
          <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] xl:grid-cols-[1.2fr_380px]">
            <div>
              <p className="max-w-xl text-base leading-[1.8] text-[#d4d4d4] sm:text-lg">
              M.S. Computer Science student (AI & ML concentration) at Boston University specializing in building scalable systems, leading small to large teams, and optimizing client-focused solutions. I am actively seeking opportunities to leverage my expertise and deliver exceptional value to impactful teams.
              </p>
            </div>
            <div>
              <CurrentProjects />
            </div>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">Technical Skills</h3>

            <div className="mb-6 flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    activeCategory === cat.key
                      ? 'border-[#525252]/50 bg-[#262626] text-[#f5f5f0]'
                      : 'border-[#404040]/50 bg-transparent text-[#a3a3a3] hover:border-[#525252] hover:text-[#f5f5f0]'
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
                .sort((a, b) => {
                  const countA = getMappingCount(a);
                  const countB = getMappingCount(b);
                  if (countB !== countA) {
                    return countB - countA;
                  }
                  return a.localeCompare(b);
                })
                .map((skill: string) => (
                    <button
                    key={skill}
                    type="button"
                    className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      hasMapping(skill)
                        ? 'border-[#404040]/50 bg-transparent text-[#d4d4d4] hover:border-[#525252] hover:bg-[#262626]'
                        : 'cursor-default border-[#404040]/30 text-[#737373]'
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
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#404040]/50 text-[0.70em] font-semibold leading-none text-[#a3a3a3]">
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
