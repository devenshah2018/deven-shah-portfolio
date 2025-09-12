import type React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Award, Code } from 'lucide-react';

interface SkillMapping {
  skill: string;
  experiences?: Array<{
    title: string;
    company: string;
    id: string;
    icon: React.ComponentType<any>;
  }>;
  projects?: Array<{
    title: string;
    subtitle: string;
    id: string;
    icon: React.ComponentType<any>;
  }>;
  education?: Array<{
    title: string;
    institution: string;
    id: string;
    icon: React.ComponentType<any>;
  }>;
}

interface SkillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillName: string | null;
  skillMappings: SkillMapping[];
}

export function SkillModal({ open, onOpenChange, skillName, skillMappings }: SkillModalProps) {
  const skillData = skillMappings.find(mapping => mapping.skill === skillName);

  const scrollToSection = (sectionId: string, itemId?: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });

        if (itemId) {
          setTimeout(() => {
            const targetElement = document.querySelector(`[data-item-id="${itemId}"]`);
            if (targetElement) {
              targetElement.classList.add('tour-highlight');

              setTimeout(() => {
                targetElement.classList.remove('tour-highlight');
              }, 3000);
            }
          }, 500);
        }
      }
    }, 200);
  };

  if (!skillData || !skillName) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md rounded-xl border border-slate-700 bg-slate-900/95 p-4 text-white backdrop-blur-xl sm:p-6'>
        <DialogHeader className='pb-3'>
          <DialogTitle className='mb-1 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent'>
            {skillName}
          </DialogTitle>
          <p className='mt-1 text-base font-normal text-slate-400'>
            Usage in experience, projects, and education
          </p>
        </DialogHeader>

        <div className='max-h-[50vh] space-y-7 overflow-y-auto pr-1'>
          {skillData.experiences && skillData.experiences.length > 0 && (
            <div>
              <h3 className='mb-3 flex items-center gap-2 text-base font-semibold text-slate-200'>
                <Calendar className='h-4 w-4 text-blue-400' />
                Experience
              </h3>
              <div className='space-y-3'>
                {skillData.experiences.map((exp, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    className='group h-auto w-full justify-start rounded-lg border-slate-700 bg-slate-800/60 px-3 py-2 text-left transition-all duration-200 hover:border-blue-500 hover:bg-blue-800/40 focus-visible:border-blue-500 focus-visible:bg-blue-800/50 focus-visible:ring-2 focus-visible:ring-blue-400/70'
                    onClick={() => scrollToSection('experience', exp.id)}
                    aria-label={`Go to experience: ${exp.title} at ${exp.company}`}
                  >
                    <div className='flex w-full items-center gap-3'>
                      <exp.icon className='h-4 w-4 flex-shrink-0 text-blue-400' />
                      <div className='flex-1'>
                        <div className='text-[1rem] font-semibold leading-tight text-white'>
                          {exp.title}
                        </div>
                        <div className='text-xs text-slate-400'>{exp.company}</div>
                      </div>
                      <ExternalLink className='h-3 w-3 text-slate-500' />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {skillData.projects && skillData.projects.length > 0 && (
            <div>
              <h3 className='mb-3 flex items-center gap-2 text-base font-semibold text-slate-200'>
                <Code className='h-4 w-4 text-emerald-400' />
                Projects
              </h3>
              <div className='space-y-3'>
                {skillData.projects.map((project, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    className='group h-auto w-full justify-start rounded-lg border-slate-700 bg-slate-800/60 px-3 py-2 text-left transition-all duration-200 hover:border-blue-500 hover:bg-blue-800/40 focus-visible:border-blue-500 focus-visible:bg-blue-800/50 focus-visible:ring-2 focus-visible:ring-blue-400/70'
                    onClick={() => scrollToSection('projects', project.id)}
                    aria-label={`Go to project: ${project.title}`}
                  >
                    <div className='flex w-full items-center gap-3'>
                      <project.icon className='h-4 w-4 flex-shrink-0 text-emerald-400' />
                      <div className='flex-1'>
                        <div className='text-[1rem] font-semibold leading-tight text-white'>
                          {project.title}
                        </div>
                        <div className='text-xs text-slate-400'>{project.subtitle}</div>
                      </div>
                      <ExternalLink className='h-3 w-3 text-slate-500' />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {skillData.education && skillData.education.length > 0 && (
            <div>
              <h3 className='mb-3 flex items-center gap-2 text-base font-semibold text-slate-200'>
                <Award className='h-4 w-4 text-indigo-400' />
                Education
              </h3>
              <div className='space-y-3'>
                {skillData.education.map((edu, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    className='group h-auto w-full justify-start rounded-lg border-slate-700 bg-slate-800/60 px-3 py-2 text-left transition-all duration-200 hover:border-blue-500 hover:bg-blue-800/40 focus-visible:border-blue-500 focus-visible:bg-blue-800/50 focus-visible:ring-2 focus-visible:ring-blue-400/70'
                    onClick={() => scrollToSection('education', edu.id)}
                    aria-label={`Go to education: ${edu.title} at ${edu.institution}`}
                  >
                    <div className='flex w-full items-center gap-3'>
                      <edu.icon className='h-4 w-4 flex-shrink-0 text-indigo-400' />
                      <div className='flex-1'>
                        <div className='text-[1rem] font-semibold leading-tight text-white'>
                          {edu.title}
                        </div>
                        <div className='text-xs text-slate-400'>{edu.institution}</div>
                      </div>
                      <ExternalLink className='h-3 w-3 text-slate-500' />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
