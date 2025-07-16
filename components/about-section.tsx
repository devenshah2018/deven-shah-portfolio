"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Code, Palette, Zap } from "lucide-react"
import { SkillModal } from "@/components/skill-modal"
import { RotatingTweets } from "@/components/rotating-tweets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

const skills = {
  languages: ["Python", "TypeScript", "C#", "Java", "C", "Apex", "JavaScript", "SQL", "SOQL", "HTML", "CSS", "Bash"],
  platforms: ["AWS", "Salesforce", "Azure", "LangGraph"],
  frameworks: ["React", ".NET", "Flask"],
  frontend: ["TypeScript", "JavaScript", "HTML", "CSS", "React"],
  backend: ["Python", "C#", "Java", "C", "TypeScript", ".NET", "Flask", "Bash"],
  database: ["SQL", "SOQL"],
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
      "Co-founder and CTO at Suno Analytics, building AI-powered analytics for $50M+ e-commerce brands",
    gradient: "from-blue-500 to-cyan-500",
  },
{
  icon: GraduationCap,
  title: "Education",
  description: 
    "M.S. in Computer Science at Boston University, B.S. in Software Engineering from San Jose State University",
  gradient: "from-indigo-500 to-purple-500",
},
  {
    icon: Code,
    title: "Expertise",
    description:
      "Full-stack development, AI and machine learning, quantum programming, security compliance, scalable architecture",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Palette,
    title: "Innovation",
    description:
      "Co-founder of Suno Analytics, creator of Qode quantum language, founder of Ares security platform with 100+ users, winner of multiple hackathons",
    gradient: "from-orange-500 to-red-500",
  },
]

const skillCategories = [
  { key: "all", label: "All" },
  { key: "languages", label: "Languages" },
  { key: "platforms", label: "Platforms" },
  { key: "frameworks", label: "Frameworks" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
];

const categorizedSkills = {
  all: Array.from(new Set([
    ...skills.languages,
    ...skills.platforms,
    ...skills.frameworks,
    ...skills.frontend,
    ...skills.backend,
    ...skills.database,
  ])),
  languages: skills.languages,
  platforms: skills.platforms,
  frameworks: skills.frameworks,
  frontend: skills.frontend,
  backend: skills.backend,
  database: skills.database,
};

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

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
          {/* Redesigned About Section: Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            {/* Left Column: Personal Intro, Highlights, Socials */}
            <div className="space-y-12">
              <div className="mb-8">
                <h2 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
                  About Me
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed mb-4">
                  Passionate systems builder bridging advanced technology with real-world impact. I architect, code, and launch products at the intersection of AI, analytics, and security.
                </p>
              </div>
              {/* Highlights */}
              <div className="space-y-16">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border border-slate-800 bg-slate-900/60 backdrop-blur-sm shadow-xl rounded-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className={`min-w-12 min-h-12 w-12 h-12 rounded-2xl bg-gradient-to-r ${highlight.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <highlight.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 tracking-wide">{highlight.title}</h3>
                          <p className="text-slate-300 text-sm leading-relaxed font-light">
                            {Array.isArray(highlight.description)
                              ? highlight.description.map((line, idx) => (
                                  <span key={idx}>
                                    {line}
                                    {idx < highlight.description.length - 1 && <br />}
                                  </span>
                                ))
                              : highlight.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
            </div>

            {/* Right Column: Rotating Tweets, Skills, Timeline */}
            <div className="space-y-12">
              {/* Rotating Tweets prominently displayed */}
              <div className="mb-24 flex">
                <div className="w-full max-w-md min-h-[320px] relative overflow-visible">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6 text-blue-400" />
                    Recent Thoughts
                  </h3>
                  <div>
                    <RotatingTweets />
                  </div>
                </div>
              </div>
              {/* Visual Timeline (Education/Certifications/Experience) */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Timeline</h3>
                {/* Legend */}
                <div className="flex gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-400"></span>
                    <span className="text-slate-300">Education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-orange-400"></span>
                    <span className="text-slate-300">Certification</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500/40 pl-6 space-y-6">
                  {/* Education */}
                  <a
                    href="#education"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-purple-400 group-hover:text-purple-300">Present</span>
                    <span className="block text-white font-bold">M.S. in Computer Science (Data Analytics)</span>
                    <span className="block text-slate-400">Boston University</span>
                  </a>
                  {/* Experience */}
                  <a
                    href="#experience"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">12/2024–Present</span>
                    <span className="block text-white font-bold">Co-Founder/CTO</span>
                    <span className="block text-slate-400">Suno Analytics</span>
                  </a>
                  <a
                    href="#experience"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">04/2023–04/2024</span>
                    <span className="block text-white font-bold">Application Developer</span>
                    <span className="block text-slate-400">Patelco Credit Union</span>
                  </a>
                  {/* Certification */}
                  <a
                    href="#education"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-orange-400 group-hover:text-orange-300">02/2023</span>
                    <span className="block text-white font-bold">AWS Cloud Practitioner Certification</span>
                    <span className="block text-slate-400">Amazon Web Services</span>
                  </a>
                  {/* Experience */}
                  <a
                    href="#experience"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">05/2021–12/2022</span>
                    <span className="block text-white font-bold">Solutions Architect Intern</span>
                    <span className="block text-slate-400">NetApp</span>
                  </a>
                  {/* Education */}
                  <a
                    href="#education"
                    className="block cursor-pointer group focus:outline-none"
                  >
                    <span className="block text-lg font-semibold text-purple-400 group-hover:text-purple-300">08/2018–12/2022</span>
                    <span className="block text-white font-bold">B.S. in Software Engineering</span>
                    <span className="block text-slate-400">San Jose State University</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Technical Skills - full width below both columns */}
          <div className="col-span-1 lg:col-span-2 mt-12">
            <div className="flex items-center gap-4 mb-3 flex-wrap">
              <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
              <div className="flex gap-2 flex-wrap">
                {skillCategories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-2 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-slate-900
                      ${activeCategory === cat.key
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400 scale-105 drop-shadow-lg"
                        : "bg-slate-900/80 text-blue-200 border-blue-800 hover:bg-blue-900/40 hover:text-white hover:border-blue-400"}
                    `}
                    style={{ letterSpacing: '0.08em' }}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(categorizedSkills[activeCategory as keyof typeof categorizedSkills] as string[]).map((skill: string) => (
                <button
                  key={skill}
                  type="button"
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-slate-900
                    ${hasMapping(skill)
                      ? 'hover:bg-blue-900/30 hover:text-blue-200 hover:border-blue-400 focus:bg-blue-900/30 focus:text-blue-200 focus:border-blue-400'
                      : 'opacity-80 cursor-default'}
                  `}
                  style={{ minWidth: 0, minHeight: 0, fontSize: '0.98rem', letterSpacing: '0.01em', lineHeight: 1.2 }}
                  aria-label={skill + (hasMapping(skill) ? `, ${getMappingCount(skill)} related items` : '')}
                  onClick={() => hasMapping(skill) && handleSkillClick(skill)}
                  tabIndex={0}
                >
                  <span className="truncate max-w-[90px]">{skill}</span>
                  {hasMapping(skill) && (
                    <span className="ml-1 px-1.5 py-0.5 rounded bg-blue-800/60 text-blue-200 text-[0.7em] font-semibold border border-blue-400/30 ml-2">
                      {getMappingCount(skill)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* End Technical Skills */}
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
