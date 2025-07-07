"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, MapPin, Star, Code, Award, Zap, Briefcase, GraduationCap } from "lucide-react"

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
  const skillData = skillMappings.find(mapping => mapping.skill === skillName)

  const scrollToSection = (sectionId: string, itemId?: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      // Close modal after scrolling
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
      <DialogContent className="max-w-2xl bg-gray-900 border border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {skillName}
          </DialogTitle>
          <p className="text-gray-400 mt-2">
            Explore where I've applied this skill across my experience, projects, and education.
          </p>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Experiences */}
          {skillData.experiences && skillData.experiences.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                Professional Experience
              </h3>
              <div className="space-y-2">
                {skillData.experiences.map((exp, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all"
                    onClick={() => scrollToSection('experience', exp.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <exp.icon className="h-5 w-5 text-blue-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-white">{exp.title}</div>
                        <div className="text-sm text-gray-400">{exp.company}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {skillData.projects && skillData.projects.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-green-400" />
                Featured Projects
              </h3>
              <div className="space-y-2">
                {skillData.projects.map((project, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-green-500 focus:outline-none focus:ring-0 focus:border-green-500 transition-all"
                    onClick={() => scrollToSection('projects', project.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <project.icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-white">{project.title}</div>
                        <div className="text-sm text-gray-400">{project.subtitle}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {skillData.education && skillData.education.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-400" />
                Education & Certifications
              </h3>
              <div className="space-y-2">
                {skillData.education.map((edu, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 hover:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 transition-all"
                    onClick={() => scrollToSection('education', edu.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <edu.icon className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <div className="text-left flex-1">
                        <div className="font-medium text-white">{edu.title}</div>
                        <div className="text-sm text-gray-400">{edu.institution}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-500" />
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
