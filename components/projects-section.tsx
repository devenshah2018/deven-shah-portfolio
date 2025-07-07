"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Code, Calendar, Users, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { QodeIdeModal } from "@/components/qode-ide-modal"
import { AresVideoModal } from "@/components/ares-video-modal"
import { useState } from "react"

const projects = [
  {
    title: "Qode",
    subtitle: "Quantum Programming Language",
    period: "10/2024 – Present",
    description:
      "Lightweight, interpreted quantum programming language built with C, featuring intuitive syntax for scripting quantum operations, applying and measuring quantum gates, qubits, and quantum states.",
    technologies: ["C", "Quantum Computing", "Compiler Design", "Language Design"],
    type: "ide",
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
  const [qodeModalOpen, setQodeModalOpen] = useState(false)
  const [aresModalOpen, setAresModalOpen] = useState(false)

  const handleProjectAction = (project: (typeof projects)[0]) => {
    if (project.type === "ide") {
      setQodeModalOpen(true)
    } else if (project.type === "video") {
      setAresModalOpen(true)
    } else if (project.type === "link") {
      window.open(project.link, "_blank")
    } else if (project.type === "github") {
      window.open(project.link, "_blank")
    } else {
      window.open("https://github.com/devenshah", "_blank")
    }
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Innovative solutions spanning quantum computing, security compliance, and machine learning.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden relative">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        {project.period.split(" – ")[0]}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </CardTitle>
                    <p
                      className={`text-lg font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-4`}
                    >
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge
                        variant={
                          project.status === "Active Development"
                            ? "default"
                            : project.status === "Launched"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          project.status === "Active Development"
                            ? `bg-gradient-to-r ${project.gradient} text-white border-0`
                            : ""
                        }
                      >
                        {project.status}
                      </Badge>
                      {project.users && (
                        <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                          <Users className="mr-1 h-3 w-3" />
                          {project.users}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col relative z-10">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Highlights</h4>
                      <div className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full`}></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleProjectAction(project)}
                      className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg transition-all duration-300 text-white border-0 font-semibold`}
                      size="lg"
                    >
                      {project.type === "ide" && (
                        <>
                          <Code className="mr-2 h-5 w-5" />
                          Try Interactive IDE
                        </>
                      )}
                      {project.type === "video" || project.type === "link" && (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Watch Demo
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

      <QodeIdeModal open={qodeModalOpen} onOpenChange={setQodeModalOpen} />
      <AresVideoModal open={aresModalOpen} onOpenChange={setAresModalOpen} />
    </section>
  )
}
