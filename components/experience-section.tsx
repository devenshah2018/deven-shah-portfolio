"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const experiences = [
  {
    title: "Co-Founder/CTO",
    company: "Suno Analytics",
    location: "Remote",
    period: "12/2024 – Present",
    description:
      "Built an e-commerce analytics platform offering deep insights and AI agents for inventory management.",
    achievements: [
      "Led a global development team, improving project timelines and consistently delivering key initiatives to clients",
      "Generated leads and conduct client demos, driving engagement with companies up to $50M ARR",
      "Developed AI agents via LangGraph, intuitive interfaces using React, and scalable PostgreSQL backend systems",
      "Created data tools that streamline reporting, aiding client decision-making processes",
      "Analyzed market trends to refine strategies, increasing brand visibility through targeted campaigns",
    ],
    featured: true,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Application Developer",
    company: "Patelco",
    location: "San Francisco, CA",
    period: "04/2023 – 04/2024",
    description:
      "Responsible for developing full-stack applications using Agile to streamline the acquisition of new Patelco members.",
    achievements: [
      "Developed full-stack features using Azure and ASP.NET, improving member acquisition with SFDC expertise",
      "Lead administrative tool development for acquisition monitoring, ensuring alignment with business needs",
      "Automated fraud request submission process, reducing handling time and ensuring SLA compliance",
      "Created a virtual appointment scheduling system, reducing branch visits for members (Q2 Hackathon winner)",
      "Developed a HELOAN/HELOC rate update automation web app to achieve a 1000% increase in efficiency",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Solutions Architect Intern",
    company: "NetApp",
    location: "San Jose, CA",
    period: "05/2021 – 12/2022",
    description:
      "Automated storage array data management and supported sales meetings by gathering client requirements.",
    achievements: [
      "Automated data backup solutions, cutting RMAN time by 50% using Oracle and ONTAP expertise",
      "Developed scripts for performance insights, enhancing data analysis with Oracle and SQL skills",
      "Created alert system for storage health, reducing monitoring time by 90% with Python and Bash",
    ],
    color: "from-green-500 to-emerald-500",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Professional Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              From intern to co-founder, building impactful solutions across diverse industries and technologies.
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-6 w-5 h-5 bg-gradient-to-r ${exp.color} rounded-full border-4 border-gray-900 shadow-lg hidden md:block z-10`}
                  ></div>

                  <div className="md:ml-20">
                    <Card
                      className={`hover:shadow-2xl transition-all duration-300 border-0 ${exp.featured ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20" : "bg-gray-800/80"} backdrop-blur-sm`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold flex items-center gap-3">
                              <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full`}></div>
                              {exp.title}
                            </CardTitle>
                            <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {exp.company}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Badge variant="outline" className="w-fit bg-gray-800/50 backdrop-blur-sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              {exp.period}
                            </Badge>
                            <Badge variant="secondary" className="w-fit">
                              <MapPin className="mr-2 h-4 w-4" />
                              {exp.location}
                            </Badge>
                            {exp.featured && (
                              <Badge className="w-fit bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                                <Star className="mr-1 h-3 w-3" />
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <p className="text-gray-300 text-lg leading-relaxed">{exp.description}</p>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            Key Achievements
                          </h4>
                          <div className="grid gap-3">
                            {exp.achievements.map((achievement, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/50 backdrop-blur-sm"
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full mt-2 flex-shrink-0`}
                                ></div>
                                <span className="text-gray-300 leading-relaxed">{achievement}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
