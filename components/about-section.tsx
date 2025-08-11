"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Zap } from "lucide-react"
import { SkillModal } from "@/components/skill-modal"
import { RotatingTweets } from "@/components/rotating-tweets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"

const skills = {
  languages: ["Python", "TypeScript", "C#", "Java", "C", "Apex", "JavaScript", "SQL", "SOQL", "HTML", "CSS", "Bash", "Rust"],
  platforms: ["AWS", "Salesforce", "Azure", "LangGraph", "GCP"],
  frameworks: ["React", ".NET", "Flask", "TailwindCSS"],
  frontend: ["TypeScript", "JavaScript", "HTML", "CSS", "React", "TailwindCSS"],
  backend: ["Python", "C#", "Java", "C", "TypeScript", ".NET", "Flask", "Bash", "Rust", "Docker", "REST API", "GraphQL"],
  database: ["SQL", "SOQL", "Oracle", "PostgreSQL"],
  aimal: ["Python", "LLMs", "Sklearn", "Tensorflow", "Pytorch", "LangGraph"],
  devops: ["Docker", "Github", "Git", "GCP", "AWS", "Azure"],
  apis: ["C#", "Python", "Apex", "Azure", "REST API", "GraphQL", "TypeScript"]
}

// Skill mappings to experiences, projects, and education
const skillMappings = [
  {
    skill: "Python",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
  {
    skill: "TypeScript",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
    projects: [
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap }
    ]
  },
  {
    skill: "C#",
    experiences: [
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
  {
    skill: "React",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
    projects: [
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
    ]
  },
  {
    skill: "Azure",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap }
    ]
  },
  {
    skill: "LangGraph",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
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
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
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
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
      {
    skill: "CSS",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
  {
    skill: "Java",
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
    {
    skill: "C",
      projects: [
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode-project", icon: Zap },
    ]
  },
  {
    skill: "JavaScript",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase }
    ],
      projects: [
        { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode-project", icon: Zap },
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
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
    education: [
      { title: "AWS Cloud Practitioner Certification", institution: "Amazon Web Services", id: "aws-cloud-practitioner", icon: GraduationCap }
    ]
  },
  {
    skill: "Flask",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    projects: [
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ]
  },
  {
    skill: "Bash",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ]
  },
  {
    skill: "Oracle",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ]
  },
  {
    skill: "PostgreSQL",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ]
  },
  {
    skill: "GCP",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ]
  },
  {
    skill: "TailwindCSS",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
      projects: [
        { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
    ]
  },
  {
    skill: "Rust",
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap }
    ]
  },
  {
    skill: "LLMs",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
    projects: [
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap }
    ]
  },
  {
    skill: "Sklearn",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
    projects: [
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ]
  },
  {
    skill: "Tensorflow",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ],
    projects: [
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ]
  },
  {
    skill: "Pytorch",
    projects: [
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ]
  },
  {
    skill: "Docker",
    experiences: [
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase },
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ]
  },
  {
    skill: "Github",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
        projects: [
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
            { title: "Qode", subtitle: "Quantum Programming Language", id: "qode-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
  {
    skill: "Git",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ],
    education: [
      { title: "B.S. Software Engineering", institution: "San Jose State University", id: "sjsu-bachelors", icon: GraduationCap }
    ]
  },
  {
    skill: "REST API",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase },
      { title: "Application Developer", company: "Patelco", id: "patelco", icon: Briefcase },
      { title: "Solutions Architect Intern", company: "NetApp", id: "netapp", icon: Briefcase }
    ]
  },
  {
    skill: "GraphQL",
    experiences: [
      { title: "Co-Founder/CTO", company: "Suno Analytics", id: "suno-analytics", icon: Briefcase }
    ]
  },
]

// Reintroduce category tabs and data mapping for tabbed view
const skillCategories = [
  { key: "all", label: "All" },
  { key: "aimal", label: "AI/ML" },
  { key: "apis", label: "API" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "devops", label: "DevOps" },
  { key: "frontend", label: "Frontend" },
  { key: "frameworks", label: "Frameworks" },
  { key: "languages", label: "Languages" },
  { key: "platforms", label: "Platforms" },
]

const categorizedSkills = {
  all: Array.from(new Set([
    ...skills.languages,
    ...skills.platforms,
    ...skills.frameworks,
    ...skills.frontend,
    ...skills.backend,
    ...skills.database,
    ...skills.aimal,
    ...skills.devops,
    ...skills.apis,
  ])),
  languages: skills.languages,
  platforms: skills.platforms,
  frameworks: skills.frameworks,
  frontend: skills.frontend,
  backend: skills.backend,
  database: skills.database,
  aimal: skills.aimal,
  devops: skills.devops,
  apis: skills.apis,
}

export function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  // Add back activeCategory for tab toggle
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
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            {/* Left Column: Personal Intro + Timeline */}
            <div className="space-y-12">
              <div className="mb-2">
                <h2 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
                  About Me
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl font-light leading-relaxed mb-4">
                  Passionate builder bridging advanced technology with real-world impact. I architect, code, and launch products at the intersection of AI, analytics, and security.
                </p>
              </div>

              {/* Timeline moved here */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Timeline</h3>
                {/* Legend */}
                <div className="flex gap-6 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">Career</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded-full bg-purple-400"></span>
                    <span className="text-slate-300">Education/Certifications</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500/40 pl-6 space-y-6">
                  {/* Education */}
                  <a href="#education" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-purple-400 group-hover:text-purple-300">Present</span>
                    <span className="block text-white font-bold">M.S. in Computer Science (Data Analytics)</span>
                    <span className="block text-slate-400">Boston University</span>
                  </a>
                  {/* Career */}
                  <a href="#experience" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">12/2024–Present</span>
                    <span className="block text-white font-bold">Co-Founder/CTO</span>
                    <span className="block text-slate-400">Suno Analytics</span>
                  </a>
                  <a href="#experience" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">04/2023–04/2024</span>
                    <span className="block text-white font-bold">Application Developer</span>
                    <span className="block text-slate-400">Patelco Credit Union</span>
                  </a>
                  {/* Education/Certifications (merged color) */}
                  <a href="#education" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-purple-400 group-hover:text-purple-300">02/2023</span>
                    <span className="block text-white font-bold">AWS Cloud Practitioner Certification</span>
                    <span className="block text-slate-400">Amazon Web Services</span>
                  </a>
                  {/* Career */}
                  <a href="#experience" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-blue-500 group-hover:text-blue-400">05/2021–12/2022</span>
                    <span className="block text-white font-bold">Solutions Architect Intern</span>
                    <span className="block text-slate-400">NetApp</span>
                  </a>
                  {/* Education */}
                  <a href="#education" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-purple-400 group-hover:text-purple-300">08/2018–12/2022</span>
                    <span className="block text-white font-bold">B.S. in Software Engineering</span>
                    <span className="block text-slate-400">San Jose State University</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Rotating Tweets + Technical Skills */}
            <div className="space-y-12">
              {/* Rotating Tweets */}
              <div className="mb-8 flex">
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
              <div className="h-5" />
              {/* Technical Skills with tabs and multi-per-row layout */}
              <div className="mt-8">
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
                        aria-pressed={activeCategory === cat.key}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(categorizedSkills[activeCategory as keyof typeof categorizedSkills] as string[])
                    .slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((skill: string) => (
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
            </div>
          </div>
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
