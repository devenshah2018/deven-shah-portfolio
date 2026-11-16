import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectHeading } from '@/components/projects/project-heading';

const iris = { id: 'iris-project', title: 'Iris', link: 'https://www.iris-plan.com' };

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
  window.history.replaceState(null, '', '/');
});

it('copies the public short link without changing the address or outbound title link', async () => {
  const user = userEvent.setup();
  const write = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
  window.history.replaceState(null, '', '/?preview=true#about');
  const push = jest.spyOn(window.history, 'pushState');
  render(<ProjectHeading project={iris} />);
  await user.click(screen.getByRole('button', { name: 'Copy link to Iris' }));
  expect(write).toHaveBeenCalledWith('https://deven-shah.com/#iris');
  expect(window.location.hash).toBe('#about');
  expect(push).not.toHaveBeenCalled();
  expect(screen.getByRole('heading', { name: 'Iris', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Iris', exact: true })).toHaveAttribute(
    'href',
    iris.link
  );
  expect(screen.getByRole('status')).toHaveTextContent('Link to Iris copied.');
});

it('ignores an older rejected copy after a newer copy succeeds', async () => {
  const user = userEvent.setup();
  let rejectFirst!: (reason: Error) => void;
  const first = new Promise<void>((_resolve, reject) => {
    rejectFirst = reject;
  });
  jest.spyOn(navigator.clipboard, 'writeText').mockReturnValueOnce(first).mockResolvedValue();
  render(<ProjectHeading project={iris} />);
  const button = screen.getByRole('button', { name: 'Copy link to Iris' });
  await user.click(button);
  await user.click(button);
  expect(screen.getByRole('status')).toHaveTextContent('Link to Iris copied.');
  await act(async () => rejectFirst(new Error('Older request denied')));
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Link to Iris copied.');
  expect(button).toHaveFocus();
});

it('uses the GDELT shorthand rather than the long project title or internal ID', async () => {
  const user = userEvent.setup();
  const write = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
  render(
    <ProjectHeading
      project={{
        id: 'gdelt-conflict-forecasting',
        title: 'Forecasting Material Conflict Spikes from GDELT',
        link: 'https://github.com/devenshah2018/gdelt-conflict-forecasting',
      }}
    />
  );
  await user.click(screen.getByRole('button', { name: /Copy link to Forecasting/ }));
  expect(write).toHaveBeenCalledWith('https://deven-shah.com/#gdelt');
});

it('offers a focused, selected link when copying is denied and allows retrying', async () => {
  const user = userEvent.setup();
  const write = jest
    .spyOn(navigator.clipboard, 'writeText')
    .mockRejectedValueOnce(new Error('Denied'))
    .mockResolvedValue();
  render(<ProjectHeading project={iris} />);
  await user.click(screen.getByRole('button', { name: 'Copy link to Iris' }));
  const input = await screen.findByRole('textbox', { name: 'Link to Iris to copy manually' });
  expect(input).toHaveValue('https://deven-shah.com/#iris');
  expect(input).toHaveFocus();
  expect((input as HTMLInputElement).selectionStart).toBe(0);
  expect((input as HTMLInputElement).selectionEnd).toBe('https://deven-shah.com/#iris'.length);
  expect(screen.getByRole('status')).toHaveTextContent('copy it manually');
  await user.click(screen.getByRole('button', { name: 'Copy link to Iris' }));
  expect(write).toHaveBeenCalledTimes(2);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('Link to Iris copied.');
});
