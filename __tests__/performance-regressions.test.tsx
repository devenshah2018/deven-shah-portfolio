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

it('updates timeline geometry during resizing without rebuilding detailed experience content', async () => {
  const resizeCallbacks: (() => void)[] = [];
  const originalObserver = global.ResizeObserver;
  global.ResizeObserver = class {
    constructor(callback: ResizeObserverCallback) {
      resizeCallbacks.push(() => callback([], this as unknown as ResizeObserver));
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  let rowSpacing = 100;
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
    const cells = Array.from(document.querySelectorAll('[data-year-cell]'));
    const index = cells.indexOf(this);
    const top = Math.max(0, index) * rowSpacing;
    return {
      x: 0,
      y: top,
      top,
      left: 0,
      right: 40,
      bottom: top + 24,
      width: 40,
      height: 24,
      toJSON() {},
    };
  });
  try {
    const user = userEvent.setup();
    const { container, unmount } = render(<ExperienceSection />);
    await user.click(screen.getByRole('button', { name: 'Detailed', exact: true }));
    const before = Number(container.querySelector('mask rect')?.getAttribute('height'));
    expect(before).toBeGreaterThan(0);
    const contentRenders = jest.mocked(getSkillsForExperienceId).mock.calls.length;
    rowSpacing = 120;
    act(() => resizeCallbacks.forEach(callback => callback()));
    expect(Number(container.querySelector('mask rect')?.getAttribute('height'))).toBeGreaterThan(
      before
    );
    expect(getSkillsForExperienceId).toHaveBeenCalledTimes(contentRenders);
    act(() => resizeCallbacks.forEach(callback => callback()));
    expect(getSkillsForExperienceId).toHaveBeenCalledTimes(contentRenders);
    unmount();
  } finally {
    global.ResizeObserver = originalObserver;
  }
});
