'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/about/skill-modal';
import { CurrentProjects } from '@/components/about/current-projects';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS, CERTIFICATIONS } from '@/lib/content-registry';
import { ExternalLink, Search, X } from 'lucide-react';

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSkillClick = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find((mapping) => mapping.skill === skill);
    if (
      skillMapping &&
      (skillMapping.experienceIds || skillMapping.projectIds || skillMapping.educationIds)
    ) {
      setSelectedSkill(skill);
      setModalOpen(true);
    }
  };

  const hasMapping = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find((mapping) => mapping.skill === skill);
    return (
      skillMapping &&
      (skillMapping.experienceIds || skillMapping.projectIds || skillMapping.educationIds)
    );
  };

  const getMappingCount = (skill: string) => {
    const skillMapping = SKILL_MAPPINGS.find((mapping) => mapping.skill === skill);
    if (!skillMapping) return 0;
    const experienceCount = skillMapping.experienceIds?.length || 0;
    const projectCount = skillMapping.projectIds?.length || 0;
    const educationCount = skillMapping.educationIds?.length || 0;
    return experienceCount + projectCount + educationCount;
  };

  const categorySkills = (CATEGORIZED_SKILLS[activeCategory as keyof typeof CATEGORIZED_SKILLS] as string[])
    .slice()
    .sort((a, b) => {
      const countA = getMappingCount(a);
      const countB = getMappingCount(b);
      if (countB !== countA) return countB - countA;
      return a.localeCompare(b);
    });

  const normalizeForSearch = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^\w]/g, '')
      .replace(/\s+/g, '');
  const queryNorm = normalizeForSearch(searchQuery);
  const skills = queryNorm
    ? categorySkills.filter((s) => normalizeForSearch(s).includes(queryNorm))
    : categorySkills;

  return (
    <section id="about" className="bg-[#141414] py-16 sm:py-20">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto"
        >
          <h2 className="mb-12 text-left text-2xl font-normal uppercase tracking-[0.15em] text-[#8a8a8a]">
            About Me
          </h2>

          {/* Grid: matches Experience & Projects — 7fr 3fr */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[7fr_3fr] lg:gap-14">
            {/* Left column */}
            <div className="flex min-w-0 flex-col gap-14">
              {/* Overview */}
              <div>
                <h3 className="mb-4 text-left text-sm font-medium uppercase tracking-[0.15em] text-[#6b6b6b]">
                  Overview
                </h3>
                <p className="max-w-2xl text-[15px] leading-[1.85] text-[#c4c4c4] sm:text-base">
                  M.S. Computer Science student (AI & ML concentration) at Boston University specializing in
                  building scalable systems, leading small to large teams, and optimizing client-focused
                  solutions.
                </p>
              </div>

              {/* Technical skills */}
              <div>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-left text-sm font-medium uppercase tracking-[0.15em] text-[#6b6b6b]">
                    Technical Skills
                  </h3>
                  <label className="flex w-[180px] items-center gap-2 border-b border-[#333]/60 bg-transparent px-0 py-1.5 transition-colors focus-within:border-[#404040]">
                    <Search className="h-3 w-3 flex-shrink-0 text-[#4a4a4a]" />
                    <input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="skills-search-input min-w-0 flex-1 bg-transparent text-[11px] text-[#c4c4c4] placeholder:text-[#4a4a4a] focus:outline-none"
                      aria-label="Search skills"
                    />
                    {searchQuery.trim() && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSearchQuery('');
                        }}
                        className="flex-shrink-0 rounded p-0.5 text-[#6b6b6b] transition-colors hover:bg-[#262626] hover:text-[#c4c4c4] focus:outline-none"
                        aria-label="Clear search"
                      >
                        <X className="h-3 w-3" strokeWidth={2} />
                      </button>
                    )}
                  </label>
                </div>
                <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#222]/70 pb-4">
                  {SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      className={`cursor-pointer border-b-2 pb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-200 focus:outline-none ${
                        activeCategory === cat.key && !searchQuery.trim()
                          ? 'border-[#404040] text-[#c4c4c4]'
                          : 'border-transparent text-[#6b6b6b] hover:border-[#333] hover:text-[#a3a3a3]'
                      }`}
                      onClick={() => setActiveCategory(cat.key)}
                      aria-pressed={activeCategory === cat.key && !searchQuery.trim()}
                    >
                      {cat.label}
                    </button>
                  ))}
                  {searchQuery.trim() && (
                    <span className="cursor-default border-b-2 border-[#404040] pb-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#c4c4c4]">
                      {searchQuery.trim()}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5 pt-0.5">
                  {skills.length === 0 ? (
                    <p className="text-[13px] text-[#5a5a5a]">No skills match</p>
                  ) : (
                  <>
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414] ${
                        hasMapping(skill)
                          ? 'border-[#333]/60 bg-transparent text-[#c4c4c4] hover:border-[#3a3a3a]/80 hover:bg-[#1f1f1f]'
                          : 'cursor-default border-[#2a2a2a] bg-transparent text-[#5a5a5a]'
                      }`}
                      aria-label={
                        skill + (hasMapping(skill) ? `, ${getMappingCount(skill)} related items` : '')
                      }
                      onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                      tabIndex={0}
                    >
                      <span className="max-w-[140px] truncate">{skill}</span>
                      {hasMapping(skill) && (
                        <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#2a2a2a] text-[10px] font-medium leading-none text-[#6b6b6b] tabular-nums">
                          {getMappingCount(skill)}
                        </span>
                      )}
                    </button>
                  ))}
                  </>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex min-w-0 flex-col gap-14">
              {/* Current focus */}
              <div>
                <h3 className="mb-4 text-left text-sm font-medium uppercase tracking-[0.15em] text-[#6b6b6b]">
                  Current Focus
                </h3>
                <CurrentProjects showHeading={false} />
              </div>

              {/* Certifications */}
              {CERTIFICATIONS.length > 0 && (
                <div>
                  <h3 className="mb-4 text-left text-sm font-medium uppercase tracking-[0.15em] text-[#6b6b6b]">
                    Certifications
                  </h3>
                  <div className="flex flex-col gap-5">
                    {CERTIFICATIONS.map((cert) => (
                      <a
                        key={cert.id}
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 py-2.5 transition-colors hover:text-[#e5e5e5] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414]"
                      >
                        {cert.logo && (
                          <img
                            src={cert.logo}
                            alt=""
                            className="h-7 w-7 flex-shrink-0 rounded-md object-contain opacity-80 transition-opacity group-hover:opacity-100"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-[#c4c4c4] group-hover:text-[#e5e5e5]">
                            {cert.title}
                          </div>
                          <div className="text-xs text-[#6b6b6b]">
                            {cert.issuer} · {cert.period}
                          </div>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#5a5a5a] transition-colors group-hover:text-[#8a8a8a]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
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
