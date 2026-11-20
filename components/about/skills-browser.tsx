'use client';
import { memo, useState } from 'react';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/database/content-registry';
import styles from './skills-browser.module.css';
const SORTED_SKILLS = Object.fromEntries(
  Object.entries(CATEGORIZED_SKILLS).map(([category, skills]) => [
    category,
    [...skills].sort((a, b) => a.localeCompare(b)),
  ])
);
const SKILL_COUNTS = new Map(
  SKILL_MAPPINGS.map(mapping => [
    mapping.skill,
    (mapping.experienceIds?.length ?? 0) +
      (mapping.projectIds?.length ?? 0) +
      (mapping.educationIds?.length ?? 0),
  ])
);

export const SkillsBrowser = memo(function SkillsBrowser({
  onSelect,
}: {
  onSelect: (skill: string) => void;
}) {
  const [category, setCategory] = useState('featured');
  const skills = SORTED_SKILLS[category] ?? [];
  return (
    <div className='mt-12 border-t border-[#2c2c29] pt-8'>
      <h3 className='text-base font-medium text-[#f5f5f0] sm:text-lg'>Tools of the trade</h3>
      <div role='group' aria-label='Skill categories' className={styles['categories']}>
        {SKILL_CATEGORIES.map(item => (
          <button
            key={item.key}
            type='button'
            aria-pressed={category === item.key}
            onClick={() => setCategory(item.key)}
            className={styles['category']}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul aria-label='Skills' className={styles['skills']}>
        {skills.map(skill => {
          const count = SKILL_COUNTS.get(skill) ?? 0;
          return (
            <li key={skill} className={styles['skillItem']}>
              <button
                type='button'
                onClick={() => onSelect(skill)}
                disabled={count === 0}
                aria-label={count ? `${skill}, explore related work` : skill}
                className={styles['skill']}
              >
                <span>{skill}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
