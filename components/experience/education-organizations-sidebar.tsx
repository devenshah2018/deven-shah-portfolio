'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Building2 } from 'lucide-react';
import { EDUCATION, ORGANIZATIONS, getOrganizations, type Organization } from '@/database/content-registry';
import { requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';

export function EducationOrganizationsSidebar() {
  const [expandedCoursework, setExpandedCoursework] = useState<Set<string>>(new Set());

  const toggleCoursework = (eduId: string) => {
    setExpandedCoursework((prev) => {
      const next = new Set(prev);
      if (next.has(eduId)) next.delete(eduId);
      else next.add(eduId);
      return next;
    });
  };

  const handleOrgClick = (org: Organization) => {
    if (org.related) {
      if (org.related.type === 'experience') {
        requestScrollToExperience(org.related.id);
      } else {
        scrollToEducation(org.related.id);
      }
    } else if (org.link) {
      window.open(org.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id="education" className="flex flex-col gap-6 lg:gap-8 scroll-mt-12 lg:scroll-mt-[90px]">
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

        {/* Organizations - clickable cards that scroll to the tied experience/education (or open the org link) */}
        {ORGANIZATIONS.length > 0 && (
          <div id="organizations" className="mt-4 scroll-mt-24 border-t border-[#404040]/40 pt-4">
            <div className="mb-3 flex items-center gap-1.5 text-base font-medium uppercase tracking-[0.15em] text-[#737373]">
              <Building2 className="h-3 w-3" />
              Organizations ({ORGANIZATIONS.length})
            </div>
            <div className="space-y-2.5">
              {getOrganizations().map((org) => (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => handleOrgClick(org)}
                  title={org.related ? `Jump to ${org.role} role` : `Visit ${org.name}`}
                  className="group block w-full rounded-lg border border-[#404040]/30 bg-[#1a1a1a]/40 p-3 text-left transition-colors hover:border-[#404040]/60 hover:bg-[#262626]/40"
                >
                  <div className="flex items-start gap-2.5">
                    {org.logo && (
                      <img
                        src={org.logo}
                        alt=""
                        className="mt-0.5 h-6 w-6 flex-shrink-0 rounded object-contain opacity-80 transition-opacity group-hover:opacity-100"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="min-w-0 text-[13px] font-semibold leading-snug text-[#f5f5f0]">
                          {org.name}
                        </h4>
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#525252] transition-colors group-hover:text-[#a3a3a3]" />
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[11px] text-[#a3a3a3]">
                        <span className="font-medium text-[#d4d4d4]">{org.role}</span>
                        <span className="text-[#404040]/80">·</span>
                        <span className="tabular-nums text-[#525252]">{org.period}</span>
                      </p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-[#737373]">
                        {org.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
