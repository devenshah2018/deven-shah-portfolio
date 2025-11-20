import { MetadataRoute } from 'next';

const BASE_URL = 'https://deven-shah.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

