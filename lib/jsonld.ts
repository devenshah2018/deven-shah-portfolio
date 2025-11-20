import { LINKS, EXPERIENCES, EDUCATION, PROJECTS } from './content-registry';
import type { ResearchPaper } from './types';

const BASE_URL = 'https://deven-shah.com';

export function generatePersonSchema() {
  const sunoExperience = EXPERIENCES.find(exp => exp.id === 'suno-analytics');
  const buEducation = EDUCATION.find(edu => edu.id === 'bu-masters');
  const sjsuEducation = EDUCATION.find(edu => edu.id === 'sjsu-bachelors');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Deven Shah',
    jobTitle: 'Co-Founder & CTO',
    url: BASE_URL,
    image: `${BASE_URL}/linkedin-profile.jpeg`,
    description: 'Co-founder & CTO of Suno Analytics and Graduate MSCS student at Boston University',
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

export function generateArticleSchema(paper: ResearchPaper) {
  const relatedProject = paper.relatedProjectId
    ? PROJECTS.find(p => p.id === paper.relatedProjectId)
    : null;

  // Parse date from paper.date (format: "December 2022")
  const dateMatch = paper.date.match(/(\w+)\s+(\d{4})/);
  let datePublished = '';
  if (dateMatch) {
    const monthMap: Record<string, string> = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    const month = monthMap[dateMatch[1]!] || '01';
    datePublished = `${dateMatch[2]}-${month}-01`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    description: paper.abstract?.substring(0, 200) || paper.title,
    datePublished: datePublished || paper.sortDate,
    dateModified: datePublished || paper.sortDate,
    author: {
      '@type': 'Person',
      name: 'Deven Shah',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: paper.institution || 'Deven Shah',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/linkedin-profile.jpeg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#education`,
    },
    url: paper.pdfUrl,
    keywords: paper.keywords?.join(', ') || '',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    ...(relatedProject && {
      about: {
        '@type': 'Thing',
        name: relatedProject.title || '',
      },
    }),
  };
}

