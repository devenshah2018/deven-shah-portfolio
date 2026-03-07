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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[min(300px,calc(100vw-3rem))] sm:bottom-8 sm:right-8"
          >
        <div
          ref={cardRef}
          data-card
          className="relative overflow-hidden rounded-md border border-[#262626] bg-[#0a0a0a]/98 p-4 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl"
        >
          {/* Sharp accent */}
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#404040]" />

          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a3a3a3]">
            Let&apos;s Connect
          </h3>

          {/* Book a Call */}
          <div className="mb-3">
            <Button
              data-cal-namespace="quick-chat"
              data-cal-link="deven-shah-l0qkjk/quick-chat"
              data-cal-config='{"layout":"month_view"}'
              size="sm"
              className="flex h-8 w-full items-center justify-center gap-2 rounded border border-[#262626] bg-[#f5f5f0] px-3 text-[11px] font-semibold tracking-widest uppercase text-[#0a0a0a] transition-all hover:bg-[#e8e8e3] hover:border-[#404040] focus-visible:ring-2 focus-visible:ring-[#404040]"
              aria-label="Book a call with Deven Shah"
              tabIndex={0}
            >
              <CalendarCheck2 className="h-3 w-3" strokeWidth={2.5} />
              Book a Call
            </Button>
          </div>

          {/* Connect links */}
          <div className="border-t border-[#1a1a1a] pt-2.5">
            <ul className="flex items-center justify-between gap-0.5">
              {CONNECT_LINKS.map(({ href, label, icon, isFa }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-7 w-7 items-center justify-center rounded text-[#525252] transition-all hover:bg-[#1a1a1a] hover:text-[#f5f5f0]"
                  >
                    {isFa ? (
                      <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                    ) : (
                      createElement(icon as any, { className: 'h-3.5 w-3.5', strokeWidth: 2 })
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
