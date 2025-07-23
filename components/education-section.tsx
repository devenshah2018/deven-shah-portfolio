"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"

const educationData = [
	{
		id: "bu-masters",
		degree: "M.S. in Computer Science",
		institution: "Boston University",
		period: "Present",
		status: "In Progress",
		concentration: "Data Analytics",
		coursework: [],
		gradient: "from-blue-500 to-cyan-500",
		icon: GraduationCap,
		logo: "/bu-logo.png",
	},
	{
		id: "sjsu-bachelors",
		degree: "B.S. in Software Engineering",
		institution: "San Jose State University",
		period: "08/2018 – 12/2022",
		status: "Completed",
		coursework: [
			"Data Structures & Algorithms",
			"Assembly Language Programming",
			"Operating Systems",
			"Object Oriented Design",
			"Information Security",
			"Machine Learning & Big Data",
			"Computer Networks",
		],
		gradient: "from-indigo-500 to-purple-500",
		icon: GraduationCap,
		logo: "/sjsu-logo.png",
	},
]

const certificationData = [
	{
		id: "aws-cloud-practitioner",
		title: "AWS Cloud Practitioner Certification",
		issuer: "Amazon Web Services",
		period: "02/2023",
		status: "Active",
		gradient: "from-orange-500 to-yellow-500",
		icon: Award,
		logo: "/aws-logo.jpg",
	},
]

