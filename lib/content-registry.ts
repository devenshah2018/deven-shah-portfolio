import { GraduationCap, Award } from 'lucide-react';
import { Project, ResearchPaper } from './types';

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
  platforms: ['Linux', 'AWS', 'Salesforce', 'Azure', 'LangGraph', 'GCP', 'Jupyter'],
  frameworks: ['React', '.NET', 'Flask', 'TailwindCSS', 'Angular', 'ASP.NET Core', 'Next.js'],
  frontend: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'React', 'TailwindCSS'],
  backend: [
    'Python',
    'C#',
    'Java',
    'TypeScript',
    '.NET',
    'Flask',
    'Bash',
    'Rust',
    'Docker',
    'REST API',
    'GraphQL',
  ],
  database: ['SQL', 'SOQL', 'Oracle', 'PostgreSQL', 'MySQL', 'MongoDB'],
  aimal: ['Python', 'LLMs', 'Sklearn', 'Tensorflow', 'Pytorch', 'LangGraph', 'CNNs'],
  devops: ['Docker', 'Github/Git', 'GCP', 'AWS', 'Azure'],
  apis: ['C#', 'Python', 'Apex', 'Azure', 'REST API', 'GraphQL', 'TypeScript'],
  collaboration: ['Jira', 'Confluence', 'Agile', 'Scrum'],
};

