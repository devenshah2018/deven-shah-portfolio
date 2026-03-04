'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS, RESEARCH_PAPERS, getExperienceById, getEducationById } from '@/lib/content-registry';
import { scrollToProject, scrollToExperience, scrollToEducation, getResearchSiteUrl } from '@/lib/url-utils';
import { Project } from '@/lib/types';

function getRelatedLabels(project: Project): { name: string; type: 'experience' | 'education'; id: string }[] {
  if (!project.related_experiences || project.related_experiences.length === 0) return [];
  const seen = new Set<string>();
  return project.related_experiences
    .map((id) => {
      const experience = getExperienceById(id);
      if (experience && !seen.has(experience.company)) {
        seen.add(experience.company);
        return { name: experience.company, type: 'experience' as const, id };
      }
      const education = getEducationById(id);
      if (education && !seen.has(education.institution)) {
        seen.add(education.institution);
        return { name: education.institution, type: 'education' as const, id };
      }
      return null;
    })
    .filter(Boolean) as { name: string; type: 'experience' | 'education'; id: string }[];
}

type CurrentWorkItem =
  | { type: 'project'; id: string; title: string; sortDate: string; related?: ReturnType<typeof getRelatedLabels> }
  | { type: 'paper'; id: string; slug: string | undefined; title: string; sortDate: string };

export function CurrentProjects() {
  const currentProjects: CurrentWorkItem[] = PROJECTS.filter((p) => p.current_work === true)
    .map((p) => ({ type: 'project' as const, id: p.id, title: p.title, sortDate: p.sortDate || '', related: getRelatedLabels(p) }));
  const currentPapers: CurrentWorkItem[] = RESEARCH_PAPERS.filter((p) => p.current_work === true)
    .map((p) => ({ type: 'paper' as const, id: p.id, slug: p.slug, title: p.title, sortDate: p.sortDate || '' }));
  const currentWork = [...currentProjects, ...currentPapers]
    .sort((a, b) => (a.sortDate || '').localeCompare(b.sortDate || ''))
    .slice(0, 5);

  const handleScrollToProject = (projectId: string) => {
    scrollToProject(projectId);
  };

  const handleScrollToExperience = (type: 'experience' | 'education', id: string) => {
    if (type === 'experience') {
      scrollToExperience(id);
    } else {
      scrollToEducation(id);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">Current Work</h3>
      <ul className="space-y-3">
        {currentWork.map((item) =>
          item.type === 'project' ? (
            <li key={`project-${item.id}`} className="group">
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScrollToProject(item.id)}
                  className="flex items-center gap-2 text-left text-sm font-medium text-[#f5f5f0] transition-colors hover:text-[#d4d4d4]"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                </button>
                {item.related && item.related.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.related.map((r) => (
                      <button
                        key={`${r.name}-${r.id}`}
                        type="button"
                        onClick={() => handleScrollToExperience(r.type, r.id)}
                        className="text-xs text-[#a3a3a3] underline decoration-[#525252] underline-offset-2 transition-colors hover:text-[#f5f5f0]"
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ) : (
            <li key={`paper-${item.id}`} className="group">
              <Link
                href={`${getResearchSiteUrl()}/${item.slug || item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-left text-sm font-medium text-[#f5f5f0] transition-colors hover:text-[#d4d4d4]"
              >
                <span>{item.title}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
