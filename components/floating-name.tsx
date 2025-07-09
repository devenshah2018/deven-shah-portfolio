"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function FloatingName() {
  const [isVisible, setIsVisible] = useState(false)
  const [heroNameElement, setHeroNameElement] = useState<HTMLElement | null>(null)
  const [navElement, setNavElement] = useState<HTMLElement | null>(null)
  const [startPosition, setStartPosition] = useState({ top: 0, left: 0 })
  const [endPosition, setEndPosition] = useState({ top: 0, left: 0 })
  
  const { scrollY } = useScroll()

  useEffect(() => {
    // Get elements once they're mounted
    const heroName = document.getElementById("hero-name")
    const nav = document.querySelector("nav")
    
    setHeroNameElement(heroName)
    setNavElement(nav)
  }, [])

  useEffect(() => {
    if (!heroNameElement || !navElement) return

    const updatePositions = () => {
      const heroRect = heroNameElement.getBoundingClientRect()
      const navRect = navElement.getBoundingClientRect()
      
      setStartPosition({
        top: heroRect.top + window.scrollY,
        left: heroRect.left
      })
      
      // Position where the name should end up (left side of navigation)
      setEndPosition({
        top: navRect.top + window.scrollY + (navRect.height / 2) - 20, // Center vertically in nav
        left: navRect.left + 40 // Left padding inside nav
      })
    }

    const handleScroll = () => {
      if (!heroNameElement || !navElement) return
      
      const heroRect = heroNameElement.getBoundingClientRect()
      const scrollProgress = window.scrollY
      
      // Start animation when hero name starts going out of view
      const shouldShow = scrollProgress > 200 && heroRect.bottom < window.innerHeight * 0.8
      
      // Hide when we've scrolled too far or when navigation shows the name
      const heroElement = document.getElementById("hero")
      const heroIsInView = heroElement && heroElement.getBoundingClientRect().bottom > 0 && heroElement.getBoundingClientRect().top < window.innerHeight
      const shouldHide = !heroIsInView || scrollProgress > 1000
      
      setIsVisible(shouldShow && !shouldHide)
    }

    updatePositions()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updatePositions)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updatePositions)
    }
  }, [heroNameElement, navElement])

  // Calculate smooth animation values based on scroll position
  const animationProgress = useTransform(
    scrollY,
    [200, 600], // Start at 200px scroll, complete by 600px
    [0, 1],
    { clamp: true }
  )

  const y = useTransform(
    animationProgress,
    [0, 1],
    [0, endPosition.top - startPosition.top]
  )
  
  const x = useTransform(
    animationProgress,
    [0, 1],
    [0, endPosition.left - startPosition.left]
  )
  
  const scale = useTransform(
    animationProgress,
    [0, 1],
    [1, 0.35] // Scale down to match navigation text size
  )
  
  const opacity = useTransform(
    animationProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  if (!isVisible || !heroNameElement || !navElement) {
    return null
  }

  return (
    <motion.div
      className="fixed z-40 pointer-events-none"
      style={{
        top: startPosition.top,
        left: startPosition.left,
        y,
        x,
        scale,
        opacity,
        transformOrigin: "left center"
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.h1 
        className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight whitespace-nowrap"
        style={{
          fontSize: "inherit" // This will scale with the parent
        }}
      >
        Deven Shah
      </motion.h1>
    </motion.div>
  )
}
