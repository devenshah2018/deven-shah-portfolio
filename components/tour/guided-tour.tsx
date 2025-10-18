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
import { useTour } from '@/components/tour/tour-context';

const tourSteps = [
  {
    id: 'intro',
    title: 'Welcome',
    content:
      "Resumes are too constrained. LinkedIn is too curated. GitHub is too technical. That's why I built this portfolio—to share my complete story without limitations.",
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
    title: 'Education & Research',
    content:
      'My academic path gave me the fundamentals to build on, from SJSU to Boston University, each step shaped how I approach technical challenges and leadership through research and contribution.',
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
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: string;
    left?: string;
    right?: string;
    width?: string;
    transform?: string;
  }>({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });

  const currentStepData = tourSteps[currentStep];

  // Typing effect hook (removed, now just set text immediately)
  useEffect(() => {
    if (!currentStepData?.content) return;
    setDisplayedText(currentStepData.content);
    setIsTyping(false);
  }, [currentStep, currentStepData?.content]);

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
    if (currentStep < tourSteps.length - 1 && !isTyping) {
      const nextStepData = tourSteps[currentStep + 1];
      setIsTransitioning(true);
      if (nextStepData && nextStepData.target) {
        scrollToTarget(nextStepData.target);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsTransitioning(false);
        }, 200);
      } else {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }
    }
  }, [currentStep, scrollToTarget, isTyping]);

  const prevStep = useCallback(() => {
    if (currentStep > 0 && !isTyping) {
      const prevStepData = tourSteps[currentStep - 1];
      setIsTransitioning(true);
      if (prevStepData && prevStepData.target) {
        scrollToTarget(prevStepData.target);
        setTimeout(() => {
          setCurrentStep(currentStep - 1);
          setIsTransitioning(false);
        }, 200);
      } else {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }
    }
  }, [currentStep, scrollToTarget, isTyping]);

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
    const margin = 12; // Reduced margin for better mobile usage

    if (viewportWidth < 768) {
      // Mobile: much smaller width and optimized positioning
      const mobileWidth = Math.min(280, viewportWidth - 24); // Smaller modal on mobile
      setTooltipPosition({
        top: `${margin}px`,
        left: '50%',
        width: `${mobileWidth}px`,
        transform: 'translateX(-50%)',
      });
    } else if (viewportWidth < 1024) {
      // Tablet: medium sizing
      const tabletWidth = Math.min(340, viewportWidth - 40);
      setTooltipPosition({
        top: `${margin * 1.2}px`,
        right: `${margin * 1.2}px`,
        width: `${tabletWidth}px`,
      });
    } else {
      // Desktop: keep current positioning
      const tooltipWidth = 400;
      setTooltipPosition({
        top: `${margin * 1.5}px`,
        right: `${margin * 1.5}px`,
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
    const iconClass = 'h-4 w-4 text-blue-400 md:h-5 md:w-5';
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
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
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
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className='relative flex h-[240px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-0 backdrop-blur-xl md:h-[300px]'>
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' />

            <CardContent className='relative flex h-full flex-col p-4 md:p-7'>
              <div className='mb-3 flex h-1 w-full overflow-hidden rounded-full bg-slate-800 md:mb-5'>
                <motion.div
                  className='h-full bg-gradient-to-r from-blue-500 to-blue-400'
                  initial={false}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className='flex flex-1 flex-col'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 4, filter: 'blur(1px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -2, filter: 'blur(1px)' }}
                    transition={{
                      duration: 0.15,
                      ease: [0.16, 1, 0.3, 1],
                      filter: { duration: 0.1 },
                    }}
                    className='flex flex-1 flex-col'
                  >
                    {/* Header */}
                    <div className='mb-3 flex items-start justify-between md:mb-5'>
                      <div className='flex min-w-0 items-center gap-2 md:gap-3'>
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15, delay: 0.05 }}
                          className='flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20 md:h-9 md:w-9'
                        >
                          {getStepIcon()}
                        </motion.div>
                        <div className='flex min-w-0 flex-col'>
                          <h3 className='truncate text-base font-semibold tracking-tight text-white md:text-lg'>
                            {currentStepData ? currentStepData.title : ''}
                          </h3>
                          <span className='text-xs font-medium text-slate-400'>
                            Step {currentStep + 1} of {tourSteps.length}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={handleCloseTour}
                        className='h-7 w-7 rounded-lg p-0 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white md:h-8 md:w-8'
                      >
                        <X className='h-3 w-3 md:h-4 md:w-4' />
                      </Button>
                    </div>

                    <div className='mb-4 flex flex-1 flex-col justify-start overflow-hidden md:mb-7'>
                      <div className='scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 overflow-y-auto'>
                        <p className='pr-2 text-xs leading-relaxed text-slate-300 md:text-sm'>
                          {displayedText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className='mt-auto flex items-center justify-between gap-2 md:gap-3'>
                  <Button
                    variant='outline'
                    onClick={prevStep}
                    disabled={currentStep === 0 || isTransitioning || isTyping}
                    className='h-8 rounded-lg border-slate-700/60 bg-transparent px-3 text-xs text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 md:h-9 md:px-4 md:text-sm'
                  >
                    <ChevronLeft className='mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5' />
                    Previous
                  </Button>

                  <div className='flex gap-2'>
                    {currentStep === tourSteps.length - 1 ? (
                      <Button
                        onClick={handleCloseTour}
                        disabled={isTyping}
                        className='h-8 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-xs font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 disabled:opacity-60 md:h-9 md:px-5 md:text-sm'
                      >
                        Complete Tour
                      </Button>
                    ) : (
                      <Button
                        onClick={nextStep}
                        disabled={isTransitioning || isTyping}
                        className='h-8 rounded-lg bg-blue-500 px-4 text-xs font-medium text-white transition-all hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 md:h-9 md:px-5 md:text-sm'
                      >
                        Continue
                        <ChevronRight className='ml-1 h-3 w-3 md:ml-1.5 md:h-3.5 md:w-3.5' />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}
