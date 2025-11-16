'use client';

import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faKaggle } from '@fortawesome/free-brands-svg-icons';
import { Download, Mail, Github, Linkedin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { LINKS } from '@/lib/content-registry';

const GitHubCalendar = dynamic(
  () =>
    import('github-contribution-calendar').then(mod => ({
      default: mod.GitHubCalendar,
    })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section
      id='hero'
      className='relative flex min-h-[1100px] items-center justify-center overflow-hidden'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20' />

      <div className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative z-20 mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mb-2'
          >
            <h1 className='bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-5xl font-bold leading-tight text-transparent sm:text-6xl lg:text-7xl'>
              Deven Shah
            </h1>
            <div className='mt-5 flex flex-wrap items-center justify-center gap-2'>
              <h2 className='inline-flex items-center rounded-full border border-slate-700/50 bg-slate-800/60 px-4 py-1.5 text-sm font-medium text-slate-200 shadow-sm sm:text-base'>
                Co-Founder & CTO
              </h2>
              <span className='text-slate-600'>•</span>
              <h2 className='inline-flex items-center rounded-full border border-slate-700/50 bg-slate-800/60 px-4 py-1.5 text-sm font-medium text-slate-200 shadow-sm sm:text-base'>
                AI Researcher
              </h2>
              <span className='text-slate-600'>•</span>
              <h2 className='inline-flex items-center rounded-full border border-slate-700/50 bg-slate-800/60 px-4 py-1.5 text-sm font-medium text-slate-200 shadow-sm sm:text-base'>
                M.S. Computer Science Candidate
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='mb-8'
          >
            <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-400 sm:text-xl'>
              Shaping the next generation of AI-driven analytics, intelligent systems, and scalable
              solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'
          >
            <Button
              size='lg'
              className='border-0 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Activity className='mr-2 h-5 w-5' />
              Get In Touch
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='border-2 px-8 py-3 text-lg font-semibold hover:bg-gray-800'
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Resume.pdf';
                link.download = 'Deven_Shah_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className='mr-2 h-5 w-5' />
              Download Résumé
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='mb-10 flex items-center justify-center gap-6'
          >
            <Link href={LINKS.github} target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg' className='p-3 hover:bg-gray-800'>
                <Github className='h-6 w-6' />
              </Button>
            </Link>
            <Link href={LINKS.linkedin} target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg' className='p-3 hover:bg-gray-800'>
                <Linkedin className='h-6 w-6' />
              </Button>
            </Link>
            <Link href={`mailto:${LINKS.email}`} target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg' className='p-3 hover:bg-gray-800'>
                <Mail className='h-6 w-6' />
              </Button>
            </Link>
            <Link href={LINKS.x} target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg' className='p-3 hover:bg-gray-800'>
                <FontAwesomeIcon icon={faXTwitter} className='h-6 w-6 text-white' />
              </Button>
            </Link>
            <Link href={LINKS.kaggle} target='_blank' rel='noopener noreferrer'>
              <Button variant='ghost' size='lg' className='p-3 hover:bg-gray-800'>
                <FontAwesomeIcon icon={faKaggle} className='h-6 w-6 text-white' />
              </Button>
            </Link>
          </motion.div>

          <div className='mb-20 mt-6 flex justify-center'>
            <div className='m-0 w-full max-w-full overflow-x-auto rounded-lg bg-transparent p-0'>
              <GitHubCalendar
                username='devenshah2018'
                token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}
                showLabels={true}
                fontSize={15}
                titleColor='#fbbf24'
                cellSize={17}
                labelColor='#fbbf24'
                theme='classic'
                background='transparent'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
