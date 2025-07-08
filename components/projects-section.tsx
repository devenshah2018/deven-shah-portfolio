"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code, Calendar, Users, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Qode",
    subtitle: "Quantum Programming Language",
    period: "10/2024 – Present",
    description:
      "Lightweight, interpreted quantum programming language built with C, featuring intuitive syntax for scripting quantum operations, applying and measuring quantum gates, qubits, and quantum states.",
    technologies: ["C", "Quantum Computing", "Compiler Design", "Language Design"],
    type: "demo",
    status: "Active Development",
    gradient: "from-purple-500 via-blue-500 to-cyan-500",
    icon: Code,
    highlights: ["Intuitive Syntax", "Real-time Execution", "Visual Circuit Display"],
  },
  {
    title: "Ares",
    subtitle: "Security Compliance Platform",
    period: "01/2024 – 08/2024",
    description:
      "Launched Ares, a SOC2 and OWASP compliance solution with 100+ users, accepted into Microsoft's Startup Program and Buildspace S5, integrated via a Rust and TypeScript VSCode extension.",
    technologies: ["Rust", "TypeScript", "VSCode Extension", "Security", "Compliance"],
    type: "link",
    link: "https://x.com/devenshah2018/status/1853296427549733029",
    status: "Launched",
    users: "100+ users",
    gradient: "from-red-500 via-orange-500 to-yellow-500",
    icon: Award,
    highlights: ["Microsoft Startup Program", "100+ Active Users", "SOC2 Compliance"],
  },
  {
    title: "Cryptocurrency Forecasting",
    subtitle: "ML Prediction Model",
    period: "01/2022 – 12/2022",
    description:
      "Built an ML solution to forecast cryptocurrency trends using a synthetic dataset for undergraduate capstone that was presented live at the SJSU Fall 2022 Expo.",
    technologies: ["Python", "Machine Learning", "Data Science", "Forecasting"],
    type: "github",
    link: "https://github.com/b-devera/crypto-forecasting-model",
    status: "Completed",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: Zap,
    highlights: ["SJSU Expo Presentation", "ML Forecasting", "Synthetic Dataset"],
  },
]

export function ProjectsSection() {
  const handleProjectAction = (project: (typeof projects)[0]) => {
    if (project.type === "demo") {
      // Handle demo action
      console.log("Demo action for", project.title)
    } else if (project.link) {
      window.open(project.link, "_blank")
    }
  }

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
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
                Featured Projects
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
              Innovative solutions spanning quantum computing, security compliance, and machine learning.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full flex flex-col border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl rounded-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden">
                  <CardHeader className="p-8 pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <Calendar className="mr-1 h-3 w-3" />
                        {project.period.split(" – ")[0]}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white tracking-wide">{project.title}</h3>
                    <p
                      className={`text-lg font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-4`}
                    >
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge
                        variant={project.status === "Active Development" ? "default" : "secondary"}
                        className={
                          project.status === "Active Development"
                            ? `bg-gradient-to-r ${project.gradient} text-white border-0`
                            : "bg-slate-800 text-slate-300"
                        }
                      >
                        {project.status}
                      </Badge>
                      {project.users && (
                        <Badge variant="outline" className="bg-slate-800/50 border-slate-700 text-slate-300">
                          <Users className="mr-1 h-3 w-3" />
                          {project.users}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col p-8 pt-0">
                    <p className="text-slate-300 mb-8 leading-relaxed flex-1 font-light">{project.description}</p>

                    {/* Highlights */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-slate-200 mb-4 text-sm uppercase tracking-wide">
                        Key Highlights
                      </h4>
                      <div className="space-y-3">
                        {project.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full flex-shrink-0`}
                            />
                            <span className="text-sm text-slate-400 font-light">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs bg-slate-800/50 border-slate-700 text-slate-300 px-2 py-1"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleProjectAction(project)}
                      className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-white border-0 font-semibold py-3 rounded-xl`}
                      size="lg"
                    >
                      {project.type === "demo" && (
                        <>
                          <Code className="mr-2 h-5 w-5" />
                          Try Interactive Demo
                        </>
                      )}
                      {project.type === "link" && (
                        <>
                          <ExternalLink className="mr-2 h-5 w-5" />
                          View Project
                        </>
                      )}
                      {project.type === "github" && (
                        <>
                          <ExternalLink className="mr-2 h-5 w-5" />
                          View on GitHub
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
