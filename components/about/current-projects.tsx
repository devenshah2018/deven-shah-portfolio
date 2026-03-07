'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { getCurrentWorkItems } from '@/lib/content-registry';
import { scrollToProject, scrollToExperience, scrollToEducation } from '@/lib/url-utils';

export function CurrentProjects() {
  const currentWork = getCurrentWorkItems();

  const handleClick = (item: (typeof currentWork)[number]) => {
    if (item.type === 'project') {
      scrollToProject(item.id);
    } else if (item.type === 'experience') {
      scrollToExperience(item.id);
    } else if (item.type === 'education') {
      scrollToEducation(item.id);
    }
    // paper: handled by Link
  };

  return (
    <div className="space-y-4">
      <h3 className="mb-4 text-md font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">Current Work</h3>
      <ul className="space-y-3">
        {currentWork.map((item) => {
          const baseClass = 'flex items-center gap-2 text-left text-sm font-medium text-[#d4d4d4] transition-colors hover:text-[#a3a3a3] whitespace-nowrap';
          const dimClass = 'text-[#737373]';
          const summaryClass = 'text-[#d4d4d4]';

          const renderLabel = () => {
            if (item.type === 'experience') {
              return (
                <>
                  <Badge variant="outline" className="border-[#404040]/50 bg-[#262626]/50 px-2 py-0.5 text-sm font-medium text-[#f5f5f0]">
                    {item.title}
                  </Badge>
                  {item.summary && <span className={`${summaryClass} min-w-0 `}> · {item.summary}</span>}
                </>
              );
            }
            if (item.type === 'education') {
              return (
                <>
                  <Badge variant="outline" className="border-[#404040]/50 bg-[#262626]/50 px-2 py-0.5 text-sm font-medium text-[#f5f5f0]">
                    {item.degree}
                  </Badge>
                  <span className={dimClass}> @ {item.institution}</span>
                  {item.summary && <span className={`${summaryClass} min-w-0 `}> · {item.summary}</span>}
                </>
              );
            }
            if (item.type === 'project') {
              return (
                <>
                  <Badge variant="outline" className="border-[#404040]/50 bg-[#262626]/50 px-2 py-0.5 text-sm font-medium text-[#f5f5f0]">
                    {item.title}
                  </Badge>
                  {item.summary && <span className={`${summaryClass} min-w-0 `}> · {item.summary}</span>}
                </>
              );
            }
            return (
              <>
                <Badge variant="outline" className="border-[#404040]/50 bg-[#262626]/50 px-2 py-0.5 text-sm font-medium text-[#f5f5f0]">
                  {item.title}
                </Badge>
                {item.summary && <span className={`${summaryClass} min-w-0 `}> · {item.summary}</span>}
              </>
            );
          };

          if (item.type === 'paper') {
            return (
              <li key={`paper-${item.id}`} className="group">
                <Link href={`/papers/${item.slug || item.id}`} className={`${baseClass}`}>
                  <Badge variant="outline" className="border-[#404040]/50 bg-[#262626]/50 px-2 py-0.5 text-sm font-medium text-[#f5f5f0]">
                    {item.title}
                  </Badge>
                  {item.summary && <span className={`${summaryClass} min-w-0 `}> · {item.summary}</span>}
                  <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                </Link>
              </li>
            );
          }

          return (
            <li key={`${item.type}-${item.id}`} className="group">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClick(item);
                }}
                className={`w-full min-w-0 ${baseClass}`}
              >
                <span className="flex min-w-0 flex-nowrap items-center gap-1.5 whitespace-nowrap overflow-hidden">{renderLabel()}</span>
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
