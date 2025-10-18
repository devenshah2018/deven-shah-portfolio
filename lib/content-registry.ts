import { GraduationCap, Briefcase, Zap, Award } from 'lucide-react';
import { Project } from './types';

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
    'C',
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
  platforms: ['AWS', 'Salesforce', 'Azure', 'LangGraph', 'GCP', 'Jupyter'],
  frameworks: ['React', '.NET', 'Flask', 'TailwindCSS', 'Angular', 'ASP.NET Core', 'Next.js'],
  frontend: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'React', 'TailwindCSS'],
  backend: [
    'Python',
    'C#',
    'Java',
    'C',
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
  aimal: ['Python', 'LLMs', 'Sklearn', 'Tensorflow', 'Pytorch', 'LangGraph'],
  devops: ['Docker', 'Github', 'Git', 'GCP', 'AWS', 'Azure'],
  apis: ['C#', 'Python', 'Apex', 'Azure', 'REST API', 'GraphQL', 'TypeScript'],
};

export const SKILL_MAPPINGS = [
  {
    skill: 'Python',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Model Distribution Server',
        subtitle: 'Local ML Inference TCP Server',
        id: 'model-distribution-server',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
      {
        title: 'Molecule Mutation Prediction',
        subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
        id: 'molecule-mutation-prediction',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
      {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Price Correlations',
        subtitle: 'Notebook Analyzing Crypto Asset Relationships',
        id: 'crypto-correlations-project',
        icon: Zap,
      },
      {
        title: 'Tracking Bear & Bull Runs',
        subtitle: 'Tracking Bull and Bear Markets in Stocks using ADX',
        id: 'bull-bear-stocks-project',
        icon: Zap,
      },
      {
        title: 'Quantum Protein Binding',
        subtitle: 'Using Grover`s algorithm to find optimal protein binding',
        id: 'quantum-protein-binding',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'TypeScript',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
    projects: [
            {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'C#',
    experiences: [
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'React',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    projects: [
            {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Azure',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'LangGraph',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: '.NET',
    experiences: [
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'SQL',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'SOQL',
    experiences: [
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'HTML',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'CSS',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'Java',
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'C',
    projects: [
      {
        title: 'Qode',
        subtitle: 'Quantum Programming Language',
        id: 'qode-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'JavaScript',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Qode',
        subtitle: 'Quantum Programming Language',
        id: 'qode-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Apex',
    experiences: [
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'Salesforce',
    experiences: [
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'AWS',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    education: [
      {
        title: 'AWS Cloud Practitioner Certification',
        institution: 'Amazon Web Services',
        id: 'aws-cloud-practitioner',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'Flask',
    experiences: [
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Bash',
    experiences: [
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Model Distribution Server',
        subtitle: 'Local ML Inference TCP Server',
        id: 'model-distribution-server',
        icon: Zap,
      },
      {
        title: 'Molecule Mutation Prediction',
        subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
        id: 'molecule-mutation-prediction',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Oracle',
    experiences: [
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'PostgreSQL',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'GCP',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'TailwindCSS',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Rust',
    projects: [
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'LLMs',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Sklearn',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Model Distribution Server',
        subtitle: 'Local ML Inference TCP Server',
        id: 'model-distribution-server',
        icon: Zap,
      },
      {
        title: 'Molecule Mutation Prediction',
        subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
        id: 'molecule-mutation-prediction',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Tensorflow',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
    projects: [
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Pytorch',
    projects: [
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'Docker',
    experiences: [
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
    {
    skill: 'Jupyter',
    projects: [
      {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
    ],
  },
  {
    skill: 'C++',
    education: [
      {
        title: 'M.S. Computer Science',
        institution: 'Boston University',
        id: 'bu',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'Github',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
            {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
      {
        title: 'Model Distribution Server',
        subtitle: 'Local ML Inference TCP Server',
        id: 'model-distribution-server',
        icon: Zap,
      },
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Qode',
        subtitle: 'Quantum Programming Language',
        id: 'qode-project',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
      {
        title: 'Molecule Mutation Prediction',
        subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
        id: 'molecule-mutation-prediction',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Price Correlations',
        subtitle: 'Notebook Analyzing Crypto Asset Relationships',
        id: 'crypto-correlations-project',
        icon: Zap,
      },
      {
        title: 'Tracking Bear & Bull Runs',
        subtitle: 'Tracking Bull and Bear Markets in Stocks using ADX',
        id: 'bull-bear-stocks-project',
        icon: Zap,
      },
      {
        title: 'Quantum Protein Binding',
        subtitle: 'Using Grover`s algorithm to find optimal protein binding',
        id: 'quantum-protein-binding',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'Git',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
    projects: [
            {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      },
      {
        title: 'Model Distribution Server',
        subtitle: 'Local ML Inference TCP Server',
        id: 'model-distribution-server',
        icon: Zap,
      },
      {
        title: 'Portfolio Website',
        subtitle: 'Personal Portfolio',
        id: 'portfolio-project',
        icon: Zap,
      },
      {
        title: 'Qode',
        subtitle: 'Quantum Programming Language',
        id: 'qode-project',
        icon: Zap,
      },
      {
        title: 'Ares',
        subtitle: 'Security Compliance Platform',
        id: 'ares-project',
        icon: Zap,
      },
      {
        title: 'Molecule Mutation Prediction',
        subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
        id: 'molecule-mutation-prediction',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Forecasting',
        subtitle: 'ML Prediction Model',
        id: 'crypto-forecasting-project',
        icon: Zap,
      },
      {
        title: 'Cryptocurrency Price Correlations',
        subtitle: 'Notebook Analyzing Crypto Asset Relationships',
        id: 'crypto-correlations-project',
        icon: Zap,
      },
      {
        title: 'Tracking Bear & Bull Runs',
        subtitle: 'Tracking Bull and Bear Markets in Stocks using ADX',
        id: 'bull-bear-stocks-project',
        icon: Zap,
      },
      {
        title: 'Quantum Protein Binding',
        subtitle: 'Using Grover`s algorithm to find optimal protein binding',
        id: 'quantum-protein-binding',
        icon: Zap,
      },
    ],
    education: [
      {
        title: 'B.S. Software Engineering',
        institution: 'San Jose State University',
        id: 'sjsu-bachelors',
        icon: GraduationCap,
      },
    ],
  },
  {
    skill: 'REST API',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
      {
        title: 'Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
      {
        title: 'Solutions Architect Intern',
        company: 'NetApp',
        id: 'netapp',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'GraphQL',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
  {
    skill: 'MySQL',
    experiences: [
      {
        title: 'Associate Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
    {
    skill: 'MongoDB',
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
    {
    skill: 'Angular',
    experiences: [
      {
        title: 'Associate Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
    {
    skill: 'ASP.NET Core',
    experiences: [
      {
        title: 'Associate Application Developer',
        company: 'Patelco',
        id: 'patelco',
        icon: Briefcase,
      },
    ],
  },
      {
    skill: 'Next.js',
    projects: [
            {
        title: 'Drone Path Planning',
        subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
        id: 'drone-build-project',
        icon: Zap,
      }
    ],
    experiences: [
      {
        title: 'Co-Founder/CTO',
        company: 'Suno Analytics',
        id: 'suno-analytics',
        icon: Briefcase,
      },
    ],
  },
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
    period: '12/2024 – Present',
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
    gradient: 'from-indigo-500 to-purple-500',
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
    gradient: 'from-emerald-500 to-teal-500',
    link: 'https://www.netapp.com',
  },
];

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
  },
  {
    id: 'qode-project',
    title: 'Qode',
    subtitle: 'Quantum Programming Language',
    period: '10/2024 – Present',
    sortDate: '2024-10',
    description:
      'Lightweight quantum programming language in C with intuitive syntax for quantum operations and circuits.',
    technologies: getProjectSkillsFromMapping('qode-project'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/qode',
    status: 'Paused',
    readMe: true,
    categories: ['theory'],
    accessible_at: ['github'],
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
    categories: ['ai', 'featured', 'tools', 'theory'],
    accessible_at: ['vscode'],
  },
  {
    id: 'crypto-forecasting-project',
    title: 'Cryptocurrency Forecasting',
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
  },
  {
    id: 'model-distribution-server',
    title: 'Model Distribution Server',
    subtitle: 'MLOps Dev Platform unifying MLflow & MinIO',
    period: '08/2025 – Present',
    sortDate: '2025-08',
    description:
      'A comprehensive MLOps platform for training, managing, and serving ML models with MLflow and MinIO S3 storage.',
    technologies: getProjectSkillsFromMapping('model-distribution-server'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/model-distribution-server',
    status: 'In Progress',
    categories: ['ai', 'tools'],
    accessible_at: ['github'],
  },
  {
    id: 'molecule-mutation-prediction',
    title: 'Molecule Mutation Prediction',
    subtitle: 'BRAF V600E Mutation Inhibitor Classifier',
    period: '08/2022 – 12/2022',
    sortDate: '2023-06',
    description:
      'Support vector machine to identify compounds that inhibit BRAF V600E mutation using PubChem chemical data.',
    technologies: getProjectSkillsFromMapping('molecule-mutation-prediction'),
    entry_point: 'github',
    link: 'https://github.com/devenshah2018/small-molecule-mutation-prediction',
    status: 'Completed',
    readMe: true,
    categories: ['ai'],
    accessible_at: ['github'],
  },
  {
    id: 'drone-build-project',
    title: 'Drone Path Planning',
    subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
    period: '09/2025 – Present',
    sortDate: '2025-09',
    description:
      'A comprehensive drone flight planning system that generates optimal flight paths for efficient aerial data capture.',
    technologies: getProjectSkillsFromMapping('drone-build-project'),
    entry_point: 'live',
    link: 'https://drone-path-planner.vercel.app/',
    status: 'In Progress',
    readMe: false,
    categories: ['ai', 'featured', 'web'],
    accessible_at: ['github', 'hosted'],
  },
  {
    id: 'crypto-correlations-project',
    title: 'Cryptocurrency Price Correlations',
    subtitle: 'Notebook Analyzing Crypto Asset Relationships',
    period: '07/2022',
    sortDate: '2022-07',
    description:
      'Kaggle notebook analyzing correlations between cryptocurrency prices using Python, Pandas, and Pearson Correlation.',
    technologies: getProjectSkillsFromMapping('crypto-correlations-project'),
    entry_point: 'kaggle',
    link: 'https://www.kaggle.com/code/devenashah/cryptocurrency-price-correlations',
    status: 'Completed',
    readMe: false,
    categories: ['ai'],
    accessible_at: ['kaggle', 'github'],
  },
  {
    id: 'bull-bear-stocks-project',
    title: 'Tracking Bear & Bull Runs',
    subtitle: 'Tracking Bull and Bear Markets in Stocks using ADX',
    period: '05/2022',
    sortDate: '2022-05',
    description:
      'Using the Average Directional Index (ADX) to identify and visualize bull and bear market trends in stock data with Python and Pandas.',
    technologies: getProjectSkillsFromMapping('bull-bear-stocks-project'),
    entry_point: 'kaggle',
    link: 'https://www.kaggle.com/code/devenashah/tracking-bear-bull-runs-using-adx',
    status: 'Completed',
    readMe: false,
    categories: ['ai', 'theory'],
    accessible_at: ['kaggle', 'github'],
  },
  {
    id: 'quantum-protein-binding',
    title: 'Quantum Protein Binding',
    subtitle: 'Using Grover`s algorithm to find optimal protein binding',
    period: '09/2024',
    sortDate: '2024-09',
    description:
      'Exploring Grover`s algorithm for optimal protein-ligand binding site identification, enhancing drug discovery with quantum computing.',
    technologies: getProjectSkillsFromMapping('quantum-protein-binding'),
    entry_point: 'kaggle',
    link: 'https://www.kaggle.com/code/devenashah/optimal-protein-binding-using-quantum-computing',
    status: 'Completed',
    readMe: false,
    categories: ['ai', 'theory'],
    accessible_at: ['kaggle', 'github'],
  },
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
    coursework: ['Operating Systems', 'Analysis of Algorithms'],
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

function getProjectSkillsFromMapping(projectId: string) {
  const mapping = SKILL_MAPPINGS;
  const skills: string[] = [];
  mapping.forEach(skill => {
    if (skill.projects) {
      skill.projects.forEach(project => {
        if (project.id === projectId) {
          skills.push(skill.skill);
        }
      });
    }
  });
  return skills;
}
