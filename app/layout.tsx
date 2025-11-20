import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { TourProvider } from '@/components/tour/tour-context';
import { JobMatchProvider } from '@/components/job-match/job-match-context';
import { LayoutWrapper } from '@/components/layout-wrapper';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = 'https://deven-shah.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  title: {
    default: 'Deven Shah | Co-Founder & CTO at Suno Analytics',
    template: '%s | Deven Shah',
  },
  description:
    'Portfolio of Deven Shah, Co-founder & CTO of Suno Analytics and Graduate MSCS student at Boston University. Software engineer specializing in full-stack development, AI/ML, and cloud infrastructure.',
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
    title: 'Deven Shah | Co-Founder & CTO at Suno Analytics',
    description:
      'Portfolio of Deven Shah, Co-founder & CTO of Suno Analytics and Graduate MSCS student at Boston University.',
    images: [
      {
        url: `${BASE_URL}/linkedin-profile.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Deven Shah - Co-Founder & CTO at Suno Analytics',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deven Shah | Co-Founder & CTO at Suno Analytics',
    description:
      'Portfolio of Deven Shah, Co-founder & CTO of Suno Analytics and Graduate MSCS student at Boston University.',
    creator: '@devenshah2018',
    site: '@devenshah2018',
    images: [`${BASE_URL}/linkedin-profile.jpeg`],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className={inter.className}>
        {process.env.NODE_ENV === 'production' && (
          <GoogleTagManager gtmId='GTM-MQBDDCBQ' />
        )}
        <JobMatchProvider>
          <TourProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Analytics />
          </TourProvider>
        </JobMatchProvider>
      </body>
    </html>
  );
}
