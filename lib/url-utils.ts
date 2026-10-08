/** Respect the device's motion preference for every in-page jump. */
export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

/** Navigate to a stable section anchor and focus it without a second scroll. */
export function scrollToSection(id: string, updateHistory = false) {
  const target = document.getElementById(id);
  if (!target) return;
  if (updateHistory && window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`);
  }
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
}

/**
 * Scroll to a project and highlight it.
 */
export function scrollToProject(projectId: string) {
  window.dispatchEvent(new Event('resetProjectFilter'));
  const id = `project-${projectId}`;
  const maxAttempts = 60;
  let attempts = 0;

  function tryScroll() {
    const projectCard = document.getElementById(id);
    if (projectCard) {
      scrollToSection(id);
      projectCard.classList.add('scroll-highlight');
      setTimeout(() => projectCard.classList.remove('scroll-highlight'), 3000);
      return true;
    }
    return false;
  }

  function poll() {
    if (tryScroll() || ++attempts >= maxAttempts) return;
    setTimeout(poll, 50);
  }

  requestAnimationFrame(() => requestAnimationFrame(poll));
}

export const REQUEST_SCROLL_TO_EXPERIENCE = 'requestScrollToExperience';

/**
 * Request scroll to an experience. Dispatches an event so ExperienceSection
 * can expand to "All" first if the experience isn't in the featured list.
 * Use this instead of scrollToExperience when linking from skills, hash, etc.
 */
export function requestScrollToExperience(experienceId: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(REQUEST_SCROLL_TO_EXPERIENCE, { detail: { experienceId } }));
}

/**
 * Scroll to an experience and highlight it.
 * Aligns the heading below the fixed header, including tall mobile cards.
 */
export function scrollToExperience(experienceId: string) {
  const id = `experience-${experienceId}`;
  const maxAttempts = 40;
  let attempts = 0;

  function tryScroll() {
    const experienceCard = document.getElementById(id);
    if (experienceCard) {
      scrollToSection(id);
      const card = experienceCard.querySelector('[data-card]') || experienceCard;
      (card as HTMLElement).classList.add('scroll-highlight');
      setTimeout(() => (card as HTMLElement).classList.remove('scroll-highlight'), 3000);
      return true;
    }
    return false;
  }

  function poll() {
    if (tryScroll() || ++attempts >= maxAttempts) return;
    setTimeout(poll, 50);
  }

  requestAnimationFrame(() => requestAnimationFrame(poll));
}

export function scrollToEducation(educationId: string) {
  const id = `education-${educationId}`;
  const maxAttempts = 40;
  let attempts = 0;

  function tryScroll() {
    const educationCard = document.getElementById(id);
    if (educationCard) {
      scrollToSection(id);
      const card = educationCard.querySelector('[data-card]') || educationCard;
      (card as HTMLElement).classList.add('scroll-highlight');
      setTimeout(() => (card as HTMLElement).classList.remove('scroll-highlight'), 3000);
      return true;
    }
    return false;
  }

  function poll() {
    if (tryScroll() || ++attempts >= maxAttempts) return;
    setTimeout(poll, 50);
  }

  requestAnimationFrame(() => requestAnimationFrame(poll));
}
