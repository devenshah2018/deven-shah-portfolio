'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCurrentWorkItems } from '@/lib/content-registry';
import { scrollToProject, requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';

function getPrimaryStatement(item: ReturnType<typeof getCurrentWorkItems>[number]): string {
  if ('summary' in item && item.summary) return item.summary;
  if ('description' in item && item.description) return item.description;
  if ('abstract' in item && item.abstract) return item.abstract;
  if (item.type === 'experience') return item.title;
  if (item.type === 'education') return item.degree;
  return item.title;
}

function getSecondaryLabel(item: ReturnType<typeof getCurrentWorkItems>[number]): string | null {
  if (item.type === 'experience') return item.title;
  if (item.type === 'education') return item.degree;
  if (item.type === 'project') return item.title;
  return null;
}

function getOrgLine(item: ReturnType<typeof getCurrentWorkItems>[number]): string | null {
  if (item.type === 'experience' && 'company' in item && item.company) return `@ ${item.company}`;
  if (item.type === 'education' && 'institution' in item && item.institution) return `@ ${item.institution}`;
  return null;
}

export function CurrentProjects({ showHeading = true }: { showHeading?: boolean }) {
  const currentWork = getCurrentWorkItems();

  const handleClick = (item: (typeof currentWork)[number]) => {
    if (item.type === 'project') scrollToProject(item.id);
    else if (item.type === 'experience') requestScrollToExperience(item.id);
    else if (item.type === 'education') scrollToEducation(item.id);
  };

  const itemClass =
    'group flex items-start justify-between gap-4 py-4 text-left transition-colors border-b border-[#222]/50 last:border-b-0';

  return (
    <div>
      {showHeading && (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#737373]">
          Current focus
        </p>
      )}
      <ul>
        {currentWork.map((item) => {
          const primary = getPrimaryStatement(item);
          const secondary = getSecondaryLabel(item);
          const orgLine = getOrgLine(item);

          const content = (
            <>
              <span className="block text-[15px] leading-[1.6] text-[#c4c4c4] transition-colors group-hover:text-[#e5e5e5]">
                {primary}
              </span>
              {secondary && secondary !== primary && (
                <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
                  {secondary}
                </span>
              )}
              {orgLine && (
                <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-[#6b6b6b]">
                  {orgLine}
                </span>
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
  );
}
