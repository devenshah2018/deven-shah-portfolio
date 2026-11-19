import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashNavigation } from '@/components/hash-navigation';
import { ProjectsIndex } from '@/components/projects/projects-index';
import { ExperienceSection } from '@/components/experience/experience-section';
import { EDUCATION, EXPERIENCES, ORGANIZATIONS, PROJECTS } from '@/database/content-registry';
import {
  cancelPendingScroll,
  itemAnchor,
  itemSlug,
  resolveItemLink,
  scrollToEducation,
  scrollToProject,
  type PortfolioItemType,
} from '@/lib/url-utils';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  jest.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
  HTMLElement.prototype.scrollIntoView = jest.fn();
  window.history.replaceState(null, '', '/');
  sessionStorage.clear();
});

afterEach(() => {
  cancelPendingScroll();
  jest.clearAllTimers();
  jest.restoreAllMocks();
  jest.useRealTimers();
  window.history.replaceState(null, '', '/');
});

async function settle() {
  await act(async () => {
    await Promise.resolve();
  });
  act(() => jest.advanceTimersByTime(200));
  act(() => jest.advanceTimersByTime(200));
}

function Portfolio() {
  return (
    <>
      <HashNavigation />
      <ExperienceSection />
      <ProjectsIndex />
    </>
  );
}

it.each([
  ['iris', 'project-iris-project', 'iris'],
  ['gdelt', 'project-gdelt-conflict-forecasting', 'gdelt'],
  ['wardrobe-copilot', 'project-wardrobe-copilot', 'wardrobe-copilot'],
  ['patelco', 'experience-patelco', 'patelco'],
  ['bu', 'education-bu-masters', 'bu'],
  ['cyberforensics', 'organization-digital-forensics-lab', 'cyberforensics'],
  ['voyagers', 'organization-voyagers', 'voyagers'],
  ['project-iris-project', 'project-iris-project', 'iris'],
  ['project-gdelt-conflict-forecasting', 'project-gdelt-conflict-forecasting', 'gdelt'],
  ['project-wardrobe-copilot', 'project-wardrobe-copilot', 'wardrobe-copilot'],
  ['experience-patelco', 'experience-patelco', 'patelco'],
  ['education-bu-masters', 'education-bu-masters', 'bu'],
  ['organization-digital-forensics-lab', 'organization-digital-forensics-lab', 'cyberforensics'],
  ['organization-voyagers', 'organization-voyagers', 'voyagers'],
])('opens #%s and focuses %s', async (hash, anchor, canonical) => {
  window.history.replaceState(null, '', `/#${hash}`);
  render(<Portfolio />);
  await settle();
  const target = document.getElementById(anchor)!;
  expect(target).toHaveFocus();
  expect(target.closest('[hidden]')).toBeNull();
  expect(target.querySelector('[data-scroll-highlight]') ?? target).toHaveClass('scroll-highlight');
  if (target.querySelector('[data-scroll-highlight]')) {
    expect(target.querySelector('a[title^="Link to "]')?.closest('.scroll-highlight')).toBeNull();
  }
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
  expect(window.location.hash).toBe(`#${canonical}`);
});

it('gives every item a unique short name that resolves back to its original ID', () => {
  const registries: [PortfolioItemType, readonly { id: string }[]][] = [
    ['project', PROJECTS],
    ['experience', EXPERIENCES],
    ['education', EDUCATION],
    ['organization', ORGANIZATIONS],
  ];
  const slugs = new Set([
    'hero',
    'about',
    'experience',
    'education',
    'organizations',
    'projects',
    'contact',
  ]);
  for (const [type, items] of registries) {
    for (const { id } of items) {
      const slug = itemSlug(type, id);
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(slug).not.toBe(itemAnchor(type, id));
      expect(slugs.has(slug)).toBe(false);
      expect(resolveItemLink(slug)).toEqual({ type, id });
      expect(resolveItemLink(itemAnchor(type, id))).toEqual({ type, id });
      slugs.add(slug);
    }
  }
});

it('provides project copy controls and native links for other items in both experience views', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<Portfolio />);
  await user.click(screen.getByRole('button', { name: 'All projects 12' }));
  for (const item of PROJECTS) {
    expect(
      screen.getByRole('button', { name: `Copy link to ${item.title}`, exact: true })
    ).toBeInTheDocument();
  }
  for (const item of EDUCATION) {
    expect(
      screen.getByRole('link', { name: `Link to ${item.institution}`, exact: true })
    ).toHaveAttribute('href', `#${itemSlug('education', item.id)}`);
  }
  for (const item of ORGANIZATIONS) {
    expect(screen.getByRole('link', { name: `Link to ${item.name}`, exact: true })).toHaveAttribute(
      'href',
      `#${itemSlug('organization', item.id)}`
    );
    expect(
      document.getElementById(`organization-${item.id}`)?.querySelector('button a')
    ).toBeNull();
  }
  for (const view of ['Compact', 'Detailed']) {
    await user.click(screen.getByRole('button', { name: view, exact: true }));
    for (const item of EXPERIENCES) {
      expect(
        screen.getByRole('link', { name: `Link to ${item.title} at ${item.company}`, exact: true })
      ).toHaveAttribute('href', `#${itemSlug('experience', item.id)}`);
    }
  }
});

it('reveals a filtered-out project and updates the URL without duplicate history entries', async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<Portfolio />);
  await settle();
  await user.click(screen.getByRole('button', { name: 'Theory and Algorithms 3' }));
  const push = jest.spyOn(window.history, 'pushState');
  act(() => scrollToProject('iris-project'));
  await settle();
  expect(screen.getByRole('button', { name: 'All projects 12' })).toHaveAttribute(
    'aria-pressed',
    'true'
  );
  expect(document.getElementById('project-iris-project')).toHaveFocus();
  expect(window.location.hash).toBe('#iris');
  await user.click(screen.getByRole('button', { name: 'Copy link to Iris', exact: true }));
  await settle();
  expect(push).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('link', { name: 'Iris', exact: true })).toHaveAttribute(
    'href',
    'https://www.iris-plan.com'
  );
});

it('restores items on history and hash changes without duplicate scrolling', async () => {
  render(<Portfolio />);
  await settle();
  const scroll = jest.mocked(HTMLElement.prototype.scrollIntoView);
  scroll.mockClear();
  act(() => {
    window.history.replaceState(null, '', '/#bu');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  await settle();
  expect(document.getElementById('education-bu-masters')).toHaveFocus();
  expect(scroll).toHaveBeenCalledTimes(1);
  act(() => {
    window.history.replaceState(null, '', '/#voyagers');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
  await settle();
  expect(document.getElementById('organization-voyagers')).toHaveFocus();
});

it('ignores malformed fragments and cancels an older pending item jump', async () => {
  window.history.replaceState(null, '', '/#%E0%A4%A');
  render(
    <>
      <HashNavigation />
      <div hidden id='project-pending' />
      <div id='education-visible' />
    </>
  );
  await settle();
  expect(HTMLElement.prototype.scrollIntoView).not.toHaveBeenCalled();
  act(() => scrollToProject('pending'));
  await settle();
  act(() => scrollToEducation('visible'));
  await settle();
  act(() => jest.advanceTimersByTime(2000));
  expect(document.getElementById('education-visible')).toHaveFocus();
  expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
});

it('does not intercept modified permalink clicks', () => {
  render(<ExperienceSection />);
  const link = screen.getByRole('link', { name: 'Link to Boston University', exact: true });
  const click = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
  fireEvent(link, click);
  expect(click.defaultPrevented).toBe(false);
});
