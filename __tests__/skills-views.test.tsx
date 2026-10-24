import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillsBrowser } from '@/components/about/skills-browser';
import CodonSkills from '@/components/about/codon-skills';

it('loads the graph only when selected and preserves the skill category when returning', async () => {
  const user = userEvent.setup();
  const onSelect = jest.fn();
  const { container } = render(<SkillsBrowser onSelect={onSelect} />);
  const views = within(screen.getByRole('tablist', { name: 'Skills view' }));
  expect(views.getByRole('tab', { name: 'List' })).toHaveAttribute('aria-selected', 'true');
  expect(container.querySelector('iframe')).toBeNull();
  await user.click(screen.getByRole('button', { name: 'Database', exact: true }));
  await user.click(views.getByRole('tab', { name: 'Graph' }));
  expect(screen.getByTitle('Skill Ecosystem')).toBeInTheDocument();
  expect(screen.queryByRole('group', { name: 'Skill categories' })).not.toBeInTheDocument();
  expect(views.getByRole('tab', { name: 'Graph' })).toHaveAttribute('aria-selected', 'true');
  await user.click(views.getByRole('tab', { name: 'List' }));
  expect(container.querySelector('iframe')).toBeNull();
  expect(screen.getByRole('button', { name: 'Database', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  await user.click(screen.getByRole('button', { name: 'PostgreSQL, explore related work' }));
  expect(onSelect).toHaveBeenCalledWith('PostgreSQL');
});

it('passes the supplied Codon skills through the URL fragment and supports a local graph host', () => {
  render(<CodonSkills baseUrl='http://localhost:4173/' />);
  const frame = screen.getByTitle('Skill Ecosystem');
  const url = new URL(frame.getAttribute('src')!);
  expect(url.origin + url.pathname).toBe('http://localhost:4173/graph.html');
  const config = JSON.parse(decodeURIComponent(url.hash.slice(1)));
  expect(config.v).toBe(1);
  expect(config.title).toBe('Skill Ecosystem');
  expect(config.skills).toHaveLength(52);
  expect(config.skills).toEqual(
    expect.arrayContaining([
      'csharp',
      'cpp',
      'aspnet',
      'huggingface',
      'postgres',
      'github',
      'git',
      'rest',
    ])
  );
  expect(new Set(config.skills).size).toBe(config.skills.length);
  expect(frame).toHaveAttribute('loading', 'lazy');
  expect(frame).toHaveAttribute('referrerPolicy', 'no-referrer');
});

it('supports arrow-key navigation and announces graph loading until the frame is ready', async () => {
  const user = userEvent.setup();
  render(<SkillsBrowser onSelect={jest.fn()} />);
  const list = screen.getByRole('tab', { name: 'List', exact: true });
  await user.click(list);
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Graph', exact: true })).toHaveFocus();
  expect(screen.getByRole('tabpanel', { name: 'Graph', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Loading skill graph');
  fireEvent.load(screen.getByTitle('Skill Ecosystem'));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  await user.keyboard('{Home}');
  expect(list).toHaveFocus();
  expect(list).toHaveAttribute('aria-selected', 'true');
  expect(screen.queryByTitle('Skill Ecosystem')).not.toBeInTheDocument();
});
