import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { ProjectsSection } from '../components/projects-section';

// Mock QodeIdeModal component
jest.mock('../components/qode-ide-modal', () => ({
  QodeIdeModal: ({
    open,
    onOpenChange,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => (
    <div data-testid='qode-ide-modal' data-open={open}>
      <button onClick={() => onOpenChange(false)}>Close Modal</button>
    </div>
  ),
}));

describe('ProjectsSection Component', () => {
  it('renders the projects section', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/featured projects/i)).toBeInTheDocument();
  });
});
