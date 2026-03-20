'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getCurrentWorkItems } from '@/lib/content-registry';
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

function getSubheaderLine(item: CurrentWorkItem): string | null {
  if (item.type === 'experience' && 'company' in item && item.company) return `@ ${item.company}`;
  if (item.type === 'education' && 'institution' in item && item.institution) return `@ ${item.institution}`;
  if (item.type === 'project' && item.title) return item.title;
  if (item.type === 'paper' && item.title) return item.title;
  return null;
}

export function Profile() {
  const currentWork = getCurrentWorkItems();

  const handleClick = (item: CurrentWorkItem) => {
    if (item.type === 'project') scrollToProject(item.id);
    else if (item.type === 'experience') requestScrollToExperience(item.id);
    else if (item.type === 'education') scrollToEducation(item.id);
  };

  const itemClass =
    'group flex items-start justify-between gap-4 py-3.5 text-left transition-colors border-b border-[#262626]/40 last:border-b-0 last:pb-0 rounded-md hover:bg-[#1a1a1a]/40';

  return (
    <div className="overflow-hidden rounded-xl border border-[#2a2a2a]/80 bg-[#161616]/95 shadow-[0_1px_0_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
      <div className="border-b border-[#2a2a2a]/60 px-5 py-3.5">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#737373]">Current work</h3>
      </div>
      {currentWork.length > 0 && (
        <ul className="px-5 py-3">
            {currentWork.map((item) => {
              const primary = getPrimaryStatement(item);
              const subheader = getSubheaderLine(item);
              const content = (
                <>
                  <span className="block text-[14px] leading-[1.5] text-[#b8b8b8] transition-colors group-hover:text-[#d4d4d4]">
                    {primary}
                  </span>
                  {subheader && (
                    <span className="mt-1 block text-[11px] tracking-widest text-[#525252] uppercase">{subheader}</span>
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
      )}
    </div>
  );
}
