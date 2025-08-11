"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft, Play, Calendar, ExternalLink, GraduationCap, Briefcase, Award, Rocket } from "lucide-react"
import { useTour } from "@/components/tour-context"

// Tour step definitions
const tourSteps = [
	{
		id: "intro",
		title: "Welcome",
		content: "Hi! I'm Deven Shah. Let me walk you through how I evolved from an intern into a co-founder leading AI innovation. Each section reflects a chapter in that growth. Let's begin!",
		target: null,
		position: "center",
		showProgress: true,
		type: "intro"
	},
	{
		id: "experience-section",
		title: "Professional Experience",
		content: "Here's where my transformation began: from learning the ropes as an intern to driving innovation as a technical leader. This section captures the foundation of my journey.",
		target: "#experience",
		position: "bottom",
		showProgress: true,
		type: "experience"
	},
	{
		id: "experience-netapp",
		title: "Starting as an Intern at NetApp",
		content: "Every journey starts somewhere. Mine began at NetApp. It taught me how scalable systems work and sparked my curiosity with automation and optimization.",
		target: '[data-item-id="netapp"]',
		position: "right",
		showProgress: true,
		type: "experience"
	},
	{
		id: "experience-patelco",
		title: "Full-Stack Development at Patelco",
		content: "This role sharpened my ability to deliver real-world impact, from winning a hackathon to automating fraud detection. It was my proving ground in high-stakes environments.",
		target: '[data-item-id="patelco"]',
		position: "left",
		showProgress: true,
		type: "experience"
	},
	{
		id: "experience-current",
		title: "Co-Founder/CTO at Suno Analytics",
		content: "This is the culmination of everything I've learned from leading global teams, building AI agents with LangGraph, to connecting with $50M+ brands. It's where I bring vision to life.",
		target: '[data-item-id="suno-analytics"]',
		position: "right",
		showProgress: true,
		type: "experience"
	},
	{
		id: "projects-section",
		title: "Featured Projects",
		content: "These projects represent my evolution. Applying what I've learned to build tools that push boundaries in AI, systems engineering, and quantum computing.",
		target: "#projects",
		position: "bottom",
		showProgress: true,
		type: "projects"
	},
	{
		id: "education-section",
		title: "Education & Certifications",
		content: "My academic path gave me the fundamentals to build on, from SJSU to Boston University, each step shaped how I approach technical challenges and leadership.",
		target: "#education",
		position: "bottom",
		showProgress: true,
		type: "education"
	},
	{
		id: "contact-cta",
		title: "Ready to Chat?",
		content: "Thanks for exploring my journey. If anything resonated, whether it's AI, security, or innovation. I'd love to connect, let's build something great together.",
		target: "#book-a-call-container",
		position: "top",
		showProgress: true,
		type: "cta"
	}
]

