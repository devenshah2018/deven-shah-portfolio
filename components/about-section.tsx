"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Zap } from "lucide-react"
import { SkillModal } from "@/components/skill-modal"
import { RotatingTweets } from "@/components/rotating-tweets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { getStravaStats } from "@/lib/utils"

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
      { title: "MCP Model Server", subtitle: "Local ML Inference TCP Server", id: "mcp-model-server", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Molecule Mutation Prediction", subtitle: "BRAF V600E Mutation Inhibitor Classifier", id: "molecule-mutation-prediction", icon: Zap },
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
    ],
    projects:
    [
      { title: "MCP Model Server", subtitle: "Local ML Inference TCP Server", id: "mcp-model-server", icon: Zap },
      { title: "Molecule Mutation Prediction", subtitle: "BRAF V600E Mutation Inhibitor Classifier", id: "molecule-mutation-prediction", icon: Zap },
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
      { title: "MCP Model Server", subtitle: "Local ML Inference TCP Server", id: "mcp-model-server", icon: Zap },
      { title: "Molecule Mutation Prediction", subtitle: "BRAF V600E Mutation Inhibitor Classifier", id: "molecule-mutation-prediction", icon: Zap },
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
          { title: "MCP Model Server", subtitle: "Local ML Inference TCP Server", id: "mcp-model-server", icon: Zap },
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Molecule Mutation Prediction", subtitle: "BRAF V600E Mutation Inhibitor Classifier", id: "molecule-mutation-prediction", icon: Zap },
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
        projects: [
          { title: "MCP Model Server", subtitle: "Local ML Inference TCP Server", id: "mcp-model-server", icon: Zap },
      { title: "Portfolio Website", subtitle: "Personal Portfolio", id: "portfolio-project", icon: Zap },
      { title: "Qode", subtitle: "Quantum Programming Language", id: "qode-project", icon: Zap },
      { title: "Ares", subtitle: "Security Compliance Platform", id: "ares-project", icon: Zap },
      { title: "Molecule Mutation Prediction", subtitle: "BRAF V600E Mutation Inhibitor Classifier", id: "molecule-mutation-prediction", icon: Zap },
      { title: "Cryptocurrency Forecasting", subtitle: "ML Prediction Model", id: "crypto-forecasting-project", icon: Zap }
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
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0)
  interface ActivityTotals {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
    achievement_count?: number
  }

  interface StravaStats {
    biggest_ride_distance: number
    biggest_climb_elevation_gain: number
    recent_ride_totals: ActivityTotals
    all_ride_totals: ActivityTotals
    recent_run_totals: ActivityTotals
    all_run_totals: ActivityTotals
    recent_swim_totals: ActivityTotals
    all_swim_totals: ActivityTotals
    ytd_ride_totals: ActivityTotals
    ytd_run_totals: ActivityTotals
    ytd_swim_totals: ActivityTotals
  }

  const [stravaStats, setStravaStats] = useState<StravaStats | null>(null)

  // Past achievements for carousel
  const pastAchievements = [
    { name: "Spartan Sprint", date: "06/2022", type: "Obstacle Racing" },
    { name: "Spartan Sprint", date: "04/2023", type: "Obstacle Racing" },
    { name: "Spartan Super", date: "08/2024", type: "Obstacle Racing" },
    { name: "Olympic Triathlon", date: "06/2025", type: "Triathlon" }
  ]

  // Upcoming achievement (static)
  const upcomingAchievement = { name: "Ironman 140.6", date: "Expected 10/2025", type: "Triathlon" }

  // Auto-rotate achievements every 3 seconds
  useEffect(() => {
    if (pastAchievements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAchievementIndex((prev) => (prev + 1) % pastAchievements.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [pastAchievements.length])

  const handleSkillClick = (skill: string) => {
    const skillMapping = skillMappings.find((mapping) => mapping.skill === skill)
    if (skillMapping && (skillMapping.experiences || skillMapping.projects || skillMapping.education)) {
      setSelectedSkill(skill)
      setModalOpen(true)
    }
  }

  useEffect(() => {
    const fetchStravaStats = async () => {
      try {
        const cachedData = localStorage.getItem('stravaStats');
        if (cachedData) {
          console.log('Using cached Strava data from localStorage');
          setStravaStats(JSON.parse(cachedData));
          return;
        }
        console.log('Fetching new Strava data from API');
        const stats = await getStravaStats();
        
        if (stats) {
          localStorage.setItem('stravaStats', JSON.stringify(stats));
          setStravaStats(stats);
        }
      } catch (error) {
        console.error('Failed to fetch Strava stats:', error);
        const cachedData = localStorage.getItem('stravaStats');
        if (cachedData) {
          console.log('Using cached Strava data as fallback after API error');
          setStravaStats(JSON.parse(cachedData));
        }
      }
    }
    
    fetchStravaStats();
  }, [])

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
                  Passionate builder bridging advanced technology with real-world impact. I architect, code, and launch products at the intersection of AI, analytics, and security. As a frequent Spartan Race competitor and current Ironman 140.6 trainee, physical fitness has become a cornerstone of my life, driving my discipline and resilience.
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
                    <span className="inline-block w-4 h-4 rounded-full bg-amber-400"></span>
                    <span className="text-slate-300">Education/Certifications</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500/40 pl-6 space-y-6">
                  {/* Education */}
                  <a href="#education" className="block cursor-pointer group focus:outline-none">
                    <span className="block text-lg font-semibold text-amber-400 group-hover:text-amber-300">Present</span>
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
                    <span className="block text-lg font-semibold text-amber-400 group-hover:text-amber-300">02/2023</span>
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
                    <span className="block text-lg font-semibold text-amber-400 group-hover:text-amber-300">08/2018–12/2022</span>
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
              {/* Activity Dashboard */}
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-6 text-orange-500">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Activity Dashboard</h3>
                    <p className="text-xs text-slate-400">Powered by <a href="https://www.strava.com/athletes/123793208" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors underline decoration-dotted">Strava</a></p>
                  </div>
                </div>

                {/* Unified Stats & Achievements Panel */}
                <div className="rounded-xl backdrop-blur-sm overflow-hidden">
                  {/* Stats Section */}
                  <div className="p-4 border-b border-slate-700/30">
                    <div className="grid grid-cols-3 divide-x divide-slate-700/30">
                      <div className="text-center px-2">
                        <div className="text-2xl font-bold text-green-400">
                          {stravaStats?.all_run_totals.distance ? (stravaStats.all_run_totals.distance * 0.000621371).toFixed(0) : "--"}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">miles ran</div>
                      </div>
                      <div className="text-center px-2">
                        <div className="text-2xl font-bold text-blue-400">
                          {stravaStats?.all_ride_totals.distance ? (stravaStats.all_ride_totals.distance * 0.000621371).toFixed(0) : "--"}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">miles cycled</div>
                      </div>
                      <div className="text-center px-2">
                        <div className="text-2xl font-bold text-purple-400">
                          {stravaStats?.all_run_totals.moving_time && stravaStats?.all_ride_totals.moving_time 
                            ? ((stravaStats.all_run_totals.moving_time + stravaStats.all_ride_totals.moving_time) / 3600).toFixed(0) 
                            : "--"}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">hours active</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievements Section */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-sm font-medium text-slate-400 uppercase tracking-wide">Athletic Achievements</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      {/* Carousel Section - Past Achievements */}
                      <div className="col-span-2 relative">
                        <div className="bg-slate-700/20 rounded-lg p-3 h-[70px] flex items-center justify-between">
                          <div className="flex-1 relative h-full">
                            {/* Achievement Content with Fade Transition */}
                            {pastAchievements.map((achievement, index) => (
                              <div
                                key={index}
                                className={`absolute inset-0 flex items-center justify-between transition-opacity duration-500 ease-in-out ${
                                  index === currentAchievementIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                              >
                                <div>
                                  <div className="text-sm font-semibold text-slate-200">
                                    {achievement.name}
                                  </div>
                                  <div className="text-sm text-slate-400 mt-0.5">
                                    {achievement.type} • {achievement.date}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 ml-3">
                                  {/* Carousel Indicators */}
                                  {pastAchievements.map((_, dotIndex) => (
                                    <button
                                      key={dotIndex}
                                      onClick={() => setCurrentAchievementIndex(dotIndex)}
                                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        dotIndex === currentAchievementIndex 
                                          ? 'bg-blue-400 scale-125' 
                                          : 'bg-slate-500 hover:bg-slate-400'
                                      }`}
                                      aria-label={`View achievement ${dotIndex + 1}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Upcoming Achievement - Enterprise Grade */}
                      <div className="col-span-1">
                        <div className="group relative bg-gradient-to-br from-slate-800/40 via-orange-900/20 to-amber-900/15 border border-slate-600/40 rounded-lg p-3 h-[70px] flex flex-col justify-center overflow-hidden backdrop-blur-sm transition-all duration-500 ease-out hover:border-orange-400/30 hover:shadow-lg hover:shadow-orange-500/5">
                          {/* Subtle animated background layer */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/3 via-amber-400/2 to-orange-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
                          
                          {/* Professional content layout */}
                          <div className="relative z-10 flex flex-col justify-center h-full space-y-1.5">
                            {/* Title row with refined icon */}
                            <div className="flex items-center gap-2.5">
                              <div className="relative">
                                <svg className="w-4 h-4 text-orange-400/80 group-hover:text-orange-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                </svg>
                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 bg-orange-400/10 rounded-full blur-sm scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              </div>
                              <div className="text-base font-semibold text-slate-100 group-hover:text-white truncate leading-tight transition-colors duration-300">
                                Ironman 140.6
                              </div>
                            </div>
                            
                            {/* Meta information row */}
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-400 group-hover:text-slate-300 font-medium transition-colors duration-300">
                                Triathlon
                              </span>
                              <div className="flex items-center gap-1.5 text-amber-400/70 group-hover:text-amber-400 font-medium transition-colors duration-300">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <span className="text-sm font-medium">Oct 2025</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Sophisticated progress indicator */}
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                          
                          {/* Corner accent - very subtle */}
                          <div className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-br from-orange-400/20 to-transparent rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Skills with vertical tabs */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Technical Skills</h3>
                
                <div className="flex gap-6">
                  {/* Skills Display Area - Left Side */}
                  <div className="flex-1">
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
                  
                  {/* Category Tabs - Right Side (Vertical) */}
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    {skillCategories.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 focus:ring-offset-slate-900 text-left
                          ${activeCategory === cat.key
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400 shadow-lg"
                            : "bg-slate-900/80 text-blue-200 border-blue-800/50 hover:bg-blue-900/40 hover:text-white hover:border-blue-400"}
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
