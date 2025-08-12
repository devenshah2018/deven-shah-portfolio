import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TourProvider } from '../components/tour-context';
import { GuidedTour } from '../components/guided-tour';

describe('GuidedTour Component', () => {
  const renderWithTourProvider = (ui: React.ReactElement) => {
    return render(<TourProvider>{ui}</TourProvider>);
  };

  it('renders without crashing', () => {
    renderWithTourProvider(<GuidedTour />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes when active', () => {
    // This test would need the tour to be active
    // We'll implement this when we can mock the tour state
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithTourProvider(<GuidedTour />);

    // Test escape key functionality would be implemented here
    // when tour is active
  });
});
