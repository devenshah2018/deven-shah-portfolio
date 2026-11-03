export type PortfolioItemType = 'project' | 'experience' | 'education' | 'organization';

// Public names stay short and stable even if titles or internal IDs change.
const itemSlugs: Record<PortfolioItemType, Record<string, string>> = {
  project: {
    'iris-project': 'iris',
    'boosted-project': 'boosted',
    'umlazy-project': 'umlazy',
    'graf-project': 'graf',
    'gdelt-conflict-forecasting': 'gdelt',
    'kepler-exoplanets': 'kepler',
    'wardrobe-copilot': 'wardrobe-copilot',
    'molecule-mutation-prediction': 'molecule-prediction',
    'drone-build-project': 'drone-path-planning',
    'image-retrieval-project': 'image-retrieval',
    'task-scheduling-project': 'task-scheduling',
    'breaking-dijkstra-project': 'breaking-dijkstra',
  },
  experience: {
    'accenture-incoming': 'accenture-incoming',
    accenture: 'accenture',
    juntrax: 'juntrax',
    'suno-analytics': 'suno',
    patelco: 'patelco',
    netapp: 'netapp',
    'build-fellowship': 'build-fellowship',
    'research-assistant': 'bu-research',
    'teaching-assistant': 'bu-teaching',
  },
  education: {
    'bu-masters': 'bu',
    'sjsu-bachelors': 'sjsu',
  },
  organization: {
    voyagers: 'voyagers',
    'digital-forensics-lab': 'cyberforensics',
    'ai-computer-vision-lab': 'ai-vision-lab',
  },
};

export function itemAnchor(type: PortfolioItemType, id: string) {
  return `${type}-${id}`;
}

export function itemSlug(type: PortfolioItemType, id: string) {
  return itemSlugs[type][id] ?? itemAnchor(type, id);
}

/** Resolve short public names and previously shared, prefixed anchors. */
export function resolveItemLink(
  anchor: string
): { type: PortfolioItemType; id: string } | undefined {
  for (const type of Object.keys(itemSlugs) as PortfolioItemType[]) {
    const match = Object.entries(itemSlugs[type]).find(([, slug]) => slug === anchor);
    if (match) return { type, id: match[0] };
    if (anchor.startsWith(`${type}-`)) return { type, id: anchor.slice(type.length + 1) };
  }
  return undefined;
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
  if (updateHistory) updateHash(itemSlug(type, id));
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
  if (updateHistory) updateHash(itemSlug('experience', experienceId));
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

export function navigateToItem(type: PortfolioItemType, id: string, updateHistory = true) {
  if (type === 'project') scrollToProject(id, updateHistory);
  else if (type === 'experience') requestScrollToExperience(id, updateHistory);
  else if (type === 'education') scrollToEducation(id, updateHistory);
  else scrollToOrganization(id, updateHistory);
}
