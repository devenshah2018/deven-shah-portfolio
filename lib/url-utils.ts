/**
 * Get the base URL for the main portfolio site
 * Detects if running on localhost or production
 */
export function getMainSiteUrl(): string {
  // Check if we're in a server environment
  if (typeof window === 'undefined') {
    // Server-side: check environment variable or default to production
    const isLocal = process.env.NODE_ENV === 'development' || process.env['VERCEL_ENV'] === undefined;
    return isLocal ? 'http://localhost:3000' : 'https://deven-shah.com';
  }
  
  // Client-side: check current hostname
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
    return 'http://localhost:3000';
  }
  
  // Production
  return 'https://deven-shah.com';
}

/**
 * Get the base URL for the research subdomain
 * Detects if running on localhost or production
 */
export function getResearchSiteUrl(): string {
  // Check if we're in a server environment
  if (typeof window === 'undefined') {
    // Server-side: check environment variable or default to production
    const isLocal = process.env.NODE_ENV === 'development' || process.env['VERCEL_ENV'] === undefined;
    return isLocal ? 'http://research.localhost:3000' : 'https://research.deven-shah.com';
  }
  
  // Client-side: check current hostname
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
    return 'http://research.localhost:3000';
  }
  
  // Production
  return 'https://research.deven-shah.com';
}

/**
 * Scroll to a project and highlight it
 * This function is used when navigating from research subdomain
 */
export function scrollToProject(projectId: string) {
  window.dispatchEvent(new Event('resetProjectFilter'));
  const id = `project-${projectId}`;
  const maxAttempts = 60;
  let attempts = 0;

  function tryScroll() {
    const projectCard = document.getElementById(id);
    if (projectCard) {
      projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  window.dispatchEvent(
    new CustomEvent(REQUEST_SCROLL_TO_EXPERIENCE, { detail: { experienceId } })
  );
}

/**
 * Scroll to an experience and highlight it.
 * Centers the target in the viewport for unified smooth expand+scroll.
 */
export function scrollToExperience(experienceId: string) {
  const id = `experience-${experienceId}`;
  const maxAttempts = 40;
  let attempts = 0;

  function tryScroll() {
    const experienceCard = document.getElementById(id);
    if (experienceCard) {
      const rect = experienceCard.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const scrollTop = window.scrollY + elementCenter - viewportCenter;
      const clamped = Math.max(0, scrollTop);
      window.scrollTo({ top: clamped, behavior: 'smooth' });
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
      educationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