export function EducationSection() {
	const [activeTab, setActiveTab] = useState("education")

	return (
		<section
			id="education"
			className="py-20 bg-gradient-to-b from-slate-900 to-slate-950"
		>
			<div className="container mx-auto px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="max-w-4xl mx-auto"
				>
					{/* Section Header */}
					<div className="text-center mb-12">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="mb-6"
						>
							<h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
								Education & Certifications
							</h2>
							<div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
						</motion.div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-lg text-slate-400 max-w-3xl mx-auto font-light leading-relaxed"
						>
							Academic foundation and professional certifications driving
							continuous learning and expertise development.
						</motion.p>
					</div>

					{/* Tabs */}
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList
							className="flex w-full mb-8 bg-slate-800/90 border border-slate-600/60 rounded-2xl h-12 p-1 shadow-xl backdrop-blur-md max-w-md mx-auto ring-1 ring-slate-500/20"
							style={{ minWidth: 320 }}
						>
							<TabsTrigger
								value="education"
								className="relative flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/25 data-[state=inactive]:text-slate-200 rounded-xl font-bold text-base h-10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
								role="tab"
								aria-selected={activeTab === "education"}
							>
								<GraduationCap className="h-5 w-5" />
								Education
								{activeTab === "education" && (
									<motion.div
										layoutId="tabIndicator"
										className="absolute inset-0 rounded-xl bg-blue-600 -z-10"
										initial={false}
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
									/>
								)}
							</TabsTrigger>
							<TabsTrigger
								value="certifications"
								className="relative flex-1 flex items-center justify-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-slate-500/20 data-[state=inactive]:text-slate-200 rounded-xl font-bold text-base h-10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60"
								role="tab"
								aria-selected={activeTab === "certifications"}
							>
								<Award className="h-5 w-5" />
								Certifications
								{activeTab === "certifications" && (
									<motion.div
										layoutId="tabIndicator"
										className="absolute inset-0 rounded-xl bg-slate-700 -z-10"
										initial={false}
										transition={{ type: "spring", stiffness: 500, damping: 30 }}
									/>
								)}
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="education"
							className="space-y-4"
							role="tabpanel"
							aria-labelledby="education-tab"
						>
							{educationData.map((edu, index) => {
								const [showAllCourses, setShowAllCourses] = useState(false)
								const displayedCourses = showAllCourses
									? edu.coursework
									: edu.coursework.slice(0, 4)

								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
									>
										<Card data-item-id={edu.id} className="border border-slate-700/30 bg-slate-900/90 backdrop-blur-sm shadow-xl rounded-xl transition-all duration-500 group overflow-hidden">
											<CardContent className="p-0">
												<div className="flex items-start gap-4 p-6">
													{/* Logo */}
													<div className="relative flex-shrink-0">
														<div className="w-16 h-16 rounded-xl bg-white/5 border border-slate-600/30 p-3 shadow-md backdrop-blur-sm">
															<img
																src={edu.logo}
																alt={`${edu.institution} logo`}
																className="w-full h-full object-contain filter brightness-110"
															/>
														</div>
														<div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md border-2 border-slate-900">
															<edu.icon className="h-3 w-3 text-white" />
														</div>
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0">
														<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
															<div className="min-w-0">
																<h3 className="text-xl font-bold text-white mb-1 leading-tight">
																	{edu.degree}
																</h3>
																<a
																	href={
																		edu.institution === "Boston University"
																			? "https://www.bu.edu"
																			: edu.institution === "San Jose State University"
																			? "https://www.sjsu.edu"
																			: "#"
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="text-base font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 inline-flex items-center gap-2 pl-0.5 pr-1.5"
																>
																	{edu.institution}
																	<ExternalLink className="h-4 w-4 text-slate-400 group-hover/link:text-blue-400 transition-colors" />
																</a>
																{edu.concentration && (
																	<p className="text-slate-400 text-sm">
																		<span className="text-slate-300 font-medium">
																			Concentration:
																		</span>{" "}
																		{edu.concentration}
																	</p>
																)}
															</div>
															<div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
																<Badge
																	variant="outline"
																	className="bg-slate-800/50 border-slate-600 text-slate-200 px-3 py-1.5 text-xs font-medium shadow-sm transition-all duration-200"
																>
																	<Calendar className="mr-1.5 h-3 w-3" />
																	{edu.period}
																</Badge>
																<Badge
																	variant="outline"
																	className={`px-3 py-1.5 text-xs font-medium shadow-sm transition-all duration-200 ${
																		edu.status === "In Progress"
																			? "bg-amber-500/20 text-amber-300 border-amber-500/40"
																			: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
																	}`}
																>
																	{edu.status}
																</Badge>
															</div>
														</div>

														{/* Coursework */}
														{edu.coursework.length > 0 && (
															<div className="border-t border-slate-700/30 pt-4">
																<div className="flex items-center justify-between mb-3">
																	<h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
																		<div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
																		Relevant Coursework
																		<span className="text-xs text-slate-400 font-normal">
																			({edu.coursework.length})
																		</span>
																	</h4>
																	{edu.coursework.length > 4 && (
																		<button
																			onClick={() => setShowAllCourses(!showAllCourses)}
																			className="text-xs font-semibold text-blue-500 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg shadow-sm flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/70"
																			aria-label={
																				showAllCourses
																					? "Show fewer courses"
																					: "Show all courses"
																			}
																			tabIndex={0}
																			style={{ cursor: 'pointer', minWidth: 110 }}
																		>
																			<span>
																				{showAllCourses
																					? "Show Less"
																					: `Show All (${edu.coursework.length})`}
																			</span>
																			<motion.div
																				animate={{
																					rotate: showAllCourses ? 180 : 0,
																				}}
																				transition={{ duration: 0.2 }}
																				className="inline-block"
																			>
																				<svg
																					className="w-3 h-3"
																					fill="none"
																					stroke="currentColor"
																					viewBox="0 0 24 24"
																				>
																					<path
																						strokeLinecap="round"
																						strokeLinejoin="round"
																						strokeWidth={2}
																						d="M19 9l-7 7-7-7"
																					/>
																				</svg>
																			</motion.div>
																		</button>
																	)}
																</div>
																<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
																	{displayedCourses.map((course, courseIndex) => (
																		<motion.div
																			key={courseIndex}
																			initial={{ opacity: 0, scale: 0.95 }}
																			animate={{ opacity: 1, scale: 1 }}
																			transition={{ duration: 0.2, delay: courseIndex * 0.05 }}
																			className="flex items-center gap-2 bg-slate-900/95 border border-slate-800 rounded-lg px-2.5 py-1 min-h-[32px] h-[32px] shadow-sm w-full"
																			style={{ justifyContent: 'flex-start', alignItems: 'center' }}
																		>
																			<span className="w-1.5 h-1.5 rounded-full bg-slate-700 flex-shrink-0"></span>
																			<span className="flex-1 text-left text-[0.82rem] text-slate-300 font-medium leading-tight break-words whitespace-normal truncate" title={course}>{course}</span>
																		</motion.div>
																	))}
																</div>
															</div>
														)}
													</div>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								)
							})}
						</TabsContent>

						<TabsContent
							value="certifications"
							className="space-y-4"
							role="tabpanel"
							aria-labelledby="certifications-tab"
						>
							{certificationData.map((cert, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<Card data-item-id={cert.id} className="border border-slate-700/30 bg-slate-900/90 backdrop-blur-sm shadow-xl rounded-xl transition-all duration-300 group">
										<CardContent className="p-0">
											<div className="flex items-start gap-4 p-6">
												{/* Logo */}
												<div className="relative flex-shrink-0">
													<div className="w-16 h-16 rounded-xl bg-white/5 border border-slate-600/30 p-3 shadow-md backdrop-blur-sm">
														<img
															src={cert.logo}
															alt={`${cert.issuer} logo`}
															className="w-full h-full object-contain filter brightness-110"
														/>
													</div>
													<div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-md border-2 border-slate-900">
														<cert.icon className="h-3 w-3 text-white" />
													</div>
												</div>

												{/* Content */}
												<div className="flex-1 min-w-0">
													<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
														<div className="min-w-0">
															<h3 className="text-xl font-bold text-white mb-1 leading-tight">
																{cert.title}
															</h3>
															<a
																href={cert.issuer === "Amazon Web Services"
																	? "https://aws.amazon.com/certification/certified-cloud-practitioner/"
																	: "#"}
																target="_blank"
																rel="noopener noreferrer"
																className="text-base font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent transition-all duration-300 inline-flex items-center gap-2 pl-0.5 pr-1.5"
															>
																{cert.issuer}
																<ExternalLink className="h-4 w-4 text-slate-400 group-hover/link:text-blue-400 transition-colors" />
															</a>
														</div>
														<div className="flex gap-2 flex-shrink-0">
															<Badge
																variant="outline"
																className="bg-slate-800/50 border-slate-600 text-slate-200 px-3 py-1.5 text-xs font-medium shadow-sm"
															>
																<Calendar className="mr-1.5 h-3 w-3" />
																{cert.period}
															</Badge>
															<Badge
																variant="outline"
																className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 px-3 py-1.5 text-xs font-medium shadow-sm"
															>
																{cert.status}
															</Badge>
														</div>
													</div>

													{/* Description */}
													<div className="border-t border-slate-700/30 pt-3">
														<h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
															<div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
															Professional Certification
														</h4>
														<p className="text-slate-400 text-sm leading-relaxed">
															Industry-recognized certification demonstrating expertise in
															cloud computing fundamentals, AWS services, security, and
															best practices for cloud architecture.
														</p>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</TabsContent>
					</Tabs>
				</motion.div>
			</div>
		</section>
	)
}
