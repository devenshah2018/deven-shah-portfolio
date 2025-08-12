import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { ExperienceSection } from '../components/experience-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, whileInView, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, whileInView, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, whileInView, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Briefcase: () => <div data-testid='briefcase-icon' />,
  ExternalLink: () => <div data-testid='external-link-icon' />,
  MapPin: () => <div data-testid='map-pin-icon' />,
  Calendar: () => <div data-testid='calendar-icon' />,
  ChevronDown: () => <div data-testid='chevron-down-icon' />,
  ChevronUp: () => <div data-testid='chevron-up-icon' />,
  Star: () => <div data-testid='star-icon' />,
}));

describe('ExperienceSection Component', () => {
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

    render(<ExperienceSection />);
  });

  it('renders the experience section', () => {
    const heading = screen.getByRole('heading', { name: /professional journey/i });
    expect(heading).toBeInTheDocument();
  });
});
