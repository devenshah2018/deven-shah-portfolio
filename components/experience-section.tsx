"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, TrendingUp, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

const experiences = [
	{
		id: "suno-analytics",
		title: "Co-Founder & CTO",
		company: "Suno Analytics",
		companyLogo: "/suno-logo.jpeg",
		location: "Remote",
		period: "12/2024 – Present",
		description:
			"Built an e-commerce analytics platform offering deep insights and AI agents for inventory management.",
		achievements: [
			"Led a global development team, improving project timelines and consistently delivering key initiatives to clients",
			"Developed AI agents via LangGraph, intuitive interfaces using React, and scalable PostgreSQL backend systems",
			"Designed system architecture for high availability and performance, ensuring robust data handling",
			"Conduct client discovery and demos, driving engagement with companies up to $50M ARR",
		],
		featured: true,
		gradient: "from-blue-500 to-cyan-500",
		link: "https://www.sunoanalytics.com",
	},
	{
		id: "patelco",
		title: "Application Developer",
		company: "Patelco",
		companyLogo: "/patelco-logo.png",
		location: "Dublin, CA",
		period: "04/2023 – 04/2024",
		description:
			"Responsible for developing full-stack applications to streamline the acquisition of new Patelco members.",
		achievements: [
			"Developed full-stack features using Azure and ASP.NET, improving member acquisition with SFDC expertise",
			"Lead administrative tool development for acquisition monitoring, ensuring alignment with business needs",
			"Automated fraud request submission process, reducing handling time and ensuring SLA compliance",
			"Created a virtual appointment scheduling system, reducing branch visits for members (Q2 Hackathon winner)",
			"Developed a HELOAN/HELOC rate update automation web app to achieve a 1000% increase in efficiency",
		],
		gradient: "from-indigo-500 to-purple-500",
		link: "https://www.patelco.org",
	},
	{
		id: "netapp",
		title: "Solutions Architect Intern",
		company: "NetApp",
		companyLogo: "/netapp-logo.png",
		location: "San Jose, CA",
		period: "05/2021 – 12/2022",
		description:
			"Automated big data management and supported sales meetings by gathering client requirements.",
		achievements: [
			"Automated data backup solutions, cutting RMAN time by 50% using Oracle and ONTAP expertise",
			"Developed scripts for performance insights, enhancing data analysis with Oracle and SQL skills",
			"Created alert system for storage health, reducing monitoring time by 90% with Python and Bash",
			"Migrated legacy system API to REST, improving integration with modern applications",
		],
		gradient: "from-emerald-500 to-teal-500",
		link: "https://www.netapp.com",
	},
]

export function ExperienceSection() {
	const [allExpanded, setAllExpanded] = useState(false)

	return (
		<section id="experience" className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 to-slate-950">
			<div className="container mx-auto px-3 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="max-w-7xl mx-auto"
				>
					{/* Section Header */}
					<div className="text-center mb-10 sm:mb-14">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="mb-4"
						>
							<h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
								Professional Journey
							</h2>
							<div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
						</motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
						>
							Intern to co-founder—driving innovation, building teams, and delivering transformative technology across
							fintech, AI, and enterprise platforms.
						</motion.p>
					</div>
					{/* Experience Cards - Responsive Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card 
									className="border border-slate-800 bg-slate-900/70 shadow-xl rounded-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
									data-item-id={exp.id}
								>
									<CardContent className="p-5 flex flex-col h-full">
										<div className="flex items-center gap-3 mb-4">
											{exp.companyLogo && (
												<img
													src={exp.companyLogo}
													alt={exp.company + " logo"}
													className="w-8 h-8 rounded-md object-contain bg-white/80 border border-slate-200/30 shadow-sm"
												/>
											)}
											<div className="flex-1 min-w-0">
												<h3 className="text-lg sm:text-xl font-bold text-white mb-1 tracking-wide break-words">
													{exp.title}
												</h3>
												<a
													href={exp.link}
													target="_blank"
													rel="noopener noreferrer"
													className="text-base font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300 inline-flex items-center gap-2 group/link"
												>
													{exp.company}
													<ExternalLink className="h-4 w-4 text-slate-400 group-hover/link:text-blue-400 transition-colors" />
												</a>
											</div>
											{exp.featured && (
												<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-2 py-0.5 text-xs">
													<Star className="mr-1 h-3 w-3" />
													Current
												</Badge>
											)}
										</div>
										<div className="flex flex-wrap gap-2 mb-3">
											<Badge
												variant="outline"
												className="bg-slate-800/50 border-slate-700 text-slate-300 px-2 py-1 text-xs"
											>
												<Calendar className="mr-2 h-3 w-3" />
												{exp.period}
											</Badge>
											<Badge
												variant="outline"
												className="bg-slate-800/50 border-slate-700 text-slate-300 px-2 py-1 text-xs"
											>
												<MapPin className="mr-2 h-3 w-3" />
												{exp.location}
											</Badge>
										</div>
										<p className="text-slate-300 text-sm leading-relaxed mb-3 font-light line-clamp-3">
											{exp.description}
										</p>
										<Button
											variant="ghost"
											onClick={() => setAllExpanded(!allExpanded)}
											className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 h-auto font-semibold text-sm"
											aria-expanded={allExpanded}
											aria-controls={`exp-achievements-${exp.id}`}
										>
											{allExpanded ? (
												<>
													<ChevronUp className="mr-2 h-4 w-4" />
													Show Less
												</>
											) : (
												<>
													<ChevronDown className="mr-2 h-4 w-4" />
													View Achievements
												</>
											)}
										</Button>
										{/* Expanded Achievements */}
										{allExpanded && (
											<motion.div
												id={`exp-achievements-${exp.id}`}
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3 }}
												className="mt-4 pt-4 border-t border-slate-800"
											>
												<div className="flex items-center gap-3 mb-3">
													<TrendingUp className="h-5 w-5 text-emerald-400" />
													<h4 className="text-base font-semibold text-slate-200">
														Key Achievements
													</h4>
												</div>
												<ul className="space-y-2">
													{exp.achievements.map((achievement, i) => (
														<li key={exp.id + '-' + i} className="flex items-start gap-3">
															<div className={`w-2 h-2 bg-gradient-to-r ${exp.gradient} rounded-full mt-2 flex-shrink-0`} />
															<span className="text-slate-300 leading-relaxed font-light text-xs">
																{achievement}
															</span>
														</li>
													))}
												</ul>
											</motion.div>
										)}
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
