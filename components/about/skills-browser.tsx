'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { List, Network } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion, useReducedMotion } from 'framer-motion';
import { CATEGORIZED_SKILLS, SKILL_CATEGORIES, SKILL_MAPPINGS } from '@/database/content-registry';
import CodonSkills from './codon-skills';
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
  const [view, setView] = useState<'list' | 'graph'>('list');
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>();
  const reduceMotion = useReducedMotion();
  const skills = SORTED_SKILLS[category] ?? [];

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => {
      const height = content.getBoundingClientRect().height;
      if (height > 0) setContentHeight(height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <Tabs.Root
      value={view}
      onValueChange={value => setView(value as 'list' | 'graph')}
      className='mt-12 border-t border-[#2c2c29] pt-8'
    >
      <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-3'>
        <h3 className='text-base font-medium tracking-tight text-[#f5f5f0] sm:text-lg'>
          Tools of the trade
        </h3>
        <Tabs.List aria-label='Skills view' className={styles['switcher']}>
          <span
            aria-hidden='true'
            className={styles['indicator']}
            style={{ transform: view === 'graph' ? 'translateX(100%)' : 'translateX(0)' }}
          />
          {(['list', 'graph'] as const).map(mode => (
            <Tabs.Trigger key={mode} value={mode} className={styles['choice']}>
              {mode === 'list' ? <List aria-hidden='true' /> : <Network aria-hidden='true' />}
              {mode === 'list' ? 'List' : 'Graph'}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
      <p className='mt-2 text-sm leading-6 text-[#aaa]'>
        {view === 'list'
          ? 'Select a skill to explore the work behind it.'
          : 'Explore the connections across my software ecosystem.'}
      </p>
      <motion.div
        initial={false}
        animate={{ height: contentHeight ?? 'auto' }}
        transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        className='-mx-2 overflow-hidden'
      >
        <div ref={contentRef} className='flow-root px-2 pb-2'>
          <Tabs.Content value='graph' className={styles['panel']}>
            <div className='mt-6 min-w-0'>
              <CodonSkills />
            </div>
          </Tabs.Content>
          <Tabs.Content value='list' className={styles['panel']}>
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
                      <span aria-hidden='true' className={styles['skillMarker']} />
                      <span>{skill}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Tabs.Content>
        </div>
      </motion.div>
    </Tabs.Root>
  );
});
