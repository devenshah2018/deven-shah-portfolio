'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
} from 'lucide-react';
import { useTour } from '@/components/tour-context';

const tourSteps = [
  {
    id: 'intro',
    title: 'Welcome',
    content:
      "Hi! I'm Deven Shah. Let me walk you through how I evolved from an intern into a co-founder leading AI innovation. Each section reflects a chapter in that growth. Let's begin!",
    target: null,
    position: 'center',
    showProgress: true,
    type: 'intro',
  },
  {
    id: 'experience-section',
    title: 'Professional Experience',
    content:
      "Here's where my transformation began: from learning the ropes as an intern to driving innovation as a technical leader. This section captures the foundation of my journey.",
    target: '#experience',
    position: 'bottom',
    showProgress: true,
    type: 'experience',
  },
  {
    id: 'experience-netapp',
    title: 'Starting as an Intern at NetApp',
    content:
      'Every journey starts somewhere. Mine began at NetApp. It taught me how scalable systems work and sparked my curiosity with automation and optimization.',
    target: '[data-item-id="netapp"]',
    position: 'right',
    showProgress: true,
    type: 'experience',
  },
  {
    id: 'experience-patelco',
    title: 'Full-Stack Development at Patelco',
    content:
      'This role sharpened my ability to deliver real-world impact, from winning a hackathon to automating fraud detection. It was my proving ground in high-stakes environments.',
    target: '[data-item-id="patelco"]',
    position: 'left',
    showProgress: true,
    type: 'experience',
  },
  {
    id: 'experience-current',
    title: 'Co-Founder/CTO at Suno Analytics',
    content:
      "This is the culmination of everything I've learned from leading global teams, building AI agents with LangGraph, to connecting with $50M+ brands. It's where I bring vision to life.",
    target: '[data-item-id="suno-analytics"]',
    position: 'right',
    showProgress: true,
    type: 'experience',
  },
  {
    id: 'projects-section',
    title: 'Featured Projects',
    content:
      "These projects represent my evolution. Applying what I've learned to build tools that push boundaries in AI, systems engineering, and quantum computing.",
    target: '#projects',
    position: 'bottom',
    showProgress: true,
    type: 'projects',
  },
  {
    id: 'education-section',
    title: 'Education & Certifications',
    content:
      'My academic path gave me the fundamentals to build on, from SJSU to Boston University, each step shaped how I approach technical challenges and leadership.',
    target: '#education',
    position: 'bottom',
    showProgress: true,
    type: 'education',
  },
  {
    id: 'contact-cta',
    title: 'Ready to Chat?',
    content:
      "Thanks for exploring my journey. If anything resonated, whether it's AI, security, or innovation. I'd love to connect, let's build something great together.",
    target: '#book-a-call-container',
    position: 'top',
    showProgress: true,
    type: 'cta',
  },
];

