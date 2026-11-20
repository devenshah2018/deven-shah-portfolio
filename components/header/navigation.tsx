'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '@/lib/url-utils';
import { HeaderClock, HeaderClockProvider } from './header-clock';
import { CONTACT_CARD_SHINE_EVENT } from '@/lib/events';

interface NavigationProps {}

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Research', href: '#research' },
  { name: 'Projects', href: '#projects' },
  { name: 'Connect', href: '#contact' },
];

export function Navigation({}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showName, setShowName] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pendingNavigation = useRef<(() => void) | null>(null);

  useEffect(() => {
    let ticking = false;
    let frame: number | undefined;

    const handleScroll = () => {
      if (!ticking) {
        frame = requestAnimationFrame(() => {
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <HeaderClockProvider>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-[#141414]/98 border-b border-[#404040]/30 shadow-2xl backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className='container mx-auto px-6 lg:px-8'>
          <div className='flex h-20 items-center justify-between'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='relative'
            >
              <div className='flex min-w-0 flex-col lg:min-w-[260px]'>
                <AnimatePresence mode='wait'>
                  {showName ? (
                    <motion.div
                      key='deven-shah'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className='relative'
                    >
                      <button
                        type='button'
                        aria-label='Back to top'
                        onClick={() => scrollToSection('hero', true)}
                        className='flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a5c9bd]'
                      >
                        <Image
                          src='/profile.jpg'
                          alt=''
                          width={48}
                          height={48}
                          className='h-10 w-10 flex-shrink-0 rounded-full object-cover object-top'
                        />
                        <span className='block whitespace-nowrap text-xl font-semibold text-[#f5f5f0] sm:text-2xl'>
                          Deven Shah
                        </span>
                      </button>
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
                      <HeaderClock />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <div className='hidden items-center space-x-2 lg:flex'>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className='cursor-pointer'
                >
                  {item.name === 'Connect' ? (
                    <button
                      type='button'
                      onClick={() => window.dispatchEvent(new Event(CONTACT_CARD_SHINE_EVENT))}
                      className='cursor-pointer rounded-md border border-[#404040]/50 bg-[#f5f5f0] px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-widest text-[#141414] transition-colors hover:bg-[#e8e8e3]'
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={e => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault();
                          const id = item.href.slice(1);
                          scrollToSection(id, true);
                        }
                      }}
                      className='cursor-pointer rounded-md px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-[#a3a3a3] transition-colors hover:border-[#525252] hover:text-[#f5f5f0]'
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
            <div className='lg:hidden'>
              <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className={`flex h-12 w-12 items-center justify-center rounded-md border border-[#404040]/40 bg-[#1a1a1a] transition-colors hover:bg-[#262626] focus:outline-none ${mobileNavOpen ? 'scale-105' : ''}`}
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
                              className='h-9 w-9 text-[#f5f5f0] drop-shadow-xl transition-colors duration-200'
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
                              className='h-7 w-7 text-[#a3a3a3] transition-colors duration-200'
                              role='img'
                              aria-label='Open navigation menu'
                            >
                              <line
                                x1='6'
                                y1='9'
                                x2='22'
                                y2='9'
                                stroke='currentColor'
                                strokeWidth='2.5'
                                strokeLinecap='round'
                              />
                              <line
                                x1='6'
                                y1='14'
                                x2='22'
                                y2='14'
                                stroke='currentColor'
                                strokeWidth='2.5'
                                strokeLinecap='round'
                              />
                              <line
                                x1='6'
                                y1='19'
                                x2='22'
                                y2='19'
                                stroke='currentColor'
                                strokeWidth='2.5'
                                strokeLinecap='round'
                              />
                            </svg>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  onCloseAutoFocus={event => {
                    const navigate = pendingNavigation.current;
                    pendingNavigation.current = null;
                    if (navigate) {
                      event.preventDefault();
                      navigate();
                    }
                  }}
                  className={`translate-y-0 overflow-y-auto overscroll-contain rounded-l-2xl border border-[#404040]/40 bg-[#141414] shadow-2xl backdrop-blur-2xl transition-all duration-500 ${mobileNavOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                  style={{
                    WebkitBackdropFilter: 'blur(30px)',
                    backdropFilter: 'blur(30px)',
                  }}
                >
                  <SheetTitle className='sr-only'>Navigation menu</SheetTitle>
                  <SheetDescription className='sr-only'>
                    Jump to a section of the site or open the contact form.
                  </SheetDescription>
                  <div className='px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16 sm:px-6'>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='cursor-pointer py-2'
                      >
                        {item.name === 'Connect' ? (
                          <button
                            type='button'
                            onClick={() => {
                              pendingNavigation.current = () =>
                                window.dispatchEvent(new Event(CONTACT_CARD_SHINE_EVENT));
                              setMobileNavOpen(false);
                            }}
                            className='block w-full cursor-pointer rounded-md border border-[#404040]/50 bg-[#f5f5f0] px-6 py-3 text-left text-lg font-medium text-[#141414] transition-colors hover:bg-[#e8e8e3]'
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className='block cursor-pointer rounded-lg px-4 py-3 text-lg font-medium text-[#a3a3a3] transition-colors hover:text-[#f5f5f0]'
                            onClick={e => {
                              setMobileNavOpen(false);
                              if (item.href.startsWith('#')) {
                                e.preventDefault();
                                const id = item.href.slice(1);
                                pendingNavigation.current = () => scrollToSection(id, true);
                              }
                            }}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>
    </HeaderClockProvider>
  );
}
