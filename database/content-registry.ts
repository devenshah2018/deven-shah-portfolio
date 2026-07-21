import { GraduationCap, Award } from 'lucide-react';
import { Project } from '../lib/types';

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/deven-a-shah/',
  github: 'https://github.com/devenshah2018',
  x: 'https://x.com/devenshah2018',
  email: 'devenshah2018@gmail.com',
  strava: 'https://www.strava.com/athletes/123793208',
  cal: 'https://cal.com/deven-shah-l0qkjk/quick-chat',
  kaggle: 'https://www.kaggle.com/devenashah',
  hevy: 'https://hevy.com/user/devenshah',
};

export const SKILLS = {
  languages: [
    'Python',
    'TypeScript',
    'C#',
    'Java',
    'Apex',
    'JavaScript',
    'SQL',
    'SOQL',
    'HTML',
    'CSS',
    'Bash',
    'Rust',
    'C++'
  ],
  platforms: ['Linux', 'AWS', 'Salesforce', 'Azure', 'LangGraph', 'GCP', 'Jupyter', 'Supabase', 'Stripe', 'Inngest'],
  frameworks: ['React', '.NET', 'Flask', 'TailwindCSS', 'Angular', 'ASP.NET Core', 'Next.js', 'Node.js', 'Vite'],
  database: ['SQL', 'SOQL', 'Oracle', 'PostgreSQL', 'MySQL', 'MongoDB'],
  aimal: ['Python', 'LLMs', 'Sklearn', 'Tensorflow', 'Pytorch', 'LangGraph', 'CNNs', 'OpenAI', 'FAISS'],
  devops: ['Docker', 'Github/Git', 'GCP', 'AWS', 'Azure'],
  apis: ['C#', 'Python', 'Apex', 'Azure', 'REST API', 'GraphQL', 'TypeScript'],
  featured: ['Python', 'TypeScript', 'C#', 'SQL', 'Salesforce', 'Azure', 'React', 'ASP.NET Core', 'PostgreSQL', 'CNNs', 'Pytorch', 'Docker']
};

