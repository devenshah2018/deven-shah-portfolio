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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="fixed bottom-8 right-8 z-50 w-[min(260px,calc(100vw-4rem))] sm:bottom-10 sm:right-10"
          >
            <div
              ref={cardRef}
              data-card
              className="relative overflow-hidden rounded-lg border border-[#262626]/60 bg-[#0d0d0d]/90 py-4 px-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.4)] backdrop-blur-md transition-shadow duration-200 hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.35)]"
            >
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#525252]">
                Connect
              </p>

              <Button
                data-cal-namespace="quick-chat"
                data-cal-link="deven-shah-l0qkjk/quick-chat"
                data-cal-config='{"layout":"month_view"}'
                size="sm"
                className="mb-3.5 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#fafafa] px-3 text-[13px] font-medium text-[#0a0a0a] transition-colors hover:bg-[#e5e5e0] focus-visible:ring-2 focus-visible:ring-[#404040]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
                aria-label="Book a call with Deven Shah"
                tabIndex={0}
              >
                <CalendarCheck2 className="h-4 w-4" strokeWidth={2} />
                Book a Call
              </Button>

              <div className="flex items-center gap-0.5 border-t border-[#262626]/40 pt-3">
                {CONNECT_LINKS.map(({ href, label, icon, isFa }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 flex-1 items-center justify-center rounded-md text-[#525252] transition-colors hover:bg-[#1a1a1a] hover:text-[#a3a3a3]"
                  >
                    {isFa ? (
                      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                    ) : (
                      createElement(icon as any, { className: 'h-4 w-4', strokeWidth: 2 })
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
