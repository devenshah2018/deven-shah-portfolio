'use client';

import { Button } from '@/components/ui/button';
import { Download, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CONTACT_CARD_SHINE_EVENT } from '@/components/contact/contact-section';
import { requestScrollToExperience } from '@/lib/url-utils';

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#141414] pt-20 pb-2">
      <div className="container relative z-10 mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <div className="relative z-20 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => requestScrollToExperience('accenture')}
                  className="rounded-full bg-[#262626] px-2.5 py-0.5 text-xs font-medium text-[#a3a3a3] ring-1 ring-[#333] transition-colors hover:bg-[#333] hover:text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414]"
                >
                  Technical Analyst @ Accenture
                </button>
                <button
                  type="button"
                  onClick={() => requestScrollToExperience('research-assistant')}
                  className="rounded-full bg-[#262626] px-2.5 py-0.5 text-xs font-medium text-[#a3a3a3] ring-1 ring-[#333] transition-colors hover:bg-[#333] hover:text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414]"
                >
                  Research @ Boston University
                </button>
              </div>
              <h1 className="text-[4rem] font-semibold leading-[1.05] tracking-tight text-[#f5f5f0] sm:text-[5.25rem]">
                Deven Shah
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-3 text-lg text-[#a3a3a3] sm:text-xl"
            >
              AI Researcher & Experienced Software Engineer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-col gap-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="rounded-md border border-[#525252]/50 bg-[#f5f5f0] px-6 py-2.5 text-sm font-medium text-[#141414] transition-colors hover:bg-[#e8e8e3]"
                  onClick={() => window.dispatchEvent(new Event(CONTACT_CARD_SHINE_EVENT))}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-md border border-[#525252]/40 px-6 py-2.5 text-sm font-medium text-[#f5f5f0] transition-colors hover:border-[#737373] hover:bg-[#262626]"
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
              </div>
            </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <Image
              src="/profile.jpg"
              alt="Deven Shah"
              width={400}
              height={400}
              className="h-56 w-56 rounded-full object-cover object-top sm:h-64 sm:w-64 lg:h-80 lg:w-80"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
