'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillModal } from '@/components/about/skill-modal';
import { GitHubContributionChart } from '@/components/hero/github-contribution-chart';
import { SKILL_MAPPINGS, CERTIFICATIONS, groupExperiencesByOrg } from '@/database/content-registry';
import { requestScrollToExperience } from '@/lib/url-utils';
import { ArrowUpRight } from 'lucide-react';
import { SkillsBrowser } from './skills-browser';

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  return (
    <section id='about' className='relative bg-[#141414] py-16 sm:py-24'>
      <div className='container mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className='section-eyebrow'>01 / About me</p>
          <div className='grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-20'>
            <div className='min-w-0'>
              <h2 className='section-title max-w-xl'>
                Research-minded.
                <br />
                <span className='text-[#9aaea5]'>Built for the real world.</span>
              </h2>
              <p className='mt-7 max-w-xl text-base leading-8 text-[#b1b1ad]'>
                I’m a software engineer and AI researcher turning research into production. At
                Boston University, I work on medical imaging and deepfake detection while pursuing
                an M.S. in Computer Science.
              </p>
              <p className='mt-4 max-w-xl text-sm leading-7 text-[#999]'>
                My background spans product leadership at Suno Analytics, member-facing applications
                at Patelco, and secure data operations at NetApp. I care about the space where
                rigorous ideas become useful software.
              </p>
              <div
                className='mt-8 flex min-w-0 items-center gap-4'
                aria-label='Previous workplaces'
              >
                <span className='shrink-0 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.15em] text-[#999]'>
                  Prev @
                </span>
                <div className='flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto py-2 sm:gap-3'>
                  {groupExperiencesByOrg().map(org => {
                    const firstId = org.positions[0]?.id;
                    if (!org.companyLogo || !firstId) return null;
                    return (
                      <button
                        key={org.company}
                        type='button'
                        onClick={() => requestScrollToExperience(firstId)}
                        aria-label={`Scroll to ${org.company}`}
                        title={org.company}
                        className='flex h-11 w-11 shrink-0 items-center justify-center opacity-80 transition-opacity hover:opacity-100'
                      >
                        <img
                          src={org.companyLogo}
                          alt=''
                          className='h-6 w-6 rounded-sm object-contain sm:h-7 sm:w-7'
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <aside className='min-w-0 lg:pt-2'>
              <h3 className='section-eyebrow'>GitHub contributions</h3>
              <GitHubContributionChart compact />
              {CERTIFICATIONS.length > 0 && (
                <div className='mt-8 border-t border-[#2c2c29] pt-6'>
                  <h3 className='section-eyebrow'>Credentials</h3>
                  <div className='space-y-5'>
                    {CERTIFICATIONS.map(cert => (
                      <a
                        key={cert.id}
                        href={cert.verificationUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group flex items-center gap-3'
                      >
                        {cert.logo && (
                          <img src={cert.logo} alt='' className='h-8 w-8 shrink-0 object-contain' />
                        )}
                        <div className='min-w-0 flex-1'>
                          <p className='text-sm leading-6 text-[#d4d4cd] group-hover:text-white'>
                            {cert.title}
                          </p>
                          <p className='text-xs leading-6 text-[#999]'>
                            {cert.issuer} · {cert.period}
                          </p>
                        </div>
                        <ArrowUpRight className='h-4 w-4 shrink-0 text-[#888]' />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
          <SkillsBrowser
            onSelect={skill => {
              setSelectedSkill(skill);
              setModalOpen(true);
            }}
          />
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
