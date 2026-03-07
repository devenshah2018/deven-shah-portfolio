'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarCheck2, Github, Linkedin, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faKaggle } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '@calcom/atoms/globals.min.css';
import { getCalApi } from '@calcom/embed-react';
import { LINKS } from '@/lib/content-registry';

export const CONTACT_CARD_SHINE_EVENT = 'contact-card-shine';

const CONNECT_LINKS = [
  { href: LINKS.linkedin, label: 'LinkedIn', icon: Linkedin, isFa: false },
  { href: LINKS.github, label: 'GitHub', icon: Github, isFa: false },
  { href: LINKS.x, label: 'X', icon: faXTwitter, isFa: true },
  { href: LINKS.kaggle, label: 'Kaggle', icon: faKaggle, isFa: true },
  { href: `mailto:${LINKS.email}`, label: 'Email', icon: Mail, isFa: false },
] as const;

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [heroInView, setHeroInView] = useState(true);
  const [userRequestedContact, setUserRequestedContact] = useState(false);

  const isCardVisible = !heroInView || userRequestedContact;

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
      ([entry]) => entry && setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleShine = () => {
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
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-10 right-10 z-50 w-[min(300px,calc(100vw-5rem))] sm:bottom-12 sm:right-12"
          >
            <div
              ref={cardRef}
              data-card
              className="relative overflow-hidden rounded-2xl border border-[#262626]/80 bg-[#0a0a0a]/95 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <h3 className="mb-3.5 text-sm font-medium uppercase tracking-[0.18em] text-[#737373]">
                Let&apos;s Connect
              </h3>

              <div className="mb-3">
                <Button
                  data-cal-namespace="quick-chat"
                  data-cal-link="deven-shah-l0qkjk/quick-chat"
                  data-cal-config='{"layout":"month_view"}'
                  size="sm"
                  className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-[#333]/60 bg-[#f5f5f0] px-4 text-sm font-medium text-[#0a0a0a] transition-all duration-200 hover:bg-[#e8e8e3] hover:border-[#404040]/50 focus-visible:ring-2 focus-visible:ring-[#404040]/40"
                  aria-label="Book a call with Deven Shah"
                  tabIndex={0}
                >
                  <CalendarCheck2 className="h-4.5 w-4.5" strokeWidth={2.25} />
                  Book a Call
                </Button>
              </div>

              <div className="flex items-center justify-between gap-1.5 border-t border-[#1a1a1a]/80 pt-3.5">
                {CONNECT_LINKS.map(({ href, label, icon, isFa }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-[#525252] transition-colors hover:bg-[#1a1a1a] hover:text-[#e5e5e0]"
                  >
                    {isFa ? (
                      <FontAwesomeIcon icon={icon} className="h-4.5 w-4.5" />
                    ) : (
                      createElement(icon as any, { className: 'h-4.5 w-4.5', strokeWidth: 2 })
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
