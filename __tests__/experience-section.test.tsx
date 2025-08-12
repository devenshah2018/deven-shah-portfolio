import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { ExperienceSection } from '../components/experience-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
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
}));

describe('ExperienceSection Component', () => {
  beforeEach(() => {
    render(<ExperienceSection />);
  });

  it('renders the experience section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'experience');
  });

  it('displays experience entries', () => {
    expect(screen.getByText(/suno analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/co-founder & cto/i)).toBeInTheDocument();
    expect(screen.getByText(/patelco/i)).toBeInTheDocument();
    expect(screen.getByText(/application developer/i)).toBeInTheDocument();
    expect(screen.getByText(/netapp/i)).toBeInTheDocument();
    expect(screen.getByText(/solutions architect intern/i)).toBeInTheDocument();
  });

  it('displays company information', () => {
    expect(screen.getByText(/remote/i)).toBeInTheDocument();
    expect(screen.getByText(/dublin, ca/i)).toBeInTheDocument();
    expect(screen.getByText(/san jose, ca/i)).toBeInTheDocument();
  });

  it('displays time periods', () => {
    expect(screen.getByText(/12\/2024 – present/i)).toBeInTheDocument();
    expect(screen.getByText(/04\/2023 – 04\/2024/i)).toBeInTheDocument();
    expect(screen.getByText(/05\/2021 – 12\/2022/i)).toBeInTheDocument();
  });

  it('shows achievements for each role', () => {
    expect(screen.getByText(/langraph/i)).toBeInTheDocument();
    expect(screen.getByText(/azure/i)).toBeInTheDocument();
    expect(screen.getByText(/oracle/i)).toBeInTheDocument();
  });

  it('has expand/collapse functionality', async () => {
    const user = userEvent.setup();
    const expandButton = screen.getByRole('button', { name: /show all experience/i });

    expect(expandButton).toBeInTheDocument();
    await user.click(expandButton);

    expect(screen.getByRole('button', { name: /show less experience/i })).toBeInTheDocument();
  });

  it('displays company logos', () => {
    // Test that logo images are present
    expect(screen.getByAltText(/suno analytics/i)).toBeInTheDocument();
    expect(screen.getByAltText(/patelco/i)).toBeInTheDocument();
    expect(screen.getByAltText(/netapp/i)).toBeInTheDocument();
  });
});