// Simplified skill mappings - only store IDs instead of duplicating full object data
export const SKILL_MAPPINGS = [
  { skill: 'Python', experienceIds: ['suno-analytics', 'netapp', 'build-fellowship', 'research-assistant', 'accenture'], projectIds: ['molecule-mutation-prediction', 'drone-build-project', 'image-retrieval-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'TypeScript', experienceIds: ['suno-analytics', 'patelco', 'build-fellowship'], projectIds: ['drone-build-project', 'iris-project', 'boosted-project', 'any-project', 'umlazy-project', 'graf-project'] },
  { skill: 'C#', experienceIds: ['patelco'], educationIds: ['sjsu-bachelors'] },
  { skill: 'React', experienceIds: ['suno-analytics'], projectIds: ['drone-build-project', 'iris-project', 'breaking-dijkstra-project', 'boosted-project', 'any-project', 'umlazy-project', 'graf-project'] },
  { skill: 'Azure', experienceIds: ['suno-analytics', 'patelco'] },
  { skill: 'LangGraph', experienceIds: ['suno-analytics'] },
  { skill: '.NET', experienceIds: ['patelco'] },
  { skill: 'SQL', experienceIds: ['suno-analytics', 'patelco', 'netapp'], educationIds: ['sjsu-bachelors'] },
  { skill: 'SOQL', experienceIds: ['patelco', 'accenture'] },
  { skill: 'HTML', experienceIds: ['suno-analytics', 'patelco', 'netapp'], educationIds: ['sjsu-bachelors'] },
  { skill: 'CSS', experienceIds: ['suno-analytics', 'patelco', 'netapp'], educationIds: ['sjsu-bachelors'] },
  { skill: 'Java', educationIds: ['sjsu-bachelors'] },
  { skill: 'JavaScript', experienceIds: ['suno-analytics', 'patelco'] },
  { skill: 'Apex', experienceIds: ['patelco'] },
  { skill: 'Salesforce', experienceIds: ['patelco', 'accenture'] },
  { skill: 'AWS', experienceIds: ['suno-analytics'], educationIds: ['aws-cloud-practitioner'] },
  { skill: 'Flask', experienceIds: ['netapp', 'suno-analytics'] },
  { skill: 'Bash', experienceIds: ['netapp'], projectIds: [ 'molecule-mutation-prediction'] },
  { skill: 'Oracle', experienceIds: ['netapp'] },
  { skill: 'PostgreSQL', experienceIds: ['suno-analytics'], projectIds: ['boosted-project', 'any-project', 'graf-project', 'iris-project'] },
  { skill: 'GCP', experienceIds: ['suno-analytics'] },
  { skill: 'TailwindCSS', experienceIds: ['suno-analytics'] },
  { skill: 'Rust', projectIds: ['task-scheduling-project'] },
  { skill: 'Linux', educationIds: ['bu-masters'], projectIds: ['task-scheduling-project'] },
  { skill: 'LLMs', experienceIds: ['suno-analytics'] },
  { skill: 'Sklearn', experienceIds: ['suno-analytics'], projectIds: ['molecule-mutation-prediction'] },
  { skill: 'Tensorflow', experienceIds: ['suno-analytics'] },
  { skill: 'Pytorch', experienceIds: ['build-fellowship', 'research-assistant'], projectIds: ['image-retrieval-project'] },
  { skill: 'Docker', experienceIds: ['netapp', 'suno-analytics', 'build-fellowship'] },
  { skill: 'Jupyter', projectIds: ['drone-build-project', 'image-retrieval-project'], experienceIds: ['build-fellowship', 'research-assistant'] },
  { skill: 'C++', educationIds: ['bu-masters'] },
  { skill: 'Github/Git', experienceIds: ['suno-analytics', 'patelco', 'netapp', 'build-fellowship'], projectIds: ['drone-build-project', 'molecule-mutation-prediction', 'image-retrieval-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'REST API', experienceIds: ['suno-analytics', 'patelco', 'netapp'] },
  { skill: 'GraphQL', experienceIds: ['suno-analytics'] },
  { skill: 'MySQL', experienceIds: ['patelco'] },
  { skill: 'MongoDB', experienceIds: ['suno-analytics'] },
  { skill: 'Angular', experienceIds: ['patelco'] },
  { skill: 'ASP.NET Core', experienceIds: ['patelco'] },
  { skill: 'Next.js', projectIds: ['drone-build-project', 'umlazy-project'], experienceIds: ['suno-analytics'] },
  { skill: 'CNNs', experienceIds: ['build-fellowship', 'research-assistant'], projectIds: ['image-retrieval-project'] },
  { skill: 'FAISS', experienceIds: ['build-fellowship'], projectIds: ['image-retrieval-project'] },
  { skill: 'Node.js', projectIds: ['boosted-project', 'any-project', 'iris-project'] },
  { skill: 'Vite', projectIds: ['graf-project'] },
  { skill: 'Supabase', projectIds: ['boosted-project', 'any-project', 'graf-project', 'iris-project'] },
  { skill: 'Stripe', projectIds: ['boosted-project', 'iris-project'] },
  { skill: 'Inngest', projectIds: ['any-project'] },
  { skill: 'OpenAI', projectIds: ['boosted-project', 'iris-project'] },
];

export const SKILL_CATEGORIES = [
  { key: 'featured', label: 'Featured' },
  { key: 'all', label: 'All' },
  { key: 'aimal', label: 'AI/ML' },
  { key: 'apis', label: 'API' },
  { key: 'database', label: 'Database' },
  { key: 'devops', label: 'DevOps' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'languages', label: 'Languages' },
  { key: 'platforms', label: 'Platforms' },
];

export const CATEGORIZED_SKILLS = Object.fromEntries(
  Object.entries(SKILLS).map(([category, skills]) => [category, skills])
);

CATEGORIZED_SKILLS['all'] = Array.from(new Set(Object.values(SKILLS).flat()));

export const EXPERIENCES = [
  {
    id: 'juntrax',
    title: 'User Interface Engineer',
    company: 'Juntrax Solutions',
    companyLogo: '/juntrax.jpeg',
    location: 'Dublin, CA',
    period: '07/2018 - 08/2019',
    description: 'Developed testing oracles to ensure the front end of the web application performs as expected. Engineered pipelines to ensure issues were prioritized and resolved efficiently.',
    link: 'https://juntrax.com/'
  },
  {
    id: 'suno-analytics',
    title: 'Co-Founder & CTO',
    company: 'Suno Analytics',
    companyLogo: '/suno-logo.jpeg',
    location: 'Remote',
    period: '04/2024 – 01/2026',
    description:
      'Co-founded Suno Analytics and led technical vision from prototype to production, delivering an AI-powered enterprise resource planning (ERP) platform for ecommerce companies.',
    achievements: [
      'Spearheaded a globally distributed Agile engineering team across backend, frontend, and ML, driving rapid feature development and client issue resolution to maintain SLA standards.',
      'Architected a full-stack web platform (React + TypeScript frontend, PostgreSQL backend) with OAuth authentication and WebSocket-based connections for real-time updates.',
      'Engineering a forecasting system to generate purchase orders with ~80% confidence and maintain reliable stock levels through DeepAR and PyTorch, trained on historical sales and seasonal patterns.',
      'Launched AI-powered analytics features that increased client retention and platform adoption.',
    ],
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.sunoanalytics.com'
  },
  {
    id: 'patelco',
    title: 'Application Developer',
    company: 'Patelco',
    companyLogo: '/patelco-logo.png',
    location: 'Dublin, CA',
    period: '04/2023 – 04/2024',
    description:
      'Shipped member-facing and internal banking applications to 500K+ users, working with product managers and stakeholders to convert requirements into compliant production systems.',
    achievements: [
      'Eliminated required in-branch visits by architecting a virtual fraud request system (Visualforce frontend + Apex backend) enabling members to submit and track fraud claims digitally.',
      'Reduced HELOAN and HELOC rate update time by 10x through an internal management platform (ASP.NET Core + MySQL), eliminating manual record adjustments and spreadsheet-based tracking.',
      'Facilitated development of a hackathon-winning platform (Angular + Salesforce) to streamline appointment scheduling with members and Certified Financial Specialists directly.'
    ],
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.patelco.org',
  },
  {
    id: 'netapp',
    title: 'Solutions Architect Intern',
    company: 'NetApp',
    companyLogo: '/netapp-logo.png',
    location: 'San Jose, CA',
    period: '05/2021 – 12/2022',
    description:
      'Automated big data management and supported sales meetings by gathering client requirements.',
    achievements: [
      'Worked with solutions architects, enterprise clients, and storage engineers to modernize ONTAP-based backup workflows for Oracle databases.',
      'Automated Oracle RMAN backup processes using the Oracle SDK and Python, decreasing backup execution time by 50% and minimizing manual DBA intervention.',
      'Designed a Python and Bash-based monitoring and alerting system to track storage array health metrics, cutting manual monitoring time by 90%.',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.netapp.com',
  },
  {
    id: 'build-fellowship',
    title: 'Build Student Consultant',
    company: 'Build Fellowship by Open Avenues',
    companyLogo: '/build-logo.png',
    location: 'Remote',
    period: '09/2025 – 04/2026',
    description:
      'Built AI-powered image retrieval and drone path planning systems in Python, leveraging PyTorch, FAISS, Qdrant, and Docker for scalable semantic search and dataset capture.',
    achievements: [],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.buildfellowship.com/'
  },
  {
    id: 'accenture',
    title: 'Technical Architecture Analyst',
    company: 'Accenture',
    companyLogo: '/accenture-logo.svg',
    location: 'San Francisco, CA',
    period: '05/2026 – Present',
    description:
      'Automating enterprise software solutions for Fortune 500 clients using AI and cloud technologies, focusing on scalable architecture and efficient deployment.',
    achievements: [],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.accenture.com',
    current_work: true,
    summary: 'Building enterprise software solutions for clients.'
  },
  {
    id: 'research-assistant',
    title: 'Graduate Research Assistant',
    company: 'Boston University',
    companyLogo: '/bu-logo.png',
    location: 'Boston, MA',
    period: '10/2025 – Present',
    description:
      'Conducting computer vision and AI research across two labs at Boston University, across biotechnology and criminal justice.',
    achievements: [
      'Cyberforensics Research Lab (Mar 2026 – Present): Researching deepfake generation and detection landscape alongside faculty and peers across AI and criminal justice, building frameworks that hold up against real-world media integrity threats.',
      'Artificial Intelligence and Computer Vision Lab (Oct 2025 – Present): Researching automated osteoarthritis diagnosis alongside faculty, medical professionals, and peers across computer vision and clinical radiology, building pipelines that replace hours of manual MRI review.'
    ],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.bu.edu/',
    featured: true,
    current_work: true,
    summary: 'AI computer vision research in biotechnology and criminal justice.',
  },
  {
    id: 'teaching-assistant',
    title: 'Graduate Teaching Assistant',
    company: 'Boston University',
    companyLogo: '/bu-logo.png',
    location: 'Boston, MA',
    period: '01/2026 – 05/2026',
    description:
      'Teaching assistant for CS 566: Analysis of Algorithms.',
    achievements: [],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.bu.edu/'
  },
];

export type Experience = (typeof EXPERIENCES)[number];

export type OrgGroup = {
  company: string;
  companyLogo?: string;
  location: string;
  link: string;
  gradient?: string;
  duration: string;
  positions: Experience[];
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parse period string to numeric month/year. Present uses current date as end. */
function parsePeriod(period: string): { startY: number; startM: number; endY: number; endM: number } | null {
  const dates = period.match(/(\d{2})\/(\d{4})/g);
  if (!dates || dates.length === 0) return null;
  const startMatch = dates[0].match(/(\d{2})\/(\d{4})/);
  if (!startMatch?.[1] || !startMatch?.[2]) return null;
  const startM = parseInt(startMatch[1], 10);
  const startY = parseInt(startMatch[2], 10);
  let endM: number;
  let endY: number;
  if (period.includes('Present')) {
    const now = new Date();
    endM = now.getMonth() + 1;
    endY = now.getFullYear();
  } else if (dates.length >= 2) {
    const endMatch = dates[dates.length - 1]!.match(/(\d{2})\/(\d{4})/);
    if (!endMatch?.[1] || !endMatch?.[2]) return null;
    endM = parseInt(endMatch[1], 10);
    endY = parseInt(endMatch[2], 10);
  } else {
    endM = startM;
    endY = startY;
  }
  return { startM, startY, endM, endY };
}

/** Format period for display, e.g. "Dec 2024 – Jan 2026" or "Feb 2026 – Present". */
export function formatPeriodDisplay(period: string): string {
  const p = parsePeriod(period);
  if (!p) return period;
  const startStr = `${MONTHS[p.startM - 1]} ${p.startY}`;
  const endStr = period.includes('Present') ? 'Present' : `${MONTHS[p.endM - 1]} ${p.endY}`;
  return `${startStr} – ${endStr}`;
}

/** Start date only, e.g. "Dec 2024". */
export function formatPeriodStart(period: string): string {
  const p = parsePeriod(period);
  if (!p) return period;
  return `${MONTHS[p.startM - 1]} ${p.startY}`;
}

/** End date only, e.g. "Jan 2026" or "Present". */
export function formatPeriodEnd(period: string): string {
  const p = parsePeriod(period);
  if (!p) return period;
  return period.includes('Present') ? 'Present' : `${MONTHS[p.endM - 1]} ${p.endY}`;
}

/** Get duration in months between start and end. */
function periodMonths(period: string): number | null {
  const p = parsePeriod(period);
  if (!p) return null;
  return (p.endY - p.startY) * 12 + (p.endM - p.startM) + 1;
}

/** Format total months as "2 yrs 3 mo" or "6 mo". */
export function formatDuration(period: string): string {
  const months = periodMonths(period);
  if (months == null || months < 1) return '';
  if (months < 12) return `${months} mo`;
  const yrs = Math.floor(months / 12);
  const mo = months % 12;
  if (mo === 0) return yrs === 1 ? '1 yr' : `${yrs} yrs`;
  return `${yrs} yr${yrs > 1 ? 's' : ''} ${mo} mo`;
}

export function getEndDate(period: string): number {
  if (period.includes('Present')) return 999999;
  const dates = period.match(/(\d{2})\/(\d{4})/g);
  if (dates && dates.length >= 2) {
    const lastDate = dates[dates.length - 1];
    if (lastDate) {
      const m = lastDate.match(/(\d{2})\/(\d{4})/);
      if (m?.[1] && m?.[2]) return parseInt(m[2] + m[1]);
    }
  }
  if (dates && dates.length === 1) {
    const m = dates[0].match(/(\d{2})\/(\d{4})/);
    if (m?.[1] && m?.[2]) return parseInt(m[2] + m[1]);
  }
  return 0;
}

/** Merge overlapping date ranges and return total months (no double-counting). */
function getOrgDuration(positions: Experience[]): string {
  const ranges: { start: number; end: number }[] = [];
  for (const pos of positions) {
    const p = parsePeriod(pos.period);
    if (!p) continue;
    const start = p.startY * 12 + p.startM;
    const end = p.endY * 12 + p.endM;
    if (start > end) continue;
    ranges.push({ start, end });
  }
  if (ranges.length === 0) return '';
  ranges.sort((a, b) => a.start - b.start);
  const merged: { start: number; end: number }[] = [ranges[0]!];
  for (let i = 1; i < ranges.length; i++) {
    const curr = ranges[i]!;
    const last = merged[merged.length - 1]!;
    if (curr.start <= last.end + 1) {
      last.end = Math.max(last.end, curr.end);
    } else {
      merged.push(curr);
    }
  }
  let totalMonths = 0;
  for (const { start, end } of merged) {
    totalMonths += end - start + 1;
  }
  if (totalMonths < 1) return '';
  if (totalMonths < 12) return `${totalMonths} mo`;
  const yrs = Math.floor(totalMonths / 12);
  const mo = totalMonths % 12;
  if (mo === 0) return yrs === 1 ? '1 yr' : `${yrs} yrs`;
  return `${yrs} yr${yrs > 1 ? 's' : ''} ${mo} mo`;
}

/** Total professional experience across all companies, merged (no double-counting overlaps). */
export function getTotalExperienceYears(): string {
  const ranges: { start: number; end: number }[] = [];
  for (const exp of EXPERIENCES) {
    const p = parsePeriod(exp.period);
    if (!p) continue;
    const start = p.startY * 12 + p.startM;
    const end = p.endY * 12 + p.endM;
    if (start > end) continue;
    ranges.push({ start, end });
  }
  if (ranges.length === 0) return '0+ years';
  ranges.sort((a, b) => a.start - b.start);
  const merged: { start: number; end: number }[] = [ranges[0]!];
  for (let i = 1; i < ranges.length; i++) {
    const curr = ranges[i]!;
    const last = merged[merged.length - 1]!;
    if (curr.start <= last.end + 1) {
      last.end = Math.max(last.end, curr.end);
    } else {
      merged.push(curr);
    }
  }
  let totalMonths = 0;
  for (const { start, end } of merged) {
    totalMonths += end - start + 1;
  }
  if (totalMonths < 1) return '0+ years';
  const yrs = Math.floor(totalMonths / 12);
  return `${yrs}+ years`;
}

/** Highest / most recent degree: current if in progress, else most recent by end date. Returns degree + major (e.g. "M.S. Computer Science") and institution. */
export function getHighestDegree(): { id: string; degreeAndMajor: string; institution: string } | null {
  const edu = EDUCATION as Array<{ id: string; degree: string; institution: string; period: string; isActive?: boolean }>;
  if (edu.length === 0) return null;
  const withEnd = edu.map((e) => ({
    ...e,
    endSort: e.period.includes('Present') ? 999999 : getEndDate(e.period),
  }));
  withEnd.sort((a, b) => b.endSort - a.endSort);
  const top = withEnd[0]!;
  const degreeAndMajor = top.degree.replace(/\s+in\s+/i, ' ').trim();
  return { id: top.id, degreeAndMajor, institution: top.institution };
}

/** Groups experiences by organization (LinkedIn-style), sorted by most recent position. */
export function groupExperiencesByOrg(): OrgGroup[] {
  const byCompany = new Map<string, Experience[]>();
  for (const exp of EXPERIENCES) {
    const key = exp.company;
    if (!byCompany.has(key)) byCompany.set(key, []);
    byCompany.get(key)!.push(exp);
  }
  return Array.from(byCompany.entries()).map(([company, positions]) => {
    const first = positions[0]!;
    const sorted = [...positions].sort((a, b) => getEndDate(b.period) - getEndDate(a.period));
    return {
      company,
      ...(first.companyLogo !== undefined && { companyLogo: first.companyLogo }),
      location: first.location,
      link: first.link,
      ...(first.gradient !== undefined && { gradient: first.gradient }),
      duration: getOrgDuration(sorted),
      positions: sorted,
    };
  }).sort((a, b) => {
    const endDiff = getEndDate(b.positions[0]!.period) - getEndDate(a.positions[0]!.period);
    if (endDiff !== 0) return endDiff;
    const aStart = parsePeriod(a.positions[0]!.period);
    const bStart = parsePeriod(b.positions[0]!.period);
    if (!aStart || !bStart) return 0;
    return (bStart.startY * 12 + bStart.startM) - (aStart.startY * 12 + aStart.startM);
  });
}

/** Top 3 org groups (personally flagged via featured: true on positions). */
export function getTopOrgGroups(): OrgGroup[] {
  const all = groupExperiencesByOrg();
  return all.filter(org => org.positions.some(p => (p as Experience & { featured?: boolean }).featured)).slice(0, 3);
}

/** Remaining org groups (not in top 3). */
export function getOtherOrgGroups(): OrgGroup[] {
  const all = groupExperiencesByOrg();
  const top = getTopOrgGroups();
  const topCompanies = new Set(top.map(o => o.company));
  return all.filter(org => !topCompanies.has(org.company));
}

/** Month tick labels from earliest experience start to now. stepMonths = 3 gives ~quarterly. */
export function getTimelineTicks(stepMonths: number = 3): { label: string; sortKey: number }[] {
  let minStartY = Infinity;
  let minStartM = Infinity;
  for (const exp of EXPERIENCES) {
    const p = parsePeriod(exp.period);
    if (!p) continue;
    if (p.startY < minStartY || (p.startY === minStartY && p.startM < minStartM)) {
      minStartY = p.startY;
      minStartM = p.startM;
    }
  }
  if (minStartY === Infinity) return [];
  const now = new Date();
  const ticks: { label: string; sortKey: number }[] = [];
  let y = minStartY;
  let m = minStartM;
  while (y < now.getFullYear() || (y === now.getFullYear() && m <= now.getMonth() + 1)) {
    ticks.push({ label: `${MONTHS[m - 1]} ${y}`, sortKey: y * 100 + m });
    m += stepMonths;
    while (m > 12) {
      m -= 12;
      y += 1;
    }
  }
  return ticks.reverse();
}

/** Year tick labels from earliest experience start to now, for timeline right-side labels. */
export function getTimelineYearTicks(): { label: string; sortKey: number }[] {
  let minStartY = Infinity;
  for (const exp of EXPERIENCES) {
    const p = parsePeriod(exp.period);
    if (!p) continue;
    if (p.startY < minStartY) minStartY = p.startY;
  }
  if (minStartY === Infinity) return [];
  const now = new Date();
  const ticks: { label: string; sortKey: number }[] = [];
  for (let y = now.getFullYear(); y >= minStartY; y--) {
    ticks.push({ label: String(y), sortKey: y * 100 + 12 });
  }
  return ticks;
}

export const PROJECT_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'products', label: 'Products' },
  { key: 'apps', label: 'Apps & Tools' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'theory', label: 'Theory' },
];

export const PROJECTS: Project[] = [
  {
    id: 'iris-project',
    sortDate: '2026-01',
    title: 'Iris',
    subtitle: 'AI Planner',
    period: '01/2026 – Present',
    description:
      'AI-powered daily assistant that sits on top of your conversations and workflows to organize what matters',
    technologies: ['TypeScript', 'React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Stripe', 'Supabase'],
    entry_point: 'live',
    link: 'https://www.iris-plan.com',
    status: 'In Progress',
    readMe: false,
    categories: ['products'],
    current_work: false,
    summary: 'AI daily planner for your conversations and workflows',
    related_experiences: ['voyagers'],
    demoVideo: '/demos/iris-demo.mp4',
    accessible_at: ['hosted'],
    access_points: [
      { type: 'hosted', url: 'https://www.iris-plan.com', label: 'Live Site' }
    ]
  },
  {
    id: 'boosted-project',
    title: 'Boosted',
    subtitle: 'AI Marketing Agent',
    period: '03/2026 – Present',
    sortDate: '2026-03',
    description:
      'A marketing agent that drafts content grounded in your product and voice — SEO-tuned and ready to ship across channels.',
    technologies: ['TypeScript', 'React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Stripe', 'Supabase'],
    entry_point: 'live',
    link: 'https://boosted.onrender.com',
    status: 'Live',
    readMe: false,
    categories: ['products'],
    summary: 'AI marketing agent for on-brand, SEO-tuned content',
    related_experiences: ['voyagers'],
    demoVideo: '/demos/boosted-demo.mp4',
    accessible_at: ['hosted'],
    access_points: [
      { type: 'hosted', url: 'https://boosted.onrender.com', label: 'Live Site' },
    ],
  },
  {
    id: 'any-project',
    title: 'Any',
    subtitle: 'Prompt-to-Tool Builder',
    period: '06/2026 – Present',
    sortDate: '2026-06',
    description:
      'A no-code platform that turns a single prompt into a fully built, tested, and deployed web tool — designed and live in minutes.',
    technologies: ['TypeScript', 'React', 'Node.js', 'Inngest', 'Supabase', 'PostgreSQL'],
    entry_point: 'live',
    link: 'https://any-uf96.onrender.com',
    status: 'Live',
    readMe: false,
    categories: ['products'],
    summary: 'Turns a single prompt into a deployed web tool',
    related_experiences: ['voyagers'],
    demoVideo: '/demos/any-demo.mp4',
    accessible_at: ['hosted'],
    access_points: [
      { type: 'hosted', url: 'https://any-uf96.onrender.com', label: 'Live Site' },
    ],
  },
  {
    id: 'umlazy-project',
    title: 'UMLazy',
    subtitle: 'UML Diagram Editor',
    period: '06/2026 – Present',
    sortDate: '2026-06',
    description:
      'The quickest way to create UML diagrams — a fast, lightweight canvas for sketching software designs.',
    technologies: ['TypeScript', 'Next.js', 'React'],
    entry_point: 'live',
    link: 'https://umlazy.vercel.app',
    status: 'Live',
    readMe: false,
    categories: ['apps'],
    summary: 'Fast, lightweight UML diagram editor',
    related_experiences: ['voyagers'],
    demoVideo: '/demos/umlazy-demo.mp4',
    accessible_at: ['hosted'],
    access_points: [
      { type: 'hosted', url: 'https://umlazy.vercel.app', label: 'Live Site' },
    ],
  },
  {
    id: 'graf-project',
    title: 'Graf',
    subtitle: 'Nonlinear Messaging',
    period: '07/2026 – Present',
    sortDate: '2026-07',
    description:
      'A messaging platform where any message becomes its own thread — the structure of email with the speed of chat.',
    technologies: ['TypeScript', 'React', 'Vite', 'Supabase', 'PostgreSQL'],
    entry_point: 'live',
    link: 'https://graf-fawn.vercel.app',
    status: 'Live',
    readMe: false,
    categories: ['apps'],
    summary: 'Graph-based messaging: any message becomes a thread',
    related_experiences: ['voyagers'],
    demoVideo: '/demos/graf-demo.mp4',
    accessible_at: ['hosted'],
    access_points: [
      { type: 'hosted', url: 'https://graf-fawn.vercel.app', label: 'Live Site' },
    ],
  },
  // {
  //   id: 'crypto-forecasting-project',
  //   title: 'Cryptocurrency Forecasting',
  //   related_experiences: ['sjsu-bachelors'],
  //   subtitle: 'ML Prediction Model',
  //   period: '01/2022 – 12/2022',
  //   sortDate: '2022-12',
  //   description:
  //     'ML model for cryptocurrency trend forecasting using synthetic data. Presented at SJSU Fall 2022 Expo.',
  //   technologies: getProjectSkillsFromMapping('crypto-forecasting-project'),
  //   entry_point: 'github',
  //   link: 'https://github.com/b-devera/crypto-forecasting-model',
  //   status: 'Completed',
  //   categories: ['ai'],
  //   accessible_at: ['github'],
  //   access_points: [
  //     { type: 'github', url: 'https://github.com/b-devera/crypto-forecasting-model', label: 'Code' },
  //   ]
  // },
  {
    id: 'molecule-mutation-prediction',
    title: 'Molecule Mutation Prediction',
    subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
    period: '08/2022 – 12/2022',
    sortDate: '2023-06',
    related_experiences: ['sjsu-bachelors'],
    description:
      'Support vector machine to identify compounds that inhibit BRAF V600E mutation using PubChem chemical data.',
    technologies: getProjectSkillsFromMapping('molecule-mutation-prediction'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/small-molecule-mutation-prediction',
    status: 'Completed',
    readMe: true,
    categories: ['ai'],
    accessible_at: ['github'],
    access_points: [
      { type: 'github', url: 'https://github.com/devenshah2018/small-molecule-mutation-prediction', label: 'Code' },
    ]
  },
  {
    id: 'drone-build-project',
    title: 'Drone Path Planning',
    subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
    period: '09/2025 – 10/2025',
    sortDate: '2025-09',
    description:
      'A comprehensive drone flight planning system that generates optimal flight paths for efficient aerial data capture.',
    technologies: getProjectSkillsFromMapping('drone-build-project'),
    entry_point: 'live',
    link: 'https://drone-path-planner.vercel.app/',
    status: 'Completed',
    readMe: false,
    categories: ['apps'],
    accessible_at: ['github', 'hosted'],
    access_points: [
      { type: 'hosted', url: 'https://drone-path-planner.vercel.app/', label: 'Live Demo' },
      { type: 'github', url: 'https://github.com/devenshah2018/drone-trajectory-planner', label: 'Github' },
    ],
    related_experiences: ['build-fellowship'],
  },
  {
    id: 'image-retrieval-project',
    title: 'Image Retrieval',
    subtitle: 'Embedding-Based Similarity Search',
    period: '02/2026 – 03/2026',
    sortDate: '2026-02',
    description:
      'Embedding-based retrieval that trains a ResNet backbone for L2-normalized embeddings, then builds and queries a FAISS inner-product index for fast similarity search over precomputed features.',
    technologies: ['Python', 'Pytorch', 'FAISS', 'ResNet', 'CNNs'],
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/image-retrieval',
    status: 'Completed',
    readMe: true,
    categories: ['ai'],
    summary: 'Deep-embedding image retrieval with FAISS similarity search',
    related_experiences: ['build-fellowship'],
    accessible_at: ['github'],
    access_points: [
      { type: 'github', url: 'https://github.com/devenshah2018/image-retrieval', label: 'Code' },
    ],
  },
  {
    id: 'task-scheduling-project',
    title: 'Task Scheduling',
    subtitle: 'Task Scheduling System',
    period: '09/2025 – 12/2025',
    sortDate: '2025-12',
    description:
      'Research on CPU and GPU scheduling algorithms, with a focus on AI workloads and hybrid CPU-GPU scheduling strategies.',
    technologies: getProjectSkillsFromMapping('task-scheduling-project'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/task-scheduling',
    status: 'Completed',
    categories: ['theory'],
    accessible_at: ['github'],
    access_points: [
      { type: 'github', url: 'https://github.com/devenshah2018/task-scheduling', label: 'Code' },
    ],
    related_experiences: ['bu-masters'],
  },
  {
    id: 'breaking-dijkstra-project',
    title: 'Breaking Dijkstra',
    subtitle: 'Breaking Dijkstra\'s Algorithm',
    period: '09/2025 – 12/2025',
    sortDate: '2025-12',
    description:
      `A project that breaks Dijkstra's algorithm, a shortest path algorithm for graphs. Based on the paper 'Breaking the Sorting Barrier for Directed Single-Source Shortest Paths'.`,
    technologies: getProjectSkillsFromMapping('breaking-dijkstra-project'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/breaking-dijkstra',
    status: 'Completed',
    categories: ['theory'],
    accessible_at: ['github'],
    access_points: [
      { type: 'github', url: 'https://github.com/devenshah2018/breaking-dijkstra', label: 'Code' },
      { type: 'hosted', url: 'https://breaking-dijkstra.vercel.app/', label: 'Live Demo' },
    ],
    related_experiences: ['bu-masters'],
  }
];

export const EDUCATION = [
  {
    id: 'bu-masters',
    degree: 'M.S. in Computer Science',
    institution: 'Boston University',
    period: '2025 – Present',
    status: 'Current',
    concentration: 'Data Analytics',
    gradient: 'from-blue-500 to-cyan-500',
    icon: GraduationCap,
    logo: '/bu-logo.png',
    isActive: true,
    coursework: ['Generative AI', 'Operating Systems', 'Analysis of Algorithms', 'Database Management', 'Computer Language Theory', 'Data Science with Python', 'Big Data Analytics'],
  },
  {
    id: 'sjsu-bachelors',
    degree: 'B.S. in Software Engineering',
    institution: 'San Jose State University',
    period: '2018 – 2022',
    status: 'Graduated',
    coursework: [
      'Data Structures & Algorithms',
      'Assembly Language Programming',
      'Object Oriented Design',
      'Information Security',
      'Machine Learning & Big Data',
      'Computer Networks',
      'Software Architecture & Design',
      'Database Management Systems',
      'Computer Organization & Architecture',
      'Operating Systems',
      'Applied Probability & Statistics',
      'Differential Equations & Linear Algebra',
      'Computer & Human Interaction',
      'Enterprise Software',
      'Software Quality Engineering',
      'Bioinformatics'
    ],
    gradient: 'from-indigo-500 to-purple-500',
    icon: GraduationCap,
    logo: '/sjsu-logo.png',
    isActive: false,
  },
];

export const CERTIFICATIONS = [
  {
    id: 'accenture-agentic-ai',
    title: 'Reinvention with Agentic AI',
    issuer: 'Accenture',
    period: 'June 2026',
    status: 'Active',
    gradient: 'from-purple-500 to-fuchsia-500',
    icon: Award,
    logo: '/accenture-logo.svg',
    // SVG has a baked-in black background with wide internal margins; fill the tile and scale up the mark.
    logoWrapperClassName:
      'flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2a2a2a]/60 bg-black',
    logoClassName: 'h-full w-full object-contain scale-[1.5]',
    verificationUrl: 'https://www.credly.com/badges/0f79ad3e-4f5c-47de-b96b-c9ccfa1c7bb0',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    period: '2023',
    status: 'Active',
    credentialId: 'ZEM1DCJCTEFEQEKT',
    validUntil: 'Feb 2026',
    gradient: 'from-orange-500 to-yellow-500',
    icon: Award,
    logo: '/aws-logo.jpg',
    // White-background JPG with wide internal margins; render as a filled white tile with the mark scaled up.
    logoWrapperClassName:
      'flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#2a2a2a]/60 bg-white',
    logoClassName: 'h-full w-full object-contain scale-[1.45]',
    verificationUrl: 'https://aws.amazon.com/verification',
  },
];

export type Organization = {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  institution: string;
  logo?: string;
  link?: string;
  /**
   * Optionally tie to an experience or education entry; clicking the org scrolls to and highlights it.
   * When omitted, the org is standalone — clicking opens its `link` instead.
   */
  related?: { type: 'experience' | 'education'; id: string };
};

export const ORGANIZATIONS: Organization[] = [
  {
    id: 'voyagers',
    name: 'Voyagers',
    role: 'Founder',
    period: 'Jan 2026 – Present',
    description:
      'A collective of builders shipping real products, from AI planners to content and diagramming tools.',
    institution: 'Voyagers',
    logo: '/voyagers-logo.svg',
    link: 'https://voyagers-lovat.vercel.app',
  },
  {
    id: 'digital-forensics-lab',
    name: 'Cyberforensics Research Lab',
    role: 'Research Assistant',
    period: 'Mar 2026 – Present',
    description:
      'Boston University lab at the intersection of AI and criminal justice. Researching deepfake generation and detection to build frameworks resilient to real-world media integrity threats.',
    institution: 'Boston University',
    logo: '/bu-logo.png',
    link: 'https://www.bu.edu/',
    related: { type: 'experience', id: 'research-assistant' },
  },
  {
    id: 'ai-computer-vision-lab',
    name: 'Artificial Intelligence and Computer Vision Lab',
    role: 'Research Assistant',
    period: 'Oct 2025 – Present',
    description:
      'Boston University computer vision lab focused on medical imaging. Building MRI segmentation pipelines for automated osteoarthritis diagnosis that replace hours of manual radiology review.',
    institution: 'Boston University',
    logo: '/bu-logo.png',
    link: 'https://www.bu.edu/',
    related: { type: 'experience', id: 'research-assistant' },
  },
];

// Helper functions to look up full objects from IDs
export function getExperienceById(id: string) {
  return EXPERIENCES.find(exp => exp.id === id);
}

/** Returns skill names mapped to the given experience id (from SKILL_MAPPINGS). */
export function getSkillsForExperienceId(experienceId: string): string[] {
  const skills: string[] = [];
  SKILL_MAPPINGS.forEach(m => {
    if (m.experienceIds?.includes(experienceId)) skills.push(m.skill);
  });
  return skills.sort((a, b) => a.localeCompare(b));
}

export function getProjectById(id: string) {
  return PROJECTS.find(proj => proj.id === id);
}

export function getEducationById(id: string) {
  return EDUCATION.find(edu => edu.id === id);
}

export function getOrganizationById(id: string) {
  return ORGANIZATIONS.find(org => org.id === id);
}

/** Sort key from an org period like "Jan 2026 – Present" → year*12 + monthIndex. */
function orgStartKey(period: string): number {
  const m = period.match(/([A-Za-z]{3,})\s+(\d{4})/);
  if (!m || !m[1] || !m[2]) return 0;
  const monthIdx = MONTHS.findIndex(mo => mo.toLowerCase() === m![1]!.slice(0, 3).toLowerCase());
  return parseInt(m[2], 10) * 12 + (monthIdx >= 0 ? monthIdx : 0);
}

/** Organizations ordered by start date, earliest first. */
export function getOrganizations(): Organization[] {
  return [...ORGANIZATIONS].sort((a, b) => orgStartKey(a.period) - orgStartKey(b.period));
}

export type CurrentWorkItem =
  | { type: 'project'; id: string; title: string; summary?: string; description?: string; sortDate: string; related?: { type: 'experience' | 'education'; id: string }[] }
  | { type: 'experience'; id: string; title: string; company: string; summary?: string; description?: string; sortDate: string }
  | { type: 'education'; id: string; degree: string; institution: string; summary?: string; description?: string; sortDate: string };

/** Returns all items tagged current_work from projects, experiences, and education. */
export function getCurrentWorkItems(): CurrentWorkItem[] {
  const items: CurrentWorkItem[] = [];
  const getSortDate = (p: string) => {
    const m = p.match(/(\d{4})-(\d{2})/);
    if (m) return m[0];
    if (p.includes('Present')) return new Date().toISOString().slice(0, 7);
    return p;
  };
  for (const p of PROJECTS) {
    if (p.current_work) {
      const related = (p.related_experiences || []).map((id) => {
        if (getExperienceById(id)) return { type: 'experience' as const, id };
        if (getEducationById(id)) return { type: 'education' as const, id };
        return null;
      }).filter(Boolean) as { type: 'experience' | 'education'; id: string }[];
      items.push({
        type: 'project',
        id: p.id,
        title: p.title,
        sortDate: p.sortDate || getSortDate(p.period),
        ...(p.summary != null && { summary: p.summary }),
        ...(p.description != null && { description: p.description }),
        ...(related.length > 0 && { related }),
      });
    }
  }
  for (const e of EXPERIENCES) {
    if ((e as Experience & { current_work?: boolean }).current_work) {
      const exp = e as Experience & { current_work?: boolean; summary?: string; description?: string };
      items.push({
        type: 'experience',
        id: exp.id,
        title: exp.title,
        company: exp.company,
        sortDate: getSortDate(exp.period),
        ...(exp.summary != null && { summary: exp.summary }),
        ...(exp.description != null && { description: exp.description }),
      });
    }
  }
  for (const edu of EDUCATION) {
    const ed = edu as { id: string; degree: string; institution: string; period: string; current_work?: boolean; summary?: string; description?: string };
    if (ed.current_work) {
      items.push({
        type: 'education',
        id: ed.id,
        degree: ed.degree,
        institution: ed.institution,
        sortDate: getSortDate(ed.period),
        ...(ed.summary != null && { summary: ed.summary }),
        ...(ed.description != null && { description: ed.description }),
      });
    }
  }
  return items.sort((a, b) => (b.sortDate || '').localeCompare(a.sortDate || '')).slice(0, 8);
}

// Helper function to expand skill mapping from IDs to full objects (for backwards compatibility)
export function expandSkillMapping(mapping: typeof SKILL_MAPPINGS[0]) {
  return {
    skill: mapping.skill,
    experiences: mapping.experienceIds?.map(getExperienceById).filter(Boolean) || [],
    projects: mapping.projectIds?.map(getProjectById).filter(Boolean) || [],
    education: mapping.educationIds?.map(getEducationById).filter(Boolean) || [],
  };
}

function getProjectSkillsFromMapping(projectId: string) {
  const skills: string[] = [];
  SKILL_MAPPINGS.forEach(skillMapping => {
    if (skillMapping.projectIds?.includes(projectId)) {
      skills.push(skillMapping.skill);
    }
  });
  return skills;
}
