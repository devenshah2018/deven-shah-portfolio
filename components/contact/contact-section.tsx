'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck2, Github, Linkedin, Mail, Copy, Check, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';
import { LINKS } from '@/lib/content-registry';

export const CONTACT_CARD_SHINE_EVENT = 'contact-card-shine';

const CONNECT_LINKS = [
  { label: 'Email', href: `mailto:${LINKS.email}`, copyValue: LINKS.email, displayUrl: LINKS.email, icon: Mail },
  { label: 'LinkedIn', href: LINKS.linkedin, copyValue: LINKS.linkedin, displayUrl: 'linkedin.com/in/deven-a-shah', icon: Linkedin },
  { label: 'GitHub', href: LINKS.github, copyValue: LINKS.github, displayUrl: 'github.com/devenshah2018', icon: Github },
];

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [userRequestedContact, setUserRequestedContact] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isCardVisible = (!heroInView || userRequestedContact) && !dismissed;

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

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setHeroInView(entry.isIntersecting);
          if (entry.isIntersecting) setDismissed(false);
        }
      },
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleShine = () => {
      setDismissed(false);
      setUserRequestedContact(true);
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
    <>
      {/* Fixed Let's Connect card - bottom right, visible when hero out of view or user clicked Connect/Get In Touch */}
      <AnimatePresence>
        {isCardVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-8 right-8 z-50 w-[min(300px,calc(100vw-4rem))] sm:bottom-10 sm:right-10"
          >
            <div
              ref={cardRef}
              data-card
              className="relative overflow-hidden rounded-lg border border-[#262626]/60 bg-[#0d0d0d]/90 py-4 px-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)] backdrop-blur-md transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#525252]">
                  Connect
                </p>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  className="-mr-1 -mt-1 rounded p-1.5 text-[#525252] transition-colors hover:bg-[#1a1a1a] hover:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#0d0d0d]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Button
                data-cal-namespace="quick-chat"
                data-cal-link="deven-shah-l0qkjk/quick-chat"
                data-cal-config='{"layout":"month_view"}'
                size="sm"
                className="mb-4 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#fafafa] px-3 text-[13px] font-medium text-[#0a0a0a] transition-colors hover:bg-[#e5e5e0] focus-visible:ring-2 focus-visible:ring-[#404040]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
                aria-label="Book a call with Deven Shah"
                tabIndex={0}
              >
                <CalendarCheck2 className="h-4 w-4" strokeWidth={2} />
                Book a Call
              </Button>

              <div className="flex flex-col gap-1 border-t border-[#262626]/40 pt-3">
                {CONNECT_LINKS.map(({ label, href, copyValue, displayUrl, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-md py-1"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-[#525252]" />
                    <Link
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="min-w-0 flex-1 truncate text-[12px] text-[#a3a3a3] underline decoration-[#404040] underline-offset-1 transition-colors hover:text-[#f5f5f0] hover:decoration-[#525252]"
                    >
                      {displayUrl}
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        copyToClipboard(copyValue, label);
                      }}
                      className="shrink-0 rounded p-1 text-[#525252] transition-colors hover:bg-[#1a1a1a] hover:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2 focus:ring-offset-[#0d0d0d]"
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
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
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
                            <Copy className="h-3.5 w-3.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
