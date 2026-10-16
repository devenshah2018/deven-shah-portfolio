import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PdfViewer from '@/components/projects/pdf-viewer';
import { getDocument } from '@/lib/pdf-engine';

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

beforeEach(() => {
  availableWidth = 800;
  availableHeight = 600;
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
afterEach(() => jest.restoreAllMocks());

it('renders a selectable page, navigates within boundaries and supports keyboard navigation', async () => {
  const user = userEvent.setup();
  const { container } = render(<PdfViewer src='/paper.pdf' title='Research' />);
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(screen.getByText('Selectable PDF text')).toBeInTheDocument();
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
  expect(getDocument).toHaveBeenCalledWith({ url: '/paper.pdf', isEvalSupported: false });
  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  await user.click(screen.getByRole('button', { name: 'Next page' }));
  expect(await screen.findByText('Page 2 / 3')).toBeInTheDocument();
  await waitFor(() => expect(mockGetPage).toHaveBeenLastCalledWith(2));
  const region = screen.getByRole('region', { name: 'Research PDF pages' });
  fireEvent.keyDown(region, { key: 'End' });
  expect(screen.getByText('Page 3 / 3')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  fireEvent.keyDown(region, { key: 'Home' });
  expect(screen.getByText('Page 1 / 3')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('document')).toHaveAttribute('aria-busy', 'false'));
  expect(container.querySelectorAll('canvas')).toHaveLength(1);
});

it('zooms, fits and resizes without fetching the document again', async () => {
  const user = userEvent.setup();
  const before = jest.mocked(getDocument).mock.calls.length;
  render(<PdfViewer src='/paper.pdf' title='Research' />);
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
  expect(await screen.findByRole('alert')).toHaveTextContent('Use Open PDF or Download PDF');
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
  const { unmount } = render(<PdfViewer src='/paper.pdf' title='Research' />);
  await waitFor(() => expect(mockRender).toHaveBeenCalled());
  fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
  await waitFor(() => expect(mockGetPage).toHaveBeenLastCalledWith(2));
  expect(mockCancel).toHaveBeenCalled();
  unmount();
  await act(async () => resolveRender());
  expect(screen.queryByRole('document')).not.toBeInTheDocument();
});
