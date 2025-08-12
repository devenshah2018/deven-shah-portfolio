import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { EducationSection } from '../components/education-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid='graduation-cap-icon' />,
  Award: () => <div data-testid='award-icon' />,
  ExternalLink: () => <div data-testid='external-link-icon' />,
  ChevronDown: () => <div data-testid='chevron-down-icon' />,
  ChevronUp: () => <div data-testid='chevron-up-icon' />,
}));

describe('EducationSection Component', () => {
  beforeEach(() => {
    render(<EducationSection />);
  });

  it('renders the education section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'education');
  });

  it('has tab navigation between education and certifications', () => {
    const educationTab = screen.getByRole('tab', { name: /education/i });
    const certificationsTab = screen.getByRole('tab', { name: /certifications/i });

    expect(educationTab).toBeInTheDocument();
    expect(certificationsTab).toBeInTheDocument();
  });

  it('allows switching between tabs', async () => {
    const user = userEvent.setup();
    const certificationsTab = screen.getByRole('tab', { name: /certifications/i });

    await user.click(certificationsTab);
    expect(certificationsTab).toHaveAttribute('aria-selected', 'true');
  });
});
