'use client';

import { Navigation } from '@/components/header/navigation';
import { Footer } from '@/components/footer/footer';
import { GuidedTour } from '@/components/tour/guided-tour';
import { useTour } from '@/components/tour/tour-context';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { startTour } = useTour();

  return (
    <>
      <Navigation onStartTour={startTour} />
      {children}
      <Footer />
      <GuidedTour />
    </>
  );
}
