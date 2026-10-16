import { MetadataRoute } from 'next';
import { PROJECTS } from '@/database/content-registry';
import { HOME_URL, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Hash sections are part of the homepage, not separately indexable pages.
  // Omit lastModified until we track actual content revisions rather than build dates.
  const papers = [...new Set(PROJECTS.flatMap(project => (project.paper ? [project.paper] : [])))];
  return [{ url: HOME_URL }, ...papers.map(paper => ({ url: SITE_URL + paper }))];
}
