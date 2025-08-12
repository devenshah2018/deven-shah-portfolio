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

  it('displays project cards', () => {
    render(<ProjectsSection />);
    // Check for common project elements
    expect(screen.getByText(/portfolio website/i)).toBeInTheDocument();
    expect(screen.getByText(/qode/i)).toBeInTheDocument();
  });

  it('handles show all projects toggle', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);

    const showAllButton = screen.queryByText(/show all projects/i);
    if (showAllButton) {
      await user.click(showAllButton);
      expect(screen.getByText(/show less projects/i)).toBeInTheDocument();
    }
  });

  it('opens Qode IDE modal when Qode project is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection />);

    const qodeButton = screen.getByText(/try qode ide/i);
    await user.click(qodeButton);

    expect(screen.getByTestId('qode-ide-modal')).toHaveAttribute('data-open', 'true');
  });
});
