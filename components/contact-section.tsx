"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, CalendarCheck2, Send, MapPin, Briefcase, MessageSquare, Loader2 } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const mailtoLink = `mailto:devenshah2018@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`,
      )}&body=${encodeURIComponent(`${formData.message}`)}`

      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.location.href = mailtoLink
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: "mailto:devenshah2018@gmail.com",
      handle: "devenshah2018@gmail.com",
      gradient: "from-red-500 to-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/deven-a-shah/",
      handle: "/in/deven-a-shah",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/devenshah2018",
      handle: "/devenshah2018",
      gradient: "from-slate-500 to-slate-600",
    },
    {
      name: "Twitter",
      icon: faXTwitter,
      url: "https://x.com/devenshah2018",
      handle: "@devenshah2018",
      gradient: "from-slate-700 to-slate-800",
    },
  ]

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
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
                Let's Connect
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
              Have a project, an opportunity, or just want to chat about tech? I'd love to hear from you.
            </motion.p>
          </div>

          {/* Cal.com Booking - Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl rounded-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <CardContent className="py-8 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3 justify-center md:justify-start">
                    <CalendarCheck2 className="h-7 w-7 text-blue-400" />
                    Schedule a Call
                  </h3>
                  <p className="text-lg text-slate-300 font-light">
                    Book a quick chat to discuss opportunities, collaborations, or just to talk about tech.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 rounded-full"
                    onClick={() => window.open("https://cal.com/deven-shah-l0qkjk/quick-chat", "_blank")}
                  >
                    <CalendarCheck2 className="mr-3 h-5 w-5" />
                    Book a Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form & Social Links */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl rounded-2xl h-full">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <MessageSquare className="h-7 w-7 text-blue-400" />
                    Send a Message
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-lg font-light">
                    Fill out the form below, and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-200">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Ada Lovelace"
                          required
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-200">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g., ada@example.com"
                          required
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-200">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Project Collaboration Inquiry"
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-200">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity, or just say hello!"
                        rows={6}
                        required
                        className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Info */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-sm text-slate-400">devenshah2018@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Location</p>
                      <p className="text-sm text-slate-400">Boston, MA (Remote Open)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Role</p>
                      <p className="text-sm text-slate-400">Co-Founder/CTO</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white">Find Me Online</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-slate-800/30 border-slate-700 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 rounded-xl group"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${social.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            {social.name === "Twitter" ? (
                              <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5 text-white" />
                            ) : (
                              React.createElement(social.icon as React.ComponentType<any>, {
                                className: "h-5 w-5 text-white",
                              })
                            )}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-white group-hover:text-slate-200">{social.name}</p>
                            <p className="text-xs text-slate-400 group-hover:text-slate-300">{social.handle}</p>
                          </div>
                        </div>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
