import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SlideVideo } from '@/components/projects/slide-video';
import type { SlideVideo as Clip } from '@/lib/types';

const clip: Clip = {
  page: 15,
  src: '/slides/demo.mp4',
  bounds: { left: 4.375, top: 25.866667, width: 62.666667, height: 62.666667 },
};

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
    this: HTMLVideoElement
  ) {
    Object.defineProperty(this, 'paused', { configurable: true, value: false });
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  });
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
    this: HTMLVideoElement
  ) {
    Object.defineProperty(this, 'paused', { configurable: true, value: true });
    this.dispatchEvent(new Event('pause'));
  });
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

it('starts muted, inline and looping, then releases media when removed', async () => {
  const { unmount } = render(<SlideVideo clip={clip} title='GDELT' ready />);
  const video = screen.getByLabelText('GDELT slide 15 video') as HTMLVideoElement;
  expect(video).toHaveAttribute('src', clip.src);
  expect(video).toHaveAttribute('autoplay');
  expect(video).toHaveAttribute('loop');
  expect(video).toHaveAttribute('playsinline');
  expect(video).toHaveAttribute('preload', 'none');
  expect(video.muted).toBe(true);
  expect(video.parentElement).toHaveStyle({
    left: '4.375%',
    top: '25.866667%',
    width: '62.666667%',
    height: '62.666667%',
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  unmount();
  expect(video).not.toHaveAttribute('src');
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
});

it('waits for the PDF page and preserves a manual pause through resize rendering', async () => {
  const user = userEvent.setup();
  const { rerender } = render(<SlideVideo clip={clip} title='GDELT' ready={false} />);
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  rerender(<SlideVideo clip={clip} title='GDELT' ready />);
  await user.click(screen.getByRole('button', { name: 'Pause slide video' }));
  expect(screen.getByRole('button', { name: 'Play slide video' })).toBeInTheDocument();
  const before = jest.mocked(HTMLMediaElement.prototype.play).mock.calls.length;
  rerender(<SlideVideo clip={clip} title='GDELT' ready={false} />);
  rerender(<SlideVideo clip={clip} title='GDELT' ready />);
  expect(jest.mocked(HTMLMediaElement.prototype.play).mock.calls.length).toBe(before);
  expect(screen.getByLabelText('GDELT slide 15 video')).not.toHaveAttribute('autoplay');
  await user.click(screen.getByRole('button', { name: 'Play slide video' }));
  expect(screen.getByRole('button', { name: 'Pause slide video' })).toBeInTheDocument();
});

it('offers a play action if autoplay is denied and a download on media error', async () => {
  jest
    .mocked(HTMLMediaElement.prototype.play)
    .mockRejectedValueOnce(new DOMException('Blocked', 'NotAllowedError'));
  const user = userEvent.setup();
  render(<SlideVideo clip={clip} title='GDELT' ready />);
  await user.click(await screen.findByRole('button', { name: 'Play slide video' }));
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'Pause slide video' })).toBeInTheDocument()
  );
  fireEvent.error(screen.getByLabelText('GDELT slide 15 video'));
  expect(screen.getByRole('link', { name: 'Download slide video' })).toHaveAttribute(
    'href',
    clip.src
  );
  expect(screen.getByRole('link', { name: 'Download slide video' })).toHaveAttribute('download');
  expect(screen.getByRole('link', { name: 'Download slide video' })).not.toHaveAttribute('target');
});

it('ignores a late play rejection after the slide is removed', async () => {
  let rejectPlay: (error: Error) => void = () => {};
  jest.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(
    () =>
      new Promise<void>((_, reject) => {
        rejectPlay = reject;
      })
  );
  const { unmount } = render(<SlideVideo clip={clip} title='GDELT' ready />);
  unmount();
  await act(async () => rejectPlay(new Error('Aborted')));
  expect(screen.queryByLabelText('GDELT slide 15 video')).not.toBeInTheDocument();
});

it('ignores an aborted play request after zoom starts a newer successful playback', async () => {
  let rejectOldPlay: (error: Error) => void = () => {};
  jest.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(
    () =>
      new Promise<void>((_, reject) => {
        rejectOldPlay = reject;
      })
  );
  const { rerender } = render(<SlideVideo clip={clip} title='GDELT' ready />);
  rerender(<SlideVideo clip={clip} title='GDELT' ready={false} />);
  rerender(<SlideVideo clip={clip} title='GDELT' ready />);
  await act(async () =>
    rejectOldPlay(new DOMException('Rendering interrupted playback', 'AbortError'))
  );
  expect(screen.getByRole('button', { name: 'Pause slide video' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Play slide video' })).not.toBeInTheDocument();
});
