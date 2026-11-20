import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillsBrowser } from '@/components/about/skills-browser';
it('keeps category browsing without a graph switcher', async () => {
  const user = userEvent.setup();
  const select = jest.fn();
  const { container } = render(<SkillsBrowser onSelect={select} />);
  expect(screen.queryByRole('tablist')).not.toBeInTheDocument();
  expect(container.querySelector('iframe')).toBeNull();
  await user.click(screen.getByRole('button', { name: 'Database', exact: true }));
  await user.click(screen.getByRole('button', { name: 'PostgreSQL, explore related work' }));
  expect(select).toHaveBeenCalledWith('PostgreSQL');
});
