'use client';

import {
  scrollToProject,
  requestScrollToExperience,
  scrollToEducation,
  scrollToSection,
} from '@/lib/url-utils';
import { useEffect } from 'react';

export function HashNavigation() {
  // Handle hash-based navigation from research subdomain, papers page, etc.
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      // Check sessionStorage first (set by papers page for reliable shine effect)
      const projectFromPaper =
        typeof window !== 'undefined' ? sessionStorage.getItem('scrollToProjectWithShine') : null;
      if (projectFromPaper) {
        sessionStorage.removeItem('scrollToProjectWithShine');
        scrollToProject(projectFromPaper);
        return;
      }
      if (hash && hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        if (projectId) {
          scrollToProject(projectId);
        }
      } else if (hash && hash.startsWith('#experience-')) {
        const experienceId = hash.replace('#experience-', '');
        if (experienceId) {
          requestScrollToExperience(experienceId);
        }
      } else if (hash && hash.startsWith('#education-')) {
        const educationId = hash.replace('#education-', '');
        if (educationId) {
          scrollToEducation(educationId);
        }
      } else if (
        ['#hero', '#about', '#experience', '#education', '#projects', '#contact'].includes(hash)
      ) {
        scrollToSection(hash.slice(1));
      }
    };

    let initialTimer: ReturnType<typeof setTimeout> | undefined;

    // Handle initial load with hash (including cross-domain navigation from papers, etc.)
    const handleInitialLoad = () => {
      const hasProjectHash = window.location.hash.startsWith('#project-');
      const hasProjectFromPaper =
        typeof window !== 'undefined' && !!sessionStorage.getItem('scrollToProjectWithShine');
      if (window.location.hash || hasProjectFromPaper) {
        // Wait for Projects section to render; papers navigation needs extra time
        const delay = hasProjectHash || hasProjectFromPaper ? 450 : 100;
        initialTimer = setTimeout(() => {
          if (document.readyState === 'complete') {
            handleHashNavigation();
          } else {
            window.addEventListener('load', handleHashNavigation, { once: true });
          }
        }, delay);
      }
    };

    handleInitialLoad();

    // Handle hash changes (e.g., when clicking link from research subdomain)
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('load', handleHashNavigation);
    };
  }, []);

  return null;
}
