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
		id: "qode-project",
		title: "Qode",
		subtitle: "Quantum Programming Language",
		period: "10/2024 – Present",
		description:
			"Lightweight, interpreted quantum programming language built with C, featuring intuitive syntax for scripting quantum operations, applying and measuring quantum gates, qubits, and quantum states.",
		technologies: ["C", "Quantum Computing", "Compiler Design", "Language Design"],
		type: "ide",
		status: "Active Development",
		gradient: "from-purple-500 via-blue-500 to-cyan-500",
		icon: Code,
		highlights: [
			"Pure C implementation",
			"Blazing fast execution",
			"Virtualized quantum circuits",
		],
	},
	{
		id: "ares-project",
		title: "Ares",
		subtitle: "Security Compliance Platform",
		period: "01/2024 – 08/2024",
		description:
			"Launched Ares, a SOC2 and OWASP compliance solution with 100+ users, accepted into Microsoft's Startup Program and Buildspace S5, integrated via a Rust and TypeScript VSCode extension.",
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
			"Automates SOC2 Type 1 compliance",
		],
	},
	{
		id: "crypto-forecasting-project",
		title: "Cryptocurrency Forecasting",
		subtitle: "ML Prediction Model",
		period: "01/2022 – 12/2022",
		description:
			"Built an ML solution to forecast cryptocurrency trends using a synthetic dataset for undergraduate capstone that was presented live at the SJSU Fall 2022 Expo.",
		technologies: ["Python", "Machine Learning", "Data Science", "Forecasting"],
		type: "github",
		link: "https://github.com/b-devera/crypto-forecasting-model",
		status: "Completed",
		gradient: "from-green-500 via-emerald-500 to-teal-500",
		icon: Zap,
		highlights: ["SJSU Expo Presentation", "ML Forecasting", "Synthetic Dataset"],
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
					className="max-w-7xl mx-auto"
				>
					<div className="text-center mb-12 sm:mb-20">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-4xl sm:text-5xl font-extrabold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight"
						>
							Featured Projects
						</motion.h2>
						<div className="h-1 w-16 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 mx-auto rounded-full mb-4" />
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light"
						>
							Quantum, security, and ML—each project is a leap forward.
						</motion.p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
						{projects.map((project, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.15 }}
								viewport={{ once: true }}
								className="group relative"
							>
								<Card data-item-id={project.id} className="h-full flex flex-col border border-slate-800 bg-slate-900/80 shadow-lg rounded-xl overflow-hidden relative transition-all duration-400 min-h-[340px]">
									{/* Top Accent Bar */}
									<div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${project.gradient} z-10`} />
									{/* Icon and Title Row */}
									<div className="flex items-center gap-3 px-6 pt-8 pb-2">
										<div
											className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-md border-2 border-slate-900/80`}
										>
											<project.icon className="h-7 w-7 text-white drop-shadow-lg" />
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex flex-col">
												<span className="text-lg font-bold text-white truncate">
													{project.title}
												</span>
												<span
													className={`block text-xs font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
												>
													{project.subtitle}
												</span>
											</div>
										</div>
									</div>
									<CardContent className="flex-1 flex flex-col px-6 pb-6 pt-0">
										<p className="text-gray-300 text-base mb-4 line-clamp-4 min-h-[64px]">
											{project.description}
										</p>
										{/* Highlights */}
										<ul className="mb-4 space-y-1">
											{project.highlights.map((highlight, i) => (
												<li key={i} className="flex items-center gap-2">
													<span
														className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}
													/>
													<span className="text-sm text-gray-400">
														{highlight}
													</span>
												</li>
											))}
										</ul>
										{/* Action Button */}
										<Button
											onClick={() => handleProjectAction(project)}
											className={`w-full bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white border-0 font-bold text-base py-2 rounded-xl mt-auto shadow-xl focus:ring-4 focus:ring-blue-900/60 focus:outline-none
    ${project.type === "ide" ? "relative overflow-visible group/ide" : ""}`}
											size="sm"
										>
											{project.type === "ide" && (
												<>
													{/* Pulsating blue highlighted border */}
													<span className="absolute -inset-1 z-0 rounded-2xl pointer-events-none animate-ide-pulse-border-blue border-2 border-blue-400/40 group-hover/ide:border-blue-400/70" />
													<span className="relative z-10 flex items-center justify-center gap-2 w-full">
														<Code className="h-5 w-5 text-white drop-shadow-md" />
														<span className="tracking-wide text-[1.08em] font-semibold text-white drop-shadow-sm">Try Interactive IDE</span>
													</span>
												</>
											)}
											{(project.type === "video" || project.type === "link") && (
												<>
													<ExternalLink className="mr-2 h-4 w-4" />
													View on Marketplace
												</>
											)}
											{project.type === "github" && (
												<>
													<ExternalLink className="mr-2 h-4 w-4" />
													View on GitHub
												</>
											)}
										</Button>
									</CardContent>
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
