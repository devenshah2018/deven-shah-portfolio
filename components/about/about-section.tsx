'use client';

import { motion } from 'framer-motion';
import { GitHubContributionChart } from '@/components/hero/github-contribution-chart';
import { CERTIFICATIONS, groupExperiencesByOrg } from '@/database/content-registry';
import { requestScrollToExperience } from '@/lib/url-utils';
import { ArrowUpRight } from 'lucide-react';
import { SkillsExplorer } from './skills-explorer';

export function AboutSection() {
  return (
    <section id='about' className='relative bg-[#141414] py-16 sm:py-24'>
      <div className='container mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className='section-eyebrow'>01</p>
          <h2 className='section-title mb-8 sm:mb-10'>About</h2>
          <div className='grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-20'>
            <div className='min-w-0'>
              <div className='max-w-xl space-y-5 text-base leading-8 text-[#b1b1ad]'>
                <p>
                  I’m a software engineer and AI researcher pursuing an M.S. in Computer Science at
                  Boston University, focused on AI and machine learning. My research spans medical
                  imaging, deepfake detection, and financial fraud detection, from U-Net models for
                  knee MRI analysis to leading a cross-disciplinary fraud research initiative.
                </p>
                <p>
                  I’ve built AI agents for Salesforce workflows at Accenture and co-founded Suno
                  Analytics, where I led engineering for an AI-powered ERP platform serving 50+
                  enterprise customers. My earlier work includes digital member services at Patelco
                  and automated Oracle backup workflows at NetApp.
                </p>
              </div>
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
            <aside className='min-w-0'>
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
          <SkillsExplorer />
        </motion.div>
      </div>
    </section>
  );
}
