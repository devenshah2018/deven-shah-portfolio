import { HeroSection } from '@/components/hero/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { ProjectsSection } from '@/components/projects/projects-section';
import { EducationSection } from '@/components/education/education-section';
import { ContactSection } from '@/components/contact/contact-section';

export default function HomePage() {
  return (
    <main className='min-h-screen'>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
