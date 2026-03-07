import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Award, Code, Briefcase, Zap } from 'lucide-react';
import { expandSkillMapping, type SKILL_MAPPINGS } from '@/lib/content-registry';
import { scrollToProject, scrollToExperience, scrollToEducation } from '@/lib/url-utils';

interface SkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillName: string | null;
  skillMappings: typeof SKILL_MAPPINGS;
}

export function SkillModal({ open, onOpenChange, skillName, skillMappings }: SkillModalProps) {
  const skillMapping = skillMappings.find((mapping) => mapping.skill === skillName);
  const skillData = skillMapping ? expandSkillMapping(skillMapping) : null;

  const handleScrollToExperience = (experienceId: string) => {
    onOpenChange(false);
    setTimeout(() => scrollToExperience(experienceId), 200);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg border border-[#404040]/40 bg-[#141414] p-4 text-[#f5f5f0] sm:p-6">
        <DialogHeader className="pb-3">
          <DialogTitle className="mb-1 text-xl font-semibold text-[#f5f5f0]">{skillName}</DialogTitle>
          <p className="mt-1 text-base font-normal text-[#a3a3a3]">Usage in experience, projects, and education</p>
        </DialogHeader>

        <div className="max-h-[50vh] space-y-7 overflow-y-auto pr-1">
          {skillData.experiences && skillData.experiences.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[#a3a3a3]">
                <Calendar className="h-4 w-4 text-[#a3a3a3]" />
                Experience
              </h3>
              <div className="space-y-3">
                {skillData.experiences.filter(Boolean).map((exp, index) =>
                  exp ? (
                    <Button
                      key={index}
                      variant="outline"
                      className="group h-auto w-full justify-start rounded-md border border-[#404040]/40 bg-[#1a1a1a] px-3 py-2 text-left transition-colors hover:border-[#525252] hover:bg-[#262626]"
                      onClick={() => handleScrollToExperience(exp.id)}
                    aria-label={`Go to experience: ${exp.title} at ${exp.company}`}
                  >
                    <div className="flex w-full items-center gap-3">
                      <Briefcase className="h-4 w-4 flex-shrink-0 text-[#a3a3a3]" />
                      <div className="flex-1">
                        <div className="text-[1rem] font-semibold leading-tight text-[#f5f5f0]">{exp.title}</div>
                        <div className="text-xs text-[#a3a3a3]">{exp.company}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-[#737373]" />
                    </div>
                  </Button>
                  ) : null
                )}
              </div>
            </div>
          )}

          {skillData.projects && skillData.projects.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[#a3a3a3]">
                <Code className="h-4 w-4 text-[#a3a3a3]" />
                Projects
              </h3>
              <div className="space-y-3">
                {skillData.projects.filter(Boolean).map((project, index) =>
                  project ? (
                    <Button
                      key={index}
                      variant="outline"
                      className="group h-auto w-full justify-start rounded-md border border-[#404040]/40 bg-[#1a1a1a] px-3 py-2 text-left transition-colors hover:border-[#525252] hover:bg-[#262626]"
                      onClick={() => handleScrollToProject(project.id)}
                    aria-label={`Go to project: ${project.title}`}
                  >
                    <div className="flex w-full items-center gap-3">
                      <Zap className="h-4 w-4 flex-shrink-0 text-[#a3a3a3]" />
                      <div className="flex-1">
                        <div className="text-[1rem] font-semibold leading-tight text-[#f5f5f0]">{project.title}</div>
                        <div className="text-xs text-[#a3a3a3]">{project.subtitle}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-[#737373]" />
                    </div>
                  </Button>
                  ) : null
                )}
              </div>
            </div>
          )}

          {skillData.education && skillData.education.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[#a3a3a3]">
                <Award className="h-4 w-4 text-[#a3a3a3]" />
                Education
              </h3>
              <div className="space-y-3">
                {skillData.education.filter(Boolean).map((edu, index) =>
                  edu ? (
                    <Button
                      key={index}
                      variant="outline"
                      className="group h-auto w-full justify-start rounded-md border border-[#404040]/40 bg-[#1a1a1a] px-3 py-2 text-left transition-colors hover:border-[#525252] hover:bg-[#262626]"
                      onClick={() => handleScrollToEducation(edu.id)}
                      aria-label={`Go to education: ${edu.degree} at ${edu.institution}`}
                    >
                      <div className="flex w-full items-center gap-3">
                        <edu.icon className="h-4 w-4 flex-shrink-0 text-[#a3a3a3]" />
                        <div className="flex-1">
                          <div className="text-[1rem] font-semibold leading-tight text-[#f5f5f0]">{edu.degree}</div>
                          <div className="text-xs text-[#a3a3a3]">{edu.institution}</div>
                        </div>
                        <ExternalLink className="h-3 w-3 text-[#737373]" />
                      </div>
                    </Button>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