export function GuidedTour() {
  const { isTourOpen, closeTour } = useTour();
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: string;
    left?: string;
    right?: string;
    width?: string;
    transform?: string;
  }>({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

  const currentStepData = tourSteps[currentStep];

  const scrollToTarget = useCallback((target: string) => {
    const element = document.querySelector(target);
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      let scrollTop;

      if (elementHeight > viewportHeight * 0.6) {
        scrollTop = elementTop - 24;
      } else if (window.innerWidth < 768) {
        scrollTop = elementTop - viewportHeight * 0.18;
      } else {
        const tooltipPadding = 350;
        const safePadding = 50;
        const minTop = elementTop - tooltipPadding - safePadding;
        const maxTop = elementTop - viewportHeight / 2 + elementHeight / 2;
        scrollTop = Math.max(0, Math.min(minTop, maxTop));
      }
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      const nextStepData = tourSteps[currentStep + 1];
      setIsTransitioning(true);
      if (nextStepData && nextStepData.target) {
        scrollToTarget(nextStepData.target);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsTransitioning(false);
        }, 500);
      } else {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }
    }
  }, [currentStep, scrollToTarget]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepData = tourSteps[currentStep - 1];
      setIsTransitioning(true);
      if (prevStepData && prevStepData.target) {
        scrollToTarget(prevStepData.target);
        setTimeout(() => {
          setCurrentStep(currentStep - 1);
          setIsTransitioning(false);
        }, 500);
      } else {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }
    }
  }, [currentStep, scrollToTarget]);

  const handleCloseTour = useCallback(() => {
    setCurrentStep(0);

    document.body.style.overflow = '';
    document.body.style.pointerEvents = '';

    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    closeTour();
  }, [closeTour, currentStep]);

  const updateTooltipPosition = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const margin = 24;

    const tooltipWidth = 400;
    const mobileWidth = 340;

    if (viewportWidth < 768) {
      setTooltipPosition({
        top: `${margin}px`,
        right: `${margin}px`,
        width: `${Math.min(mobileWidth, viewportWidth - 48)}px`,
      });
    } else {
      setTooltipPosition({
        top: `${margin}px`,
        right: `${margin}px`,
        width: `${tooltipWidth}px`,
      });
    }
  }, []);

  const highlightElement = useCallback(() => {
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });

    if (
      currentStepData &&
      currentStepData.target &&
      currentStepData.target.startsWith('[data-item-id=')
    ) {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        element.classList.add('tour-highlight');
      }
    }

    if (
      currentStepData &&
      currentStepData.target &&
      currentStepData.target.startsWith('#projects .grid > div')
    ) {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        element.classList.add('tour-highlight');
      }
    }

    if (currentStepData && currentStepData.target === '#book-a-call-container') {
      const element = document.querySelector(currentStepData.target);
      if (element) {
        element.classList.add('tour-highlight');
      }
    }
  }, [currentStepData && currentStepData.target]);

  useEffect(() => {
    if (isTourOpen) {
      if (currentStep === 0) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        setTimeout(() => {
          highlightElement();
          updateTooltipPosition();
        }, 300);
      } else {
        highlightElement();
        updateTooltipPosition();
        if (currentStepData && currentStepData.target) {
          scrollToTarget(currentStepData.target);
        }
      }

      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';

      const preventInteraction = (e: Event) => {
        const target = e.target as HTMLElement;

        if (target.closest('.tour-tooltip-container') || target.closest('.tour-tooltip')) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Escape'].includes(e.code)) {
          preventInteraction(e);
        }
      };

      const events = [
        'wheel',
        'touchmove',
        'touchstart',
        'touchend',
        'touchcancel',
        'mousedown',
        'mouseup',
        'mousemove',
        'click',
        'dblclick',
        'contextmenu',
        'selectstart',
        'dragstart',
        'drop',
      ];

      events.forEach(event => {
        document.addEventListener(event, preventInteraction, {
          passive: false,
          capture: true,
        });
      });

      document.addEventListener('keydown', handleKeyDown, {
        passive: false,
        capture: true,
      });

      return () => {
        document.querySelectorAll('.tour-highlight').forEach(el => {
          el.classList.remove('tour-highlight');
        });

        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';

        events.forEach(event => {
          document.removeEventListener(event, preventInteraction, {
            capture: true,
          } as any);
        });

        document.removeEventListener('keydown', handleKeyDown, {
          capture: true,
        } as any);
      };
    }

    return () => {};
  }, [
    isTourOpen,
    currentStep,
    highlightElement,
    updateTooltipPosition,
    scrollToTarget,
    currentStepData && currentStepData.target,
  ]);

  useEffect(() => {
    if (!isTourOpen) return;

    const handleResize = () => {
      updateTooltipPosition();
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        updateTooltipPosition();
        if (currentStepData && currentStepData.target) {
          scrollToTarget(currentStepData.target);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [
    isTourOpen,
    currentStepData && currentStepData.target,
    scrollToTarget,
    updateTooltipPosition,
  ]);

  useEffect(() => {
    if (!isTourOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          if (currentStep < tourSteps.length - 1) {
            nextStep();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          if (currentStep > 0) {
            prevStep();
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleCloseTour();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isTourOpen, currentStep, nextStep, prevStep, handleCloseTour]);

  const getStepIcon = () => {
    const iconClass = 'h-5 w-5 text-blue-400';
    switch (currentStepData && currentStepData.type) {
      case 'intro':
        return <Rocket className={iconClass} />;
      case 'experience':
        return <Briefcase className={iconClass} />;
      case 'projects':
        return <Play className={iconClass} />;
      case 'education':
        return <GraduationCap className={iconClass} />;
      case 'certification':
        return <Award className={iconClass} />;
      case 'cta':
        return <Calendar className={iconClass} />;
      default:
        return <Calendar className={iconClass} />;
    }
  };

  if (!isTourOpen) return null;

  return (
    <>
      <AnimatePresence mode='wait'>
        {!isTransitioning && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: -8, filter: 'blur(2px)' }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3 },
              filter: { duration: 0.25 },
            }}
            className='tour-tooltip-container fixed right-8 top-8 z-[101]'
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
            <motion.div
              initial={{ boxShadow: '0 0 0 rgba(59, 130, 246, 0)' }}
              animate={{
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)',
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className='relative flex h-auto w-full max-w-[400px] flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-0 backdrop-blur-xl'>
                {/* Subtle gradient overlay */}
                <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' />

                <CardContent className='relative flex h-full flex-col p-7'>
                  {/* Progress indicator */}
                  <div className='mb-5 flex h-1 w-full overflow-hidden rounded-full bg-slate-800'>
                    <motion.div
                      className='h-full bg-gradient-to-r from-blue-500 to-blue-400'
                      initial={{ width: '0%' }}
                      animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Header */}
                  <div className='mb-5 flex items-start justify-between'>
                    <div className='flex min-w-0 items-center gap-3'>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20'
                      >
                        {getStepIcon()}
                      </motion.div>
                      <div className='flex min-w-0 flex-col'>
                        <motion.h3
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className='truncate text-lg font-semibold tracking-tight text-white'
                        >
                          {currentStepData ? currentStepData.title : ''}
                        </motion.h3>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.25 }}
                          className='text-xs font-medium text-slate-400'
                        >
                          Step {currentStep + 1} of {tourSteps.length}
                        </motion.span>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={handleCloseTour}
                      className='h-8 w-8 rounded-lg p-0 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>

                  {/* Content */}
                  <motion.div
                    className='mb-7 flex flex-1 flex-col justify-center'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <p className='text-sm leading-relaxed text-slate-300'>
                      {currentStepData ? currentStepData.content : ''}
                    </p>
                  </motion.div>

                  {/* Navigation */}
                  <motion.div
                    className='flex items-center justify-between gap-3'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      disabled={currentStep === 0 || isTransitioning}
                      className='h-9 rounded-lg border-slate-700/60 bg-transparent px-4 text-sm text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'
                    >
                      <ChevronLeft className='mr-1.5 h-3.5 w-3.5' />
                      Previous
                    </Button>

                    <div className='flex gap-2'>
                      {currentStep === tourSteps.length - 1 ? (
                        <Button
                          onClick={handleCloseTour}
                          className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40'
                        >
                          Complete Tour
                        </Button>
                      ) : (
                        <Button
                          onClick={nextStep}
                          disabled={isTransitioning}
                          className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 disabled:opacity-60'
                        >
                          Continue
                          <ChevronRight className='ml-1.5 h-3.5 w-3.5' />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
