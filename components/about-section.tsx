"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Code, Palette, Zap } from "lucide-react"
import { SkillModal } from "@/components/skill-modal"

const skills = {
  languages: ["Python", "TypeScript", "C#", "Java", "C", "Apex", "JavaScript", "SQL", "SOQL", "HTML", "CSS", "Bash"],
  platforms: ["AWS", "Salesforce", "Azure", "LangGraph", "React", ".NET", "Flask"],
}

// Skill mappings to experiences, projects, and education
const skillMappings = [
  {
    skill: "Python",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
  {
    skill: "TypeScript",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap }
    ]
  },
  {
    skill: "C#",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
  {
    skill: "React",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase }
    ]
  },
  {
    skill: "Azure",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap }
    ]
  },
  {
    skill: "LangGraph",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase }
    ]
  },
  {
    skill: ".NET",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ]
  },
  {
    skill: "SQL",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
    {
    skill: "SOQL",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
    ]
  },
    {
    skill: "HTML",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
      {
    skill: "CSS",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
  {
    skill: "Java",
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu", icon: GraduationCap }
    ]
  },
    {
    skill: "C",
      projects: [
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode", icon: Zap },
    ]
  },
  {
    skill: "JavaScript",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
      projects: [
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode", icon: Zap },
    ]
  },
  {
    skill: "Apex",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ]
  },
  {
    skill: "Salesforce",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ]
  },
  {
    skill: "AWS",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno", icon: Briefcase }
    ],
    education: [
      { title: "AWS Cloud Practitioner Certification", institution: "Amazon Web Services", id: "aws", icon: GraduationCap }
    ]
  },
  {
    skill: "Flask",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto", icon: Zap }
    ]
  },
  {
    skill: "Bash",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ]
  }
]

const highlights = [
  {
    icon: Briefcase,
    title: "Current Focus",
    description:
      "Co-founder/CTO of Suno Analytics, building AI-powered e-commerce analytics platform serving companies up to $50M ARR.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "M.S. in Computer Science at Boston University (Data Analytics). B.S. in Software Engineering from SJSU (2022).",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Code,
    title: "Expertise",
    description:
      "Full-stack development, AI/ML, quantum computing, security compliance, and scalable system architecture.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    title: "Innovation",
    description:
      "Created Qode quantum programming language, Ares security platform (100+ users), and multiple award-winning projects.",
    gradient: "from-orange-500 to-red-500",
  },
]

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const handleSkillClick = (skill: string) => {
    const skillMapping = skillMappings.find((mapping) => mapping.skill === skill)
    if (skillMapping && (skillMapping.experiences || skillMapping.projects || skillMapping.education)) {
      setSelectedSkill(skill)
      setModalOpen(true)
    }
  }

  const hasMapping = (skill: string) => {
    const skillMapping = skillMappings.find((mapping) => mapping.skill === skill)
    return skillMapping && (skillMapping.experiences || skillMapping.projects || skillMapping.education)
  }

  const getMappingCount = (skill: string) => {
    const skillMapping = skillMappings.find((mapping) => mapping.skill === skill)
    if (!skillMapping) return 0

    const experienceCount = skillMapping.experiences?.length || 0
    const projectCount = skillMapping.projects?.length || 0
    const educationCount = skillMapping.education?.length || 0

    return experienceCount + projectCount + educationCount
  }

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
                About Me
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Passionate about building innovative solutions that bridge the gap between cutting-edge technology and
              real-world impact.
            </motion.p>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl rounded-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <highlight.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{highlight.title}</h3>
                        <div className="h-0.5 w-12 bg-slate-700 mb-4 rounded-full" />
                        <p className="text-slate-300 text-base leading-relaxed font-light">{highlight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4 text-white tracking-tight">Technical Skills</h3>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h4 className="text-2xl font-semibold text-slate-200 flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.languages.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className={`text-sm py-3 px-5 bg-slate-800/50 border border-slate-700 text-slate-200 transition-all duration-300 rounded-full ${
                          hasMapping(skill)
                            ? "hover:shadow-lg hover:scale-105 cursor-pointer hover:border-blue-400 hover:bg-blue-900/30 hover:text-blue-200"
                            : "hover:bg-slate-700/50"
                        }`}
                        onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                      >
                        {skill}
                        {hasMapping(skill) && (
                          <span className="ml-2 text-blue-400 font-semibold text-xs">{getMappingCount(skill)}</span>
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h4 className="text-2xl font-semibold text-slate-200 flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                  Platforms & Frameworks
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.platforms.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className={`text-sm py-3 px-5 bg-slate-800/50 border border-slate-700 text-slate-200 transition-all duration-300 rounded-full ${
                          hasMapping(skill)
                            ? "hover:shadow-lg hover:scale-105 cursor-pointer hover:border-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-200"
                            : "hover:bg-slate-700/50"
                        }`}
                        onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                      >
                        {skill}
                        {hasMapping(skill) && (
                          <span className="ml-2 text-emerald-400 font-semibold text-xs">{getMappingCount(skill)}</span>
                        )}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <SkillModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        skillName={selectedSkill}
        skillMappings={skillMappings}
      />
    </section>
  )
}
