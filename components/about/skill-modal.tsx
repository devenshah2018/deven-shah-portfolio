'use client';

import { useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  expandSkillMapping,
  getEndDate,
  formatPeriodDisplay,
  SKILL_CATEGORIES,
  CATEGORIZED_SKILLS,
  type SKILL_MAPPINGS,
} from '@/database/content-registry';
import { scrollToProject, requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';
import { ChevronRight, Briefcase, Code, GraduationCap } from 'lucide-react';
import type { Experience } from '@/database/content-registry';
import type { Project } from '@/lib/types';

interface SkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillName: string | null;
  skillMappings: typeof SKILL_MAPPINGS;
}

function sortExperiencesByRecency(exps: (Experience | undefined)[]): Experience[] {
  return exps
    .filter((e): e is Experience => Boolean(e))
    .sort((a, b) => getEndDate(b.period) - getEndDate(a.period));
}

function sortProjectsByRecency(projects: (Project | undefined)[]) {
  return projects
    .filter((p): p is Project => Boolean(p))
    .sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || ''));
}

function getEducationSortKey(period: string): number {
  if (period.includes('Present')) return 999999;
  const years = period.match(/\d{4}/g);
  return years?.length ? parseInt(years[years.length - 1]!, 10) : 0;
}

export function SkillModal({ open, onOpenChange, skillName, skillMappings }: SkillModalProps) {
  const skillMapping = skillMappings.find(mapping => mapping.skill === skillName);
  const skillData = skillMapping ? expandSkillMapping(skillMapping) : null;

  const opener = useRef<HTMLElement | null>(null);
  const destination = useRef<(() => void) | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const followLink = (navigate: () => void) => {
    destination.current = navigate;
    onOpenChange(false);
  };
  const handleScrollToExperience = (id: string) => followLink(() => requestScrollToExperience(id));
  const handleScrollToProject = (id: string) => followLink(() => scrollToProject(id));
  const handleScrollToEducation = (id: string) => followLink(() => scrollToEducation(id));

  if (!skillData || !skillName) {
    return null;
  }

  const categoryTags = SKILL_CATEGORIES.filter(
    cat =>
      cat.key !== 'all' &&
      (CATEGORIZED_SKILLS[cat.key as keyof typeof CATEGORIZED_SKILLS] as string[]).includes(
        skillName
      )
  ).map(cat => cat.label);

  const sortedExperiences = sortExperiencesByRecency(skillData.experiences || []);
  const sortedProjects = sortProjectsByRecency(skillData.projects || []);
  const sortedEducation = (skillData.education || [])
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort(
      (a, b) =>
        getEducationSortKey((b as { period?: string }).period || '') -
        getEducationSortKey((a as { period?: string }).period || '')
    );

  const itemClass =
    'group flex w-full items-center gap-2.5 min-h-14 py-3 text-left transition-colors hover:text-[#f5f5f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={event => {
          event.preventDefault();
          opener.current = document.activeElement as HTMLElement | null;
          titleRef.current?.focus({ preventScroll: true });
        }}
        onCloseAutoFocus={event => {
          event.preventDefault();
          const navigate = destination.current;
          destination.current = null;
          if (navigate) navigate();
          else opener.current?.focus({ preventScroll: true });
        }}
        className='bottom-4 left-4 right-4 top-auto flex max-h-[calc(100dvh-2rem)] w-auto max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-xl border border-[#333] bg-[#181818] p-0 shadow-xl sm:bottom-8 sm:left-8 sm:right-auto sm:w-[360px] sm:max-w-[calc(100vw-4rem)]'
      >
        <div className='shrink-0 border-b border-[#333] px-5 py-5 pr-14'>
          <div className='flex flex-wrap items-center gap-2'>
            <DialogTitle
              ref={titleRef}
              tabIndex={-1}
              className='text-lg font-medium leading-tight text-[#f5f5f0]'
            >
              {skillName}
            </DialogTitle>
            {categoryTags.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {categoryTags.map(tag => (
                  <span
                    key={tag}
                    className='rounded border border-[#333]/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#aaa]'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DialogDescription className='mt-2 text-sm text-[#aaa]'>
            Explore related experience, projects, and education.
          </DialogDescription>
        </div>

        <div className='max-h-[60dvh] min-h-0 overflow-y-auto overscroll-contain px-5 py-2 pb-[max(1rem,env(safe-area-inset-bottom))]'>
          {sortedExperiences.length > 0 && (
            <div className='mb-4'>
              <h3 className='mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#aaa]'>
                <Briefcase className='h-3 w-3' />
                Experience
              </h3>
              <div className='space-y-0'>
                {sortedExperiences.map(exp => (
                  <button
                    key={exp.id}
                    type='button'
                    className={itemClass}
                    onClick={() => handleScrollToExperience(exp.id)}
                    aria-label={`Go to ${exp.title} at ${exp.company}`}
                  >
                    <div className='min-w-0 flex-1'>
                      <div className='text-sm font-medium leading-snug text-[#e5e5e5]'>
                        {exp.title}
                      </div>
                      <div className='mt-0.5 text-xs leading-snug text-[#aaa]'>
                        {exp.company} · {formatPeriodDisplay(exp.period)}
                      </div>
                    </div>
                    <ChevronRight className='h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#aaa]' />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sortedProjects.length > 0 && (
            <div className='mb-4'>
              <h3 className='mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#aaa]'>
                <Code className='h-3 w-3' />
                Projects
              </h3>
              <div className='space-y-0'>
                {sortedProjects.map(project => (
                  <button
                    key={project.id}
                    type='button'
                    className={itemClass}
                    onClick={() => handleScrollToProject(project.id)}
                    aria-label={`Go to ${project.title}`}
                  >
                    <div className='min-w-0 flex-1'>
                      <div className='text-sm font-medium leading-snug text-[#e5e5e5]'>
                        {project.title}
                      </div>
                      <div className='mt-0.5 text-xs leading-snug text-[#aaa]'>
                        {project.subtitle}
                      </div>
                    </div>
                    <ChevronRight className='h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#aaa]' />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sortedEducation.length > 0 && (
            <div>
              <h3 className='mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#aaa]'>
                <GraduationCap className='h-3 w-3' />
                Education
              </h3>
              <div className='space-y-0'>
                {sortedEducation.map(edu => {
                  const period = (edu as { period?: string }).period;
                  return (
                    <button
                      key={edu.id}
                      type='button'
                      className={itemClass}
                      onClick={() => handleScrollToEducation(edu.id)}
                      aria-label={`Go to ${edu.degree} at ${edu.institution}`}
                    >
                      <div className='min-w-0 flex-1'>
                        <div className='text-sm font-medium leading-snug text-[#e5e5e5]'>
                          {edu.degree}
                        </div>
                        <div className='mt-0.5 text-xs leading-snug text-[#aaa]'>
                          {edu.institution}
                          {period && ` · ${period}`}
                        </div>
                      </div>
                      <ChevronRight className='h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#aaa]' />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
