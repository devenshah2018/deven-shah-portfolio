"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, ChevronRight, ChevronLeft, Play, Calendar, ExternalLink, GraduationCap, Briefcase, Award } from "lucide-react"
import { useTour } from "@/components/tour-context"

// Tour step definitions
const tourSteps = [
  {
    id: "intro",
    title: "🚀 Welcome",
    content: "Hi! I'm Deven Shah. Let me walk you through how I evolved from a curious intern into a co-founder leading AI innovation. Each section reflects a chapter in that growth. Let's begin!",
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
    type: "section"
  },
  {
    id: "experience-current",
    title: "Current Role - Co-Founder/CTO",
    content: "This is the culmination of everything I've learned from leading global teams, building AI agents with LangGraph, to working with $50M+ brands. It's where I bring vision to life.",
    target: "#experience .space-y-8 > div:first-child",
    position: "right",
    showProgress: true,
    type: "experience"
  },
  {
    id: "experience-patelco",
    title: "Full-Stack Development at Patelco",
    content: "This role sharpened my ability to deliver real-world impact, from winning a hackathon to automating fraud detection. It was my proving ground in high-stakes environments.",
    target: "#experience .space-y-8 > div:nth-child(2)",
    position: "left",
    showProgress: true,
    type: "experience"
  },
  {
    id: "experience-netapp",
    title: "Starting as an Intern at NetApp",
    content: "Every journey starts somewhere. Mine began at NetApp. It taught me how scalable systems work and sparked my obsession with automation and optimization.",
    target: "#experience .space-y-8 > div:nth-child(3)",
    position: "right",
    showProgress: true,
    type: "experience"
  },
  {
    id: "projects-section",
    title: "Featured Projects",
    content: "These projects represent my evolution. Applying what I've learned to build tools that push boundaries in AI, quantum computing, and security compliance.",
    target: "#projects",
    position: "bottom",
    showProgress: true,
    type: "section"
  },
  {
    id: "project-qode",
    title: "Qode - Quantum IDE",
    content: "This project reflects my curiosity-driven growth. Venturing into quantum computing and creating tools that make it more accessible and intuitive for others.",
    target: "#projects .grid > div:first-child",
    position: "bottom",
    showProgress: true,
    type: "project"
  },
  {
    id: "project-ares",
    title: "Ares - Code Compliance Tool",
    content: "Born from my passion for scalable systems, Ares solves real-world compliance challenges. It's a step toward empowering developers with AI-driven guardrails.",
    target: "#projects .grid > div:nth-child(2)",
    position: "bottom",
    showProgress: true,
    type: "project"
  },
  {
    id: "project-crypto",
    title: "Cryptocurrency Forecasting",
    content: "This was the turning point where I applied machine learning to practical challenges. It laid the foundation for my interest in predictive systems and data science.",
    target: "#projects .grid > div:nth-child(3)",
    position: "bottom",
    showProgress: true,
    type: "project"
  },
  {
    id: "education-section",
    title: "Education & Certifications",
    content: "My academic path gave me the fundamentals to build on, from SJSU to Boston University, each step shaped how I approach technical challenges and leadership.",
    target: "#education",
    position: "bottom",
    showProgress: true,
    type: "section"
  },
  {
    id: "contact-cta",
    title: "🎯 Ready to Connect?",
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

  const scrollToTarget = useCallback((target: string) => {
    const element = document.querySelector(target)
    if (element) {
      const rect = element.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementTop = rect.top + window.scrollY
      const elementHeight = rect.height
      
      // Calculate optimal scroll position to keep both element and tooltip visible
      const tooltipPadding = 350 // Space needed for tooltip
      const safePadding = 50 // Additional safety margin
      
      let scrollTop
      
      if (window.innerWidth < 768) {
        // Mobile: scroll to show element in upper portion of screen
        scrollTop = elementTop - (viewportHeight * 0.25)
      } else {
        // Desktop: center element but leave room for tooltip
        scrollTop = elementTop - (viewportHeight / 2) + (elementHeight / 2)
        
        // Adjust if we need more room for tooltip
        const spaceAbove = rect.top
        const spaceBelow = viewportHeight - rect.bottom
        
        if (spaceBelow < tooltipPadding && spaceAbove > tooltipPadding) {
          // Not enough space below, move element down to make room above
          scrollTop = elementTop - tooltipPadding - safePadding
        } else if (spaceAbove < tooltipPadding && spaceBelow > tooltipPadding) {
          // Not enough space above, move element up to make room below
          scrollTop = elementTop - (viewportHeight - tooltipPadding - elementHeight - safePadding)
        }
      }
      
      window.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      })
    }
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      const nextStepData = tourSteps[currentStep + 1]
      
      // If there's a target, scroll to it first, then show the tooltip
      if (nextStepData.target) {
        setIsTransitioning(true)
        scrollToTarget(nextStepData.target)
        
        // Wait for scroll to complete, then show the next step
        setTimeout(() => {
          setCurrentStep(currentStep + 1)
          setIsTransitioning(false)
        }, 500) // Longer delay to ensure scroll completes
      } else {
        // No target, just move to next step
        setCurrentStep(currentStep + 1)
      }
    }
  }, [currentStep, scrollToTarget])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepData = tourSteps[currentStep - 1]
      
      // If there's a target, scroll to it first, then show the tooltip
      if (prevStepData.target) {
        setIsTransitioning(true)
        scrollToTarget(prevStepData.target)
        
        // Wait for scroll to complete, then show the previous step
        setTimeout(() => {
          setCurrentStep(currentStep - 1)
          setIsTransitioning(false)
        }, 500) // Longer delay to ensure scroll completes
      } else {
        // No target, just move to previous step
        setCurrentStep(currentStep - 1)
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
    
    if (currentStepData.target) {
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
      case 'experience':
        return <Briefcase className="h-5 w-5 text-blue-400" />
      case 'project':
        return <Play className="h-5 w-5 text-emerald-400" />
      case 'education':
        return <GraduationCap className="h-5 w-5 text-indigo-400" />
      case 'certification':
        return <Award className="h-5 w-5 text-orange-400" />
      case 'cta':
        return <ExternalLink className="h-5 w-5 text-cyan-400" />
      default:
        return <Calendar className="h-5 w-5 text-slate-400" />
    }
  }

  if (!isTourOpen) return null

  return (
    <>
      {/* Backdrop - blocks all interactions */}
      <div 
        className="fixed inset-0 z-[100] bg-black/30"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onTouchStart={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      />
       
      {/* Toast-style tooltip in top right */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            className="fixed z-[101] tour-tooltip-container"
            style={{
              ...tooltipPosition,
              pointerEvents: 'auto'
            }}
          >
            <Card className="bg-slate-900/95 border-slate-700 shadow-2xl backdrop-blur-xl tour-tooltip w-full h-[280px] flex flex-col">
              <CardContent className="p-4 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    {getStepIcon()}
                    <h3 className="text-sm font-bold text-white tour-tooltip-title truncate">
                      {currentStepData.title}
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseTour}
                    className="text-slate-400 hover:text-white hover:bg-slate-800 flex-shrink-0 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3 flex-shrink-0">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{currentStep + 1} of {tourSteps.length}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                {/* Content - flexible height */}
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-slate-300 leading-relaxed text-xs tour-tooltip-content mb-3">
                    {currentStepData.content}
                  </p>

                  {/* Keyboard navigation hint */}
                  <div className="text-xs text-slate-500 mb-3 font-mono flex-shrink-0">
                    💡 Use arrow keys • ESC to close
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0 || isTransitioning}
                    className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50 text-xs h-8 px-3"
                  >
                    <ChevronLeft className="h-3 w-3 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {currentStep === tourSteps.length - 1 ? (
                      <Button
                        onClick={handleCloseTour}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-xs h-8 px-3"
                      >
                        Finish Tour
                      </Button>
                    ) : (
                      <Button
                        onClick={nextStep}
                        disabled={isTransitioning}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-xs h-8 px-3"
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
