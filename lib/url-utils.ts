export type PortfolioItemType = 'project' | 'experience' | 'education' | 'organization';

function itemAnchor(type: PortfolioItemType, id: string) {
  return `${type}-${id}`;
}

let pendingFrame: number | undefined;
let pendingTimer: ReturnType<typeof setTimeout> | undefined;

export function cancelPendingScroll() {
  if (pendingFrame !== undefined) cancelAnimationFrame(pendingFrame);
  clearTimeout(pendingTimer);
  pendingFrame = undefined;
  pendingTimer = undefined;
}

/** Respect the device's motion preference for every in-page jump. */
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

function updateHash(id: string) {
  if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
}

/** Navigate to a stable section anchor and focus it without a second scroll. */
export function scrollToSection(id: string, updateHistory = false) {
  cancelPendingScroll();
  const target = document.getElementById(id);
  if (!target) return;
  if (updateHistory) updateHash(id);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
}

function scrollToItem(type: PortfolioItemType, id: string, updateHistory: boolean) {
  cancelPendingScroll();
  const anchor = itemAnchor(type, id);
  void updateHistory;
  let attempts = 0;
  const poll = () => {
    const target = document.getElementById(anchor);
    if (target && !target.closest('[hidden]')) {
      scrollToSection(anchor);
      const card =
        target.querySelector<HTMLElement>('[data-scroll-highlight]') ??
        target.querySelector<HTMLElement>('[data-card]') ??
        target;
      card.classList.add('scroll-highlight');
      setTimeout(() => card.classList.remove('scroll-highlight'), 3000);
    } else if (++attempts < 60) {
      pendingTimer = setTimeout(poll, 50);
    }
  };
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = requestAnimationFrame(poll);
  });
}

/** Reveal a filtered project before scrolling to its shareable anchor. */
export function scrollToProject(projectId: string, updateHistory = true) {
  if (document.getElementById(itemAnchor('project', projectId))?.closest('[hidden]')) {
    window.dispatchEvent(new Event('resetProjectFilter'));
  }
  scrollToItem('project', projectId, updateHistory);
}

export const REQUEST_SCROLL_TO_EXPERIENCE = 'requestScrollToExperience';

export function requestScrollToExperience(experienceId: string, updateHistory = true) {
  if (typeof window === 'undefined') return;
  void updateHistory;
  window.dispatchEvent(new CustomEvent(REQUEST_SCROLL_TO_EXPERIENCE, { detail: { experienceId } }));
}

/** ExperienceSection handles requests after its positions are mounted. */
export function scrollToExperience(experienceId: string) {
  scrollToItem('experience', experienceId, false);
}

export function scrollToEducation(educationId: string, updateHistory = true) {
  scrollToItem('education', educationId, updateHistory);
}

export function scrollToOrganization(organizationId: string, updateHistory = true) {
  scrollToItem('organization', organizationId, updateHistory);
}
