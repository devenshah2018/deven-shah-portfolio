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
    // Mock document methods
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => ({
        scrollIntoView: jest.fn(),
      })),
      writable: true,
    });

    Object.defineProperty(document, 'createElement', {
      value: jest.fn(() => ({
        href: '',
        download: '',
        click: jest.fn(),
      })),
      writable: true,
    });

    Object.defineProperty(document.body, 'appendChild', {
      value: jest.fn(),
      writable: true,
    });

    Object.defineProperty(document.body, 'removeChild', {
      value: jest.fn(),
      writable: true,
    });

    render(<HeroSection />);
  });

  it('renders the hero section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'hero');
  });

  it('displays the main heading', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Deven Shah')).toBeInTheDocument();
  });

  it('displays the subtitle', () => {
    expect(screen.getByText(/co-founder\/cto/i)).toBeInTheDocument();
    expect(screen.getByText(/graduate mscs student/i)).toBeInTheDocument();
  });

  it('displays the description', () => {
    expect(screen.getByText(/shaping the next generation/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics.*quantum computing.*secure systems/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download resume/i })).toBeInTheDocument();
  });

  it('renders social media links', () => {
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('handles contact button click', async () => {
    const user = userEvent.setup();
    const contactButton = screen.getByRole('button', { name: /get in touch/i });

    await user.click(contactButton);
    expect(document.getElementById).toHaveBeenCalledWith('contact');
  });

  it('handles resume download', async () => {
    const user = userEvent.setup();
    const downloadButton = screen.getByRole('button', { name: /download resume/i });

    await user.click(downloadButton);
    expect(document.createElement).toHaveBeenCalledWith('a');
  });

  it('renders GitHub calendar', () => {
    expect(screen.getByTestId('github-calendar')).toBeInTheDocument();
  });

  it('has proper external link attributes', () => {
    const externalLinks = screen
      .getAllByRole('link')
      .filter(link => link.getAttribute('href')?.startsWith('http'));

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
