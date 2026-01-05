'use client';

import { Navigation } from '@/components/header/navigation';
import { Footer } from '@/components/footer/footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
