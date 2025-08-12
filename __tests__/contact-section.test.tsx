import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { ContactSection } from '../components/contact-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileInView, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, whileInView, ...props }: any) => <section {...props}>{children}</section>,
    p: ({ children, whileInView, ...props }: any) => <p {...props}>{children}</p>,
  },
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

    render(<ContactSection />);
  });

  it('renders the contact section', () => {
    const heading = screen.getByRole('heading', { name: /let's connect/i });
    expect(heading).toBeInTheDocument();
  });
});
