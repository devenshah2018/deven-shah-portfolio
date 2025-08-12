import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { QodeIdeModal } from '../components/qode-ide-modal';

// Mock global WebAssembly and other browser APIs
global.WebAssembly = {
  instantiate: jest.fn(),
  Module: jest.fn(),
} as any;

Object.defineProperty(window, 'Worker', {
  value: jest.fn().mockImplementation(() => ({
    postMessage: jest.fn(),
    terminate: jest.fn(),
    addEventListener: jest.fn(),
  })),
});

describe('QodeIdeModal Component', () => {
  const defaultProps = {
    open: false,
    onOpenChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when open is true', () => {
    render(<QodeIdeModal {...defaultProps} open={true} />);
    expect(screen.getByText(/qode ide/i)).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<QodeIdeModal {...defaultProps} open={false} />);
    expect(screen.queryByText(/qode ide/i)).not.toBeInTheDocument();
  });

  it('displays code editor area', () => {
    render(<QodeIdeModal {...defaultProps} open={true} />);
    expect(screen.getByText(/editor/i)).toBeInTheDocument();
  });

  it('has run button functionality', async () => {
    const user = userEvent.setup();
    render(<QodeIdeModal {...defaultProps} open={true} />);

    const runButton = screen.getByRole('button', { name: /run/i });
    expect(runButton).toBeInTheDocument();

    await user.click(runButton);
    // Button should be disabled while running
    expect(runButton).toBeDisabled();
  });

  it('displays examples panel toggle', async () => {
    const user = userEvent.setup();
    render(<QodeIdeModal {...defaultProps} open={true} />);

    const examplesButton = screen.getByText(/examples/i);
    expect(examplesButton).toBeInTheDocument();

    await user.click(examplesButton);
    expect(screen.getByText(/code examples/i)).toBeInTheDocument();
  });
});
