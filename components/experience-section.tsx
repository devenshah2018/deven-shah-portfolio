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
		title: "Co-Founder/CTO",
		company: "Suno Analytics",
		companyLogo: "/suno-logo.jpeg",
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
		gradient: "from-blue-500 to-cyan-500",
		link: "https://www.sunoanalytics.com",
	},
	{
		id: "patelco",
		title: "Application Developer",
		company: "Patelco",
		companyLogo: "/patelco-logo.png",
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
			"Automated storage array data management and supported sales meetings by gathering client requirements.",
		achievements: [
			"Automated data backup solutions, cutting RMAN time by 50% using Oracle and ONTAP expertise",
			"Developed scripts for performance insights, enhancing data analysis with Oracle and SQL skills",
			"Created alert system for storage health, reducing monitoring time by 90% with Python and Bash",
		],
		gradient: "from-emerald-500 to-teal-500",
		link: "https://www.netapp.com",
	},
]

export function ExperienceSection() {
	const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

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
					<div className="text-center mb-12 sm:mb-20">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="mb-6"
						>
							<h2 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
								Professional Journey
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
							Intern to co-founder—driving innovation, building teams, and delivering transformative technology across
							fintech, AI, and enterprise platforms.
						</motion.p>
					</div>
					{/* Experience Cards */}
					<div className="space-y-8">
						{experiences.map((exp, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card 
									className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl rounded-2xl transition-all duration-500 overflow-hidden group"
									data-item-id={exp.id}
								>
									<CardContent className="p-4 sm:p-8">
										<div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8">
											{/* Left Column - Main Info */}
											<div className="flex-1 min-w-0">
												<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
													<div className="flex items-center gap-3">
														{exp.companyLogo && (
															<img
																src={exp.companyLogo}
																alt={exp.company + " logo"}
																className="w-8 h-8 rounded-md object-contain bg-white/80 border border-slate-200/30 shadow-sm"
															/>
														)}
														<div>
															<h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 tracking-wide break-words">
																{exp.title}
															</h3>
															<a
																href={exp.link}
																target="_blank"
																rel="noopener noreferrer"
																className="text-base sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300 inline-flex items-center gap-2 group/link"
															>
																{exp.company}
																<ExternalLink className="h-4 w-4 text-slate-400 group-hover/link:text-blue-400 transition-colors" />
															</a>
														</div>
													</div>
													{exp.featured && (
														<Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-3 py-1 text-xs sm:text-sm">
															<Star className="mr-1 h-3 w-3" />
															Current
														</Badge>
													)}
												</div>
												<div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
													<Badge
														variant="outline"
														className="bg-slate-800/50 border-slate-700 text-slate-300 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-base"
													>
														<Calendar className="mr-2 h-3 w-3" />
														{exp.period}
													</Badge>
													<Badge
														variant="outline"
														className="bg-slate-800/50 border-slate-700 text-slate-300 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-base"
													>
														<MapPin className="mr-2 h-3 w-3" />
														{exp.location}
													</Badge>
												</div>
												<p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 font-light">
													{exp.description}
												</p>
												<Button
													variant="ghost"
													onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
													className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0 h-auto font-semibold text-base sm:text-lg"
												>
													{expandedIdx === index ? (
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
											</div>
										</div>
										{/* Expanded Achievements */}
										{expandedIdx === index && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3 }}
												className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800"
											>
												<div className="flex items-center gap-3 mb-4 sm:mb-6">
													<TrendingUp className="h-5 w-5 text-emerald-400" />
													<h4 className="text-base sm:text-lg font-semibold text-slate-200">
														Key Achievements
													</h4>
												</div>
												<ul className="space-y-3 sm:space-y-4">
													{exp.achievements.map((achievement, i) => (
														<li key={i} className="flex items-start gap-3">
															<div className={`w-2 h-2 bg-gradient-to-r ${exp.gradient} rounded-full mt-2 flex-shrink-0`} />
															<span className="text-slate-300 leading-relaxed font-light text-sm sm:text-base">
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
