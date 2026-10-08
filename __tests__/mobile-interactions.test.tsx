import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/contact/contact-section';
import { SkillModal } from '@/components/about/skill-modal';
import { SKILL_MAPPINGS, LINKS } from '@/database/content-registry';
import { scrollToSection } from '@/lib/url-utils';

jest.mock('@calcom/embed-react', () => ({ getCalApi: jest.fn().mockResolvedValue(jest.fn()) }));

it('provides a selectable address when clipboard access is rejected', async () => {
  const user = userEvent.setup();
  jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Denied'));
  render(<ContactSection />);
  await user.click(screen.getByRole('button', { name: 'Copy Email' }));
  expect(await screen.findByLabelText('Address to copy manually')).toHaveValue(LINKS.email);
  expect(screen.getByRole('status')).toHaveTextContent('copy it manually');
  expect(screen.getByRole('link', { name: 'Open scheduling page' })).toHaveAttribute(
    'href',
    'https://cal.com/deven-shah-l0qkjk/quick-chat'
  );
});

it('announces a successful copy and writes the complete address', async () => {
  const user = userEvent.setup();
  const write = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValueOnce();
  render(<ContactSection />);
  await user.click(screen.getByRole('button', { name: 'Copy LinkedIn' }));
  expect(write).toHaveBeenCalledWith(LINKS.linkedin);
  expect(screen.getByRole('status')).toHaveTextContent('LinkedIn copied.');
  expect(screen.queryByLabelText('Address to copy manually')).not.toBeInTheDocument();
});

it('restores keyboard focus to the skill after dismissing its dialog', async () => {
  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Explore Python</button>
        <SkillModal
          open={open}
          onOpenChange={setOpen}
          skillName='Python'
          skillMappings={SKILL_MAPPINGS}
        />
      </>
    );
  }
  const user = userEvent.setup();
  render(<Harness />);
  const trigger = screen.getByRole('button', { name: 'Explore Python' });
  await user.click(trigger);
  expect(screen.getByRole('heading', { name: 'Python', exact: true })).toHaveFocus();
  await user.keyboard('{Escape}');
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('focuses section headings and respects reduced motion without adding duplicate history', () => {
  const anchor = document.createElement('section');
  anchor.id = 'education';
  anchor.scrollIntoView = jest.fn();
  document.body.append(anchor);
  const push = jest.spyOn(window.history, 'pushState');
  const media = jest
    .spyOn(window, 'matchMedia')
    .mockReturnValue({ matches: true } as MediaQueryList);
  scrollToSection('education', true);
  scrollToSection('education', true);
  expect(anchor).toHaveFocus();
  expect(anchor.scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
  expect(push).toHaveBeenCalledTimes(1);
  media.mockRestore();
  push.mockRestore();
  anchor.remove();
  window.history.replaceState(null, '', '/');
});
