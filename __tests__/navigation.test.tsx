import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Navigation } from '../components/navigation';

// Mock the TourContext
jest.mock('@/components/tour-context', () => ({
  useTour: () => ({
    startTour: jest.fn(),
    isActive: false,
  }),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe('Navigation Component', () => {
  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 50,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      writable: true,
    });

    render(<Navigation />);
  });

  it('renders the navigation component', () => {
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('displays the tour button', () => {
    expect(screen.getByText('Take Tour')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('has mobile navigation button', () => {
    const mobileButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(mobileButton).toBeInTheDocument();
  });
});
