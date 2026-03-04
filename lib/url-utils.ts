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
  setTimeout(() => {
    const projectCard = document.getElementById(`project-${projectId}`);
    if (projectCard) {
      projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      projectCard.classList.add('scroll-highlight');
      setTimeout(() => projectCard.classList.remove('scroll-highlight'), 3000);
    }
  }, 100);
}

/**
 * Scroll to an experience and highlight it
 * This function is used when navigating from research subdomain
 */
export function scrollToExperience(experienceId: string) {
  setTimeout(() => {
    const experienceCard = document.getElementById(`experience-${experienceId}`);
    if (experienceCard) {
      experienceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const card = experienceCard.querySelector('[data-card]') || experienceCard;
      (card as HTMLElement).classList.add('scroll-highlight');
      setTimeout(() => (card as HTMLElement).classList.remove('scroll-highlight'), 3000);
    }
  }, 100);
}

export function scrollToEducation(educationId: string) {
  setTimeout(() => {
    const educationCard = document.getElementById(`education-${educationId}`);
    if (educationCard) {
      educationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const card = educationCard.querySelector('[data-card]') || educationCard;
      (card as HTMLElement).classList.add('scroll-highlight');
      setTimeout(() => (card as HTMLElement).classList.remove('scroll-highlight'), 3000);
    }
  }, 100);
}

