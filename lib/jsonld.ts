import { LINKS, EXPERIENCES, EDUCATION, hasFutureStart } from '@/database/content-registry';
import { HOME_URL, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './seo';

export function generatePersonSchema() {
  const currentEmployers = EXPERIENCES.filter(
    experience => /Present/i.test(experience.period) && !hasFutureStart(experience.period)
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': HOME_URL + '#person',
    name: SITE_NAME,
    jobTitle: 'Software Engineer & AI Researcher',
    url: HOME_URL,
    image: SITE_URL + '/profile.jpg',
    description: SITE_DESCRIPTION,
    sameAs: [LINKS.linkedin, LINKS.github, LINKS.x, LINKS.kaggle, LINKS.strava, LINKS.hevy],
    email: LINKS.email,
    worksFor: [
      ...new Map(currentEmployers.map(experience => [experience.company, experience])).values(),
    ].map(experience => ({
      '@type': 'Organization',
      name: experience.company,
      url: experience.link,
    })),
    alumniOf: EDUCATION.filter(education => !education.isActive).map(education => ({
      '@type': 'CollegeOrUniversity',
      name: education.institution,
    })),
  };
}

export function generateWebsiteSchema() {
  const { '@context': _context, ...person } = generatePersonSchema();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': HOME_URL + '#website',
        url: HOME_URL,
        name: SITE_NAME,
        alternateName: 'Deven Shah Portfolio',
        publisher: { '@id': person['@id'] },
      },
      {
        '@type': 'ProfilePage',
        '@id': HOME_URL + '#profile',
        url: HOME_URL,
        name: SITE_NAME + ' — Software Engineer & AI Researcher',
        description: SITE_DESCRIPTION,
        isPartOf: { '@id': HOME_URL + '#website' },
        mainEntity: person,
      },
    ],
  };
}

/** Keep future content containing HTML from closing the JSON-LD script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