// Simplified skill mappings - only store IDs instead of duplicating full object data
export const SKILL_MAPPINGS = [
  { skill: 'Scrum', experienceIds: ['suno-analytics', 'patelco'] },
  { skill: 'Agile', experienceIds: ['suno-analytics', 'patelco'] },
  { skill: 'Confluence', experienceIds: ['suno-analytics', 'patelco'] },
  { skill: 'Python', experienceIds: ['suno-analytics', 'netapp', 'build-fellowship-1', 'build-fellowship-2', 'research-assistant'], projectIds: ['ares-project', 'molecule-mutation-prediction', 'crypto-forecasting-project', 'drone-build-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'TypeScript', experienceIds: ['suno-analytics', 'patelco', 'build-fellowship-1'], projectIds: ['drone-build-project', 'portfolio-project', 'ares-project'] },
  { skill: 'C#', experienceIds: ['patelco'], educationIds: ['sjsu-bachelors'] },
  { skill: 'React', experienceIds: ['suno-analytics'], projectIds: ['drone-build-project', 'portfolio-project', 'breaking-dijkstra-project'] },
  { skill: 'Azure', experienceIds: ['suno-analytics', 'patelco'], projectIds: ['ares-project'] },
  { skill: 'LangGraph', experienceIds: ['suno-analytics'] },
  { skill: '.NET', experienceIds: ['patelco'] },
  { skill: 'SQL', experienceIds: ['suno-analytics', 'patelco', 'netapp'], projectIds: ['ares-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'SOQL', experienceIds: ['patelco'] },
  { skill: 'HTML', experienceIds: ['suno-analytics', 'patelco', 'netapp'], projectIds: ['portfolio-project', 'ares-project', 'crypto-forecasting-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'CSS', experienceIds: ['suno-analytics', 'patelco', 'netapp'], projectIds: ['portfolio-project', 'ares-project', 'crypto-forecasting-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'Java', educationIds: ['sjsu-bachelors'] },
  { skill: 'JavaScript', experienceIds: ['suno-analytics', 'patelco'], projectIds: ['portfolio-project'] },
  { skill: 'Apex', experienceIds: ['patelco'] },
  { skill: 'Salesforce', experienceIds: ['patelco'] },
  { skill: 'AWS', experienceIds: ['suno-analytics'], educationIds: ['aws-cloud-practitioner'] },
  { skill: 'Flask', experienceIds: ['netapp'], projectIds: ['crypto-forecasting-project'] },
  { skill: 'Bash', experienceIds: ['netapp'], projectIds: [ 'molecule-mutation-prediction'] },
  { skill: 'Oracle', experienceIds: ['netapp'] },
  { skill: 'PostgreSQL', experienceIds: ['suno-analytics'] },
  { skill: 'GCP', experienceIds: ['suno-analytics'] },
  { skill: 'TailwindCSS', experienceIds: ['suno-analytics'], projectIds: ['portfolio-project'] },
  { skill: 'Rust', projectIds: ['ares-project', 'task-scheduling-project'] },
  { skill: 'Linux', educationIds: ['bu-masters'], projectIds: ['task-scheduling-project'] },
  { skill: 'LLMs', experienceIds: ['suno-analytics'], projectIds: ['ares-project'] },
  { skill: 'Sklearn', experienceIds: ['suno-analytics'], projectIds: ['molecule-mutation-prediction', 'crypto-forecasting-project'] },
  { skill: 'Tensorflow', experienceIds: ['suno-analytics'], projectIds: ['crypto-forecasting-project'] },
  { skill: 'Pytorch', experienceIds: ['build-fellowship-2', 'research-assistant'], projectIds: ['crypto-forecasting-project'] },
  { skill: 'Docker', experienceIds: ['netapp', 'suno-analytics', 'build-fellowship-2'] },
  { skill: 'Jupyter', projectIds: ['drone-build-project'], experienceIds: ['build-fellowship-1', 'build-fellowship-2', 'research-assistant'] },
  { skill: 'C++', educationIds: ['bu-masters'] },
  { skill: 'Github/Git', experienceIds: ['suno-analytics', 'patelco', 'netapp', 'build-fellowship-1'], projectIds: ['drone-build-project', 'portfolio-project', 'ares-project', 'molecule-mutation-prediction', 'crypto-forecasting-project'], educationIds: ['sjsu-bachelors'] },
  { skill: 'REST API', experienceIds: ['suno-analytics', 'patelco', 'netapp'] },
  { skill: 'GraphQL', experienceIds: ['suno-analytics'] },
  { skill: 'MySQL', experienceIds: ['patelco'] },
  { skill: 'MongoDB', experienceIds: ['suno-analytics'] },
  { skill: 'Angular', experienceIds: ['patelco'] },
  { skill: 'ASP.NET Core', experienceIds: ['patelco'] },
  { skill: 'Next.js', projectIds: ['drone-build-project'], experienceIds: ['suno-analytics'] },
  { skill: 'Jira', experienceIds: ['patelco', 'suno-analytics'] },
  { skill: 'CNNs', experienceIds: ['build-fellowship-2', 'research-assistant'] },
];

export const SKILL_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'aimal', label: 'AI/ML' },
  { key: 'apis', label: 'API' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'devops', label: 'DevOps' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'languages', label: 'Languages' },
  { key: 'platforms', label: 'Platforms' },
  { key: 'collaboration', label: 'Collaboration' },
];

export const CATEGORIZED_SKILLS = Object.fromEntries(
  Object.entries(SKILLS).map(([category, skills]) => [category, skills])
);

CATEGORIZED_SKILLS['all'] = Array.from(new Set(Object.values(SKILLS).flat()));

export const EXPERIENCES = [
  {
    id: 'suno-analytics',
    title: 'Co-Founder & CTO',
    company: 'Suno Analytics',
    companyLogo: '/suno-logo.jpeg',
    location: 'Remote',
    period: '12/2024 – 01/2026',
    description:
      'Built an e-commerce analytics platform offering deep insights and AI agents for inventory management.',
    achievements: [
      'Led a global development team, improving project timelines and consistently delivering key initiatives to clients',
      'Designed system architecture for high availability and performance, ensuring robust data handling',
      'Conduct client discovery and demos, driving engagement with companies up to $50M ARR',
      'Launched AI-powered analytics features that increased client retention and platform adoption',
    ],
    featured: true,
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.sunoanalytics.com',
  },
  {
    id: 'patelco',
    title: 'Application Developer',
    company: 'Patelco',
    companyLogo: '/patelco-logo.png',
    location: 'Dublin, CA',
    period: '04/2023 – 04/2024',
    description:
      'Responsible for developing full-stack applications to streamline the acquisition of new Patelco members.',
    achievements: [
      'Developed full-stack features using Azure and ASP.NET, improving member acquisition with SFDC expertise',
      'Lead administrative tool development for acquisition monitoring, ensuring alignment with business needs',
      'Automated fraud request submission process, reducing handling time and ensuring SLA compliance',
      'Created a virtual appointment scheduling system, reducing branch visits for members (Q2 Hackathon winner)',
      'Developed a HELOAN/HELOC rate update automation web app to achieve a 1000% increase in efficiency',
    ],
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
      'Automated data backup solutions, cutting RMAN time by 50% using Oracle and ONTAP expertise',
      'Developed scripts for performance insights, enhancing data analysis with Oracle and SQL skills',
      'Created alert system for storage health, reducing monitoring time by 90% with Python and Bash',
      'Migrated legacy system API to REST, improving integration with modern applications',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.netapp.com',
  },
  {
    id: 'build-fellowship-1',
    title: 'Build Student Consultant',
    company: 'Build Fellowship by Open Avenues',
    companyLogo: '/build-logo.png',
    location: 'Remote',
    period: '09/2025 – 11/2025',
    description:
      'Developed data-driven image sensing and visualization tools for drone flight path planning.',
    achievements: [
      'Developed Python data models and APIs to calculate drone positions, speeds, and efficient flight paths.',
      'Applied camera models and photogrammetry to compute image footprints, sampling distances, and motion-blur limits.',
      'Built visualization tools in Jupyter to analyze trajectories and optimize drone-based path planning.',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.buildfellowship.com/'
  },
  {
    id: 'build-fellowship-2',
    title: 'Build Student Consultant',
    company: 'Build Fellowship by Open Avenues',
    companyLogo: '/build-logo.png',
    location: 'Remote',
    period: '02/2026 – 03/2026',
    description:
      'Developing AI image retrieval pipelines using CNNs and vector databases.',
    achievements: [],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.buildfellowship.com/'
  },
  {
    id: 'research-assistant',
    title: 'Research Assistant',
    company: 'Boston University',
    companyLogo: '/bu-logo.png',
    location: 'Boston, MA',
    period: '02/2026 – Present',
    description:
      'Researching segmentation techniques using computer vision and deep learning.',
    achievements: [],
    gradient: 'from-blue-500 to-cyan-500',
    link: 'https://www.bu.edu/'
  },
  {
    id: 'teaching-assistant',
    title: 'Teaching Assistant',
    company: 'Boston University',
    companyLogo: '/bu-logo.png',
    location: 'Boston, MA',
    period: '01/2026 – Present',
    description:
      'Teaching assistant for the course "CS 566: Analysis of Algorithms".',
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

function getEndDate(period: string): number {
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

/** Total org duration as sum of each position's duration (no overlap). */
function getOrgDuration(positions: Experience[]): string {
  let totalMonths = 0;
  for (const pos of positions) {
    const m = periodMonths(pos.period);
    if (m != null && m > 0) totalMonths += m;
  }
  if (totalMonths < 1) return '';
  if (totalMonths < 12) return `${totalMonths} mo`;
  const yrs = Math.floor(totalMonths / 12);
  const mo = totalMonths % 12;
  if (mo === 0) return yrs === 1 ? '1 yr' : `${yrs} yrs`;
  return `${yrs} yr${yrs > 1 ? 's' : ''} ${mo} mo`;
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
      companyLogo: first.companyLogo,
      location: first.location,
      link: first.link,
      gradient: first.gradient,
      duration: getOrgDuration(sorted),
      positions: sorted,
    };
  }).sort((a, b) => getEndDate(b.positions[0]!.period) - getEndDate(a.positions[0]!.period));
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
  { key: 'featured', label: 'Featured', special: true },
  { key: 'web', label: 'Web Apps' },
  { key: 'ai', label: 'Data Science & AI/ML' },
  { key: 'tools', label: 'Developer Tools' },
  { key: 'theory', label: 'Theory & Algorithms' },
];

export const PROJECTS: Project[] = [
  {
    id: 'portfolio-project',
    title: 'Portfolio Website',
    subtitle: 'Modern SPA for My Work & Skills',
    period: '06/2025 – Present',
    sortDate: '2025-06',
    description:
      'Personal portfolio built with React, featuring interactive demos, live IDE, and responsive design.',
    technologies: getProjectSkillsFromMapping('portfolio-project'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/deven-shah-portfolio',
    status: 'Live',
    readMe: true,
    categories: ['web', 'featured'],
    accessible_at: ['hosted', 'github'],
    access_points: [
      { type: 'hosted', url: 'https://deven-shah.com/', label: 'Live Site' },
      { type: 'github', url: 'https://github.com/devenshah2018/deven-shah-portfolio', label: 'Code' }
    ]
  },
  {
    id: 'ares-project',
    title: 'Ares',
    subtitle: 'Security Compliance Platform',
    period: '08/2024 – 12/2024',
    sortDate: '2024-08',
    description:
      'SOC2 compliance platform leveraging AI and deep cybersecurity technology launched on VSCode Marketplace.',
    technologies: getProjectSkillsFromMapping('ares-project'),
    entry_point: 'vscode',
    link: 'http://marketplace.visualstudio.com/items?itemName=strive-ai.strive',
    status: 'Live',
    categories: ['ai', 'tools'],
    accessible_at: ['vscode'],
    access_points: [
      { type: 'vscode', url: 'http://marketplace.visualstudio.com/items?itemName=strive-ai.strive', label: 'VSCode' },
    ]
  },
  {
    id: 'crypto-forecasting-project',
    title: 'Cryptocurrency Forecasting',
    related_experiences: ['sjsu-bachelors'],
    subtitle: 'ML Prediction Model',
    period: '01/2022 – 12/2022',
    sortDate: '2022-12',
    description:
      'ML model for cryptocurrency trend forecasting using synthetic data. Presented at SJSU Fall 2022 Expo.',
    technologies: getProjectSkillsFromMapping('crypto-forecasting-project'),
    entry_point: 'github',
    link: 'https://github.com/b-devera/crypto-forecasting-model',
    status: 'Completed',
    categories: ['ai'],
    accessible_at: ['github'],
    access_points: [
      { type: 'github', url: 'https://github.com/b-devera/crypto-forecasting-model', label: 'Code' },
    ]
  },
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
    categories: ['ai', 'featured', 'web'],
    accessible_at: ['github', 'hosted'],
    access_points: [
      { type: 'hosted', url: 'https://drone-path-planner.vercel.app/', label: 'Live Demo' },
      { type: 'github', url: 'https://github.com/devenshah2018/drone-trajectory-planner', label: 'Github' },
    ],
    related_experiences: ['build-fellowship-1'],
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
    coursework: ['Operating Systems', 'Analysis of Algorithms', 'Database Management', 'Computer Language Theory'],
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
    verificationUrl: 'https://aws.amazon.com/verification',
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'cryptocurrency-forecasting-model-paper',
    slug: 'crypto-forecasting',
    title: 'Cryptocurrency Forecasting Model',
    institution: 'San Jose State University',
    date: 'December 2022',
    sortDate: '2022-12',
    pdfUrl: '/papers/cryptocurrency-forecasting-model.pdf',
    keywords: ['Machine Learning', 'Cryptocurrency', 'Neural Networks', 'NLP'],
    abstract: `The cryptocurrency exchange domain is a relatively volatile space. The most widely traded cryptocurrency coin Bitcoin has experienced a high of $44,533.00 and a low of $36,259.01 in the week of 1/31/22 - 2/7/22. The volatility of the cryptocurrency market stems from three accepted analyses. A technical analysis solely relies on metrics ranging from historical trends to net unrealized profit/loss to derive the effects of price movements. A fundamental analysis relies on factors that affect price movements, such as government policies. A sentimental analysis relies on the sentiment of a coin at a particular time, which can be identified using social media trends. Given the abundance of variables that affect price movements, forecasting even near-future prices prove difficult for many traders. Each of the three analyses stated (technical, fundamental, and sentimental) have sub-analyses that would take an abundance of time even for the experienced trader. As the digital asset market increased exponentially over the past 2 years, many traders are not accustomed to these analyses, much less able to derive conclusions from them. The cryptocurrency forecasting model aimed to traverse, analyze, and interpret data from the three types of analyses with a greater focus on technical and sentimental analysis. Using the data interpreted, the model has the ability to forecast price movements to the time scale of the customer's preference. This project reduced the time spent significantly analyzing technical data, assisted traders to make confident trading decisions, and detailed the price movement patterns that are difficult to infer with purely human capabilities.`,
    relatedProjectId: 'crypto-forecasting-project',
  },
  {
    id: 'molecule-mutation-prediction-paper',
    slug: 'braf-mutation-prediction',
    title: 'Small Molecule Drug Development for the BRAF V600 Mutation',
    institution: 'San Jose State University',
    date: 'December 2022',
    sortDate: '2022-12',
    pdfUrl: '/papers/small-molecule-prediction.pdf',
    keywords: ['BRAF-V600E', 'Machine Learning', 'SVM', 'Random Forest Classifier', 'QuaSAR'],
    abstract: `This report presents the findings behind the use of computational or in-silico
methods to find therapeutic targets allows for the effective integration of the massive
amounts of data currently available and the accurate prediction of the effectiveness of a
given target molecule that could potentially inhibit the expression of the most common
B-Raf Proto-Oncogene, Serine/Threonine Kinase (BRAF) mutation. In order to find
small chemical molecules that may prevent the expression of the most prevalent BRAF
oncogenic mutation, machine-learning algorithms, such as the SVM (Support Vector
Machine). An SVM model utilizes support vectors to adjust the threshold of the
hyperplane to categorize data points and is widely used for classification models.
Complemented with a Random Forest Classifier, the linear SVM model was able to use
a dataset with 243 different compounds to achieve an average of 0.976 precision, 0.975
recall, 0.966 accuracies, and a 0.962 area under the receiving operating characteristic
curve across 50 independent iterations. 10 common features were present in all 50
iterations, which provides computational evidence that these features directly affect the
identification of the model. The model is not limited to strictly identifying compounds, as
it affords the ability to determine if certain features truly affect the identification. This
model may be used to conclude whether a QuaSAR descriptor truly correlates with the
potential of a compound to inhibit the expression of the BRAF mutation. The model
consistently achieved optimal performance with each iteration.
Future work will implement an improved feature selection process to achieve
perfect performance, a deeper analysis of feature importances, and use alternative
classification models.`,
    relatedProjectId: 'molecule-mutation-prediction',
  },
  {
    id: 'task-scheduling-paper',
    slug: 'ai-task-scheduling',
    title: 'Task Scheduling for AI Workloads',
    institution: 'Boston University',
    date: 'December 2025',
    sortDate: '2025-12',
    pdfUrl: '/papers/task-scheduling.pdf',
    keywords: ['Task Scheduling', 'Parallel Computing', 'Thread Management', 'Resource Allocation'],
    abstract: `The rapid growth of AI workloads has exposed limitations in traditional CPU and GPU scheduling. CPUs
provide fairness and responsiveness but struggle with parallelism and memory-intensive operations, while
GPUs deliver high-throughput execution yet rely on CPU coordination for tasks such as data
preprocessing and kernel management. Hybrid CPU–GPU scheduling addresses these challenges by
dynamically distributing tasks to leverage both CPU flexibility and GPU parallelism. This study evaluates
CPU-only, GPU-only, and hybrid approaches across benchmarks for workload scaling, composition,
resource constraints, and real-world AI scenario test suites. Results from experts and experimentation
show that hybrid scheduling dramatically improves throughput for compute-bound, parallel workloads
while maintaining high GPU utilization, though latency-sensitive inference tasks may incur slight
overhead. These findings underscore the importance of adaptive, workload-aware scheduling strategies
for hybrid AI architectures.`,
    relatedProjectId: 'task-scheduling-project',
  }
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

export function getResearchPaperBySlug(slug: string) {
  return RESEARCH_PAPERS.find(paper => paper.slug === slug || paper.id === slug);
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
