import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AboutSection } from '../components/about-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, whileInView, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileInView, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, whileInView, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

// Mock RotatingTweets component
jest.mock('../components/rotating-tweets', () => ({
  RotatingTweets: () => <div data-testid='rotating-tweets'>Rotating Tweets</div>,
}));

describe('AboutSection Component', () => {
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

    render(<AboutSection />);
  });

  it('renders the about section', () => {
    const heading = screen.getByRole('heading', { name: /about me/i });
    expect(heading).toBeInTheDocument();
  });
});
