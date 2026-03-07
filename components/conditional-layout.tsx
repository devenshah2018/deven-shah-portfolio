'use client';

import { usePathname } from 'next/navigation';
import { LayoutWrapper } from '@/components/layout-wrapper';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * On paper PDF view pages, render only the page content (no global Nav/Footer).
 * On all other pages, use the full LayoutWrapper with Navigation and Footer.
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isPaperPage = pathname?.startsWith('/papers');

  if (isPaperPage) {
    return <>{children}</>;
  }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
