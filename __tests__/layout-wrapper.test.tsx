import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TourProvider } from '../components/tour-context';
import { LayoutWrapper } from '../components/layout-wrapper';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Navigation component
jest.mock('../components/navigation', () => ({
  Navigation: () => <nav data-testid='navigation'>Navigation</nav>,
}));

describe('LayoutWrapper Component', () => {
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

    render(
      <TourProvider>
        <LayoutWrapper>
          <div data-testid='child-content'>Test Content</div>
        </LayoutWrapper>
      </TourProvider>
    );
  });

  it('renders children correctly', () => {
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
