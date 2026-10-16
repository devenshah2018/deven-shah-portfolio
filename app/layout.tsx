import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { ConditionalLayout } from '@/components/conditional-layout';
import { HOME_URL, SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Deven Shah',
  },
  description: SITE_DESCRIPTION,
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
  authors: [{ name: SITE_NAME, url: HOME_URL }],
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
    url: HOME_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/thumbnail.png`,
        width: 2370,
        height: 1776,
        alt: 'Deven Shah - Software Engineer & AI Researcher',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: '@devenshah2018',
    site: '@devenshah2018',
    images: [`${SITE_URL}/thumbnail.png`],
  },
  alternates: {
    canonical: HOME_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/rss`,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
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
    google: process.env['GOOGLE_SITE_VERIFICATION'] || undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
