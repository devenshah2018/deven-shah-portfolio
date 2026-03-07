'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/about/skill-modal';
import { CurrentProjects } from '@/components/about/current-projects';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS, CERTIFICATIONS } from '@/lib/content-registry';
import { ExternalLink } from 'lucide-react';

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
    <section id="about" className="bg-[#141414] pt-12 pb-24 sm:pt-16 sm:pb-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <h2 className="mb-12 text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">About Me</h2>

          {/* Simple About + Current Work - use full width */}
          <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_minmax(320px,480px)] xl:grid-cols-[1.2fr_minmax(380px,560px)]">
            <div>
              <p className="max-w-xl text-base leading-[1.8] text-[#d4d4d4] sm:text-lg">
              M.S. Computer Science student (AI & ML concentration) at Boston University specializing in building scalable systems, leading small to large teams, and optimizing client-focused solutions.
              </p>
            </div>
            <div>
              <CurrentProjects />
            </div>
          </div>

          {/* Technical Skills Section */}
          <div>
            <h3 className="mb-6 text-md font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">Technical Skills</h3>

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
                    className={`inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      hasMapping(skill)
                        ? 'border-[#404040]/50 bg-transparent text-[#d4d4d4] hover:border-[#525252] hover:bg-[#262626]'
                        : 'cursor-default border-[#404040]/30 text-[#737373]'
                    }`}
                    style={{
                      minWidth: 0,
                      minHeight: 0,
                      fontSize: '0.875rem',
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

            {/* Certifications - under Technical Skills */}
            {CERTIFICATIONS.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-4 text-md font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {CERTIFICATIONS.map((cert) => (
                    <a
                      key={cert.id}
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[#404040]/40 bg-[#262626]/50 px-4 py-3 transition-colors hover:border-[#525252]/50 hover:bg-[#262626]"
                    >
                      {cert.logo && (
                        <img
                          src={cert.logo}
                          alt=""
                          className="h-9 w-9 rounded-lg object-contain ring-1 ring-[#404040]/40"
                        />
                      )}
                      <div>
                        <div className="text-sm font-semibold text-[#f5f5f0] group-hover:text-[#d4d4d4]">
                          {cert.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#a3a3a3]">
                          <span>{cert.issuer}</span>
                          <span className="text-[#525252]">·</span>
                          <span>{cert.period}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#525252] group-hover:text-[#a3a3a3]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
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
