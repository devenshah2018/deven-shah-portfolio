import { render, screen, within } from '@testing-library/react';
import { AboutSection } from '@/components/about/about-section';

jest.mock('@/components/hero/github-contribution-chart', () => ({
  GitHubContributionChart: () => null,
}));
jest.mock('@/components/about/skills-explorer', () => ({ SkillsExplorer: () => null }));

it('presents the published paper in About with an accurate credit and publisher link', () => {
  render(<AboutSection />);
  const publications = screen.getByRole('region', { name: 'Publications' });
  const link = within(publications).getByRole('link', {
    name: 'Detecting Deepfakes for the Courtroom: A Multi-Modal Forensic Output Framework',
  });
  expect(link).toHaveAttribute('href', 'https://ebooks.iospress.nl/doi/10.3233/FAIA261168');
  expect(publications).toHaveTextContent('Co-author · 2026 · IOS Press');
  expect(publications).toHaveTextContent('Intelligent Digital Forensics and Cybersecurity');
  expect(publications).not.toHaveTextContent('79 deepfake detection methods');
  expect(screen.queryByText(/financial fraud detection/)).not.toBeInTheDocument();
});
