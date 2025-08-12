import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { HeroSection } from '../components/hero-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock dynamic import for GitHub calendar
jest.mock('next/dynamic', () => () => {
  const MockGitHubCalendar = () => <div data-testid='github-calendar' />;
  return MockGitHubCalendar;
});

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Activity: () => <div data-testid='activity-icon' />,
  Download: () => <div data-testid='download-icon' />,
  Github: () => <div data-testid='github-icon' />,
  Linkedin: () => <div data-testid='linkedin-icon' />,
  Mail: () => <div data-testid='mail-icon' />,
}));

// Mock FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, ...props }: any) => <span data-testid='font-awesome-icon' {...props} />,
}));

jest.mock('@fortawesome/free-brands-svg-icons', () => ({
  faXTwitter: 'faXTwitter',
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('HeroSection Component', () => {
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

    render(<HeroSection />);
  });

  it('renders the hero section', () => {
    const section = screen.getByRole('paragraph');
    expect(section).toBeInTheDocument();
  });
});
