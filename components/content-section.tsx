"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Heart, MessageCircle, Share2, Rss, Edit3, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const articles = [
  {
    title: "Building Scalable E-commerce Analytics with AI",
    excerpt:
      "How we built Suno Analytics to handle enterprise-level data processing and provide real-time insights for inventory management.",
    date: "2024-12-01",
    readTime: "8 min read",
    tags: ["AI", "Analytics", "E-commerce", "Scalability"],
    external: true,
    url: "https://medium.com/@devenshah",
    platform: "Medium",
    image: "/placeholder.svg?width=800&height=400",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "The Future of Quantum Programming Languages",
    excerpt:
      "Exploring the design decisions behind Qode and why quantum computing needs more intuitive programming interfaces.",
    date: "2024-11-15",
    readTime: "12 min read",
    tags: ["Quantum Computing", "Programming Languages", "Innovation", "Qode"],
    external: false,
    slug: "/blog/quantum-programming-future", // Assuming internal blog post
    platform: "Personal Blog",
    image: "/placeholder.svg?width=800&height=400",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Security Compliance in Modern Development",
    excerpt: "Lessons learned from building Ares and automating SOC2 compliance for development teams.",
    date: "2024-10-20",
    readTime: "6 min read",
    tags: ["Security", "Compliance", "DevOps", "Ares"],
    external: true,
    url: "https://dev.to/devenshah",
    platform: "Dev.to",
    image: "/placeholder.svg?width=800&height=400",
    gradient: "from-red-500 to-orange-500",
  },
]

const socialPosts = [
  {
    platform: "LinkedIn",
    icon: Linkedin,
    content:
      "Thrilled to share Suno Analytics has surpassed $50M ARR in client engagement! Our AI-powered e-commerce analytics platform is making waves. Grateful for the amazing team and clients on this journey. #AI #Ecommerce #Analytics #Startup",
    date: "2024-12-10",
    likes: 234,
    comments: 45,
    shares: 12,
    url: "https://linkedin.com/in/devenshah/recent-activity/shares/",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    content:
      "🚀 Major update to Qode just shipped! Our quantum programming language now features advanced gate operations & stunning circuit visualization. The future of quantum is now! #QuantumComputing #Qode #DevTool #OpenSource",
    date: "2024-11-28",
    likes: 156,
    comments: 23,
    shares: 34,
    url: "https://twitter.com/devenshah/status/yourtweetid",
    gradient: "from-blue-400 to-sky-500",
  },
]

export function ContentSection() {
  return (
    <section
      id="content"
      className="py-24 bg-gradient-to-b from-background to-secondary/30 dark:from-gray-900 dark:to-gray-800/50"
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
              Insights & Articles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Sharing knowledge on AI, quantum computing, security, and software development.
            </motion.p>
          </div>

          {/* Articles Section */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-foreground mb-10 flex items-center gap-3">
              <Edit3 className="h-8 w-8 text-primary" />
              Featured Articles
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full flex flex-col overflow-hidden bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${article.gradient} opacity-30 group-hover:opacity-20 transition-opacity`}
                      ></div>
                      <Badge
                        variant="secondary"
                        className={`absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground`}
                      >
                        {article.platform}
                      </Badge>
                    </div>
                    <CardHeader className="pt-6 pb-4">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2 leading-tight hover:text-primary transition-colors">
                        <Link
                          href={article.external ? article.url! : article.slug!}
                          target={article.external ? "_blank" : "_self"}
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center text-xs text-muted-foreground gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{" "}
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                      >
                        <Link
                          href={article.external ? article.url! : article.slug!}
                          target={article.external ? "_blank" : "_self"}
                        >
                          Read Article <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media Highlights Section */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-10 flex items-center gap-3">
              <Rss className="h-8 w-8 text-accent" />
              Social Pulse
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {socialPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + articles.length * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full flex flex-col bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardHeader className={`p-6 pb-4 bg-gradient-to-r ${post.gradient} text-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <post.icon className="h-6 w-6" />
                          <CardTitle className="text-lg font-semibold">{post.platform} Highlight</CardTitle>
                        </div>
                        <span className="text-xs opacity-80">
                          {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-1">
                      <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>
                    </CardContent>
                    <CardFooter className="p-6 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm text-muted-foreground w-full">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
                            <Heart className="h-4 w-4" /> {post.likes}
                          </span>
                          <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
                            <MessageCircle className="h-4 w-4" /> {post.comments}
                          </span>
                          <span className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-pointer">
                            <Share2 className="h-4 w-4" /> {post.shares}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={post.url} target="_blank">
                            View Post <ExternalLink className="ml-1.5 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
