import { existsSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { PROJECTS } from '@/database/content-registry';

beforeEach(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  jest.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});

afterEach(() => jest.restoreAllMocks());

it('offers only matching demos without mounting or preloading any video in the project list', async () => {
  const user = userEvent.setup();
  const { container } = render(<ProjectsIndex />);
  expect(screen.getAllByRole('button', { name: /^Demo for / })).toHaveLength(1);
  expect(container.querySelector('video')).toBeNull();
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  const demos = PROJECTS.filter(project => project.demoVideo);
  expect(demos.map(project => project.id).sort()).toEqual([
    'boosted-project',
    'graf-project',
    'iris-project',
    'umlazy-project',
    'wardrobe-copilot',
  ]);
  expect(screen.getAllByRole('button', { name: /^Demo for / })).toHaveLength(demos.length);
  for (const project of demos) {
    expect(existsSync(path.join(process.cwd(), 'public', project.demoVideo!))).toBe(true);
  }
  expect(container.querySelector('video')).toBeNull();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});

it('opens each demo with inline autoplay, native controls and the correct local source', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  for (const project of PROJECTS.filter(project => project.demoVideo)) {
    await user.click(screen.getByRole('button', { name: `Demo for ${project.title}` }));
    const dialog = screen.getByRole('dialog', { name: `${project.title} demo` });
    const video = within(dialog).getByLabelText(`${project.title} demo video`) as HTMLVideoElement;
    expect(video).toHaveAttribute('src', project.demoVideo);
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute('preload', 'none');
    await user.click(within(dialog).getByRole('button', { name: 'Close demo' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  }
});

it('stops playback, releases the source and restores focus when dismissed with Escape', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  const trigger = screen.getByRole('button', { name: 'Demo for Iris' });
  await user.click(trigger);
  const video = screen.getByLabelText('Iris demo video');
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
  expect(video).not.toHaveAttribute('src');
  expect(trigger).toHaveFocus();
});

it('provides a play action if the browser declines autoplay', async () => {
  jest
    .spyOn(HTMLMediaElement.prototype, 'play')
    .mockRejectedValueOnce(new DOMException('Playback requires a gesture', 'NotAllowedError'));
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'Demo for Iris' }));
  const play = await screen.findByRole('button', { name: 'Play demo' });
  await user.click(play);
  await waitFor(() =>
    expect(screen.queryByRole('button', { name: 'Play demo' })).not.toBeInTheDocument()
  );
});

it('offers a video download if media cannot be loaded', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'Demo for Iris' }));
  fireEvent.error(screen.getByLabelText('Iris demo video'));
  expect(screen.getByRole('alert')).toHaveTextContent('This video could not be loaded.');
  expect(screen.getByRole('link', { name: 'Download video' })).toHaveAttribute(
    'href',
    '/demos/iris-enterprise-demo.mp4'
  );
  expect(screen.getByRole('link', { name: 'Download video' })).toHaveAttribute('download');
  expect(screen.getByRole('link', { name: 'Download video' })).not.toHaveAttribute('target');
  await user.click(screen.getByRole('button', { name: 'Close demo' }));
});
