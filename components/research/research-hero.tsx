'use client';

import { motion } from 'framer-motion';
import { FlaskConical, GraduationCap, Mail, Linkedin, Github, CalendarCheck2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { getMainSiteUrl } from '@/lib/url-utils';
import { EDUCATION, LINKS } from '@/lib/content-registry';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';

interface ResearchHeroProps {
  children?: React.ReactNode;
}

export function ResearchHero({ children }: ResearchHeroProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'quick-chat' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  return (
    <section className='relative border-b border-gray-800/50 bg-black'>
      <div className='container mx-auto px-6 lg:px-8 py-12'>
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mb-12 flex items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <FlaskConical className='h-6 w-6 text-cyan-400' />
            <h1 className='text-2xl font-bold tracking-tight text-white'>
              Research
            </h1>
            <span className='text-xs font-mono text-cyan-400/70 tracking-wider'>
              PORTAL
            </span>
          </div>
          <Link
            href={getMainSiteUrl()}
            className='px-3 py-1.5 border border-gray-800/60 bg-gray-950/60 text-gray-300 text-sm hover:bg-gray-900/80 hover:text-white hover:border-cyan-500/30 transition-all duration-200'
          >
            ← Portfolio
          </Link>
        </motion.div>

        {/* Split Layout: Info Left, Chatbot Right */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Left: Info, Education, Contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='space-y-8'
          >
            <div>
              <h2 className='mb-3 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
                Research
              </h2>
              <p className='text-base text-gray-400 leading-relaxed'>
                Academic publications and research documents.
              </p>
            </div>

            {/* Education */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 mb-3'>
                <GraduationCap className='h-4 w-4 text-cyan-400' />
                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-400'>Education</h3>
              </div>
              <div className='space-y-2'>
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className='border border-gray-800/60 bg-gray-950/60 p-3'>
                    <div className='text-sm font-semibold text-white'>{edu.degree}</div>
                    <div className='text-xs text-gray-400'>{edu.institution}</div>
                    <div className='text-xs text-gray-500 mt-1'>{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Links */}
            <div className='flex flex-col border border-gray-800/60 bg-gray-950/60'>
              <div className='flex items-center gap-2 p-4 border-b border-gray-800/60'>
                <Mail className='h-4 w-4 text-cyan-400' />
                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-400'>Connect</h3>
              </div>
              
              <div className='flex flex-col p-4 space-y-4'>
                {/* Calendly Button - Prominent */}
                <Button
                  data-cal-namespace='quick-chat'
                  data-cal-link='deven-shah-l0qkjk/quick-chat'
                  data-cal-config='{"layout":"month_view"}'
                  className='w-full justify-center border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-600/90 to-cyan-700/80 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-500 hover:to-cyan-600 hover:shadow-cyan-500/40 hover:border-cyan-400 transition-all duration-200'
                >
                  <CalendarCheck2 className='mr-2 h-5 w-5' />
                  Book a Call
                </Button>

                {/* Social Links */}
                <div className='grid grid-cols-2 gap-2'>
                  <a
                    href={`mailto:${LINKS.email}`}
                    className='flex items-center gap-2 border border-gray-800/60 bg-gray-900/60 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-cyan-500/30 transition-all duration-200'
                  >
                    <Mail className='h-3.5 w-3.5' />
                    <span>Email</span>
                  </a>
                  <a
                    href={LINKS.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/60 bg-gray-900/60 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-cyan-500/30 transition-all duration-200'
                  >
                    <Linkedin className='h-3.5 w-3.5' />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={LINKS.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/60 bg-gray-900/60 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-cyan-500/30 transition-all duration-200'
                  >
                    <Github className='h-3.5 w-3.5' />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={LINKS.x}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/60 bg-gray-900/60 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/80 hover:text-white hover:border-cyan-500/30 transition-all duration-200'
                  >
                    <FontAwesomeIcon icon={faXTwitter} className='h-3.5 w-3.5' />
                    <span>X</span>
                  </a>
                </div>
              </div>
            </div>
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

