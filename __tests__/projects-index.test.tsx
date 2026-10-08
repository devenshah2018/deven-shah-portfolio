import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsIndex } from '@/components/projects/projects-index';

it('switches between the requested categories and includes the research paper downloads', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Boosted' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Any', exact: true })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Data Science and Machine Learning 4' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(4);
  for (const title of [
    'Detecting Exoplanets in Kepler Transit Data',
    'Forecasting Material Conflict Spikes from GDELT',
  ]) {
    const heading = screen.getByRole('heading', { name: title });
    const row = screen.getAllByRole('listitem').find(item => item.contains(heading))!;
    expect(within(row).getByText('2026')).toBeInTheDocument();
    expect(within(row).getByText('Completed')).toBeInTheDocument();
    expect(within(row).getByRole('button', { name: 'Boston University' })).toBeInTheDocument();
  }
  expect(screen.getByRole('link', { name: /Download paper for Forecasting/ })).toHaveAttribute(
    'href',
    '/papers/gdelt-conflict-forecasting.pdf'
  );
  expect(screen.getByRole('link', { name: /Download paper for Molecule/ })).toHaveAttribute(
    'download'
  );

  await user.click(screen.getByRole('button', { name: 'Theory and Algorithms 3' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  expect(screen.getByRole('heading', { name: 'Drone Path Planning' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Task Scheduling' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Breaking Dijkstra' })).toBeInTheDocument();
});

it('searches across categories and recovers from empty results', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'Kepler');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(
    screen.getByRole('heading', { name: 'Detecting Exoplanets in Kepler Transit Data' })
  ).toBeInTheDocument();
  await user.clear(screen.getByRole('searchbox', { name: 'Search projects' }));
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'no-such-project');
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  await user.click(screen.getByRole('button', { name: 'Show all projects' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(11);
});

it('reveals a deep-linked project even when a different category and search are active', async () => {
  const user = userEvent.setup();
  render(<ProjectsIndex />);
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'Graf');
  act(() => window.dispatchEvent(new Event('resetProjectFilter')));
  expect(screen.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('');
  expect(screen.getAllByRole('listitem')).toHaveLength(11);
  expect(screen.getByRole('heading', { name: 'Molecule Mutation Prediction' })).toBeInTheDocument();
});
