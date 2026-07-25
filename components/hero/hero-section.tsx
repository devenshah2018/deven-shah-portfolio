'use client';

import { Button } from '@/components/ui/button';
import { Download, Activity, ChevronDown, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import { CONTACT_CARD_SHINE_EVENT } from '@/components/contact/contact-section';
import { requestScrollToExperience } from '@/lib/url-utils';
import { LINKS } from '@/database/content-registry';

const PILL_CLASSES =
  'rounded-full bg-[#1c1c1c] px-3 py-1.5 text-[0.8125rem] font-medium text-[#a3a3a3] ring-1 ring-[#2e2e2e] transition-colors hover:bg-[#262626] hover:text-[#d4d4d4] active:bg-[#262626] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414] lg:bg-[#262626] lg:px-2.5 lg:py-0.5 lg:text-xs lg:ring-[#333]';

const SOCIAL_CLASSES =
  'flex h-[clamp(2.5rem,5.5vh,2.75rem)] w-[clamp(2.5rem,5.5vh,2.75rem)] items-center justify-center rounded-full bg-[#1c1c1c] text-[#a3a3a3] ring-1 ring-[#2e2e2e] transition-colors hover:text-[#f5f5f0] active:bg-[#262626] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#525252]';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#141414] pb-[clamp(4rem,9vh,6rem)] pt-[clamp(5rem,12vh,6.5rem)] lg:min-h-screen lg:pb-2 lg:pt-20"
    >
      {/* Ambient texture + glow */}
      <div
        aria-hidden="true"
        className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_45%_at_50%_30%,black,transparent_75%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_34%_at_50%_16%,rgba(245,245,240,0.09),transparent_72%)] lg:bg-[radial-gradient(42%_55%_at_80%_48%,rgba(245,245,240,0.05),transparent_72%)]"
      />

      <div className="container relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="relative z-20 grid grid-cols-1 items-center gap-[clamp(1rem,2.6vh,1.5rem)] lg:grid-cols-[1fr_auto] lg:gap-10">
          {/* Profile photo — top and centered on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="order-first flex items-center justify-center lg:order-none lg:col-start-2 lg:justify-end"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(245,245,240,0.12),transparent_68%)] blur-md lg:hidden"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-[#2a2a2a] lg:hidden"
              />
              <Image
                src="/profile.jpg"
                alt="Deven Shah"
                width={400}
                height={400}
                className="relative h-[clamp(6.5rem,17vh,9rem)] w-[clamp(6.5rem,17vh,9rem)] rounded-full object-cover object-top ring-1 ring-[#3a3a3a] sm:h-44 sm:w-44 lg:h-80 lg:w-80 lg:ring-0"
                priority
              />
            </div>
          </motion.div>

          {/* Text + actions */}
          <div className="flex flex-col items-center gap-[clamp(0.625rem,1.8vh,1rem)] text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:gap-3 lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 text-[clamp(2.5rem,min(12.5vw,7vh),3.5rem)] font-semibold leading-[1.02] tracking-tight text-[#f5f5f0] lg:order-2 lg:text-[5.25rem] lg:leading-[1.05]"
            >
              Deven Shah
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-2 max-w-[23ch] text-balance text-[1.0625rem] leading-snug text-[#a3a3a3] lg:order-3 lg:max-w-none lg:text-xl"
            >
              AI Researcher &amp; Experienced Software Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-3 flex flex-wrap justify-center gap-2 lg:order-1 lg:justify-start"
            >
              <button
                type="button"
                onClick={() => requestScrollToExperience('accenture')}
                className={PILL_CLASSES}
              >
                Technical Analyst @ Accenture
              </button>
              <button
                type="button"
                onClick={() => requestScrollToExperience('research-assistant')}
                className={PILL_CLASSES}
              >
                Research @ Boston University
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-4 mt-2 flex w-full flex-col gap-3 lg:mt-3 lg:w-auto lg:flex-row lg:flex-wrap lg:items-center"
            >
              <Button
                size="lg"
                className="h-[clamp(2.75rem,6vh,3rem)] w-full rounded-xl border border-[#525252]/50 bg-[#f5f5f0] px-6 text-[0.9375rem] font-medium text-[#141414] transition-colors hover:bg-[#e8e8e3] active:bg-[#e8e8e3] lg:h-10 lg:w-auto lg:rounded-md lg:text-sm"
                onClick={() => window.dispatchEvent(new Event(CONTACT_CARD_SHINE_EVENT))}
              >
                <Activity className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-[clamp(2.75rem,6vh,3rem)] w-full rounded-xl border border-[#2e2e2e] bg-[#1c1c1c] px-6 text-[0.9375rem] font-medium text-[#f5f5f0] transition-colors hover:border-[#737373] hover:bg-[#262626] active:bg-[#262626] lg:h-10 lg:w-auto lg:rounded-md lg:border-[#525252]/40 lg:bg-transparent lg:text-sm"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Resume.pdf';
                  link.download = 'Deven_Shah_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Résumé
              </Button>
            </motion.div>

            {/* Social row — mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="order-5 mt-1 flex items-center gap-2.5 lg:hidden"
            >
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className={SOCIAL_CLASSES}
              >
                <svg className="h-[1.15rem] w-[1.15rem]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={SOCIAL_CLASSES}
              >
                <svg className="h-[1.15rem] w-[1.15rem]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${LINKS.email}`}
                aria-label="Email Deven Shah"
                className={SOCIAL_CLASSES}
              >
                <Mail className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X profile"
                className={SOCIAL_CLASSES}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={LINKS.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kaggle profile"
                className={SOCIAL_CLASSES}
              >
                <FontAwesomeIcon icon={faKaggle} className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue — mobile only */}
      <motion.button
        type="button"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 p-2 text-[#525252] transition-colors hover:text-[#a3a3a3] focus:outline-none focus-visible:text-[#a3a3a3] lg:hidden"
      >
        <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em]">About</span>
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
