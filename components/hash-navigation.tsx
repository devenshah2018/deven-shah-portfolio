'use client';
import { useEffect } from 'react';
import { scrollToSection } from '@/lib/url-utils';
const sections = ['hero', 'about', 'experience', 'research', 'projects', 'contact'];
export function HashNavigation() {
  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const navigate = () => {
      const section = window.location.hash.slice(1);
      cancelAnimationFrame(frame);
      if (sections.includes(section)) frame = requestAnimationFrame(() => scrollToSection(section));
    };
    const initial = () => {
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (!disposed) navigate();
      });
    };
    if (document.readyState === 'complete') initial();
    else window.addEventListener('load', initial, { once: true });
    window.addEventListener('hashchange', navigate);
    window.addEventListener('popstate', navigate);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('load', initial);
      window.removeEventListener('hashchange', navigate);
      window.removeEventListener('popstate', navigate);
    };
  }, []);
  return null;
}
