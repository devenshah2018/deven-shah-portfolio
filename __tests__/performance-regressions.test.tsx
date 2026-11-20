import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '@/components/header/navigation';
import { ExperienceSection } from '@/components/experience/experience-section';
import { getSkillsForExperienceId } from '@/database/content-registry';

const mockNavigationTreeRender = jest.fn();
jest.mock('@/components/ui/sheet', () => {
  const actual = jest.requireActual('@/components/ui/sheet');
  return {
    ...actual,
    Sheet: (props: object) => {
      mockNavigationTreeRender();
      return <actual.Sheet {...props} />;
    },
  };
});
jest.mock('@/database/content-registry', () => {
  const actual = jest.requireActual('@/database/content-registry');
  return { ...actual, getSkillsForExperienceId: jest.fn(actual.getSkillsForExperienceId) };
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

it('keeps the live clock ticking without rebuilding the navigation controls', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 9, 16, 12, 0, 0));
  const { container, unmount } = render(
    <>
      <section id='hero' />
      <Navigation />
    </>
  );
  const time = container.querySelector('span.tabular-nums')!;
  const initialTime = time.textContent;
  const navigationRenders = mockNavigationTreeRender.mock.calls.length;
  act(() => jest.advanceTimersByTime(2000));
  expect(time.textContent).not.toBe(initialTime);
  expect(mockNavigationTreeRender).toHaveBeenCalledTimes(navigationRenders);
  unmount();
});
