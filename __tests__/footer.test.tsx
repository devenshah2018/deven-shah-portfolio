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
});
