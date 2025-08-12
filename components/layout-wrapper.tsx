'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { GuidedTour } from '@/components/guided-tour';
import { useTour } from '@/components/tour-context';

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
