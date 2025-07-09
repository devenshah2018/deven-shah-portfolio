"use client"

import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { ArrowDown, Download, Mail, Github, Linkedin, Activity } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { RotatingTweets } from "@/components/rotating-tweets"
import dynamic from "next/dynamic"

const GitHubCalendar = dynamic(
  () => import("github-contribution-calendar").then(mod => ({ default: mod.GitHubCalendar })),
  { ssr: false }
)

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[1100px] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-15 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 blur-xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto text-center relative z-20">

          {/* Move name and title below navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
              Deven Shah
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 mt-2">
              Co-Founder/CTO & Graduate MSCS Student
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Shaping the next generation of analytics, quantum computing, and secure systems—powered by AI and grounded in research.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Activity className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-semibold border-2 hover:bg-gray-800"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Resume.pdf';
                link.download = 'Deven_Shah_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-6 mb-10"
          >
            <Link href="https://github.com/devenshah2018" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="hover:bg-gray-800 p-3">
                <Github className="h-6 w-6" />
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/deven-a-shah" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="hover:bg-gray-800 p-3">
                <Linkedin className="h-6 w-6" />
              </Button>
            </Link>
            <Link href="mailto:devenshah2018@gmail.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="hover:bg-gray-800 p-3">
                <Mail className="h-6 w-6" />
              </Button>
            </Link>
            <Link href="https://x.com/devenshah2018" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="hover:bg-gray-800 p-3">
                {/* X icon using SVG for X (Twitter) */}
                <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6 text-white" />
              </Button>
            </Link>
          </motion.div>

                    <div className="flex justify-center mt-6 mb-20">
                      <GitHubCalendar
                        username="devenshah2018"
                        token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}
                        showLabels={true}
                        fontSize={15}
                        titleColor="#fbbf24" // Tailwind's yellow-400 for strong contrast
                        cellSize={17}
                        labelColor="#fbbf24"
                        theme="classic"
                        background="transparent"
                        
                      />
                    </div>

        </div>
      </div>
    </section>
  )
}
