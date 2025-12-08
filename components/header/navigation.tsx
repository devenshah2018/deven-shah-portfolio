'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Route, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LINKS } from '@/lib/content-registry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { getResearchSiteUrl } from '@/lib/url-utils';

interface NavigationProps {
  onStartTour?: () => void;
}

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Connect', href: '#contact' },
];

export function Navigation({ onStartTour }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showName, setShowName] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [timeZoneAbbr, setTimeZoneAbbr] = useState('');
  const [timeZoneFull, setTimeZoneFull] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date();
      const abbr =
        now
          .toLocaleTimeString('en-US', {
            timeZoneName: 'short',
            timeZone: tz,
          })
          .split(' ')
          .pop() || tz;
      const time = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: tz,
      });
      setCurrentTime(time);
      setTimeZoneAbbr(abbr);
      setTimeZoneFull(tz);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const hero = document.getElementById('hero');
          if (hero) {
            const rect = hero.getBoundingClientRect();
            const isHeroInView = rect.bottom > 100; // Add buffer for smoother transition
            const shouldShowName = !isHeroInView && window.scrollY > 400;
            setShowName(shouldShowName);
          } else {
            setShowName(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? 'border-b border-slate-800/50 bg-slate-950/90 shadow-2xl backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='group relative'
          >
            <div className='flex min-w-[260px] flex-col'>
              <AnimatePresence mode='wait'>
                {showName ? (
                  <motion.div
                    key='deven-shah'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className='group relative'
                  >
                    <span
                      className='block cursor-pointer bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent'
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Deven Shah
                    </span>

                    <div className='pointer-events-none absolute left-0 top-full z-50 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:opacity-100'>
                      <div className='absolute -top-2 left-0 h-2 w-full bg-transparent'></div>

                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className='relative mt-2'
                      >
                        <div className='rounded-lg border border-slate-700/40 bg-slate-950/90 p-2 shadow-xl backdrop-blur-lg'>
                          <div className='flex items-center gap-2'>
                            <a
                              href={LINKS.github}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-700/50 hover:text-slate-200'
                              aria-label='GitHub Profile'
                            >
                              <svg className='h-3.5 w-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                              </svg>
                            </a>

                            <a
                              href={LINKS.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-blue-600/15 hover:text-blue-400'
                              aria-label='LinkedIn Profile'
                            >
                              <svg className='h-3.5 w-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                              </svg>
                            </a>

                            <a
                              href={`mailto:${LINKS.email}`}
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-green-600/15 hover:text-green-400'
                              aria-label='Email Contact'
                            >
                              <svg
                                className='h-3.5 w-3.5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                                />
                              </svg>
                            </a>

                            <a
                              href={LINKS.x}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-600/20 hover:text-slate-200'
                              aria-label='X (Twitter) Profile'
                            >
                              <svg className='h-3 w-3' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                              </svg>
                            </a>
                            <a
                              href={LINKS.kaggle}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='group/item flex h-7 w-7 items-center justify-center rounded bg-slate-800/30 text-slate-500 transition-all duration-150 hover:scale-105 hover:bg-slate-600/20 hover:text-slate-200'
                              aria-label='Kaggle Profile'
                            >
                              <FontAwesomeIcon icon={faKaggle} className='h-3 w-3' />
                            </a>
                          </div>
                        </div>

                        <div className='absolute -top-1 left-4 h-2 w-2 rotate-45 transform border-l border-t border-slate-700/40 bg-slate-950/90'></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.span
                    key='clock'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className='block'
                  >
                    <span
                      className='inline-flex select-none items-center rounded-lg bg-slate-900/80 px-3 py-1 font-mono text-lg font-semibold tracking-widest text-slate-100'
                      title={timeZoneFull}
                    >
                      <svg
                        className='mr-2 h-5 w-5 text-blue-400'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                      >
                        <circle
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                        />
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' />
                      </svg>
                      <span className='tabular-nums'>{currentTime}</span>
                      <span className='ml-2 text-xs font-bold uppercase tracking-wider text-blue-300'>
                        {timeZoneAbbr}
                      </span>
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <div className='hidden items-center space-x-2 md:flex'>
            {/* Research Portal Entry - Icon Only */}
            <motion.a
              href={getResearchSiteUrl()}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className='mr-4 group relative rounded-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 p-2.5 text-cyan-300 shadow-lg transition-all duration-300 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-cyan-600/30 hover:text-cyan-200 hover:shadow-cyan-500/30'
              title='Research Portal'
              aria-label='Open Research Portal'
            >
              <FlaskConical className='h-4 w-4 transition-transform duration-300 group-hover:rotate-12' />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Button
                onClick={onStartTour}
                variant='outline'
                className='rounded-full border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 px-4 py-2 font-mono text-sm font-semibold tracking-wide text-blue-300 shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-indigo-500/30 hover:text-white'
              >
                <Route className='mr-2 h-4 w-4' />
                Take Tour
              </Button>
            </motion.div>

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
                    item.name === 'Connect'
                      ? 'rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl'
                      : 'rounded-full px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-slate-300 transition-all duration-300 hover:bg-slate-800/50 hover:text-white'
                  }
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className='md:hidden'>
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 transition-all duration-200 hover:bg-slate-800/90 focus:outline-none ${mobileNavOpen ? 'scale-105' : ''}`}
                  aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  style={{ border: 'none', outline: 'none' }}
                >
                  <span className='relative flex h-full w-full items-center justify-center'>
                    <AnimatePresence mode='wait'>
                      <motion.span
                        key={mobileNavOpen ? 'close' : 'open'}
                        initial={{
                          rotate: mobileNavOpen ? -90 : 90,
                          opacity: 0,
                        }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: mobileNavOpen ? 90 : -90, opacity: 0 }}
                        transition={{ duration: 0.18, ease: 'easeInOut' }}
                        className='absolute inset-0 flex items-center justify-center'
                      >
                        {mobileNavOpen ? (
                          <svg
                            width='36'
                            height='36'
                            viewBox='0 0 36 36'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            focusable='false'
                            className='h-9 w-9 text-blue-400 drop-shadow-xl transition-colors duration-200'
                            role='img'
                            aria-label='Close navigation menu'
                          >
                            <circle
                              cx='18'
                              cy='18'
                              r='16'
                              fill='url(#x-bg-gradient)'
                              fillOpacity='0.92'
                            />
                            <rect
                              x='11'
                              y='17'
                              width='14'
                              height='2.5'
                              rx='1.25'
                              fill='url(#x-bar1)'
                              transform='rotate(45 18 18)'
                            />
                            <rect
                              x='11'
                              y='17'
                              width='14'
                              height='2.5'
                              rx='1.25'
                              fill='url(#x-bar2)'
                              transform='rotate(-45 18 18)'
                            />
                            <defs>
                              <radialGradient
                                id='x-bg-gradient'
                                cx='0'
                                cy='0'
                                r='1'
                                gradientTransform='translate(18 18) scale(16)'
                                gradientUnits='userSpaceOnUse'
                              >
                                <stop stopColor='#1e293b' />
                                <stop offset='1' stopColor='#334155' />
                              </radialGradient>
                              <linearGradient
                                id='x-bar1'
                                x1='11'
                                y1='18.25'
                                x2='25'
                                y2='18.25'
                                gradientUnits='userSpaceOnUse'
                              >
                                <stop stopColor='#60a5fa' />
                                <stop offset='1' stopColor='#818cf8' />
                              </linearGradient>
                              <linearGradient
                                id='x-bar2'
                                x1='11'
                                y1='18.25'
                                x2='25'
                                y2='18.25'
                                gradientUnits='userSpaceOnUse'
                              >
                                <stop stopColor='#818cf8' />
                                <stop offset='1' stopColor='#60a5fa' />
                              </linearGradient>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            width='28'
                            height='28'
                            viewBox='0 0 28 28'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            focusable='false'
                            className='h-7 w-7 rotate-90 transform text-slate-200 transition-transform duration-200'
                            role='img'
                            aria-label='Open navigation menu'
                          >
                            <polyline
                              points='8,12 14,18 20,12'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                className={`translate-y-0 overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-950/90 shadow-2xl backdrop-blur-2xl transition-all duration-500 ${mobileNavOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `}
                style={{
                  WebkitBackdropFilter: 'blur(30px)',
                  backdropFilter: 'blur(30px)',
                }}
              >
                <div className='px-6 py-4'>
                  {/* Mobile Research Portal Entry */}
                  <motion.a
                    href={getResearchSiteUrl()}
                    target='_blank'
                    rel='noopener noreferrer'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setMobileNavOpen(false)}
                    className='group flex items-center justify-center rounded-full border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 p-3 mb-4 text-cyan-300 shadow-lg transition-all duration-300 hover:border-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-cyan-600/30 hover:text-cyan-200 hover:shadow-cyan-500/30'
                    title='Research Portal'
                    aria-label='Open Research Portal'
                  >
                    <FlaskConical className='h-5 w-5 transition-transform duration-300 group-hover:rotate-12' />
                  </motion.a>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className='mb-4 border-b border-slate-700/50 py-2'
                  >
                    <Button
                      onClick={() => {
                        setMobileNavOpen(false);
                        onStartTour?.();
                      }}
                      variant='outline'
                      className='w-full border-blue-400/50 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 font-mono text-lg font-semibold text-blue-300 shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-indigo-500/30 hover:text-white hover:shadow-blue-500/25'
                    >
                      <Route className='mr-2 h-5 w-5' />
                      Take Tour
                    </Button>
                  </motion.div>

                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className='py-2'
                    >
                      <Link
                        href={item.href}
                        className={
                          item.name === 'Connect'
                            ? 'block rounded-full border-2 border-blue-400/60 bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600'
                            : 'block rounded-lg px-4 py-3 text-lg font-semibold text-slate-200 transition-all duration-300 hover:text-white'
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
  );
}
