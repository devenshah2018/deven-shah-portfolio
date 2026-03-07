'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/header/navigation';
import { Footer } from '@/components/footer/footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isPaperPage = pathname?.startsWith('/papers');

  return (
    <>
      {!isPaperPage && <Navigation />}
      {children}
      {!isPaperPage && <Footer />}
    </>
  );
}
