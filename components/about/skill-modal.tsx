'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { expandSkillMapping, getEndDate, formatPeriodDisplay, SKILL_CATEGORIES, CATEGORIZED_SKILLS, type SKILL_MAPPINGS } from '@/lib/content-registry';
import { scrollToProject, requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';
import { ChevronRight, Briefcase, Code, GraduationCap } from 'lucide-react';
import type { Experience } from '@/lib/content-registry';
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
  const skillMapping = skillMappings.find((mapping) => mapping.skill === skillName);
  const skillData = skillMapping ? expandSkillMapping(skillMapping) : null;

  const handleScrollToExperience = (experienceId: string) => {
    onOpenChange(false);
    setTimeout(() => requestScrollToExperience(experienceId), 200);
  };

  const handleScrollToProject = (projectId: string) => {
    onOpenChange(false);
    setTimeout(() => scrollToProject(projectId), 200);
  };

  const handleScrollToEducation = (educationId: string) => {
    onOpenChange(false);
    setTimeout(() => scrollToEducation(educationId), 200);
  };

  if (!skillData || !skillName) {
    return null;
  }

  const categoryTags = SKILL_CATEGORIES.filter(
    (cat) => cat.key !== 'all' && (CATEGORIZED_SKILLS[cat.key as keyof typeof CATEGORIZED_SKILLS] as string[]).includes(skillName)
  ).map((cat) => cat.label);

  const sortedExperiences = sortExperiencesByRecency(skillData.experiences || []);
  const sortedProjects = sortProjectsByRecency(skillData.projects || []);
  const sortedEducation = (skillData.education || [])
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .sort((a, b) => getEducationSortKey((b as { period?: string }).period || '') - getEducationSortKey((a as { period?: string }).period || ''));

  const itemClass =
    'group flex w-full items-center gap-2.5 py-2.5 text-left transition-colors hover:text-[#f5f5f0] focus:outline-none first:pt-0';

  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-transparent"
        className="left-6 bottom-6 right-auto top-auto w-full max-w-[300px] translate-x-0 translate-y-0 rounded-lg border border-[#333]/25 bg-[#141414] p-0 shadow-none ring-1 ring-[#333]/20 sm:left-8 sm:bottom-8"
      >
        <div className="border-b border-[#262626]/40 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <DialogTitle className="text-sm font-medium leading-tight text-[#f5f5f0]">
              {skillName}
            </DialogTitle>
            {categoryTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {categoryTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#333]/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[#6b6b6b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-h-[45vh] overflow-y-auto px-4 py-3">
          {sortedExperiences.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
                <Briefcase className="h-3 w-3" />
                Experience
              </h3>
              <div className="space-y-0">
                {sortedExperiences.map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    className={itemClass}
                    onClick={() => handleScrollToExperience(exp.id)}
                    aria-label={`Go to ${exp.title} at ${exp.company}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium leading-snug text-[#e5e5e5]">
                        {exp.title}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] leading-snug text-[#6b6b6b]">
                        {exp.company} · {formatPeriodDisplay(exp.period)}
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#6b6b6b]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sortedProjects.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
                <Code className="h-3 w-3" />
                Projects
              </h3>
              <div className="space-y-0">
                {sortedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    className={itemClass}
                    onClick={() => handleScrollToProject(project.id)}
                    aria-label={`Go to ${project.title}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium leading-snug text-[#e5e5e5]">
                        {project.title}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] leading-snug text-[#6b6b6b]">
                        {project.subtitle}
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#6b6b6b]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {sortedEducation.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b6b6b]">
                <GraduationCap className="h-3 w-3" />
                Education
              </h3>
              <div className="space-y-0">
                {sortedEducation.map((edu) => {
                  const period = (edu as { period?: string }).period;
                  return (
                  <button
                    key={edu.id}
                    type="button"
                    className={itemClass}
                    onClick={() => handleScrollToEducation(edu.id)}
                    aria-label={`Go to ${edu.degree} at ${edu.institution}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium leading-snug text-[#e5e5e5]">
                        {edu.degree}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] leading-snug text-[#6b6b6b]">
                        {edu.institution}
                        {period && ` · ${period}`}
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-[#404040] group-hover:text-[#6b6b6b]" />
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
