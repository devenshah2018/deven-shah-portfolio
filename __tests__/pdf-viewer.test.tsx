import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PdfViewer from '@/components/projects/pdf-viewer';
import { getDocument } from '@/lib/pdf-engine';
import type { SlideVideo } from '@/lib/types';

jest.mock('@/lib/pdf-engine', () => ({
  getDocument: jest.fn(),
  TextLayer: jest.fn().mockImplementation(({ container }) => ({
    render: jest.fn(async () => {
      container.textContent = 'Selectable PDF text';
    }),
    cancel: jest.fn(),
  })),
}));

let mockGetPage: jest.Mock;
let mockRender: jest.Mock;
let mockCancel: jest.Mock;
let mockDestroy: jest.Mock;
let resize: () => void;
let availableWidth = 800;
let availableHeight = 600;
const originalIntersectionObserver = global.IntersectionObserver;
let pageObservers: { target: Element; intersect: (nearby: boolean) => void }[];

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  availableWidth = 800;
  availableHeight = 600;
  pageObservers = [];
  global.IntersectionObserver = class {
    constructor(private callback: IntersectionObserverCallback) {}
    observe(target: Element) {
      pageObservers.push({
        target,
        intersect: nearby =>
          this.callback(
            [{ isIntersecting: nearby }] as IntersectionObserverEntry[],
            this as unknown as IntersectionObserver
          ),
      });
    }
    disconnect() {}
    unobserve() {}
  } as unknown as typeof IntersectionObserver;
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => availableWidth);
  jest
    .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
    .mockImplementation(() => availableHeight);
  HTMLElement.prototype.scrollTo = jest.fn();
  global.ResizeObserver = class {
    constructor(cb: () => void) {
      resize = cb;
    }
    observe() {}
    disconnect() {}
    unobserve() {}
  };
  mockCancel = jest.fn();
  mockRender = jest.fn(() => ({ promise: Promise.resolve(), cancel: mockCancel }));
  mockGetPage = jest.fn(async () => ({
    getViewport: ({ scale }: { scale: number }) => ({
      width: 600 * scale,
      height: 800 * scale,
      scale,
    }),
    streamTextContent: jest.fn(),
    render: mockRender,
  }));
  mockDestroy = jest.fn().mockResolvedValue(undefined);
  jest.mocked(getDocument).mockReturnValue({
    promise: Promise.resolve({ numPages: 3, getPage: mockGetPage }),
    destroy: mockDestroy,
  } as never);
});
afterEach(() => {
  jest.restoreAllMocks();
  global.IntersectionObserver = originalIntersectionObserver;
});

it('stacks every paper page without pagination and renders only nearby pages', async () => {
  const { container, unmount } = render(<PdfViewer src='/paper.pdf' title='Research' />);
  await screen.findByText('3 pages · Scroll to read');
  const pages = await screen.findAllByRole('document');
  expect(pages.map(element => element.getAttribute('aria-label'))).toEqual([
    'Research, page 1',
    'Research, page 2',
    'Research, page 3',
  ]);
  await waitFor(() => expect(pages[0]).toHaveAttribute('aria-busy', 'false'));
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Previous page' })).not.toBeInTheDocument();
  expect(mockGetPage).not.toHaveBeenCalledWith(2);
  const firstCanvas = container.querySelector('canvas')!;
  const pageOneHeight = pages[0]!.style.height;
  act(() => {
    pageObservers.find(observer => observer.target === pages[0])!.intersect(false);
    pageObservers.find(observer => observer.target === pages[1])!.intersect(true);
  });
  await waitFor(() => expect(pages[1]).toHaveAttribute('aria-busy', 'false'));
  expect(mockGetPage).toHaveBeenCalledWith(2);
  expect(pages[1]!.querySelector('canvas')).not.toBeNull();
  expect(pages[0]!.querySelector('canvas')).toBeNull();
  expect(firstCanvas.width).toBe(0);
  expect(pages[0]!.style.height).toBe(pageOneHeight);
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  const scrollKey = new KeyboardEvent('keydown', {
    key: 'PageDown',
    bubbles: true,
    cancelable: true,
  });
  fireEvent(screen.getByRole('region'), scrollKey);
  expect(scrollKey.defaultPrevented).toBe(false);
  unmount();
  expect(mockCancel).toHaveBeenCalled();
  expect(mockDestroy).toHaveBeenCalledTimes(1);
});

