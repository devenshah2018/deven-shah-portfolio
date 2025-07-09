"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
	{ name: "About", href: "#about" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#projects" },
	{ name: "Education", href: "#education" },
	{ name: "Connect", href: "#contact" },
]

export function Navigation() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [showName, setShowName] = useState(false)
	const [currentTime, setCurrentTime] = useState("")
	const [timeZoneAbbr, setTimeZoneAbbr] = useState("")
	const [timeZoneFull, setTimeZoneFull] = useState("")
	const heroRef = useRef<HTMLElement | null>(null)

	// Get user's timezone and update clock
	useEffect(() => {
		const updateClock = () => {
			const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const now = new Date();
			const abbr = now.toLocaleTimeString('en-US', {
				timeZoneName: 'short',
				timeZone: tz
			}).split(' ').pop() || tz;
			const time = now.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZone: tz,
			});
			setCurrentTime(time);
			setTimeZoneAbbr(abbr);
			setTimeZoneFull(tz);
		};
		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, [])

	// Simple scroll detection
	useEffect(() => {
		let ticking = false
		
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					setIsScrolled(window.scrollY > 50)
					
					// Check if hero is even partially in view
					const hero = document.getElementById("hero")
					if (hero) {
						const rect = hero.getBoundingClientRect()
						// Hero is in view if any part of it is visible
						const isHeroInView = rect.bottom > 100 // Add buffer for smoother transition
						// Smoother transition with less strict scroll threshold
						const shouldShowName = !isHeroInView && window.scrollY > 400
						setShowName(shouldShowName)
					} else {
						setShowName(true)
					}
					ticking = false
				})
				ticking = true
			}
		}
		
		window.addEventListener("scroll", handleScroll, { passive: true })
		handleScroll() // Initial check
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
			className={`fixed top-0 w-full z-50 transition-all duration-500 ${
				isScrolled
					? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="relative"
					>
						<div className="flex flex-col min-w-[260px]">
							<AnimatePresence mode="wait">
								{showName ? (
									<motion.span
										key="deven-shah"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="block text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
									>
										Deven Shah
									</motion.span>
								) : (
									<motion.span
										key="clock"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="block"
									>
										<span
											className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-900/80 text-slate-100 font-mono text-lg font-semibold tracking-widest select-none"
											title={timeZoneFull}
										>
											<svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
											<span className="tabular-nums">{currentTime}</span>
											<span className="ml-2 text-blue-300 font-bold text-xs tracking-wider uppercase">{timeZoneAbbr}</span>
										</span>
									</motion.span>
								)}
							</AnimatePresence>
						</div>
					</motion.div>
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-2">
						{navItems.map((item, index) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<Link
									href={item.href}
									className={
										item.name === "Connect"
											? "px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-sans font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-xl"
											: "px-6 py-3 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 font-sans font-semibold uppercase tracking-wider text-sm"
									}
								>
									{item.name}
								</Link>
							</motion.div>
						))}
					</div>
					{/* Mobile Navigation */}
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full hover:bg-slate-800/50"
								>
									<Menu className="h-6 w-6 text-slate-300" />
								</Button>
							</SheetTrigger>
							<SheetContent className="bg-slate-950/95 backdrop-blur-xl border-slate-800">
								<div className="flex flex-col space-y-8 mt-16">
									{navItems.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className={
												item.name === "Connect"
													? "text-xl font-sans font-bold uppercase tracking-widest bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-indigo-300 transition-all duration-300 py-2"
													: "text-xl font-sans font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors py-2"
											}
										>
											{item.name}
										</Link>
									))}
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</motion.nav>
	)
}
