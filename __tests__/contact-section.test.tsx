import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { ContactSection } from '../components/contact-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock @calcom/embed-react
jest.mock('@calcom/embed-react', () => ({
  getCalApi: jest.fn(() =>
    Promise.resolve({
      ui: jest.fn(),
    })
  ),
}));

// Mock FontAwesome
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, ...props }: any) => <span data-testid='font-awesome-icon' {...props} />,
}));

jest.mock('@fortawesome/free-brands-svg-icons', () => ({
  faXTwitter: 'faXTwitter',
}));

describe('ContactSection Component', () => {
  beforeEach(() => {
    render(<ContactSection />);
  });

  it('renders the contact section', () => {
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'contact');
  });
});
