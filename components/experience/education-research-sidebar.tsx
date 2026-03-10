'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { EDUCATION, RESEARCH_PAPERS } from '@/lib/content-registry';
export function EducationResearchSidebar() {
  const [expandedCoursework, setExpandedCoursework] = useState<Set<string>>(new Set());

  const toggleCoursework = (eduId: string) => {
    setExpandedCoursework((prev) => {
      const next = new Set(prev);
      if (next.has(eduId)) next.delete(eduId);
      else next.add(eduId);
      return next;
    });
  };

  return (
    <div id="education" className="flex flex-col gap-6 lg:gap-8">
      {/* Education - timeline style */}
      <div>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#404040]/50 via-[#404040]/30 to-transparent" aria-hidden />
          <div className="space-y-0">
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                id={`education-${edu.id}`}
                data-card
                className="group relative flex gap-4 py-5 first:pt-0 last:pb-0 transition-colors rounded-r-md -ml-1 pl-1 hover:bg-[#262626]/20 scroll-mt-20"
              >
                {/* Timeline node */}
                <div className="relative z-10 flex flex-shrink-0 flex-col items-center pt-0.5">
                  {edu.logo ? (
                    <img src={edu.logo} alt="" className="h-6 w-6 rounded object-contain opacity-80 transition-opacity group-hover:opacity-100" />
                  ) : (
                    <div className={`h-2.5 w-2.5 rounded-full ${edu.isActive ? 'bg-emerald-400/90 ring-2 ring-emerald-400/30' : 'bg-[#525252]/60'}`} />
                  )}
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h4 className="text-sm font-semibold text-[#f5f5f0]">{edu.degree}</h4>
                    {edu.isActive && (
                      <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">Current</span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-[#a3a3a3]">{edu.institution}</p>
                  <p className="mt-1.5 text-[11px] text-[#525252] tabular-nums">
                    {edu.period}
                    <span className="mx-1.5 text-[#404040]/60">·</span>
                    {edu.status}
                  </p>
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => toggleCoursework(edu.id)}
                        className="flex items-center gap-1.5 text-[11px] font-medium text-[#737373] transition-colors hover:text-[#a3a3a3]"
                      >
                        <span>Coursework ({edu.coursework.length})</span>
                        {expandedCoursework.has(edu.id) ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {expandedCoursework.has(edu.id) && (
                        <div className="mt-2 space-y-1 pl-3 border-l border-[#404040]/30">
                          {edu.coursework.map((c, i) => (
                            <div key={i} className="text-[11px] leading-relaxed text-[#737373]">
                              {c}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Papers - always expanded, row layout */}
        <div className="mt-4 border-t border-[#404040]/40 pt-4">
          <div className="mb-2 flex items-center gap-1.5 text-base font-medium uppercase tracking-[0.15em] text-[#737373]">
            <FileText className="h-3 w-3" />
            Technical Papers ({RESEARCH_PAPERS.length})
          </div>
          <div className="space-y-0">
            {[...RESEARCH_PAPERS]
              .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
              .map((paper) => {
                const slug = paper.slug || paper.id;
                return (
                  <Link
                    key={paper.id}
                    href={`/papers/${slug}`}
                    className="group flex items-center justify-between gap-2 border-b border-[#404040]/20 py-2.5 last:border-b-0 transition-colors hover:bg-[#262626]/30 -mx-1 px-1 rounded"
                  >
                    <span className="min-w-0 flex-1 truncate text-[11px] font-medium leading-snug text-[#a3a3a3] group-hover:text-[#f5f5f0]">
                      {paper.title}
                    </span>
                    <span className="flex-shrink-0 text-[9px] text-[#525252] tabular-nums">{paper.date}</span>
                    <FileText className="h-3 w-3 flex-shrink-0 text-[#404040] group-hover:text-[#737373]" />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
