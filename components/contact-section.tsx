"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Linkedin, Github, CalendarCheck2, Send, MapPin, Briefcase, MessageSquare, Loader2 } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { motion } from "framer-motion"
import { useState } from "react"
import "@calcom/atoms/globals.min.css"
import { getCalApi } from "@calcom/embed-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"quick-chat"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

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
            <Card id="book-a-call-container" className="bg-slate-900/95 border-0 shadow-2xl rounded-2xl transition-all duration-500 relative overflow-hidden">
              <CardContent className="py-6 px-5 md:px-10 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8 relative z-10">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3 justify-center md:justify-start tracking-tight">
                    <CalendarCheck2 className="h-7 w-7 text-blue-400" />
                    Book a Call
                  </h3>
                  <p className="text-base text-slate-200 font-light max-w-xl mx-auto md:mx-0">
                    Schedule a quick chat to discuss opportunities, collaborations, or just to talk tech.
                  </p>
                  <p className="text-xs text-slate-400 mt-3">Powered by <a href="https://cal.com/deven-shah-l0qkjk/quick-chat" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-dotted">Cal.com</a></p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center md:items-end w-full md:w-auto gap-3">
                  <div className="flex flex-row gap-3 w-full md:w-auto">
                    <Button
                      data-cal-namespace="quick-chat"
                      data-cal-link="deven-shah-l0qkjk/quick-chat"
                      data-cal-config='{"layout":"month_view"}'
                      size="lg"
                      className="w-full md:w-auto min-w-[180px] bg-blue-600 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 text-white border-0 px-8 py-4 text-lg font-bold shadow-xl transition-all duration-200 rounded-full flex items-center justify-center gap-2 outline-none ring-0"
                      aria-controls="cal-embed-container"
                      aria-label="Show calendar to select a time with Deven Shah"
                      tabIndex={0}
                    >
                      <CalendarCheck2 className="mr-3 h-5 w-5" aria-hidden="true" />
                      Select a Time
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form & Social Links */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="gap-0 bg-white/[0.02] backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-xl h-full overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Send a Message</h3>
                      <p className="text-sm text-slate-400 mt-1">I'll get back to you within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          required
                          className="h-11 bg-slate-800/40 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20 rounded-lg transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                          className="h-11 bg-slate-800/40 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20 rounded-lg transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-300">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Project Collaboration Opportunity"
                        required
                        className="h-11 bg-slate-800/40 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20 rounded-lg transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity, or just say hello..."
                        rows={5}
                        required
                        className="bg-slate-800/40 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20 rounded-lg resize-none transition-all duration-200"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white border-0 font-medium shadow-lg hover:shadow-blue-500/20 transition-all duration-200 rounded-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/[0.02] backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-xl h-full overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Linkedin className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Connect With Me</h3>
                      <p className="text-sm text-slate-400 mt-1">Find me on these platforms</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                        {social.name === "Twitter" ? (
                          <FontAwesomeIcon icon={faXTwitter} className="h-4 w-4 text-white" />
                        ) : (
                          React.createElement(social.icon as React.ComponentType<any>, {
                            className: "h-4 w-4 text-white",
                          })
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm group-hover:text-blue-200 transition-colors duration-200">
                          {social.name}
                        </p>
                        <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-200 truncate">
                          {social.handle}
                        </p>
                      </div>
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
