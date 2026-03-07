import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { ConditionalLayout } from '@/components/conditional-layout';
import { headers } from 'next/headers';

const BASE_URL = 'https://deven-shah.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Deven Shah | Software Engineer & AI Researcher',
    template: '%s | Deven Shah',
  },
  description:
    'M.S. Computer Science student (AI & ML concentration) at Boston University. Shaping the next generation of AI-driven analytics, intelligent systems, and scalable solutions. Specializing in building scalable systems, leading teams, and optimizing client-focused solutions.',
  keywords: [
    'Deven Shah',
    'Software Engineer',
    'CTO',
    'Suno Analytics',
    'Portfolio',
    'Patelco',
    'NetApp',
    'Boston University',
    'Full Stack Developer',
    'AI/ML',
    'Machine Learning',
    'React',
    'TypeScript',
    'Python',
  ],
  authors: [{ name: 'Deven Shah', url: BASE_URL }],
  creator: 'Deven Shah',
  publisher: 'Deven Shah',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Deven Shah',
    title: 'Deven Shah | Software Engineer & AI Researcher',
    description:
      'M.S. Computer Science student (AI & ML concentration) at Boston University. Shaping the next generation of AI-driven analytics, intelligent systems, and scalable solutions.',
    images: [
      {
        url: `${BASE_URL}/thumbnail.png`,
        width: 1200,
        height: 630,
        alt: 'Deven Shah - Software Engineer & AI Researcher',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deven Shah | Software Engineer & AI Researcher',
    description:
      'M.S. Computer Science student (AI & ML concentration) at Boston University. Shaping the next generation of AI-driven analytics, intelligent systems, and scalable solutions.',
    creator: '@devenshah2018',
    site: '@devenshah2018',
    images: [`${BASE_URL}/thumbnail.png`],
  },
  alternates: {
    canonical: BASE_URL,
    types: {
      'application/rss+xml': `${BASE_URL}/rss`,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    shortcut: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
  },
  applicationName: 'Deven Shah Portfolio',
  appleWebApp: {
    title: 'Deven Shah',
    statusBarStyle: 'default',
    capable: true,
  },
  verification: {
    // Placeholder structure - add actual verification codes when available
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // yandex: ['YOUR_YANDEX_VERIFICATION_CODE'],
    // other: {
    //   'msvalidate.01': ['YOUR_BING_VERIFICATION_CODE'],
    //   'facebook-domain-verification': ['YOUR_FACEBOOK_VERIFICATION_CODE'],
    // },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  // If on research subdomain, use minimal layout with brutalist styling
  if (subdomain === 'research') {
    return (
      <html lang='en' className='dark' suppressHydrationWarning>
        <body className={`${GeistSans.className} bg-[#141414] text-[#f5f5f0] antialiased`}>
          {process.env.NODE_ENV === 'production' && (
            <GoogleTagManager gtmId='GTM-MQBDDCBQ' />
          )}
          {children}
          <Analytics />
        </body>
      </html>
    );
  }

  // Otherwise, use full portfolio layout
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className={`${GeistSans.className} bg-[#141414] text-[#f5f5f0]`}>
        {process.env.NODE_ENV === 'production' && (
          <GoogleTagManager gtmId='GTM-MQBDDCBQ' />
        )}
        <ConditionalLayout>{children}</ConditionalLayout>
        <Analytics />
      </body>
    </html>
  );
}
