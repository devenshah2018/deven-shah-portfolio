import { LINKS, EXPERIENCES, EDUCATION } from '../database/content-registry';

const BASE_URL = 'https://deven-shah.com';

export function generatePersonSchema() {
  const sunoExperience = EXPERIENCES.find(exp => exp.id === 'suno-analytics');
  const buEducation = EDUCATION.find(edu => edu.id === 'bu-masters');
  const sjsuEducation = EDUCATION.find(edu => edu.id === 'sjsu-bachelors');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Deven Shah',
    jobTitle: 'Software Engineer & AI Researcher',
    url: BASE_URL,
    image: `${BASE_URL}/thumbnail.png`,
    description: 'M.S. Computer Science student at Boston University. Shaping the next generation of AI-driven analytics, intelligent systems, and scalable solutions.',
    sameAs: [
      LINKS.linkedin,
      LINKS.github,
      LINKS.x,
      LINKS.kaggle,
      LINKS.strava,
      LINKS.hevy,
    ],
    email: LINKS.email,
    worksFor: sunoExperience
      ? {
          '@type': 'Organization',
          name: sunoExperience.company,
          url: sunoExperience.link,
        }
      : undefined,
    alumniOf: [
      buEducation
        ? {
            '@type': 'EducationalOrganization',
            name: buEducation.institution,
            url: 'https://www.bu.edu',
          }
        : null,
      sjsuEducation
        ? {
            '@type': 'EducationalOrganization',
            name: sjsuEducation.institution,
            url: 'https://www.sjsu.edu',
          }
        : null,
    ].filter(Boolean),
  };
}

