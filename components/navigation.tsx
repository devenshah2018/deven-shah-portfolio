"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
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
	const [mobileNavOpen, setMobileNavOpen] = useState(false)
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
						<Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className={`w-12 h-12 rounded-full flex items-center justify-center bg-slate-900/80 hover:bg-slate-800/90 transition-all duration-200 focus:outline-none ${mobileNavOpen ? 'scale-105' : ''}`}
									aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
									style={{ border: 'none', outline: 'none' }}
								>
									<span className="relative flex items-center justify-center w-full h-full">
										<AnimatePresence mode="wait">
											<motion.span
												key={mobileNavOpen ? 'close' : 'open'}
												initial={{ rotate: mobileNavOpen ? -90 : 90, opacity: 0 }}
												animate={{ rotate: 0, opacity: 1 }}
												exit={{ rotate: mobileNavOpen ? 90 : -90, opacity: 0 }}
												transition={{ duration: 0.18, ease: 'easeInOut' }}
												className="absolute inset-0 flex items-center justify-center"
											>
												{mobileNavOpen ? (
													<svg
														width="36"
														height="36"
														viewBox="0 0 36 36"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														aria-hidden="true"
														focusable="false"
														className="h-9 w-9 text-blue-400 drop-shadow-xl transition-colors duration-200"
														role="img"
														aria-label="Close navigation menu"
													>
														<circle cx="18" cy="18" r="16" fill="url(#x-bg-gradient)" fillOpacity="0.92" />
														<rect x="11" y="17" width="14" height="2.5" rx="1.25" fill="url(#x-bar1)" transform="rotate(45 18 18)" />
														<rect x="11" y="17" width="14" height="2.5" rx="1.25" fill="url(#x-bar2)" transform="rotate(-45 18 18)" />
														<defs>
															<radialGradient id="x-bg-gradient" cx="0" cy="0" r="1" gradientTransform="translate(18 18) scale(16)" gradientUnits="userSpaceOnUse">
																<stop stopColor="#1e293b" />
																<stop offset="1" stopColor="#334155" />
															</radialGradient>
															<linearGradient id="x-bar1" x1="11" y1="18.25" x2="25" y2="18.25" gradientUnits="userSpaceOnUse">
																<stop stopColor="#60a5fa" />
																<stop offset="1" stopColor="#818cf8" />
															</linearGradient>
															<linearGradient id="x-bar2" x1="11" y1="18.25" x2="25" y2="18.25" gradientUnits="userSpaceOnUse">
																<stop stopColor="#818cf8" />
																<stop offset="1" stopColor="#60a5fa" />
															</linearGradient>
														</defs>
													</svg>
												) : (
													<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="h-7 w-7 text-slate-200 transform rotate-90 transition-transform duration-200" role="img" aria-label="Open navigation menu">
														<polyline points="8,12 14,18 20,12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												)}
											</motion.span>
										</AnimatePresence>
									</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								className={`
									overflow-hidden
									rounded-3xl
									bg-slate-950/90
									backdrop-blur-2xl
									border border-slate-800/50
									shadow-2xl
									transition-all duration-500
									translate-y-0
									${mobileNavOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
								`}
								style={{
									WebkitBackdropFilter: 'blur(30px)',
									backdropFilter: 'blur(30px)',
								}}
							>
								<div className="px-6 py-4">
									{/* Mobile nav items */}
									{navItems.map((item, index) => (
										<motion.div
											key={item.name}
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.4, delay: index * 0.1 }}
											className="py-2"
										>
											<Link
												href={item.href}
												className={
													item.name === "Connect"
														? "block text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full px-6 py-3 shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 border-2 border-blue-400/60"
														: "block text-lg font-semibold text-slate-200 hover:text-white transition-all duration-300 px-4 py-3 rounded-lg"
												}
												onClick={() => setMobileNavOpen(false)}
											>
												{item.name}
											</Link>
										</motion.div>
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
