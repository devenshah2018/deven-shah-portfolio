'use client';

import { motion } from 'framer-motion';
import { FlaskConical, GraduationCap, Mail, Linkedin, Github, CalendarCheck2, ArrowLeft } from 'lucide-react';
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
    <section className='relative border-b border-gray-800/30 bg-gradient-to-b from-gray-950 via-black to-black'>
      <div className='container mx-auto px-6 lg:px-8 py-16'>
        {/* Header Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mb-12 flex items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20'>
              <FlaskConical className='h-5 w-5 text-cyan-400/80' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-white'>
              Research
            </h1>
            <span className='text-xs font-mono text-gray-500 tracking-wider'>
              PORTAL
            </span>
          </div>
          <Link
            href={getMainSiteUrl()}
            className='group flex items-center gap-2 px-4 py-2.5 border border-gray-800/40 bg-gray-950/50 backdrop-blur-sm text-gray-400 text-sm font-medium hover:bg-gray-900/60 hover:text-gray-200 hover:border-gray-700/50 transition-all duration-200 rounded-lg'
          >
            <ArrowLeft className='h-4 w-4 text-gray-500 group-hover:text-gray-300 transition-colors' />
            <span className='tracking-tight'>Portfolio</span>
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
              <h2 className='mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
                Research
              </h2>
              <p className='text-base text-gray-500 leading-relaxed max-w-lg'>
                Academic publications and research documents exploring AI, machine learning, and computational systems.
              </p>
            </div>

            {/* Education */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2.5 mb-4'>
                <div className='p-1.5 rounded-md bg-gray-900/50 border border-gray-800/40'>
                  <GraduationCap className='h-3.5 w-3.5 text-gray-500' />
                </div>
                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-500'>Education</h3>
              </div>
              <div className='space-y-3'>
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className='border border-gray-800/40 bg-gray-950/40 backdrop-blur-sm rounded-lg p-4 hover:border-gray-700/50 hover:bg-gray-950/60 transition-all duration-200'>
                    <div className='text-sm font-semibold text-white mb-1'>{edu.degree}</div>
                    <div className='text-xs text-gray-400 mb-1'>{edu.institution}</div>
                    <div className='text-xs text-gray-600 font-mono'>{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Links */}
            <div className='flex flex-col border border-gray-800/40 bg-gray-950/40 backdrop-blur-sm rounded-lg overflow-hidden'>
              <div className='flex items-center gap-2.5 p-4 border-b border-gray-800/40 bg-gray-900/30'>
                <div className='p-1.5 rounded-md bg-gray-900/50 border border-gray-800/40'>
                  <Mail className='h-3.5 w-3.5 text-gray-500' />
                </div>
                <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-500'>Connect</h3>
              </div>
              
              <div className='flex flex-col p-5 space-y-3'>
                {/* Calendly Button - Prominent */}
                <Button
                  data-cal-namespace='quick-chat'
                  data-cal-link='deven-shah-l0qkjk/quick-chat'
                  data-cal-config='{"layout":"month_view"}'
                  className='w-full justify-center border border-cyan-500/40 bg-gradient-to-r from-cyan-600/80 to-cyan-700/70 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-cyan-600 hover:border-cyan-400/60 hover:shadow-cyan-500/30 transition-all duration-200 rounded-lg'
                >
                  <CalendarCheck2 className='mr-2 h-4 w-4' />
                  Book a Call
                </Button>

                {/* Social Links */}
                <div className='grid grid-cols-2 gap-2.5'>
                  <a
                    href={`mailto:${LINKS.email}`}
                    className='flex items-center gap-2 border border-gray-800/40 bg-gray-900/40 px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 hover:border-gray-700/50 transition-all duration-200 rounded-lg'
                  >
                    <Mail className='h-3.5 w-3.5' />
                    <span>Email</span>
                  </a>
                  <a
                    href={LINKS.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/40 bg-gray-900/40 px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 hover:border-gray-700/50 transition-all duration-200 rounded-lg'
                  >
                    <Linkedin className='h-3.5 w-3.5' />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={LINKS.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/40 bg-gray-900/40 px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 hover:border-gray-700/50 transition-all duration-200 rounded-lg'
                  >
                    <Github className='h-3.5 w-3.5' />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={LINKS.x}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 border border-gray-800/40 bg-gray-900/40 px-3 py-2.5 text-sm text-gray-400 hover:bg-gray-800/60 hover:text-gray-200 hover:border-gray-700/50 transition-all duration-200 rounded-lg'
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

