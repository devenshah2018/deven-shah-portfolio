import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { RotatingTweets } from '../components/rotating-tweets';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

describe('RotatingTweets Component', () => {
  it('renders without crashing', () => {
    render(<RotatingTweets />);
    expect(screen.getByText(/deven shah/i)).toBeInTheDocument();
  });

  it('displays tweet content', () => {
    render(<RotatingTweets />);
    // Check for Twitter-like structure
    expect(screen.getByText(/@devenshah2018/i)).toBeInTheDocument();
  });

  it('has Twitter profile image', () => {
    render(<RotatingTweets />);
    const profileImage = screen.getByAltText(/deven shah/i);
    expect(profileImage).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<RotatingTweets className='custom-class' />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
