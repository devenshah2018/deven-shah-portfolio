"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, Code, Calendar, Users, Award, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { QodeIdeModal } from "@/components/qode-ide-modal"
import { AresVideoModal } from "@/components/ares-video-modal"
import { useState } from "react"

const projects = [
	{
		id: "portfolio-project",
		title: "Portfolio Website",
		subtitle: "Modern SPA for My Work & Skills",
		period: "06/2025 – Present",
		description:
			"Personal portfolio built with React, showcasing my projects, skills, and experience. Features interactive demos, a live IDE, and a sleek, responsive design.",
		technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
		type: "github",
		link: "https://github.com/devenshah2018/deven-shah-portfolio",
		status: "Active Development",
		gradient: "from-purple-500 via-blue-500 to-cyan-500",
		icon: Code,
		highlights: [
			"Full-stack React SPA",
			"Interactive guided tour",
			"Live IDE with real-time code execution",
		],
	},
	{
		id: "qode-project",
		title: "Qode",
		subtitle: "Quantum Programming Language",
		period: "10/2024 – Present",
		description:
			"Qode is a lightweight, interpreted quantum programming language written in C. It offers intuitive syntax for scripting quantum operations, gates, and measurements.",
		technologies: ["C", "Quantum Computing", "Compiler Design", "Language Design"],
		type: "ide",
		status: "Active Development",
		gradient: "from-purple-500 via-blue-500 to-cyan-500",
		icon: Code,
		highlights: [
			"Pure C implementation",
			"Blazing fast quantum execution",
			"Virtualized quantum circuits",
		],
	},
	{
		id: "ares-project",
		title: "Ares",
		subtitle: "Security Compliance Platform",
		period: "01/2024 – 08/2024",
		description:
			"Ares streamlines SOC2 and OWASP compliance for organizations. Launched on VSCode Marketplace, accepted into Microsoft for Startups and Buildspace S5, and integrated via Rust & TypeScript extension.",
		technologies: ["Rust", "TypeScript", "VSCode Extension", "Security", "Compliance"],
		type: "link",
		link: "http://marketplace.visualstudio.com/items?itemName=strive-ai.strive",
		status: "Launched",
		users: "100+ users",
		gradient: "from-red-500 via-orange-500 to-yellow-500",
		icon: Award,
		highlights: [
			"VSCode Marketplace launch",
			"100+ active organizations",
			"Automated SOC2 Type 1 compliance",
		],
	},
	{
		id: "crypto-forecasting-project",
		title: "Cryptocurrency Forecasting",
		subtitle: "ML Prediction Model",
		period: "01/2022 – 12/2022",
		description:
			"Developed an ML model to forecast cryptocurrency trends using synthetic data. Presented at SJSU Fall 2022 Expo as part of my undergraduate capstone.",
		technologies: ["Python", "Machine Learning", "Data Science", "Forecasting"],
		type: "github",
		link: "https://github.com/b-devera/crypto-forecasting-model",
		status: "Completed",
		gradient: "from-green-500 via-emerald-500 to-teal-500",
		icon: Zap,
		highlights: [
			"SJSU Expo presentation",
			"ML-based forecasting",
			"Synthetic dataset design",
		],
	},
]

