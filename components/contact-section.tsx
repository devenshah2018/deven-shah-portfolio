"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  CalendarCheck2,
  Send,
  MapPin,
  Briefcase,
  MessageSquare,
  Sparkles,
  Loader2,
} from "lucide-react"
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

    // Simulate API call or mailto link
    // For a real app, replace this with an actual API call to a backend endpoint
    try {
      // Example: Using mailto as fallback
      const mailtoLink = `mailto:devenshah2018@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`,
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )}`

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      window.location.href = mailtoLink
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {

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
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/deven-a-shah/",
      handle: "/in/deven-a-shah",
      color: "hover:bg-sky-600/20 hover:text-sky-500",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/devenshah2018",
      handle: "/devenshah2018",
      color: "hover:bg-gray-600/20 hover:text-gray-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/devenshah2018",
      handle: "@devenshah2018",
      color: "hover:bg-blue-500/20 hover:text-blue-400",
    },
  ]

  const contactInfo = [
    { icon: Mail, title: "Email", value: "devenshah2018@gmail.com", href: "mailto:devenshah2018@gmail.com" },
    { icon: MapPin, title: "Location", value: "Boston, MA (Remote Open)" },
    { icon: Briefcase, title: "Availability", value: "Open to New Opportunities", badge: true },
  ]

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-background to-secondary/30 dark:from-gray-900 dark:to-black/30"
    >
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
              className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Have a project, an opportunity, or just want to chat about tech? I'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Form Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="bg-card border-border shadow-xl p-2 sm:p-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-3">
                    <MessageSquare className="h-7 w-7 text-primary" />
                    Send a Message
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form below, and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Ada Lovelace"
                          required
                          className="bg-secondary/30 dark:bg-secondary/50 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
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
                          className="bg-secondary/30 dark:bg-secondary/50 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Project Collaboration Inquiry"
                        required
                        className="bg-secondary/30 dark:bg-secondary/50 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project, opportunity, or just say hello!"
                        rows={5}
                        required
                        className="bg-secondary/30 dark:bg-secondary/50 focus:ring-primary"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 text-base font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          {" "}
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Send className="mr-2 h-4 w-4" /> Send Message{" "}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Social Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Quick Contact Info */}
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Direct Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{info.title}</p>
                        {info.badge ? (
                          <Badge className="mt-0.5 text-xs bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 border-green-300 dark:border-green-600">
                            <Sparkles className="mr-1 h-3 w-3" />
                            {info.value}
                          </Badge>
                        ) : info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">Find Me Online</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.name}
                      variant="outline"
                      className={`w-full justify-start h-auto py-3 px-4 group ${social.color} border-border hover:border-transparent transition-all duration-300`}
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-secondary/50 group-hover:bg-transparent transition-colors">
                            <social.icon className="h-5 w-5 text-muted-foreground group-hover:inherit transition-colors" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground group-hover:inherit">{social.name}</p>
                            <p className="text-xs text-muted-foreground group-hover:inherit">{social.handle}</p>
                          </div>
                        </div>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Calendar Booking */}
              <Card className="bg-card border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <CalendarCheck2 className="h-6 w-6 text-accent" />
                    Schedule a Meeting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-5">
                    Book a 30-minute call to discuss opportunities, collaborations, or just to chat about tech.
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-accent to-purple-700 text-primary-foreground hover:opacity-90"
                    onClick={() => window.open("https://cal.com/devenshah", "_blank")}
                  >
                    <CalendarCheck2 className="mr-2 h-4 w-4" />
                    Book a Call via Cal.com
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
