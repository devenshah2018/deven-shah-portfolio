'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Linkedin,
  Github,
  CalendarCheck2,
  Send,
  MessageSquare,
  Loader2,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'quick-chat' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const mailtoLink = `mailto:devenshah2018@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(`${formData.message}`)}`;

      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:devenshah2018@gmail.com',
      handle: 'devenshah2018@gmail.com',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/deven-a-shah/',
      handle: '/in/deven-a-shah',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/devenshah2018',
      handle: '/devenshah2018',
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      name: 'Twitter',
      icon: faXTwitter,
      url: 'https://x.com/devenshah2018',
      handle: '@devenshah2018',
      gradient: 'from-slate-700 to-slate-800',
    },
  ];

  return (
    <section id='contact' className='bg-gradient-to-b from-slate-950 to-slate-900 py-32'>
      <div className='container mx-auto px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mx-auto max-w-7xl'
        >
          <div className='mb-20 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='mb-6'
            >
              <h2 className='mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl'>
                Let's Connect
              </h2>
              <div className='mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className='mx-auto max-w-4xl text-xl font-light leading-relaxed text-slate-400'
            >
              Innovation starts with collaboration—let’s connect!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className='mb-12 sm:mb-16'
          >
            <Card
              id='book-a-call-container'
              className='group relative overflow-hidden rounded-xl border border-slate-700/40 bg-slate-800/20 backdrop-blur-sm transition-all duration-500 sm:rounded-2xl'
            >
              <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10 opacity-0 transition-opacity duration-500 sm:rounded-2xl' />

              <div className='absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent sm:rounded-2xl' />

              <div className='absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent sm:left-8 sm:right-8' />
              
              <CardContent className='relative z-10 p-4 sm:p-6 md:p-8'>
                <div className='flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8'>
                  <div className='flex-1 text-center md:text-left'>
                    <h3 className='mb-3 flex items-center justify-center gap-2 text-xl font-extrabold tracking-tight text-white sm:mb-2 sm:gap-3 sm:text-2xl md:justify-start'>
                      <CalendarCheck2 className='h-6 w-6 text-blue-400 sm:h-7 sm:w-7' />
                      <span className='truncate'>Book a Call</span>
                    </h3>
                    <p className='mx-auto max-w-xl text-sm font-light leading-relaxed text-slate-400 sm:text-base md:mx-0 md:text-sm'>
                      Have a project, an opportunity, or just want to chat about tech? I'd love to hear from you.
                    </p>
                    <p className='mt-2 text-xs text-slate-400 sm:mt-3'>
                      Powered by{' '}
                      <a
                        href='https://cal.com/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 underline decoration-dotted transition-colors hover:text-blue-300'
                      >
                        Cal.com
                      </a>
                    </p>
                  </div>
                  
                  <div className='flex w-full flex-shrink-0 flex-col gap-3 sm:flex-row sm:gap-2 md:w-auto md:items-end'>
                    <Button
                      data-cal-namespace='quick-chat'
                      data-cal-link='deven-shah-l0qkjk/quick-chat'
                      data-cal-config='{"layout":"month_view"}'
                      size='lg'
                      className='flex h-12 w-full items-center justify-center gap-2 rounded-full border-0 bg-blue-600 px-4 text-base font-semibold text-white outline-none ring-0 transition-all duration-200 hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:h-14 sm:min-w-[160px] sm:gap-3 sm:px-6 sm:text-lg sm:font-bold md:w-auto'
                      aria-controls='cal-embed-container'
                      aria-label='Show calendar to select a time with Deven Shah'
                      tabIndex={0}
                    >
                      <CalendarCheck2 className='h-4 w-4 sm:h-5 sm:w-5' aria-hidden='true' />
                      <span className='truncate'>Select a Time</span>
                    </Button>
                    <Button
                      onClick={() => {
                        window.open('https://cal.com/deven-shah-l0qkjk/quick-chat', '_blank');
                      }}
                      size='lg'
                      className='hidden h-12 w-16 items-center justify-center rounded-full border-0 bg-zinc-600 text-base font-semibold text-white outline-none ring-0 transition-all duration-200 hover:bg-zinc-700 focus-visible:ring-4 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:flex sm:h-14 sm:w-16 sm:text-lg sm:font-bold'
                      aria-label='Open calendar in new tab'
                      tabIndex={0}
                    >
                      <ExternalLink className='h-4 w-4 sm:h-5 sm:w-5' aria-hidden='true' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className='grid gap-8 lg:grid-cols-5 lg:gap-12'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className='lg:col-span-3'
            >
              <Card className='h-full gap-0 overflow-hidden border-none bg-transparent backdrop-blur-sm'>
                <div className='border-b border-slate-700/30 px-8 py-6'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <h3 className='mb-2 flex items-center justify-center gap-3 text-2xl font-extrabold tracking-tight text-white md:justify-start'>
                        <MessageSquare className='h-7 w-7 text-blue-400' />
                        Send a Message
                      </h3>
                      <p className='mx-auto max-w-xl text-base font-light text-slate-400 md:mx-0'>
                        I'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-8'>
                  <form onSubmit={handleSubmit} className='space-y-3'>
                    <div className='grid gap-6 sm:grid-cols-2'>
                      <div className='space-y-3'>
                        <label htmlFor='name' className='block text-sm font-medium text-slate-300'>
                          Full Name *
                        </label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder='John Doe'
                          required
                          className='h-11 rounded-lg border-slate-600/50 bg-slate-800/40 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20'
                        />
                      </div>
                      <div className='space-y-3'>
                        <label htmlFor='email' className='block text-sm font-medium text-slate-300'>
                          Email Address *
                        </label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='john@company.com'
                          required
                          className='h-11 rounded-lg border-slate-600/50 bg-slate-800/40 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20'
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                      <label htmlFor='subject' className='block text-sm font-medium text-slate-300'>
                        Subject *
                      </label>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder='Project Collaboration Opportunity'
                        required
                        className='h-11 rounded-lg border-slate-600/50 bg-slate-800/40 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20'
                      />
                    </div>

                    <div className='space-y-3'>
                      <label htmlFor='message' className='block text-sm font-medium text-slate-300'>
                        Message *
                      </label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder='Tell me about your project, opportunity, or just say hello...'
                        rows={5}
                        required
                        className='resize-none rounded-lg border-slate-600/50 bg-slate-800/40 text-white transition-all duration-200 placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-1 focus:ring-blue-400/20'
                      />
                    </div>

                    <div className='pt-4'>
                      <Button
                        type='submit'
                        size='lg'
                        className='h-12 w-full rounded-lg border-0 bg-blue-600 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-500/20'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className='mr-2 h-4 w-4' />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className='lg:col-span-2'
            >
              <Card className='h-full gap-0 overflow-hidden border-none bg-transparent backdrop-blur-sm'>
                <div className='border-b border-slate-700/30 px-8 py-6'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <h3 className='mb-2 flex items-center justify-center gap-3 text-2xl font-extrabold tracking-tight text-white md:justify-start'>
                        <ThumbsUp className='h-7 w-7 text-blue-400' />
                        Connect With Me
                      </h3>
                      <p className='mx-auto max-w-xl text-base font-light text-slate-400 md:mx-0'>
                        Find me on these platforms
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-8 p-8'>
                  {socialLinks.map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='group flex items-center gap-4 rounded-lg border border-slate-700/30 bg-slate-800/20 p-4 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-800/40'
                    >
                      <div
                        className={`h-10 w-10 rounded-lg bg-gradient-to-br ${social.gradient} flex flex-shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105`}
                      >
                        {social.name === 'Twitter' ? (
                          <FontAwesomeIcon icon={faXTwitter} className='h-4 w-4 text-white' />
                        ) : (
                          React.createElement(social.icon as React.ComponentType<any>, {
                            className: 'h-4 w-4 text-white',
                          })
                        )}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='text-sm font-medium text-white transition-colors duration-200 group-hover:text-blue-200'>
                          {social.name}
                        </p>
                        <p className='truncate text-xs text-slate-400 transition-colors duration-200 group-hover:text-slate-300'>
                          {social.handle}
                        </p>
                      </div>
                      <div className='flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <svg
                          className='h-4 w-4 text-slate-400'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                          />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
