import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsIndex } from '@/components/projects/projects-index';

it('switches between the requested categories and includes the research paper downloads', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  const tabs = within(screen.getByRole('group', { name: 'Project categories' })).getAllByRole(
    'button'
  );
  expect(tabs.slice(0, 3).map(button => button.textContent)).toEqual([
    'All projects12',
    'Featured3',
    'Full Stack4',
  ]);
  expect(screen.getByRole('button', { name: 'Featured 3' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  for (const title of [
    'Iris',
    'Forecasting Material Conflict Spikes from GDELT',
    'Drone Path Planning',
  ]) {
    expect(screen.getByRole('heading', { name: title, exact: true })).toBeInTheDocument();
  }
  await user.click(screen.getByRole('button', { name: 'Full Stack 4' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Boosted' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Any', exact: true })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Data Science and Machine Learning 5' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(5);
  for (const title of [
    'Wardrobe Copilot',
    'Detecting Exoplanets in Kepler Transit Data',
    'Forecasting Material Conflict Spikes from GDELT',
  ]) {
    const heading = screen.getByRole('heading', { name: title });
    const row = screen.getAllByRole('listitem').find(item => item.contains(heading))!;
    expect(within(row).getByText('2026')).toBeInTheDocument();
    expect(within(row).getByText('Completed')).toBeInTheDocument();
    expect(within(row).getByRole('button', { name: 'Boston University' })).toBeInTheDocument();
  }
  expect(screen.getByRole('button', { name: 'Paper for Wardrobe Copilot (PDF)' })).toHaveAttribute(
    'aria-haspopup',
    'dialog'
  );

  expect(screen.getByRole('button', { name: /Paper for Forecasting/ })).toHaveAttribute(
    'aria-haspopup',
    'dialog'
  );
  expect(screen.getByRole('button', { name: /Paper for Molecule/ })).toHaveAttribute(
    'aria-haspopup',
    'dialog'
  );

  await user.click(screen.getByRole('button', { name: 'Theory and Algorithms 3' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByRole('heading', { name: 'Drone Path Planning' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Task Scheduling' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Breaking Dijkstra' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Featured 3' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.queryByRole('heading', { name: 'Task Scheduling' })).not.toBeInTheDocument();
});

it('browses all projects through categories without a search bar', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(12);
  expect(
    screen.getByRole('heading', { name: 'Detecting Exoplanets in Kepler Transit Data' })
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Featured 3' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('reveals a deep-linked project when a different category is active', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.click(screen.getByRole('button', { name: 'Full Stack 4' }));
  act(() => window.dispatchEvent(new Event('resetProjectFilter')));
  expect(screen.getByRole('button', { name: 'All projects 12' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(12);
  expect(screen.getByRole('heading', { name: 'Molecule Mutation Prediction' })).toBeInTheDocument();
});
