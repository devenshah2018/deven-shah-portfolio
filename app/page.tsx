'use client';

import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { EducationSection } from '@/components/education/education-section';
import { ContactSection } from '@/components/contact/contact-section';
import { generatePersonSchema } from '@/lib/jsonld';
import { scrollToProject, scrollToExperience } from '@/lib/url-utils';
import { useEffect } from 'react';

export default function HomePage() {
  const personSchema = generatePersonSchema();

  // Handle hash-based navigation from research subdomain
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        if (projectId) {
          scrollToProject(projectId);
        }
      } else if (hash && hash.startsWith('#experience-')) {
        const experienceId = hash.replace('#experience-', '');
        if (experienceId) {
          scrollToExperience(experienceId);
        }
      }
    };

    // Handle initial load with hash (including cross-domain navigation)
    const handleInitialLoad = () => {
      if (window.location.hash) {
        // Wait for page to fully load and components to render
        // Use multiple timeouts to ensure DOM is ready
        setTimeout(() => {
          if (document.readyState === 'complete') {
            handleHashNavigation();
          } else {
            window.addEventListener('load', handleHashNavigation, { once: true });
          }
        }, 100);
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
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </>
  );
}
