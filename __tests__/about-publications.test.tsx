import { render, screen } from '@testing-library/react';
import { ResearchSection } from '@/components/research/research-section';
it('credits the published paper accurately in Research', () => {
  render(<ResearchSection />);
  expect(screen.getByText('IOS Press')).toBeInTheDocument();
  expect(screen.getByText(/Co-author/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Detecting Deepfakes/ })).toHaveAttribute(
    'href',
    'https://ebooks.iospress.nl/doi/10.3233/FAIA261168'
  );
});
