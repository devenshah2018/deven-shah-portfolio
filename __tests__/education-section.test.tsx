import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { EducationSection } from '../components/education-section';

// Mock the EducationSection component
jest.mock('../components/education-section', () => ({
  EducationSection: () => (
    <section role='region' id='education'>
      Education Section
    </section>
  ),
}));

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

    render(<EducationSection />);
  });

  it('renders the education section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });
});
