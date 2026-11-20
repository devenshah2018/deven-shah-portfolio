import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AboutSection } from '@/components/about/about-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { ResearchSection } from '@/components/research/research-section';
import {
  PROJECTS,
  SKILL_MAPPINGS,
  ORGANIZATIONS,
  LINKS,
  groupExperiencesByOrg,
} from '@/database/content-registry';
import { requestScrollToExperience, cancelPendingScroll } from '@/lib/url-utils';

beforeEach(() => {
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

jest.mock('@/components/hero/github-contribution-chart', () => ({
  GitHubContributionChart: () => null,
}));

afterEach(() => {
  cancelPendingScroll();
  jest.useRealTimers();
});

it('keeps education in About, coursework collapsed, and removes the graph and publication block', async () => {
  const user = userEvent.setup();
  render(<AboutSection />);
  expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument();
  expect(
    screen.queryByText(/I’m a software engineer and AI researcher completing/)
  ).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Publications' })).not.toBeInTheDocument();
  expect(screen.queryByRole('tab', { name: 'Graph' })).not.toBeInTheDocument();
  const course = screen.getByText('Advanced Machine Learning and Neural Networks');
  expect(course).not.toBeVisible();
  expect(course.closest('details')).not.toHaveAttribute('open');
  expect(screen.getByLabelText('Previous workplaces')).toBeInTheDocument();
});

it('shows only five companies with their detailed roles and allows expanding and collapsing older experience', async () => {
  const user = userEvent.setup();
  render(<ExperienceSection />);
  expect(screen.getAllByRole('article')).toHaveLength(5);
  expect(screen.queryByRole('button', { name: 'Compact' })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /Link to/ })).not.toBeInTheDocument();
  expect(screen.getByText('Starting Feb 2027')).toBeInTheDocument();
  const accenture = screen.getByRole('article', { name: 'Accenture' });
  expect(within(accenture).getByRole('heading', { name: 'AI Native Analyst' })).toBeInTheDocument();
  expect(
    within(accenture).getByRole('heading', { name: 'Technical Architecture Analyst' })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Accenture', exact: true })).toHaveLength(1);
  const bu = screen.getByRole('article', { name: 'Boston University' });
  expect(
    within(bu).getByRole('heading', { name: 'Graduate Research Assistant' })
  ).toBeInTheDocument();
  expect(
    within(bu).getByRole('heading', { name: 'Graduate Teaching Assistant' })
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Show more experience/ }));
  expect(screen.getAllByRole('article')).toHaveLength(groupExperiencesByOrg().length);
  await user.click(screen.getByRole('button', { name: 'Show less' }));
  expect(screen.getAllByRole('article')).toHaveLength(5);
});

it('reveals older roles from internal workplace navigation without writing an item URL', async () => {
  jest.useFakeTimers();
  HTMLElement.prototype.scrollIntoView = jest.fn();
  render(<ExperienceSection />);
  const hash = location.hash;
  act(() => requestScrollToExperience('juntrax'));
  act(() => jest.advanceTimersByTime(200));
  expect(screen.getByRole('button', { name: 'Show less' })).toBeInTheDocument();
  expect(location.hash).toBe(hash);
});

it('shows the publication and three conference entries in Research', () => {
  render(<ResearchSection />);
  expect(screen.getByRole('heading', { name: 'Publications' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Conferences' })).toBeInTheDocument();
  expect(screen.getAllByText('BEST 2026')).toHaveLength(2);
  expect(screen.getByText('IDFC 2026')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'IDFC 2026' })).toHaveAttribute(
    'href',
    'https://idfc-conference.org/idfc2026/'
  );
  for (const link of screen.getAllByRole('link', { name: 'BEST 2026' }))
    expect(link).toHaveAttribute(
      'href',
      'https://sites.google.com/view/best-society/best-conference-2026?pli=1&authuser=0'
    );
  expect(screen.queryByRole('link', { name: 'View publication' })).not.toBeInTheDocument();
  expect(
    screen.queryByText('Exploring trust, authenticity, and the practical impact of AI.')
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /Detecting Deepfakes for the Courtroom/ })
  ).toHaveAttribute('href', 'https://ebooks.iospress.nl/doi/10.3233/FAIA261168');
});

it('removes retired projects and organizations from the catalog and related skill mappings', async () => {
  const removed = ['graf-project', 'boosted-project', 'umlazy-project', 'wardrobe-copilot'];
  expect(PROJECTS).toHaveLength(8);
  expect(ORGANIZATIONS).toHaveLength(0);
  expect(PROJECTS.find(p => p.id === 'iris-project')?.related_experiences).toEqual([]);
  for (const id of removed) {
    expect(PROJECTS.some(p => p.id === id)).toBe(false);
    expect(SKILL_MAPPINGS.some(m => m.projectIds?.includes(id))).toBe(false);
  }
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 8' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(8);
  expect(screen.queryByRole('button', { name: /Copy link to/ })).not.toBeInTheDocument();
  expect(
    within(screen.getByRole('group', { name: 'Project categories' })).getByRole('button', {
      name: 'Full Stack 1',
    })
  ).toBeInTheDocument();
  expect(LINKS.scholar).toContain('bWJKHlMAAAAJ');
});
