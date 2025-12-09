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
  // Dispatch event to reset project filters
  window.dispatchEvent(new Event('resetProjectFilter'));
  
  setTimeout(() => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        const projectCard = document.getElementById(`project-${projectId}`);
        if (projectCard) {
          projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          const originalTransition = projectCard.style.transition;
          projectCard.style.transition = 'all 0.3s ease-in-out';
          projectCard.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)';
          projectCard.style.transform = 'scale(1.02)';
          
          setTimeout(() => {
            projectCard.style.boxShadow = '';
            projectCard.style.transform = '';
            setTimeout(() => {
              projectCard.style.transition = originalTransition;
            }, 300);
          }, 3000);
        }
      }, 800); 
    }
  }, 100);
}

/**
 * Scroll to an experience and highlight it
 * This function is used when navigating from research subdomain
 */
export function scrollToExperience(experienceId: string) {
  setTimeout(() => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        const experienceCard = document.getElementById(`experience-${experienceId}`);
        if (experienceCard) {
          experienceCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Find the card element to highlight
          const card = experienceCard.querySelector('[data-card]') || experienceCard;
          const originalTransition = (card as HTMLElement).style.transition;
          (card as HTMLElement).style.transition = 'all 0.3s ease-in-out';
          (card as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)';
          (card as HTMLElement).style.transform = 'scale(1.02)';
          
          setTimeout(() => {
            (card as HTMLElement).style.boxShadow = '';
            (card as HTMLElement).style.transform = '';
            setTimeout(() => {
              (card as HTMLElement).style.transition = originalTransition;
            }, 300);
          }, 3000);
        }
      }, 800);
    }
  }, 100);
}

