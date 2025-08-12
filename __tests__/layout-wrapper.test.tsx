import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { LayoutWrapper } from '../components/layout-wrapper';

// Mock Next.js font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
  }),
}));

describe('LayoutWrapper Component', () => {
  it('renders children correctly', () => {
    render(
      <LayoutWrapper>
        <div data-testid='child-content'>Test Content</div>
      </LayoutWrapper>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <LayoutWrapper>
        <div>Content</div>
      </LayoutWrapper>
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('min-h-screen');
  });
});
