import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillsBrowser } from '@/components/about/skills-browser';
import { ExperienceSection } from '@/components/experience/experience-section';
import {
  getOrganizations,
  ORGANIZATIONS,
  groupExperiencesByOrg,
  getCurrentWorkItems,
  hasFutureStart,
  formatPeriodDisplay,
  EXPERIENCES,
} from '@/database/content-registry';

afterEach(() => jest.useRealTimers());

it('browses skills without search or Inngest and opens the selected skill', async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();
  render(<SkillsBrowser onSelect={onSelect} />);
  expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'All', exact: true }));
  expect(screen.queryByText('Inngest')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Rust, explore related work' }));
  expect(onSelect).toHaveBeenCalledWith('Rust');
  await user.click(screen.getByRole('button', { name: 'Database', exact: true }));
  expect(
    screen.getByRole('button', { name: 'PostgreSQL, explore related work' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Rust, explore related work' })
  ).not.toBeInTheDocument();
});

it('shows future roles as regular positions, ordered first without adding future tenure', async () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 9, 8));
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<ExperienceSection />);
  for (const view of ['Compact', 'Detailed']) {
    await user.click(screen.getByRole('button', { name: view, exact: true }));
    const role = screen.getByText('AI Native Analyst');
    const company = role.closest('article');
    expect(screen.getAllByRole('article')[0]).toContainElement(role);
    expect(company).toHaveTextContent('2027');
    expect(company).toHaveTextContent('Starting Apr 2027');
    expect(company).toContainElement(screen.getByText('Technical Architecture Analyst'));
    expect(company).toHaveTextContent('May 2026 – Sep 2026');
    expect(screen.queryByText('Incoming')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Accenture', exact: true })).toHaveLength(1);
  }
  const accenture = groupExperiencesByOrg().find(org => org.company === 'Accenture')!;
  expect(accenture.duration).toBe('5 mo');
  expect(accenture.positions.map(role => role.id)).toEqual(['accenture-incoming', 'accenture']);
  expect(getCurrentWorkItems().some(item => item.id === 'accenture-incoming')).toBe(false);
});

it('derives Starting labels from dates and stops at the start month', () => {
  jest.useFakeTimers();
  try {
    jest.setSystemTime(new Date(2026, 9, 8));
    expect(formatPeriodDisplay('04/2027')).toBe('Starting Apr 2027');
    expect(formatPeriodDisplay('04/2027 - Present')).toBe('Starting Apr 2027');
    expect(formatPeriodDisplay('05/2026 - 09/2026')).toBe('May 2026 – Sep 2026');
    expect(hasFutureStart('04/2027', new Date(2027, 3, 1))).toBe(false);
    expect(hasFutureStart('04/2027', new Date(2027, 2, 31))).toBe(true);
    jest.setSystemTime(new Date(2027, 3, 1));
    const role = EXPERIENCES.find(item => item.id === 'accenture-incoming')!;
    expect(formatPeriodDisplay(role.period)).toBe('Apr 2027 – Present');
    expect(groupExperiencesByOrg()[0]?.duration).toBe('6 mo');
    jest.setSystemTime(new Date(2027, 4, 1));
    expect(groupExperiencesByOrg()[0]?.company).toBe('Accenture');
    expect(groupExperiencesByOrg()[0]?.duration).toBe('7 mo');
  } finally {
    jest.useRealTimers();
  }
});

it('orders organizations newest first without mutating the registry', () => {
  const originalOrder = ORGANIZATIONS.map(org => org.id);
  expect(getOrganizations().map(org => org.id)).toEqual([
    'digital-forensics-lab',
    'voyagers',
    'ai-computer-vision-lab',
  ]);
  expect(ORGANIZATIONS.map(org => org.id)).toEqual(originalOrder);
});