export function ProjectsSection() {
	const [qodeModalOpen, setQodeModalOpen] = useState(false)
	const [aresModalOpen, setAresModalOpen] = useState(false)

	const handleProjectAction = (project: (typeof projects)[0]) => {
		if (project.type === "ide") {
			setQodeModalOpen(true)
		} else if (project.type === "video") {
			setAresModalOpen(true)
		} else if (project.type === "link") {
			window.open(project.link, "_blank")
		} else if (project.type === "github") {
			window.open(project.link, "_blank")
		} else {
			window.open("https://github.com/devenshah", "_blank")
		}
	}

	return (
		<section id="projects" className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 to-slate-900">
			<div className="container mx-auto px-2 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="text-center mb-10 sm:mb-16">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight"
						>
							Featured Projects
						</motion.h2>
						<div className="h-1 w-14 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 mx-auto rounded-full mb-3" />
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto font-normal leading-relaxed"
						>
							Explore my most impactful work—each project blends innovation, clarity, and modern engineering. Every card is interactive and accessible.
						</motion.p>
					</div>
					<div className="grid grid-cols-1 gap-8">
						{projects.map((project, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								viewport={{ once: true }}
								className="group relative"
							>
								<Card data-item-id={project.id} className="flex flex-row items-center border border-slate-800 bg-slate-900 shadow-md rounded-xl overflow-hidden relative transition-all duration-400 min-h-[100px] px-4 py-3 gap-5 focus-within:ring-2 focus-within:ring-blue-500/60 group">
									{/* Icon */}
									<div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-sm border border-slate-900/80`}>
										<project.icon className="h-6 w-6 text-white" />
									</div>
									{/* Main Content */}
									<div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
										<div className="flex items-center gap-2 mb-1">
											<span className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">{project.title}</span>
											<span className="text-xs sm:text-sm font-medium text-slate-400 ml-2">|</span>
											<span className="text-xs sm:text-sm font-medium text-slate-400 whitespace-normal max-w-full">{project.subtitle}</span>
										</div>
										<div className="flex flex-wrap gap-2 mb-1">
											{project.technologies.map((tech, i) => (
												<Badge key={i} variant="outline" className="bg-blue-800/80 border border-blue-700 text-white px-2 py-0.5 rounded-md text-xs font-semibold shadow-none focus-visible:ring-2 focus-visible:ring-blue-500/60">{tech}</Badge>
											))}
										</div>
										<div className="flex flex-wrap gap-2">
											{project.highlights.map((highlight, i) => (
												<span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-200 text-xs font-normal whitespace-normal border border-slate-700" title={highlight}>
													{highlight}
												</span>
											))}
										</div>
									</div>
									{/* Action Button & Meta */}
									<div className="flex flex-col items-end justify-center ml-4 min-w-[110px] gap-1">
										<div className="flex items-center gap-2">
											{project.status && (
												<span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${
													project.status === 'Launched' ? 'bg-green-900/80 text-green-300 border-green-800' :
													project.status === 'Active Development' ? 'bg-blue-900/80 text-blue-300 border-blue-800' :
													project.status === 'Completed' ? 'bg-slate-900/80 text-slate-300 border-slate-800' :
													'bg-slate-900/80 text-slate-400 border-slate-800'
												}`}>
													{project.status}
												</span>
											)}
											<Button
												onClick={() => handleProjectAction(project)}
												className="border border-blue-700 bg-blue-800 text-white hover:bg-blue-700 transition-all duration-200 font-semibold text-xs px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400/60 focus:outline-none min-w-[90px] shadow-none"
												size="sm"
												aria-label={project.type === "ide" ? "Try Interactive IDE" : project.type === "github" ? "View on GitHub" : "View on Marketplace"}
											>
												{project.type === "ide" && (
													<span className="flex items-center gap-1">
														<Code className="h-4 w-4 text-white" />
														<span>IDE</span>
													</span>
												)}
												{(project.type === "video" || project.type === "link") && (
													<span className="flex items-center gap-1">
														<ExternalLink className="h-4 w-4 text-white" />
														Market
													</span>
												)}
												{project.type === "github" && (
													<span className="flex items-center gap-1">
														<ExternalLink className="h-4 w-4 text-white" />
														GitHub
													</span>
												)}
											</Button>
										</div>
										{project.users && project.users !== "0" && (
											<span className="text-xs text-slate-400 font-normal flex items-center gap-1 mt-1"><Users className="h-3 w-3" />{project.users}</span>
										)}
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			<QodeIdeModal open={qodeModalOpen} onOpenChange={setQodeModalOpen} />
			<AresVideoModal open={aresModalOpen} onOpenChange={setAresModalOpen} />
		</section>
	)
}

// Add this to your global CSS (e.g. globals.css):
// .animate-ide-border-glow {
//   background: linear-gradient(90deg, #2563eb 0%, #06b6d4 100%);
//   opacity: 0.18;
//   filter: blur(8px);
//   animation: ide-border-glow 2.8s cubic-bezier(0.4,0,0.6,1) infinite alternate;
// }
// @keyframes ide-border-glow {
//   0% { opacity: 0.12; filter: blur(8px); }
//   50% { opacity: 0.28; filter: blur(14px); }
//   100% { opacity: 0.12; filter: blur(8px); }
// }
// .animate-ide-pulse-border {
//   animation: ide-pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
// }
// @keyframes ide-pulse-border {
//   0% { border-color: rgba(6, 182, 212, 0.4); }
//   50% { border-color: rgba(6, 182, 212, 0.7); }
//   100% { border-color: rgba(6, 182, 212, 0.4); }
