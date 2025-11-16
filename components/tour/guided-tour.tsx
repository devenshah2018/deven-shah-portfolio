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
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width?: string;
    transform?: string;
  }>({});

  const currentStepData = tourSteps[currentStep];

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
        scrollTop = elementTop - viewportHeight * 0.15;
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
  }, [closeTour]);

  const updateTooltipPosition = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

    if (isMobile) {
      // Mobile: Fixed bottom, full width with padding
      setTooltipPosition({
        bottom: '16px',
        left: '16px',
        right: '16px',
        width: 'auto',
      });
    } else if (isTablet) {
      // Tablet: Top right with max width
      setTooltipPosition({
        top: '24px',
        right: '24px',
        width: '380px',
      });
    } else {
      // Desktop: Top right with fixed width
      setTooltipPosition({
        top: '32px',
        right: '32px',
        width: '420px',
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
    const iconClass = 'h-4 w-4 text-blue-400';
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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-[100] bg-slate-950/40'
      />

      {/* Tour Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        className='tour-tooltip-container fixed z-[101]'
        style={{
          ...tooltipPosition,
          pointerEvents: 'auto',
        }}
      >
        <Card className='relative overflow-hidden border border-slate-800/60 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl shadow-2xl sm:rounded-xl'>
          {/* Subtle gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none' />

          <CardContent className='relative p-4 sm:p-6'>
            {/* Progress Bar */}
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex-1 overflow-hidden rounded-full bg-slate-800/60 h-1.5 mr-3'>
                <motion.div
                  className='h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'
                  initial={false}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className='text-xs font-medium text-slate-400 tabular-nums'>
                {currentStep + 1}/{tourSteps.length}
              </span>
            </div>

            {/* Header */}
            <div className='mb-4 flex items-start justify-between gap-3'>
              <div className='flex items-start gap-3 flex-1 min-w-0'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20'
                >
                  {getStepIcon()}
                </motion.div>
                <div className='flex-1 min-w-0'>
                  <AnimatePresence mode='wait'>
                    <motion.h3
                      key={currentStep}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className='text-base font-semibold text-white leading-tight mb-0.5'
                    >
                      {currentStepData ? currentStepData.title : ''}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleCloseTour}
                className='h-7 w-7 shrink-0 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-white transition-colors'
                aria-label='Close tour'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>

            {/* Content */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className='mb-5'
              >
                <p className='text-sm leading-relaxed text-slate-300'>
                  {displayedText}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className='flex items-center justify-between gap-2 pt-4 border-t border-slate-800/60'>
              <Button
                variant='outline'
                onClick={prevStep}
                disabled={currentStep === 0 || isTransitioning || isTyping}
                className='h-9 rounded-lg border-slate-700/60 bg-transparent px-3 text-sm text-slate-300 hover:border-slate-600 hover:bg-slate-800/40 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all'
              >
                <ChevronLeft className='mr-1.5 h-4 w-4' />
                Previous
              </Button>

              {currentStep === tourSteps.length - 1 ? (
                <Button
                  onClick={handleCloseTour}
                  disabled={isTyping}
                  className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 disabled:opacity-60 transition-all'
                >
                  Complete
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={isTransitioning || isTyping}
                  className='h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 disabled:opacity-60 transition-all'
                >
                  Next
                  <ChevronRight className='ml-1.5 h-4 w-4' />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
