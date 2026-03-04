'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
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
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKaggle, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';
import { LINKS } from '@/lib/content-registry';

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
      const mailtoLink = `mailto:${LINKS.email}?subject=${encodeURIComponent(
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
      url: `mailto:${LINKS.email}`,
      handle: LINKS.email,
      gradient: 'from-red-500 to-pink-500',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: LINKS.linkedin,
      handle: '/in/deven-a-shah',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: LINKS.github,
      handle: '/devenshah2018',
      gradient: 'from-slate-500 to-slate-600',
    },
    {
      name: 'Twitter',
      icon: faXTwitter,
      url: LINKS.x,
      handle: '@devenshah2018',
      gradient: 'from-slate-700 to-slate-800',
    },
    {
      name: 'Kaggle',
      icon: faKaggle,
      url: LINKS.kaggle,
      handle: '@devenashah',
      gradient: 'from-slate-700 to-slate-800',
    },
  ];

  return (
    <section id="contact" className="bg-[#141414] py-24 sm:py-32">
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
              <h2 className="mb-16 text-base font-medium uppercase tracking-[0.2em] text-[#a3a3a3] sm:text-lg">
                Let's Connect
              </h2>
            </motion.div>
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
              className='relative flex flex-col overflow-hidden rounded-xl border-none bg-transparent transition-all duration-300 gap-2'
            >
              <div className='flex flex-col gap-2 pb-3'>
                <div className='flex min-w-0 flex-1 items-center justify-between gap-4'>
                  <div className='flex-1'>
                    <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold leading-tight text-[#f5f5f0]">
                      <CalendarCheck2 className="h-6 w-6 flex-shrink-0 text-[#a3a3a3]" />
                      Book a Call
                    </h3>
                    <div className='flex items-center gap-1'>
                      <span className="text-sm font-medium text-[#a3a3a3]">Fast, easy scheduling</span>
                    </div>
                  </div>
                  <Button
                    data-cal-namespace='quick-chat'
                    data-cal-link='deven-shah-l0qkjk/quick-chat'
                    data-cal-config='{"layout":"month_view"}'
                    size='lg'
                    className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#404040]/50 bg-[#f5f5f0] px-5 text-sm font-medium text-[#141414] outline-none ring-0 transition-colors hover:bg-[#e8e8e3] focus-visible:ring-2 focus-visible:ring-[#525252]"
                    aria-controls='cal-embed-container'
                    aria-label='Show calendar to select a time with Deven Shah'
                    tabIndex={0}
                  >
                    <CalendarCheck2 className='h-4 w-4' aria-hidden='true' />
                    <span className='truncate'>Select a Time</span>
                  </Button>
                </div>
              </div>
              <div className='flex flex-1 flex-col justify-between pt-0'>
                <div>
                    <p className="mb-2 text-base leading-[1.7] text-[#d4d4d4]">
                    Have a project, an opportunity, or just want to chat about tech? I'd love to hear from you.
                  </p>
                  <p className='text-sm text-slate-400'>
                    Powered by{' '}
                    <a
                      href='https://cal.com/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className="text-[#a3a3a3] underline decoration-dotted transition-colors hover:text-[#f5f5f0]"
                    >
                      Cal.com
                    </a>
                  </p>
                </div>
              </div>
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
                <div className="border-b border-[#404040]/30 px-8 py-6">
                  <div className='flex items-center gap-3'>
                    <div>
                      <h3 className="mb-2 flex items-center justify-center gap-3 text-lg font-semibold tracking-tight text-[#f5f5f0] md:justify-start">
                        <MessageSquare className="h-7 w-7 text-[#f5f5f0]" />
                        Send a Message
                      </h3>
                        <p className="mx-auto max-w-xl text-base font-light text-[#a3a3a3] md:mx-0">
                        I'll get back to you within 24 hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-8'>
                  <form onSubmit={handleSubmit} className='space-y-3'>
                    <div className='grid gap-6 sm:grid-cols-2'>
                      <div className='space-y-3'>
                        <label htmlFor="name" className="block text-sm font-medium text-[#d4d4d4]">
                          Full Name *
                        </label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder='John Doe'
                          required
                          className="h-11 rounded-md border border-[#404040]/40 bg-[#1a1a1a] text-[#f5f5f0] transition-colors placeholder:text-[#737373] focus:border-[#525252] focus:ring-1 focus:ring-[#404040]"
                        />
                      </div>
                      <div className='space-y-3'>
                        <label htmlFor="email" className="block text-sm font-medium text-[#d4d4d4]">
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
                          className="h-11 rounded-md border border-[#404040]/40 bg-[#1a1a1a] text-[#f5f5f0] transition-colors placeholder:text-[#737373] focus:border-[#525252] focus:ring-1 focus:ring-[#404040]"
                        />
                      </div>
                    </div>

                    <div className='space-y-3'>
                        <label htmlFor="subject" className="block text-sm font-medium text-[#d4d4d4]">
                        Subject *
                      </label>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder='Project Collaboration Opportunity'
                        required
                        className="h-11 rounded-md border border-[#404040]/40 bg-[#1a1a1a] text-[#f5f5f0] transition-colors placeholder:text-[#737373] focus:border-[#525252] focus:ring-1 focus:ring-[#404040]"
                      />
                    </div>

                    <div className='space-y-3'>
                        <label htmlFor="message" className="block text-sm font-medium text-[#d4d4d4]">
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
                        className="resize-none rounded-md border border-[#404040]/40 bg-[#1a1a1a] text-[#f5f5f0] transition-colors placeholder:text-[#737373] focus:border-[#525252] focus:ring-1 focus:ring-[#404040]"
                      />
                    </div>

                    <div className='pt-4'>
                      <Button
                        type='submit'
                        size='lg'
                        className="h-12 w-full rounded-md border border-[#404040]/50 bg-[#f5f5f0] font-medium text-[#141414] transition-colors hover:bg-[#e8e8e3]"
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
                <div className="border-b border-[#404040]/30 px-8 py-6">
                  <div className='flex items-center gap-3'>
                    <div>
                      <h3 className="mb-2 flex items-center justify-center gap-3 text-lg font-semibold tracking-tight text-[#f5f5f0] md:justify-start">
                        <ThumbsUp className="h-7 w-7 text-[#f5f5f0]" />
                        Connect With Me
                      </h3>
                        <p className="mx-auto max-w-xl text-base font-light text-[#a3a3a3] md:mx-0">
                        Find me on these platforms
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3 p-8'>
                  {socialLinks.map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className="group flex items-center gap-4 rounded-lg border border-[#404040]/40 bg-[#1a1a1a] p-4 transition-colors hover:border-[#525252]/50 hover:bg-[#262626]"
                    >
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#404040]/40 bg-[#262626] transition-transform duration-200 group-hover:scale-105"
                      >
                        {social.name === 'Twitter' ? (
                          <FontAwesomeIcon icon={faXTwitter} className='h-4 w-4 text-white' />
                        ) : social.name === 'Kaggle' ? (
                          <FontAwesomeIcon icon={faKaggle} className='h-4 w-4 text-white' />
                        ) : (
                          React.createElement(social.icon as React.ComponentType<any>, {
                            className: 'h-4 w-4 text-white',
                          })
                        )}
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className="text-sm font-medium text-[#f5f5f0] transition-colors group-hover:text-[#d4d4d4]">
                          {social.name}
                        </p>
                        <p className="truncate text-xs text-[#a3a3a3] transition-colors group-hover:text-[#d4d4d4]">
                          {social.handle}
                        </p>
                      </div>
                      <div className='flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                        <svg
                          className="h-4 w-4 text-[#a3a3a3]"
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
