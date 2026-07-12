'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck2, Github, Linkedin, Mail, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';
import { LINKS } from '@/database/content-registry';

export const CONTACT_CARD_SHINE_EVENT = 'contact-card-shine';

const CONNECT_LINKS = [
  { label: 'Email', href: `mailto:${LINKS.email}`, copyValue: LINKS.email, displayUrl: LINKS.email, icon: Mail },
  { label: 'LinkedIn', href: LINKS.linkedin, copyValue: LINKS.linkedin, displayUrl: 'linkedin.com/in/deven-a-shah', icon: Linkedin },
  { label: 'GitHub', href: LINKS.github, copyValue: LINKS.github, displayUrl: 'github.com/devenshah2018', icon: Github },
];

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'quick-chat' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

  // "Connect" / "Get In Touch" buttons elsewhere scroll to this section and briefly highlight it.
  useEffect(() => {
    const handleShine = () => {
      const section = document.getElementById('contact');
      section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const card = cardRef.current;
      if (card) {
        card.classList.add('scroll-highlight');
        setTimeout(() => card.classList.remove('scroll-highlight'), 3000);
      }
    };
    window.addEventListener(CONTACT_CARD_SHINE_EVENT, handleShine);
    return () => window.removeEventListener(CONTACT_CARD_SHINE_EVENT, handleShine);
  }, []);

  return (
    <section id="contact" className="scroll-mt-20 border-t border-[#1f1f1f] bg-[#141414] py-24 sm:py-32">
      <div className="container mx-auto w-full max-w-7xl px-8 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-left text-3xl font-medium uppercase tracking-[0.2em] text-[#a3a3a3]">
            Let&apos;s Connect
          </h2>

          <div
            ref={cardRef}
            data-card
            className="grid grid-cols-1 gap-8 rounded-2xl border border-[#242424] bg-[#0e0e0e]/60 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12"
          >
            {/* Left: intro + book a call */}
            <div className="flex flex-col">
              <p className="max-w-md text-[15px] leading-relaxed text-[#a3a3a3]">
                Have something to build, a role to discuss, or just want to say hi? Grab a time
                that works, or reach out directly — I&apos;ll get back to you.
              </p>
              <Button
                data-cal-namespace="quick-chat"
                data-cal-link="deven-shah-l0qkjk/quick-chat"
                data-cal-config='{"layout":"month_view"}'
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#fafafa] px-5 text-[14px] font-medium text-[#0a0a0a] transition-colors hover:bg-[#e5e5e0] focus-visible:ring-2 focus-visible:ring-[#404040]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] sm:w-auto sm:self-start"
                aria-label="Book a call with Deven Shah"
                tabIndex={0}
              >
                <CalendarCheck2 className="h-4 w-4" strokeWidth={2} />
                Book a Call
              </Button>
            </div>

            {/* Right: direct links */}
            <div className="flex flex-col gap-1 lg:border-l lg:border-[#242424] lg:pl-12">
              {CONNECT_LINKS.map(({ label, href, copyValue, displayUrl, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 rounded-md py-1.5">
                  <Icon className="h-4 w-4 shrink-0 text-[#525252]" />
                  <Link
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="min-w-0 flex-1 truncate text-[14px] text-[#a3a3a3] underline decoration-[#404040] underline-offset-2 transition-colors hover:text-[#f5f5f0] hover:decoration-[#525252]"
                  >
                    {displayUrl}
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(copyValue, label);
                    }}
                    className="shrink-0 rounded p-1.5 text-[#525252] transition-colors hover:bg-[#1a1a1a] hover:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#141414]"
                    aria-label={`Copy ${label}`}
                  >
                    <AnimatePresence mode="wait">
                      {copiedId === label ? (
                        <motion.span
                          key="check"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex"
                        >
                          <Check className="h-4 w-4 text-emerald-500" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex"
                        >
                          <Copy className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
