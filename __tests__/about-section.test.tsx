import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AboutSection } from '../components/about-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}));

describe('AboutSection Component', () => {
  beforeEach(() => {
    render(<AboutSection />);
  });

  it('renders the about section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('displays skills categories', () => {
    // Test that the component renders skill categories
    expect(screen.getByText(/languages/i)).toBeInTheDocument();
    expect(screen.getByText(/platforms/i)).toBeInTheDocument();
    expect(screen.getByText(/frameworks/i)).toBeInTheDocument();
  });

  it('displays individual skills', () => {
    // Test some key skills are rendered
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'about');
  });
});
