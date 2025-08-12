import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Footer } from '../components/footer';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid='github-icon' />,
  Linkedin: () => <div data-testid='linkedin-icon' />,
  Mail: () => <div data-testid='mail-icon' />,
  ArrowUp: () => <div data-testid='arrow-up-icon' />,
}));

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });

    render(<Footer />);
  });

  it('renders the footer', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays name and title', () => {
    expect(screen.getByText('Deven Shah')).toBeInTheDocument();
    expect(screen.getByText(/co-founder\/cto at suno analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/graduate mscs student at boston university/i)).toBeInTheDocument();
  });

  it('displays social media links', () => {
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });
    const emailLink = screen.getByRole('link', { name: /mail/i });

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();

    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/devenshah');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/devenshah');
    expect(emailLink).toHaveAttribute('href', 'mailto:devenshah2018@gmail.com');
  });

  it('has scroll to top functionality', async () => {
    const user = userEvent.setup();
    const scrollButton = screen.getByRole('button');

    await user.click(scrollButton);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('displays copyright information', () => {
    expect(screen.getByText(/© 2024 deven shah/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it('displays technology stack', () => {
    expect(screen.getByText(/built with next\.js/i)).toBeInTheDocument();
    expect(screen.getByText(/typescript/i)).toBeInTheDocument();
    expect(screen.getByText(/tailwind css/i)).toBeInTheDocument();
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
