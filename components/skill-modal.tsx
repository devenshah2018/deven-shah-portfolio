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

  const scrollToSection = (sectionId: string, itemId?: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        onOpenChange(false)
      }, 500)
    }
  }

  if (!skillData || !skillName) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 text-white rounded-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {skillName}
          </DialogTitle>
          <p className="text-slate-400 mt-3 text-lg font-light">
            Explore where I've applied this skill across my experience, projects, and education.
          </p>
        </DialogHeader>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
          {/* Experiences */}
          {skillData.experiences && skillData.experiences.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-400" />
                Professional Experience
              </h3>
              <div className="space-y-3">
                {skillData.experiences.map((exp, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-blue-400 transition-all duration-300 rounded-xl"
                    onClick={() => scrollToSection("experience", exp.id)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <exp.icon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-semibold text-white text-base">{exp.title}</div>
                        <div className="text-sm text-slate-400 mt-1">{exp.company}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {skillData.projects && skillData.projects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-3">
                <Code className="h-6 w-6 text-emerald-400" />
                Featured Projects
              </h3>
              <div className="space-y-3">
                {skillData.projects.map((project, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-emerald-400 transition-all duration-300 rounded-xl"
                    onClick={() => scrollToSection("projects", project.id)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <project.icon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-semibold text-white text-base">{project.title}</div>
                        <div className="text-sm text-slate-400 mt-1">{project.subtitle}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {skillData.education && skillData.education.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-3">
                <Award className="h-6 w-6 text-indigo-400" />
                Education & Certifications
              </h3>
              <div className="space-y-3">
                {skillData.education.map((edu, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-indigo-400 transition-all duration-300 rounded-xl"
                    onClick={() => scrollToSection("education", edu.id)}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <edu.icon className="h-6 w-6 text-indigo-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-semibold text-white text-base">{edu.title}</div>
                        <div className="text-sm text-slate-400 mt-1">{edu.institution}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500" />
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
