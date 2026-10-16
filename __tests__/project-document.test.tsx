import { existsSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { PROJECTS } from '@/database/content-registry';

jest.mock(
  'next/dynamic',
  () => () =>
    function MockPdfViewer({ src }: { src: string }) {
      return (
        <div data-testid='pdf-viewer' data-src={src}>
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
    const trigger = screen.getByRole('link', { name: `Paper for ${project.title} (PDF)` });
    expect(trigger).toHaveAttribute('href', project.paper);
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: `${project.title} paper` });
    expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute('data-src', project.paper);
    expect(within(dialog).getByRole('link', { name: 'Download PDF' })).toHaveAttribute('download');
    expect(within(dialog).getByRole('link', { name: 'Open PDF in a new tab' })).toHaveAttribute(
      'href',
      project.paper
    );
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
  });
  for (const asset of Object.values(project.slideDeck!))
    expect(existsSync(path.join(process.cwd(), 'public', asset))).toBe(true);
  const trigger = screen.getByRole('link', { name: `Slide deck for ${project.title} (PDF)` });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: `${project.title} slide deck` });
  expect(within(dialog).getByTestId('pdf-viewer')).toHaveAttribute(
    'data-src',
    project.slideDeck!.pdf
  );
  expect(within(dialog).getByRole('link', { name: 'Download PowerPoint' })).toHaveAttribute(
    'href',
    project.slideDeck!.source
  );
  expect(within(dialog).getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    project.slideDeck!.pdf
  );
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

it('preserves modified document links without opening a modal', () => {
  render(<ProjectsIndex />);
  const trigger = screen.getByRole('link', { name: /^Paper for Forecasting/ });
  fireEvent.click(trigger, { ctrlKey: true });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