it('zooms and resizes all paper page slots while keeping the document loaded once', async () => {
  const user = userEvent.setup();
  const before = jest.mocked(getDocument).mock.calls.length;
  render(<PdfViewer src='/paper.pdf' title='Research' />);
  const first = await screen.findByRole('document', { name: 'Research, page 1' });
  await waitFor(() => expect(first).toHaveAttribute('aria-busy', 'false'));
  await user.click(screen.getByRole('button', { name: 'Zoom in' }));
  expect(first.style.width).toBe('960px');
  expect(screen.getByRole('document', { name: 'Research, page 3' }).style.width).toBe('960px');
  await user.click(screen.getByRole('button', { name: 'Fit page' }));
  expect(first.style.height).toBe('568px');
  await user.click(screen.getByRole('button', { name: 'Fit width' }));
  availableWidth = 320;
  act(() => resize());
  await waitFor(() => expect(first.style.width).toBe('288px'));
  expect(screen.getByRole('document', { name: 'Research, page 3' }).style.width).toBe('288px');
  expect(jest.mocked(getDocument).mock.calls.length - before).toBe(1);
});

it('keeps slide decks paginated with selectable text and keyboard navigation', async () => {
  const user = userEvent.setup();
  const { container } = render(<PdfViewer src='/slides.pdf' title='Research' slides />);
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(screen.getByText('Selectable PDF text')).toBeInTheDocument();
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  expect(getDocument).toHaveBeenCalledWith({ url: '/slides.pdf', isEvalSupported: false });
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(await screen.findByText('Slide 2 / 3')).toBeInTheDocument();
  await waitFor(() => expect(mockGetPage).toHaveBeenLastCalledWith(2));
  const region = screen.getByRole('region', { name: 'Research PDF pages' });
  fireEvent.keyDown(region, { key: 'End' });
  expect(screen.getByText('Slide 3 / 3')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  fireEvent.keyDown(region, { key: 'Home' });
  expect(screen.getByText('Slide 1 / 3')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
});

it('zooms, fits and resizes without fetching the document again', async () => {
  const user = userEvent.setup();
  const before = jest.mocked(getDocument).mock.calls.length;
  render(<PdfViewer src='/slides.pdf' title='Research' slides />);
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  await user.click(screen.getByRole('button', { name: 'Zoom in' }));
  expect(screen.getByLabelText('Zoom level')).toHaveTextContent('125%');
  await user.click(screen.getByRole('button', { name: 'Fit page' }));
  expect(screen.getByLabelText('Zoom level')).toHaveTextContent('100%');
  await waitFor(() => expect(screen.getByRole('document').style.height).toBe('568px'));
  await user.click(screen.getByRole('button', { name: 'Fit width' }));
  await waitFor(() => expect(screen.getByRole('document').style.width).toBe('768px'));
  availableWidth = 320;
  act(() => resize());
  await waitFor(() => expect(screen.getByRole('document').style.width).toBe('288px'));
  expect(jest.mocked(getDocument).mock.calls.length - before).toBe(1);
});

it('starts slide decks fitted to the page and releases the worker and render on unmount', async () => {
  const { unmount } = render(<PdfViewer src='/slides.pdf' title='GDELT' slides />);
  await screen.findByText('Slide 1 / 3');
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(screen.getByRole('document').style.height).toBe('568px');
  unmount();
  expect(mockCancel).toHaveBeenCalled();
  expect(mockDestroy).toHaveBeenCalledTimes(1);
});

it('handles document and page failures instead of remaining stuck loading', async () => {
  jest.mocked(getDocument).mockReturnValueOnce({
    promise: Promise.reject(new Error('404')),
    destroy: mockDestroy,
  } as never);
  const { unmount } = render(<PdfViewer src='/missing.pdf' title='Missing' />);
  expect(await screen.findByRole('alert')).toHaveTextContent('download button');
  unmount();
  mockGetPage.mockRejectedValueOnce(new Error('Bad page'));
  render(<PdfViewer src='/bad.pdf' title='Bad page' />);
  expect(await screen.findByRole('alert')).toHaveTextContent('could not be displayed');
});

it('cancels pending rendering on navigation and ignores late completion after closing', async () => {
  let resolveRender: () => void = () => {};
  mockRender.mockImplementationOnce(() => ({
    promise: new Promise<void>(resolve => {
      resolveRender = resolve;
    }),
    cancel: mockCancel,
  }));
  const { unmount } = render(<PdfViewer src='/slides.pdf' title='Research' slides />);
  await waitFor(() => expect(mockRender).toHaveBeenCalled());
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  await waitFor(() => expect(mockGetPage).toHaveBeenLastCalledWith(2));
  expect(mockCancel).toHaveBeenCalled();
  unmount();
  await act(async () => resolveRender());
  expect(screen.queryByRole('document')).not.toBeInTheDocument();
});

const embeddedVideo: SlideVideo = {
  page: 2,
  src: '/slides/demo.mp4',
  bounds: { left: 4.375, top: 25.866667, width: 62.666667, height: 62.666667 },
};

it('loads embedded media only on its slide, preserves it through zoom/resize, and releases it when navigating away', async () => {
  const user = userEvent.setup();
  const { container } = render(
    <PdfViewer src='/slides.pdf' title='GDELT' slides videos={[embeddedVideo]} />
  );
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(container.querySelector('video')).toBeNull();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  const video = await screen.findByLabelText('GDELT slide 2 video');
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(video).toHaveAttribute('autoplay');
  expect(video).toHaveAttribute('loop');
  expect(video).toHaveAttribute('playsinline');
  expect((video as HTMLVideoElement).muted).toBe(true);
  (video as HTMLVideoElement).currentTime = 23;
  await user.click(screen.getByRole('button', { name: 'Zoom in' }));
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  availableWidth = 320;
  act(() => resize());
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(screen.getByLabelText('GDELT slide 2 video')).toBe(video);
  expect((video as HTMLVideoElement).currentTime).toBe(23);
  expect(video.parentElement).toHaveStyle({ left: '4.375%', width: '62.666667%' });
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(container.querySelector('video')).toBeNull();
  expect(video).not.toHaveAttribute('src');
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
});

it('never adds slide video overlays to research papers', async () => {
  const { container } = render(
    <PdfViewer src='/paper.pdf' title='Paper' videos={[embeddedVideo]} />
  );
  await screen.findByText('3 pages · Scroll to read');
  await waitFor(() =>
    expect(screen.getByRole('document', { name: 'Paper, page 1' })).toHaveAttribute(
      'aria-busy',
      'false'
    )
  );
  expect(screen.queryByRole('button', { name: 'Next page' })).not.toBeInTheDocument();
  expect(container.querySelector('video')).toBeNull();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});

it('stops and releases slide video when its viewer closes', async () => {
  const user = userEvent.setup();
  const { unmount } = render(
    <PdfViewer src='/slides.pdf' title='GDELT' slides videos={[embeddedVideo]} />
  );
  await screen.findByText('Slide 1 / 3');
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  const video = await screen.findByLabelText('GDELT slide 2 video');
  unmount();
  expect(video).not.toHaveAttribute('src');
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
  expect(mockDestroy).toHaveBeenCalledTimes(1);
});
