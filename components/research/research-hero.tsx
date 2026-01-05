'use client';

import { motion } from 'framer-motion';
import { FlaskConical, CalendarCheck2, ArrowLeft } from 'lucide-react';
import { getMainSiteUrl } from '@/lib/url-utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';
import { ResearchCarousel } from './research-carousel';
import type { ResearchPaper, Study } from '@/lib/types';

interface ResearchHeroProps {
  children?: React.ReactNode;
  papers?: ResearchPaper[];
  studies?: Study[];
}

export function ResearchHero({ children, papers = [], studies = [] }: ResearchHeroProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'quick-chat' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <section className='relative border-b border-slate-800/50 bg-slate-950'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20'>
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mb-12 flex items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <div className='p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20'>
              <FlaskConical className='h-5 w-5 text-cyan-400' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>
              Research
            </h1>
            <span className='text-xs font-mono text-slate-500 tracking-wider'>
              PORTAL
            </span>
          </div>
          <Link
            href={getMainSiteUrl()}
            className='group flex items-center gap-2 px-4 py-2 border border-slate-800/50 bg-slate-900/30 text-slate-300 text-sm font-medium hover:bg-slate-900/50 hover:text-white hover:border-slate-700/50 transition-all duration-200 rounded-lg'
          >
            <ArrowLeft className='h-4 w-4 text-slate-400 group-hover:text-slate-200 transition-colors' />
            <span className='tracking-tight'>Portfolio</span>
          </Link>
        </motion.div>

        {/* Split Layout: Info Left, Chatbot Right */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
          {/* Left: Info, Education, Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-8'
          >
            <div className='space-y-4'>
              <h2 className='text-4xl lg:text-5xl font-bold tracking-tight text-white'>
                Research
              </h2>
              <p className='text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg'>
                Academic publications and research documents exploring AI, machine learning, and computational systems.
              </p>
            </div>

            {/* Research Carousel */}
            <ResearchCarousel papers={papers} studies={studies} />

            {/* Book a Call Button */}
            <Button
              data-cal-namespace='quick-chat'
              data-cal-link='deven-shah-l0qkjk/quick-chat'
              data-cal-config='{"layout":"month_view"}'
              className='w-full justify-center border border-cyan-500/40 bg-gradient-to-r from-cyan-600/80 to-cyan-700/70 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-cyan-600 hover:border-cyan-400/60 hover:shadow-cyan-500/30 transition-all duration-200 rounded-lg'
            >
              <CalendarCheck2 className='mr-2 h-4 w-4' />
              Book a Call
            </Button>
          </motion.div>

          {/* Right: Chatbot */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='lg:sticky lg:top-8'
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

