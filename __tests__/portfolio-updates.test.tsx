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

it('derives Starting labels from dates and stops at the start month', () => {
  jest.useFakeTimers();
  try {
    jest.setSystemTime(new Date(2026, 9, 8));
    expect(formatPeriodDisplay('04/2027')).toBe('Starting Apr 2027');
    expect(formatPeriodDisplay('04/2027 - Present')).toBe('Starting Apr 2027');
    expect(formatPeriodDisplay('05/2026 - 09/2026')).toBe('May 2026 – Sep 2026');
    expect(hasFutureStart('04/2027', new Date(2027, 3, 1))).toBe(false);
    expect(hasFutureStart('04/2027', new Date(2027, 2, 31))).toBe(true);
    jest.setSystemTime(new Date(2027, 1, 1));
    const role = EXPERIENCES.find(item => item.id === 'accenture-incoming')!;
    expect(formatPeriodDisplay(role.period)).toBe('Feb 2027 – Present');
    expect(groupExperiencesByOrg()[0]?.duration).toBe('6 mo');
    jest.setSystemTime(new Date(2027, 2, 1));
    expect(groupExperiencesByOrg()[0]?.company).toBe('Accenture');
    expect(groupExperiencesByOrg()[0]?.duration).toBe('7 mo');
  } finally {
    jest.useRealTimers();
  }
});
