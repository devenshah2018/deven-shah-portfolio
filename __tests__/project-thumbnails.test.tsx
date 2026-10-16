import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PROJECTS } from '@/database/content-registry';
import { ProjectsIndex } from '@/components/projects/projects-index';

it('adds lazy previews only to visible project rows and preserves hosted destinations', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  expect(screen.getAllByRole('link', { name: / preview — / })).toHaveLength(3);
  expect(screen.getByRole('link', { name: 'Iris preview — live site' })).toHaveAttribute(
    'href',
    'https://www.iris-plan.com'
  );
  for (const image of screen.getAllByRole('img')) {
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '640');
    expect(image).toHaveAttribute('height', '400');
  }
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  expect(screen.getAllByRole('link', { name: / preview — / })).toHaveLength(12);
  expect(
    screen.getByRole('link', { name: 'Breaking Dijkstra preview — live site' })
  ).toHaveAttribute('href', 'https://breaking-dijkstra.vercel.app/');
});

it('uses a branded repository card for source projects without media', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'Theory and Algorithms 3' }));
  const preview = screen.getByRole('link', { name: 'Task Scheduling preview — GitHub repository' });
  expect(preview).toHaveAttribute('href', 'https://github.com/devenshah2018/task-scheduling');
  expect(within(preview).getByText('GitHub')).toBeVisible();
  expect(within(preview).getByText('task-scheduling')).toBeVisible();
});

it('recovers from a failed image with repository identity instead of a broken image', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  const preview = screen.getByRole('link', {
    name: 'Wardrobe Copilot preview — GitHub repository',
  });
  fireEvent.error(within(preview).getByRole('img'));
  expect(within(preview).queryByRole('img')).not.toBeInTheDocument();
  expect(within(preview).getByText('GitHub')).toBeVisible();
  expect(within(preview).getByText('wardrobe-copilot')).toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Featured 3' }));
  expect(screen.getAllByRole('link', { name: / preview — / })).toHaveLength(3);
});

it('ships small local WebP files for curated previews', () => {
  const previews = PROJECTS.filter(project => project.thumbnail);
  expect(previews).toHaveLength(9);
  for (const project of previews) {
    const thumbnail = project.thumbnail!;
    expect(thumbnail.src).toMatch(/^\/projects\/thumbnails\/[a-z0-9-]+\.webp$/);
    expect(thumbnail.alt.length).toBeGreaterThan(10);
    const file = path.join(process.cwd(), 'public', thumbnail.src);
    expect(existsSync(file)).toBe(true);
    const bytes = readFileSync(file);
    expect(bytes.toString('ascii', 0, 4)).toBe('RIFF');
    expect(bytes.toString('ascii', 8, 12)).toBe('WEBP');
    expect(bytes.length).toBeLessThan(100_000);
  }
});
