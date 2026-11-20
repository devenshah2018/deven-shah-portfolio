import { act, render } from '@testing-library/react';
import { HashNavigation } from '@/components/hash-navigation';
import { cancelPendingScroll } from '@/lib/url-utils';
afterEach(() => {
  cancelPendingScroll();
  jest.useRealTimers();
  window.history.replaceState(null, '', '/');
});
it('supports section navigation without resolving retired item aliases', async () => {
  jest.useFakeTimers();
  HTMLElement.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, '', '/#iris');
  render(
    <>
      <HashNavigation />
      <section id='research' />
      <div id='project-iris-project' />
    </>
  );
  await act(async () => {
    await Promise.resolve();
  });
  act(() => jest.advanceTimersByTime(100));
  expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
  act(() => {
    window.history.replaceState(null, '', '/#research');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    jest.advanceTimersByTime(100);
  });
  expect(document.getElementById('research')).toHaveFocus();
});
