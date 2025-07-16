"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Award, Code } from "lucide-react"

interface SkillMapping {
  skill: string
  experiences?: Array<{
    title: string
    company: string
    id: string
    icon: React.ComponentType<any>
  }>
  projects?: Array<{
    title: string
    subtitle: string
    id: string
    icon: React.ComponentType<any>
  }>
  education?: Array<{
    title: string
    institution: string
    id: string
    icon: React.ComponentType<any>
  }>
}

interface SkillModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skillName: string | null
  skillMappings: SkillMapping[]
}

export function SkillModal({ open, onOpenChange, skillName, skillMappings }: SkillModalProps) {
  const skillData = skillMappings.find((mapping) => mapping.skill === skillName)

  // Updated scrollToSection: close modal first, then scroll after delay
  const scrollToSection = (sectionId: string, itemId?: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200); // Delay to allow modal to close
  }

  if (!skillData || !skillName) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-slate-900/95 backdrop-blur-xl border border-slate-700 text-white rounded-xl p-4 sm:p-6">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            {skillName}
          </DialogTitle>
          <p className="text-slate-400 mt-1 text-base font-normal">
            Usage in experience, projects, and education
          </p>
        </DialogHeader>

        <div className="space-y-7 max-h-[50vh] overflow-y-auto pr-1">
          {/* Experiences */}
          {skillData.experiences && skillData.experiences.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                Experience
              </h3>
              <div className="space-y-3">
                {skillData.experiences.map((exp, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto px-3 py-2 bg-slate-800/60 border-slate-700 hover:border-blue-500 focus-visible:border-blue-500 hover:bg-blue-800/40 focus-visible:bg-blue-800/50 transition-all duration-200 rounded-lg text-left focus-visible:ring-2 focus-visible:ring-blue-400/70 group"
                    onClick={() => scrollToSection('experience', exp.id)}
                    aria-label={`Go to experience: ${exp.title} at ${exp.company}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <exp.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-white text-[1rem] leading-tight">{exp.title}</div>
                        <div className="text-xs text-slate-400">{exp.company}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {skillData.projects && skillData.projects.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Code className="h-4 w-4 text-emerald-400" />
                Projects
              </h3>
              <div className="space-y-3">
                {skillData.projects.map((project, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto px-3 py-2 bg-slate-800/60 border-slate-700 hover:border-blue-500 focus-visible:border-blue-500 hover:bg-blue-800/40 focus-visible:bg-blue-800/50 transition-all duration-200 rounded-lg text-left focus-visible:ring-2 focus-visible:ring-blue-400/70 group"
                    onClick={() => scrollToSection('projects', project.id)}
                    aria-label={`Go to project: ${project.title}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <project.icon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-white text-[1rem] leading-tight">{project.title}</div>
                        <div className="text-xs text-slate-400">{project.subtitle}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {skillData.education && skillData.education.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-indigo-400" />
                Education
              </h3>
              <div className="space-y-3">
                {skillData.education.map((edu, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto px-3 py-2 bg-slate-800/60 border-slate-700 hover:border-blue-500 focus-visible:border-blue-500 hover:bg-blue-800/40 focus-visible:bg-blue-800/50 transition-all duration-200 rounded-lg text-left focus-visible:ring-2 focus-visible:ring-blue-400/70 group"
                    onClick={() => scrollToSection('education', edu.id)}
                    aria-label={`Go to education: ${edu.title} at ${edu.institution}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <edu.icon className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-white text-[1rem] leading-tight">{edu.title}</div>
                        <div className="text-xs text-slate-400">{edu.institution}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-slate-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
