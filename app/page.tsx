'use client';

import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { ProjectsHorizontalSection } from '@/components/projects/projects-horizontal-section';
import { ContactSection } from '@/components/contact/contact-section';
import { generatePersonSchema } from '@/lib/jsonld';
import { scrollToProject, requestScrollToExperience, scrollToEducation } from '@/lib/url-utils';
import { useEffect } from 'react';

export default function HomePage() {
  const personSchema = generatePersonSchema();

  // Handle hash-based navigation from research subdomain, papers page, etc.
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      // Check sessionStorage first (set by papers page for reliable shine effect)
      const projectFromPaper = typeof window !== 'undefined' ? sessionStorage.getItem('scrollToProjectWithShine') : null;
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
      } else if (hash === '#education') {
        const section = document.getElementById('education');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Handle initial load with hash (including cross-domain navigation from papers, etc.)
    const handleInitialLoad = () => {
      const hasProjectHash = window.location.hash.startsWith('#project-');
      const hasProjectFromPaper = typeof window !== 'undefined' && !!sessionStorage.getItem('scrollToProjectWithShine');
      if (window.location.hash || hasProjectFromPaper) {
        // Wait for Projects section to render; papers navigation needs extra time
        const delay = (hasProjectHash || hasProjectFromPaper) ? 450 : 100;
        setTimeout(() => {
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
      window.removeEventListener('hashchange', handleHashNavigation);
      window.removeEventListener('load', handleHashNavigation);
    };
  }, []);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <main className='min-h-screen'>
        <HeroSection />
        {/* Scroll target for #contact - placed after hero so nav doesn't scroll to bottom */}
        <div id="contact" className="relative scroll-mt-20" aria-hidden />
        <AboutSection />
        <ExperienceSection />
        <ProjectsHorizontalSection />
        <ContactSection />
      </main>
    </>
  );
}
