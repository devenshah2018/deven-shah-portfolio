"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ExternalLink,
  Calendar,
  Users,
  FileText,
  Brain,
  Lightbulb,
  Shield,
  BarChart3,
  GraduationCap,
} from "lucide-react"
import { motion } from "framer-motion"

const publications = [
  {
    title: "Scalable AI-Driven Analytics for E-commerce Inventory Management",
    authors: ["Deven Shah", "Dr. Sarah Chen", "Prof. Michael Rodriguez"],
    venue: "International Conference on Data Analytics and AI (ICDAI 2025)",
    year: "2025",
    type: "Conference Paper",
    status: "Under Review",
    abstract:
      "This paper presents a novel approach to e-commerce inventory management using AI-driven analytics platforms. We demonstrate how machine learning algorithms can predict inventory needs with 95% accuracy, optimizing stock levels and reducing waste.",
    keywords: ["AI", "E-commerce", "Inventory Management", "Machine Learning", "Predictive Analytics"],
    url: "#", // Placeholder
    doi: "10.1109/ICDAI.2025.XXXXX", // Example DOI
    gradient: "from-primary to-blue-700",
  },
  {
    title: "Quantum Programming Language Design: A Study of Intuitive Syntax for Quantum Operations",
    authors: ["Deven Shah", "Dr. Jennifer Liu"],
    venue: "Journal of Quantum Computing Research (JQCR)",
    year: "2024",
    type: "Journal Article",
    status: "Published",
    abstract:
      "We explore the design principles for creating intuitive quantum programming languages, focusing on the development of Qode. This study analyzes its impact on quantum algorithm development accessibility and efficiency for researchers.",
    keywords: ["Quantum Computing", "Programming Languages", "Compiler Design", "HCI", "Qode"],
    url: "https://jqcr.example.com/article/123", // Placeholder
    doi: "10.1007/sXXXXX-024-00123-4", // Example DOI
    gradient: "from-accent to-purple-700",
  },
  {
    title: "Automated Security Compliance in Modern Software Development: The Ares Platform",
    authors: ["Deven Shah", "Alex Thompson", "Dr. Robert Kim"],
    venue: "IEEE Security & Privacy Symposium (S&P 2024)",
    year: "2024",
    type: "Symposium Paper",
    status: "Published",
    abstract:
      "This work presents Ares, an automated security compliance platform that integrates SOC2 and OWASP standards into the development workflow, reducing compliance overhead by 80% and improving overall security posture.",
    keywords: ["Security", "Compliance", "DevOps", "Automation", "SOC2", "OWASP", "Ares"],
    url: "https://ieeexplore.ieee.org/document/yourdocid", // Placeholder
    doi: "10.1109/SP.2024.XXXXX", // Example DOI
    gradient: "from-red-500 to-orange-700",
  },
]

const researchInterests = [
  {
    name: "Artificial Intelligence & Machine Learning",
    icon: Brain,
    description: "Developing intelligent systems for complex problem-solving and data-driven insights.",
  },
  {
    name: "Quantum Computing & Programming Languages",
    icon: Lightbulb,
    description: "Designing intuitive tools and languages to unlock the potential of quantum computation.",
  },
  {
    name: "Security & Compliance Automation",
    icon: Shield,
    description: "Building platforms to streamline and automate security best practices in software development.",
  },
  {
    name: "E-commerce Analytics & Data Science",
    icon: BarChart3,
    description: "Leveraging data to optimize e-commerce operations and enhance customer experiences.",
  },
  {
    name: "Distributed Systems & Scalability",
    icon: Users,
    description: "Architecting robust and scalable systems capable of handling large-scale data and traffic.",
  },
]

export function PublicationsSection() {
  const getStatusBadgeVariant = (status: string) => {
    if (status === "Published") return "default"
    if (status === "Under Review") return "secondary"
    return "outline"
  }

  return (
    <section
      id="publications"
      className="py-24 bg-gradient-to-b from-gray-800/50 to-gray-900"
    >
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
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              Research & Publications
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Contributing to the forefront of technology through academic research and publications.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Publications Column */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Academic Contributions
              </h3>
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className={`h-2 bg-gradient-to-r ${pub.gradient}`}></div>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <CardTitle className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {pub.title}
                        </CardTitle>
                        <div className="flex-shrink-0 flex flex-col sm:items-end gap-2">
                          <Badge variant={getStatusBadgeVariant(pub.status)} className="text-xs">
                            {pub.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {pub.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" /> {pub.year} •{" "}
                        <span className="font-medium">{pub.venue}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                        {pub.abstract}
                      </p>
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1.5 flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" /> Authors:
                        </p>
                        <p className="text-xs text-muted-foreground">{pub.authors.join(", ")}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {pub.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      {pub.status === "Published" && pub.url !== "#" && (
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                        >
                          <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            Read Publication <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {pub.doi && (
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="ml-auto text-xs text-muted-foreground hover:text-primary"
                        >
                          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">
                            DOI: {pub.doi}
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Research Interests & Academic Profile Column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Brain className="h-8 w-8 text-accent" />
                  Research Interests
                </h3>
                <Card className="bg-card border-border shadow-lg">
                  <CardContent className="p-6 space-y-5">
                    {researchInterests.map((interest, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="mt-1 flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <interest.icon className="h-4 w-4 text-accent group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {interest.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{interest.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  Academic Profile
                </h3>
                <Card className="bg-card border-border shadow-lg">
                  <CardContent className="p-6 space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Current Pursuit</p>
                      <p className="font-medium text-foreground">M.S. Computer Science</p>
                      <p className="text-xs text-muted-foreground">
                        Boston University (Concentration: Data Analytics)
                      </p>
                    </div>
                    <hr className="border-border" />
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Completed</p>
                      <p className="font-medium text-foreground">B.S. Software Engineering</p>
                      <p className="text-xs text-muted-foreground">San Jose State University (Graduated: Dec 2022)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
