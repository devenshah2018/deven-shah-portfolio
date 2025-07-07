"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react"

const educationData = [
  {
    degree: "M.S. in Computer Science",
    institution: "Boston University",
    period: "Present",
    status: "In Progress",
    focus: "Data Analytics",
    color: "from-blue-500 to-cyan-500",
    icon: GraduationCap,
  },
  {
    degree: "B.S. in Software Engineering",
    institution: "San Jose State University",
    period: "08/2018 – 12/2022",
    status: "Completed",
    focus: "Software Development",
    color: "from-purple-500 to-pink-500",
    icon: GraduationCap,
  },
]

const certificationData = [
  {
    title: "AWS Cloud Practitioner Certification",
    issuer: "Amazon Web Services",
    period: "02/2023",
    status: "Active",
    color: "from-orange-500 to-yellow-500",
    icon: Award,
  },
]

export function EducationSection() {
  return (
    <section
      id="education"
      className="py-24 bg-gradient-to-br from-gray-800 via-gray-900/90 to-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
              Education & Certifications
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Academic foundation and professional certifications driving continuous learning and expertise development.
            </p>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              Education
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/90 backdrop-blur-sm group hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${edu.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <edu.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                            {edu.degree}
                          </h4>
                          <p className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            {edu.institution}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="bg-gray-800 text-blue-200 border-blue-700">
                              <Calendar className="mr-1 h-3 w-3" />
                              {edu.period}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`${
                                edu.status === "In Progress" 
                                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-600"
                                  : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-600"
                              }`}
                            >
                              {edu.status}
                            </Badge>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Focus: <span className="text-gray-200 font-medium">{edu.focus}</span>
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
            <h3 className="text-3xl font-bold mb-8 text-center text-white flex items-center justify-center gap-3">
              <Award className="h-8 w-8 text-orange-400" />
              Professional Certifications
            </h3>
            <div className="max-w-2xl mx-auto">
              {certificationData.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gray-900/90 backdrop-blur-sm group hover:scale-105">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${cert.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <cert.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-lg font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                            {cert.issuer}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-gray-800 text-orange-200 border-orange-700">
                              <Calendar className="mr-1 h-3 w-3" />
                              {cert.period}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-600"
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
        </div>
      </div>
    </section>
  )
}
