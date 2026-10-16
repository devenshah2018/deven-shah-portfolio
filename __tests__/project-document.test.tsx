import { existsSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { PROJECTS } from '@/database/content-registry';

const originalPointerEvent = Object.getOwnPropertyDescriptor(window, 'PointerEvent');
const originalScrollIntoView = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
beforeAll(() => {
  Object.defineProperty(window, 'PointerEvent', {
    configurable: true,
    writable: true,
    value: MouseEvent,
  });
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
});
afterAll(() => {
  if (originalPointerEvent) Object.defineProperty(window, 'PointerEvent', originalPointerEvent);
  else Reflect.deleteProperty(window, 'PointerEvent');
  if (originalScrollIntoView)
    Object.defineProperty(Element.prototype, 'scrollIntoView', originalScrollIntoView);
  else Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
});

jest.mock(
  'next/dynamic',
  () => () =>
    function MockPdfViewer({ src, videos }: { src: string; videos?: unknown[] }) {
      return (
        <div data-testid='pdf-viewer' data-src={src} data-slide-videos={videos?.length ?? 0}>
          PDF viewer
        </div>
      );
    }
);

it('labels every hosted destination Live Site and leaves document viewers unloaded until opened', async () => {
  const user = userEvent.setup();
  const { container } = render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  expect(screen.queryByTestId('pdf-viewer')).not.toBeInTheDocument();
  expect(container.querySelector('canvas, iframe, video')).toBeNull();
  expect(screen.queryByText('Live Demo')).not.toBeInTheDocument();
  for (const project of PROJECTS) {
    for (const link of project.access_points?.filter(link => link.type === 'hosted') ?? []) {
      expect(link.label).toBe('Live Site');
      expect(screen.getByRole('link', { name: `Live Site for ${project.title}` })).toHaveAttribute(
        'href',
        link.url
      );
    }
  }
});

it('opens each paper in its own PDF dialog with direct access and a download', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  const papers = PROJECTS.filter(project => project.paper);
  expect(papers).toHaveLength(4);
  for (const project of papers) {
    const trigger = screen.getByRole('button', { name: `Paper for ${project.title} (PDF)` });
    expect(trigger).not.toHaveAttribute('href');
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: `${project.title} paper` });
    expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute('data-src', project.paper);
    expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute('data-slide-videos', '0');
    expect(within(dialog).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('download');
    expect(within(dialog).getByRole('link', { name: 'Download PDF' }).textContent).toBe('');
    expect(within(dialog).queryByRole('link', { name: /Open PDF/ })).not.toBeInTheDocument();
    for (const link of within(dialog).getAllByRole('link')) {
      expect(link).toHaveAttribute('download');
      expect(link).not.toHaveAttribute('target');
    }
    expect(dialog.querySelector('video')).toBeNull();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  }
});

it('offers only GDELT a slide deck with its PDF preview and original PowerPoint download', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  const project = PROJECTS.find(project => project.id === 'gdelt-conflict-forecasting')!;
  expect(project.slideDeck).toEqual({
    pdf: '/slides/gdelt-conflict-forecasting.pdf',
    source: '/slides/gdelt-conflict-forecasting.pptx',
    videos: [
      {
        page: 15,
        src: '/slides/gdelt-conflict-forecasting-demo.mp4',
        bounds: { left: 4.375, top: 25.866667, width: 62.666667, height: 62.666667 },
      },
    ],
  });
  for (const asset of [
    project.slideDeck!.pdf,
    project.slideDeck!.source,
    ...project.slideDeck!.videos!.map(video => video.src),
  ])
    expect(existsSync(path.join(process.cwd(), 'public', asset!))).toBe(true);
  const trigger = screen.getByRole('button', { name: `Slide deck for ${project.title} (PDF)` });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: `${project.title} slide deck` });
  expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute(
    'data-src',
    project.slideDeck!.pdf
  );
  expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute('data-slide-videos', '1');
  const download = within(dialog).getByRole('button', { name: 'Download slide deck' });
  expect(download.textContent).toBe('');
  expect(within(dialog).queryByRole('link')).not.toBeInTheDocument();
  await user.click(download);
  const menu = screen.getByRole('menu', { name: 'Download slide deck' });
  const pdf = within(menu).getByRole('menuitem', { name: 'PDF (.pdf)' });
  const pptx = within(menu).getByRole('menuitem', { name: 'PowerPoint (.pptx)' });
  expect(pdf).toHaveAttribute('href', project.slideDeck!.pdf);
  expect(pptx).toHaveAttribute('href', project.slideDeck!.source);
  for (const item of [pdf, pptx]) {
    expect(item).toHaveAttribute('download');
    expect(item).not.toHaveAttribute('target');
  }
  document.addEventListener('click', event => event.preventDefault(), { once: true });
  await user.click(pdf);
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  expect(dialog).toBeInTheDocument();
  await user.click(within(dialog).getByRole('button', { name: 'Close slide deck' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});

it('orders mixed project actions by Live Site, Demo, Code, Paper, Slidedeck', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  const actionsFor = (id: string) =>
    Array.from(document.querySelectorAll(`#project-${id} a, #project-${id} button`))
      .filter(element =>
        /^(Live Site|Demo|Code|Paper|Slide deck) for /.test(
          element.getAttribute('aria-label') ?? ''
        )
      )
      .map(element => element.textContent?.trim());
  expect(actionsFor('iris-project')).toEqual(['Live Site', 'Demo']);
  expect(actionsFor('wardrobe-copilot')).toEqual(['Demo', 'Code', 'Paper']);
  expect(actionsFor('gdelt-conflict-forecasting')).toEqual(['Code', 'Paper', 'Slidedeck']);
  expect(actionsFor('drone-build-project')).toEqual(['Live Site', 'Code']);
});

it('keeps modified document clicks inside the modal instead of launching a media tab', () => {
  render(<ProjectsIndex />);
  const trigger = screen.getByRole('button', { name: /^Paper for Forecasting/ });
  fireEvent.click(trigger, { ctrlKey: true });
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(trigger).not.toHaveAttribute('href');
  expect(trigger).not.toHaveAttribute('target');
});

it('dismisses only the format chooser with Escape and restores focus to its download icon', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  const trigger = screen.getByRole('button', { name: /^Slide deck for Forecasting/ });
  await user.click(trigger);
  const download = screen.getByRole('button', { name: 'Download slide deck' });
  await user.click(download);
  expect(screen.getByRole('menu', { name: 'Download slide deck' })).toBeInTheDocument();
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(download).toHaveFocus();
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(trigger).toHaveFocus();
});
