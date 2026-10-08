'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/database/content-registry';

export function SkillsBrowser({ onSelect }: { onSelect: (skill: string) => void }) {
  const [category, setCategory] = useState('featured');
  const skills = [...(CATEGORIZED_SKILLS[category] ?? [])].sort((a, b) => a.localeCompare(b));

  return (
    <div className='mt-12 border-t border-[#2c2c29] pt-8'>
      <h3 className='text-lg font-medium tracking-tight text-[#f5f5f0]'>Tools of the trade</h3>
      <p className='mt-2 text-sm leading-6 text-[#aaa]'>
        Select a skill to explore the work behind it.
      </p>
      <div role='group' aria-label='Skill categories' className='my-6 flex flex-wrap gap-2'>
        {SKILL_CATEGORIES.map(item => (
          <button
            key={item.key}
            type='button'
            aria-pressed={category === item.key}
            onClick={() => setCategory(item.key)}
            className={`min-h-11 rounded-md px-3 text-sm font-medium transition-colors ${category === item.key ? 'bg-[#a5c9bd]/15 text-[#c5e5d9]' : 'text-[#aaa] hover:bg-white/5 hover:text-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul
        aria-label='Skills'
        className='grid grid-cols-2 gap-x-5 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4'
      >
        {skills.map(skill => {
          const mapping = SKILL_MAPPINGS.find(item => item.skill === skill);
          const count =
            (mapping?.experienceIds?.length ?? 0) +
            (mapping?.projectIds?.length ?? 0) +
            (mapping?.educationIds?.length ?? 0);
          return (
            <li key={skill} className='min-w-0 border-b border-[#2c2c29]'>
              <button
                type='button'
                onClick={() => onSelect(skill)}
                disabled={count === 0}
                aria-label={count ? `${skill}, explore related work` : skill}
                className='group flex min-h-14 w-full items-center justify-between gap-2 py-3 text-left text-[15px] font-medium leading-6 text-[#e5e5df] transition-colors hover:text-[#bce2d3] disabled:cursor-default disabled:text-[#aaa]'
              >
                <span>{skill}</span>
                {count > 0 && (
                  <ArrowUpRight
                    aria-hidden='true'
                    className='h-3.5 w-3.5 shrink-0 text-[#737373] transition-colors group-hover:text-[#bce2d3]'
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
