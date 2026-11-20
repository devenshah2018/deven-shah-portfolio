'use client';
import { useEffect, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import {
  groupExperiencesByOrg,
  formatPeriodDisplay,
  getSkillsForExperienceId,
  hasFutureStart,
  type Experience,
} from '@/database/content-registry';
import { REQUEST_SCROLL_TO_EXPERIENCE, scrollToExperience, scrollToSection } from '@/lib/url-utils';

const companies = groupExperiencesByOrg();
const INITIAL_COUNT = 5;

function ExperienceRole({ position }: { position: Experience }) {
  const skills = getSkillsForExperienceId(position.id);
  return (
    <div id={`experience-${position.id}`} className='py-6 first:pt-0 last:pb-0'>
      <h3 className='text-lg font-medium leading-7 text-[#f5f5f0]'>{position.title}</h3>
      <p className='mt-1 text-xs tabular-nums leading-6 text-[#999]'>
        {formatPeriodDisplay(position.period)}
      </p>
      {!hasFutureStart(position.period) && position.description && (
        <p className='mt-3 text-sm leading-7 text-[#b1b1ad]'>{position.description}</p>
      )}
      {skills.length > 0 && (
        <p className='mt-4 text-xs leading-6 text-[#888]'>{skills.join(' · ')}</p>
      )}
      {position.achievements && position.achievements.length > 0 && (
        <details className='group mt-3'>
          <summary className='flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 text-xs font-medium text-[#a5c9bd] [&::-webkit-details-marker]:hidden'>
            Highlights
            <ChevronDown aria-hidden='true' className='h-3.5 w-3.5 group-open:rotate-180' />
          </summary>
          <ul className='mt-2 space-y-3 border-l border-[#3a443e] pl-4 text-sm leading-7 text-[#aaa]'>
            {position.achievements.map(achievement => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const reveal = (event: Event) => {
      const id = (event as CustomEvent<{ experienceId: string }>).detail.experienceId;
      if (
        companies.findIndex(company => company.positions.some(position => position.id === id)) >=
        INITIAL_COUNT
      )
        setShowAll(true);
      scrollToExperience(id);
    };
    window.addEventListener(REQUEST_SCROLL_TO_EXPERIENCE, reveal);
    return () => window.removeEventListener(REQUEST_SCROLL_TO_EXPERIENCE, reveal);
  }, []);
  return (
    <section id='experience' className='bg-[#141414] py-16 sm:py-24'>
      <div className='container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
        <p className='section-eyebrow'>02</p>
        <h2 className='section-title mb-10'>Experience</h2>
        <div id='experience-companies' className='divide-y divide-[#2c2c29]'>
          {companies.map((company, index) => (
            <article
              key={company.company}
              aria-label={company.company}
              hidden={!showAll && index >= INITIAL_COUNT}
              className='py-8 first:pt-0 sm:py-10'
            >
              <div className='grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-16'>
                <div className='min-w-0'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={company.companyLogo}
                      alt=''
                      className='h-9 w-9 shrink-0 rounded object-contain'
                    />
                    <a
                      href={company.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-base font-medium text-[#edede6] hover:text-[#a5c9bd]'
                    >
                      {company.company}
                    </a>
                  </div>
                  {company.location && (
                    <p className='mt-4 flex items-center gap-1.5 text-xs text-[#888]'>
                      <MapPin aria-hidden='true' className='h-3 w-3' />
                      {company.location}
                    </p>
                  )}
                  {company.duration && (
                    <p className='mt-2 text-xs tabular-nums text-[#999]'>{company.duration}</p>
                  )}
                </div>
                <div className='min-w-0 divide-y divide-[#2c2c29]'>
                  {company.positions.map(position => (
                    <ExperienceRole key={position.id} position={position} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {companies.length > INITIAL_COUNT && (
          <button
            type='button'
            aria-expanded={showAll}
            aria-controls='experience-companies'
            onClick={() => {
              setShowAll(!showAll);
              if (showAll) scrollToSection('experience');
            }}
            className='mt-5 inline-flex min-h-12 items-center gap-3 rounded-md border border-[#3b443f] px-5 text-sm font-medium text-[#c6dacf] hover:bg-[#1c231f]'
          >
            {showAll
              ? 'Show less'
              : `Show more experience (${companies.length - INITIAL_COUNT} companies)`}
            <ChevronDown aria-hidden='true' className={`h-4 w-4 ${showAll ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </section>
  );
}
