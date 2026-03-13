'use client';

import Link from 'next/link';
import { Briefcase, ChevronRight, GraduationCap } from 'lucide-react';
import {
  getCurrentWorkItems,
  getTotalExperienceYears,
  getHighestDegree,
} from '@/lib/content-registry';
import { scrollToProject, requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';

type CurrentWorkItem = ReturnType<typeof getCurrentWorkItems>[number];

function getPrimaryStatement(item: CurrentWorkItem): string {
  if ('summary' in item && item.summary) return item.summary;
  if ('description' in item && item.description) return item.description;
  if ('abstract' in item && item.abstract) return item.abstract;
  if (item.type === 'experience') return item.title;
  if (item.type === 'education') return item.degree;
  return item.title;
}

function getOrgLine(item: CurrentWorkItem): string | null {
  if (item.type === 'experience' && 'company' in item && item.company) return `@ ${item.company}`;
  if (item.type === 'education' && 'institution' in item && item.institution) return `@ ${item.institution}`;
  return null;
}

export function Profile() {
  const currentWork = getCurrentWorkItems();
  const years = getTotalExperienceYears();
  const degree = getHighestDegree();

  const handleClick = (item: CurrentWorkItem) => {
    if (item.type === 'project') scrollToProject(item.id);
    else if (item.type === 'experience') requestScrollToExperience(item.id);
    else if (item.type === 'education') scrollToEducation(item.id);
  };

  const itemClass =
    'group flex items-start justify-between gap-4 py-4 text-left transition-colors border-b border-[#222]/50 last:border-b-0';

  return (
    <div className="rounded-lg border border-[#252525] bg-[#1a1a1a]/80 px-5 py-5">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6b6b6b]">Profile</p>

      {/* Key stats with headers */}
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-8">
        <div className="flex items-start gap-3">
          <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5a5a5a]" aria-hidden />
          <div>
            <span className="block text-[10px] font-medium uppercase tracking-wider text-[#525252]">Experience</span>
            <span className="block text-lg font-semibold tabular-nums text-[#e5e5e5]">{years}</span>
          </div>
        </div>
        {degree && (
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5a5a5a]" aria-hidden />
            <div>
              <span className="block text-[10px] font-medium uppercase tracking-wider text-[#525252]">Highest degree</span>
              <span className="block text-[15px] font-medium text-[#d4d4d4]">{degree.degreeAndMajor}</span>
              <button
                type="button"
                onClick={() => scrollToEducation(degree.id)}
                className="block text-left text-[13px] font-normal text-[#8a8a8a] transition-colors hover:text-[#b8b8b8] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
              >
                @ {degree.institution}
              </button>
            </div>
          </div>
        )}
      </div>

      {currentWork.length > 0 && (
        <div className="mt-5 pt-5 border-t border-[#222]">
          <span className="block mb-3 text-[10px] uppercase tracking-wider text-[#525252]">Current work</span>
          <ul>
            {currentWork.map((item) => {
              const primary = getPrimaryStatement(item);
              const orgLine = getOrgLine(item);
              const content = (
                <>
                  <span className="block text-[14px] leading-[1.5] text-[#b8b8b8] transition-colors group-hover:text-[#d4d4d4]">
                    {primary}
                  </span>
                  {orgLine && (
                    <span className="mt-1 block text-[11px] tracking-widest text-[#525252] uppercase">{orgLine}</span>
                  )}
                </>
              );

              if (item.type === 'paper') {
                return (
                  <li key={`paper-${item.id}`}>
                    <Link href={`/papers/${item.slug || item.id}`} className={itemClass}>
                      <div className="min-w-0 flex-1">{content}</div>
                      <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#3a3a3a] transition-colors group-hover:text-[#6b6b6b]" />
                    </Link>
                  </li>
                );
              }

              return (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClick(item);
                    }}
                    className={`w-full ${itemClass}`}
                  >
                    <div className="min-w-0 flex-1">{content}</div>
                    <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[#3a3a3a] transition-colors group-hover:text-[#6b6b6b]" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
