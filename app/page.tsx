import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { ContactSection } from '@/components/contact/contact-section';
import { generateWebsiteSchema, serializeJsonLd } from '@/lib/jsonld';
import { HashNavigation } from '@/components/hash-navigation';

export default function HomePage() {
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <HashNavigation />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
      <main className='min-h-screen'>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsIndex />
        <ContactSection />
      </main>
    </>
  );
}
