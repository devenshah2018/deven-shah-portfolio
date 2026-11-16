'use client';

import { useEffect } from 'react';
import {
  cancelPendingScroll,
  itemAnchor,
  itemSlug,
  navigateToItem,
  resolveItemLink,
  scrollToProject,
  scrollToSection,
} from '@/lib/url-utils';

const sections = [
  'hero',
  'about',
  'publications',
  'experience',
  'education',
  'organizations',
  'projects',
  'contact',
];

export function HashNavigation() {
  useEffect(() => {
    let disposed = false;
    let frame: number | undefined;
    const navigate = () => {
      if (disposed) return;
      // Preserve links from the legacy papers page, even when storage is unavailable.
      try {
        const project = sessionStorage.getItem('scrollToProjectWithShine');
        if (project) {
          sessionStorage.removeItem('scrollToProjectWithShine');
          scrollToProject(project);
          return;
        }
      } catch {
        /* Storage access is optional for ordinary hash links. */
      }
      let anchor: string;
      try {
        anchor = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (!anchor) return;
      const item = resolveItemLink(anchor);
      if (item && document.getElementById(itemAnchor(item.type, item.id))) {
        const canonical = `#${itemSlug(item.type, item.id)}`;
        if (window.location.hash !== canonical) {
          window.history.replaceState(window.history.state, '', canonical);
        }
        navigateToItem(item.type, item.id, false);
      } else if (sections.includes(anchor)) scrollToSection(anchor);
    };
    const schedule = () => {
      cancelPendingScroll();
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(navigate);
    };
    const initial = () => {
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (!disposed) frame = requestAnimationFrame(schedule);
      });
    };
    if (document.readyState === 'complete') initial();
    else window.addEventListener('load', initial, { once: true });
    window.addEventListener('hashchange', schedule);
    window.addEventListener('popstate', schedule);
    return () => {
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      cancelPendingScroll();
      window.removeEventListener('load', initial);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('popstate', schedule);
    };
  }, []);
  return null;
}
