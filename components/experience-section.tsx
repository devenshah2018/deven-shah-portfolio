"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, TrendingUp } from "lucide-react"

const experiences = [
	{
		title: "Co-Founder/CTO",
		company: "Suno Analytics",
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
		color: "from-blue-500 to-cyan-500",
    link: "https://www.sunoanalytics.com",
	},
	{
		title: "Application Developer",
		company: "Patelco",
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
		color: "from-purple-500 to-pink-500",
    link: "https://www.patelco.org",
	},
	{
		title: "Solutions Architect Intern",
		company: "NetApp",
		location: "San Jose, CA",
		period: "05/2021 – 12/2022",
		description:
			"Automated storage array data management and supported sales meetings by gathering client requirements.",
		achievements: [
			"Automated data backup solutions, cutting RMAN time by 50% using Oracle and ONTAP expertise",
			"Developed scripts for performance insights, enhancing data analysis with Oracle and SQL skills",
			"Created alert system for storage health, reducing monitoring time by 90% with Python and Bash",
		],
		color: "from-green-500 to-emerald-500",
    link: "https://www.netapp.com",
	},
]

export function ExperienceSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
	return (
		<section
			id="experience"
			className="py-24 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
							Professional Journey
						</h2>
						<p className="text-xl text-gray-300 max-w-3xl mx-auto">
  Intern to co-founder—driving innovation, building teams, and delivering transformative technology across fintech, AI, and enterprise platforms.
</p>
					</div>

					{/* Horizontal Timeline */}
					<div className="relative flex flex-col items-center h-[340px]">
					  <div className="w-full flex items-end justify-between mb-12 relative">
					    {/* Timeline Line (fixed position, does not move with expansion) */}
					    <div className="absolute left-0 right-0 top-[120px] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full z-0 pointer-events-none" style={{height: '4px'}} />
					    {[...experiences].reverse().map((exp, idx, arr) => {
					      const isExpanded = expandedIdx === idx;
					      return (
					        <div
					          key={idx}
					          className="relative flex flex-col items-center w-1/3 min-w-[260px] z-10"
					          style={{ position: 'relative' }}
					        >
					          <div
					            className={`w-full max-w-xs bg-gray-900/90 border border-gray-700 rounded-xl shadow-xl p-6 text-left z-20 transition-all duration-300 overflow-visible`}
					            style={{ minHeight: '340px', maxHeight: '340px', marginTop: '0px' }}
					          >
					            <div className="flex items-center gap-2 mb-2">
					              <span className={`w-2 h-2 bg-gradient-to-r ${exp.color} rounded-full`}></span>
					              <span className="text-lg font-bold text-white">{exp.title}</span>
					            </div>
					            <div className="text-base font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
					              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300 transition-colors">
					                {exp.company}
					              </a>
					            </div>
					            <div className="flex flex-wrap gap-2 mb-2">
					              <span className="inline-flex items-center text-xs bg-gray-800 text-blue-200 px-2 py-0.5 rounded font-mono">
					                <Calendar className="mr-1 h-3 w-3" />{exp.period}
					              </span>
					              <span className="inline-flex items-center text-xs bg-gray-800 text-purple-200 px-2 py-0.5 rounded font-mono">
					                <MapPin className="mr-1 h-3 w-3" />{exp.location}
					              </span>
					              {exp.featured && (
					                <span className="inline-flex items-center text-xs bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-0.5 rounded font-mono">
					                  <Star className="mr-1 h-3 w-3" />Current
					                </span>
					              )}
					            </div>
					            <div className="text-gray-300 text-sm mb-2">{exp.description}</div>
					            {/* Read More / Collapse Button */}
					            <div className="mt-4">
					              <button
					                className="text-blue-400 underline text-xs font-semibold focus:outline-none hover:text-blue-300 transition-colors"
					                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
					                aria-expanded={isExpanded}
					                aria-controls={`exp-achievements-${idx}`}
					              >
					                {isExpanded ? 'Show Less' : 'Read More'}
					              </button>
					            </div>
					          </div>
					          {/* Floating Achievements Panel */}
					          {isExpanded && (
					            <div
					              className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[320px] bg-gray-900/95 border border-blue-700 rounded-xl shadow-2xl p-6 z-30 transition-all duration-300"
					              id={`exp-achievements-${idx}`}
					              aria-hidden={!isExpanded}
					            >
					              <div className="font-semibold text-gray-200 text-xs mb-1 flex items-center gap-1">
					                <TrendingUp className="h-4 w-4 text-green-400" /> Key Achievements
					              </div>
					              <ul className="list-disc list-inside space-y-1 pl-2">
					                {exp.achievements.map((ach, i) => (
					                  <li key={i} className="text-gray-400 text-xs leading-snug">{ach}</li>
					                ))}
					              </ul>
					            </div>
					          )}
					        </div>
					      );
					    })}
					  </div>
					</div>
				</div>
			</div>
		</section>
	)
}
