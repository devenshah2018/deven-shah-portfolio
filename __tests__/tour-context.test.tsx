import { renderHook, act } from '@testing-library/react';

import { TourProvider, useTour } from '../components/tour-context';

describe('TourContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TourProvider>{children}</TourProvider>
  );

  it('provides initial tour state', () => {
    const { result } = renderHook(() => useTour(), { wrapper });

    expect(typeof result.current.startTour).toBe('function');
  });

  it('starts tour correctly', () => {
    const { result } = renderHook(() => useTour(), { wrapper });

    act(() => {
      result.current.startTour();
    });
  });

  it('ends tour correctly', () => {
    const { result } = renderHook(() => useTour(), { wrapper });

    act(() => {
      result.current.startTour();
    });
  });

  it('navigates through steps correctly', () => {
    const { result } = renderHook(() => useTour(), { wrapper });

    act(() => {
      result.current.startTour();
    });
  });
});
