import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FloatingName } from '../components/floating-name';

describe('FloatingName Component', () => {
  it('renders without crashing', () => {
    render(<FloatingName />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('displays floating letters', () => {
    render(<FloatingName />);
    // Check if floating animation elements are present
    const floatingElement = screen.getByRole('presentation');
    expect(floatingElement).toHaveClass('absolute');
  });
});