export function GuidedTour() {
	const { isTourOpen, closeTour } = useTour()
	const [currentStep, setCurrentStep] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [tooltipPosition, setTooltipPosition] = useState<{
		top: string;
		left?: string;
		right?: string;
		width?: string;
		transform?: string;
	}>({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' })

	const currentStepData = tourSteps[currentStep]

	const scrollToTarget = useCallback((target: string, opts?: {force?: boolean}) => {
		const element = document.querySelector(target)
		if (element) {
			const rect = element.getBoundingClientRect()
			const viewportHeight = window.innerHeight
			const elementTop = rect.top + window.scrollY
			const elementHeight = rect.height
			let scrollTop

			// If the element is a section (height > 60% of viewport), align top
			if (elementHeight > viewportHeight * 0.6) {
				scrollTop = elementTop - 24 // Add a small offset for header
			} else if (window.innerWidth < 768) {
				// Mobile: show element at top quarter
				scrollTop = elementTop - (viewportHeight * 0.18)
			} else {
				// Desktop: center element, but ensure it's fully in view
				const tooltipPadding = 350
				const safePadding = 50
				const minTop = elementTop - tooltipPadding - safePadding
				const maxTop = elementTop - (viewportHeight / 2) + (elementHeight / 2)
				scrollTop = Math.max(0, Math.min(minTop, maxTop))
			}
			window.scrollTo({
				top: scrollTop,
				behavior: 'smooth'
			})
		}
	}, [])

	const nextStep = useCallback(() => {
		if (currentStep < tourSteps.length - 1) {
			const nextStepData = tourSteps[currentStep + 1]
			setIsTransitioning(true)
			if (nextStepData.target) {
				scrollToTarget(nextStepData.target, {force: true})
				setTimeout(() => {
					setCurrentStep(currentStep + 1)
					setIsTransitioning(false)
				}, 400)
			} else {
				setCurrentStep(currentStep + 1)
				setIsTransitioning(false)
			}
		}
	}, [currentStep, scrollToTarget])

	const prevStep = useCallback(() => {
		if (currentStep > 0) {
			const prevStepData = tourSteps[currentStep - 1]
			setIsTransitioning(true)
			if (prevStepData.target) {
				scrollToTarget(prevStepData.target, {force: true})
				setTimeout(() => {
					setCurrentStep(currentStep - 1)
					setIsTransitioning(false)
				}, 400)
			} else {
				setCurrentStep(currentStep - 1)
				setIsTransitioning(false)
			}
		}
	}, [currentStep, scrollToTarget])

	const handleCloseTour = useCallback(() => {
		setCurrentStep(0)
		
		// Immediately re-enable page interactions
		document.body.style.overflow = ''
		document.body.style.pointerEvents = ''
		
		// Clean up highlights
		document.querySelectorAll('.tour-highlight').forEach(el => {
			el.classList.remove('tour-highlight')
		})
		
		// Optional: Add analytics tracking here
		console.log('Tour completed at step:', currentStep + 1, 'of', tourSteps.length)
		closeTour()
	}, [closeTour, currentStep])

	const updateTooltipPosition = useCallback(() => {
		// Fixed top-right toast position with consistent dimensions
		const viewportWidth = window.innerWidth
		const margin = 20
		
		// Set consistent width regardless of screen size
		const tooltipWidth = 380
		const mobileWidth = 320
		
		if (viewportWidth < 768) {
			// On mobile, use slightly smaller width but still consistent
			setTooltipPosition({ 
				top: `${margin}px`, 
				right: `${margin}px`,
				width: `${Math.min(mobileWidth, viewportWidth - 40)}px`
			})
		} else {
			// Desktop: fixed width for consistency
			setTooltipPosition({ 
				top: `${margin}px`, 
				right: `${margin}px`,
				width: `${tooltipWidth}px`
			})
		}
	}, [])

	const highlightElement = useCallback(() => {
		// Remove any existing highlights
		document.querySelectorAll('.tour-highlight').forEach(el => {
			el.classList.remove('tour-highlight')
		})

		// Highlight experience items
		if (currentStepData.target && currentStepData.target.startsWith('[data-item-id=')) {
			const element = document.querySelector(currentStepData.target)
			if (element) {
				element.classList.add('tour-highlight')
			}
		}

		// Highlight project items
		if (
			currentStepData.target &&
			currentStepData.target.startsWith('#projects .grid > div')
		) {
			const element = document.querySelector(currentStepData.target)
			if (element) {
				element.classList.add('tour-highlight')
			}
		}

		// Highlight book-a-call container on last step
		if (
			currentStepData.target === '#book-a-call-container'
		) {
			const element = document.querySelector(currentStepData.target)
			if (element) {
				element.classList.add('tour-highlight')
			}
		}
	}, [currentStepData.target])

	useEffect(() => {
		if (isTourOpen) {
			// Only scroll to top on the first step (intro)
			if (currentStep === 0) {
				// First, scroll to the top of the page to ensure consistent starting position
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
				
				// Small delay to ensure scroll to top completes before starting tour
				setTimeout(() => {
					highlightElement()
					updateTooltipPosition()
					// Don't scroll to target on first step since we're already at the top
				}, 300)
			} else {
				// For subsequent steps, just highlight and scroll to target
				highlightElement()
				updateTooltipPosition()
				if (currentStepData.target) {
					scrollToTarget(currentStepData.target)
				}
			}
			
			// Disable scrolling and interactions during tour
			document.body.style.overflow = 'hidden'
			document.body.style.pointerEvents = 'none'
			
			// Create a stable reference to the event handler
			const preventInteraction = (e: Event) => {
				const target = e.target as HTMLElement
				
				// Allow interactions with tour modal and its children
				if (target.closest('.tour-tooltip-container') || target.closest('.tour-tooltip')) {
					return
				}
				
				e.preventDefault()
				e.stopPropagation()
				e.stopImmediatePropagation()
			}
			
			// Create a stable reference to the keyboard handler
			const handleKeyDown = (e: KeyboardEvent) => {
				// Only allow arrow keys and escape for tour navigation
				if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(e.code)) {
					preventInteraction(e)
				}
			}
			
			// Add comprehensive event listeners to prevent all interactions
			const events = [
				'wheel', 'touchmove', 'touchstart', 'touchend', 'touchcancel',
				'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick',
				'contextmenu', 'selectstart', 'dragstart', 'drop'
			]
			
			events.forEach(event => {
				document.addEventListener(event, preventInteraction, { passive: false, capture: true })
			})
			
			// Add keyboard handler separately
			document.addEventListener('keydown', handleKeyDown, { passive: false, capture: true })
			
			// Return cleanup function
			return () => {
				// Cleanup highlights when component unmounts
				document.querySelectorAll('.tour-highlight').forEach(el => {
					el.classList.remove('tour-highlight')
				})
				
				// Re-enable scrolling and interactions
				document.body.style.overflow = ''
				document.body.style.pointerEvents = ''
				
				// Remove all event listeners using the same function references
				events.forEach(event => {
					document.removeEventListener(event, preventInteraction, { capture: true } as any)
				})
				
				document.removeEventListener('keydown', handleKeyDown, { capture: true } as any)
			}
		}
	}, [isTourOpen, currentStep, highlightElement, updateTooltipPosition, scrollToTarget, currentStepData.target])

	// Throttle function to limit scroll updates
	function throttle(func: Function, limit: number) {
		let inThrottle: boolean
		return function(this: any, ...args: any[]) {
			if (!inThrottle) {
				func.apply(this, args)
				inThrottle = true
				setTimeout(() => inThrottle = false, limit)
			}
		}
	}

	// Window resize handler to recalculate position
	useEffect(() => {
		if (!isTourOpen) return

		const handleResize = () => {
			updateTooltipPosition()
		}

		const handleOrientationChange = () => {
			// Handle orientation change on mobile devices
			setTimeout(() => {
				updateTooltipPosition()
				if (currentStepData.target) {
					scrollToTarget(currentStepData.target)
				}
			}, 100)
		}

		window.addEventListener('resize', handleResize)
		window.addEventListener('orientationchange', handleOrientationChange)
		
		return () => {
			window.removeEventListener('resize', handleResize)
			window.removeEventListener('orientationchange', handleOrientationChange)
		}
	}, [isTourOpen, currentStepData.target, scrollToTarget, updateTooltipPosition])

	// Keyboard navigation
	useEffect(() => {
		if (!isTourOpen) return

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
				case 'ArrowDown':
					e.preventDefault()
					if (currentStep < tourSteps.length - 1) {
						nextStep()
					}
					break
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault()
					if (currentStep > 0) {
						prevStep()
					}
					break
				case 'Escape':
					e.preventDefault()
					handleCloseTour()
					break
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isTourOpen, currentStep, nextStep, prevStep, handleCloseTour])

	const getStepIcon = () => {
		switch (currentStepData.type) {
			case 'intro':
				return <Rocket className="h-5 w-5 text-blue-400" />
			case 'experience':
				return <Briefcase className="h-5 w-5 text-blue-400" />
			case 'projects':
				return <Play className="h-5 w-5 text-blue-400" />
			case 'education':
				return <GraduationCap className="h-5 w-5 text-blue-400" />
			case 'certification':
				return <Award className="h-5 w-5 text-blue-400" />
			case 'cta':
				return <Calendar className="h-5 w-5 text-blue-400" />
			default:
				return <Calendar className="h-5 w-5 text-blue-400" />
		}
	}

	if (!isTourOpen) return null

	return (
		<>
			{/* Toast-style tooltip in top right */}
			<AnimatePresence mode="wait">
				{!isTransitioning && (
					<motion.div
						key={currentStep}
						initial={{ opacity: 0, scale: 0.98, y: 12 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.98, y: 12 }}
						transition={{ duration: 0.32, ease: "easeInOut" }}
						className="fixed top-8 right-8 z-[101] tour-tooltip-container"
						style={{
							...tooltipPosition,
							pointerEvents: 'auto',
							position: 'fixed',
							top: tooltipPosition.top || '32px',
							right: tooltipPosition.right || '32px',
							left: undefined,
							transform: undefined,
						}}
					>
						<Card className="bg-slate-900 border border-slate-700 w-full max-w-[380px] h-auto flex flex-col rounded-2xl p-0">
							<CardContent className="p-6 flex flex-col h-full">
								{/* Header */}
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-2 min-w-0">
										{getStepIcon()}
										<h3 className="text-base font-bold text-white truncate">
											{currentStepData.title}
										</h3>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={handleCloseTour}
										className="text-slate-400 hover:text-white hover:bg-slate-800 h-7 w-7 p-0"
									>
										<X className="h-4 w-4" />
									</Button>
								</div>

								{/* Content */}
								<div className="flex-1 flex flex-col justify-center mb-6">
									<p className="text-slate-200 text-sm leading-relaxed">
										{currentStepData.content}
									</p>
								</div>

								{/* Navigation */}
								<div className="flex justify-between items-center gap-2 mt-auto">
									<Button
										variant="outline"
										onClick={prevStep}
										disabled={currentStep === 0 || isTransitioning}
										className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-50 text-xs h-8 px-4 rounded-lg"
									>
										<ChevronLeft className="h-3 w-3 mr-1" />
										Previous
									</Button>
									<div className="flex gap-2">
										{currentStep === tourSteps.length - 1 ? (
											<Button
												onClick={handleCloseTour}
												className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-8 px-4 rounded-lg shadow-none"
											>
												Finish Tour
											</Button>
										) : (
											<Button
												onClick={nextStep}
												disabled={isTransitioning}
												className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-8 px-4 rounded-lg shadow-none"
											>
												Next
												<ChevronRight className="h-3 w-3 ml-1" />
											</Button>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
