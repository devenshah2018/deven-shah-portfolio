"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar } from "lucide-react"

const educationData = [
  {
    degree: "M.S. in Computer Science",
    institution: "Boston University",
    period: "Present",
    status: "In Progress",
    focus: "Data Analytics",
    gradient: "from-blue-500 to-cyan-500",
    icon: GraduationCap,
  },
  {
    degree: "B.S. in Software Engineering",
    institution: "San Jose State University",
    period: "08/2018 – 12/2022",
    status: "Completed",
    focus: "Software Development",
    gradient: "from-indigo-500 to-purple-500",
    icon: GraduationCap,
  },
]

const certificationData = [
  {
    title: "AWS Cloud Practitioner Certification",
    issuer: "Amazon Web Services",
    period: "02/2023",
    status: "Active",
    gradient: "from-orange-500 to-yellow-500",
    icon: Award,
  },
]

export function EducationSection() {
  return (
    <section id="education" className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
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
                Education & Certifications
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
              Academic foundation and professional certifications driving continuous learning and expertise development.
            </motion.p>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-4 mb-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                Education
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl rounded-2xl hover:shadow-blue-500/10 transition-all duration-500 group hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${edu.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <edu.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors tracking-wide">
                            {edu.degree}
                          </h4>
                          <p
                            className={`text-lg font-semibold bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent mb-4`}
                          >
                            {edu.institution}
                          </p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <Badge
                              variant="outline"
                              className="bg-slate-800/50 border-slate-700 text-slate-300 px-3 py-1"
                            >
                              <Calendar className="mr-2 h-3 w-3" />
                              {edu.period}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`px-3 py-1 ${
                                edu.status === "In Progress"
                                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-600"
                                  : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-600"
                              }`}
                            >
                              {edu.status}
                            </Badge>
                          </div>
                          <p className="text-slate-300 font-light">
                            Focus: <span className="text-slate-200 font-medium">{edu.focus}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white flex items-center justify-center gap-4 mb-4">
                <Award className="h-8 w-8 text-orange-400" />
                Professional Certifications
              </h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto rounded-full" />
            </div>
            <div className="max-w-3xl mx-auto">
              {certificationData.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl rounded-2xl hover:shadow-orange-500/10 transition-all duration-500 group hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <cert.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors tracking-wide">
                            {cert.title}
                          </h4>
                          <p
                            className={`text-lg font-semibold bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent mb-4`}
                          >
                            {cert.issuer}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Badge
                              variant="outline"
                              className="bg-slate-800/50 border-slate-700 text-slate-300 px-3 py-1"
                            >
                              <Calendar className="mr-2 h-3 w-3" />
                              {cert.period}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-600 px-3 py-1"
                            >
                              {cert.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
