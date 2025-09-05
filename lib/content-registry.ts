import { GraduationCap, Briefcase, Zap, Award } from 'lucide-react';
import { Project } from './types';

export const LINKS = {
    linkedin: 'https://www.linkedin.com/in/deven-a-shah/',
    github: 'https://github.com/devenshah2018',
    x: 'https://x.com/devenshah2018',
    email: 'devenshah2018@gmail.com',
    strava: 'https://www.strava.com/athletes/123793208',
    cal: 'https://cal.com/deven-shah-l0qkjk/quick-chat',
    kaggle: 'https://www.kaggle.com/devenashah'
}

export const TWEETS = [
  {
    id: '1',
    text: `Wrote 1376 lines for our validation layer, but have yet to find an edge case that fails.\n\nScales log for time complexity too.\n\nIdk if it’s over-engineered or just thorough.`,
    date: '1:30 PM · Jan 25, 2025',
  },
  {
    id: '2',
    text: `Since almost all my code is eventually compiled through LLVM, I was curious to get a deeper understanding to how it works.\n\nThis article helped me a lot to understand the fundamentals of LLVM, I thought I’d share!\n\nhttps://aosabook.org/en/v1/llvm.html`,
    date: '6:41 PM · Nov 20, 2024',
  },
  {
    id: '3',
    text: `The original Rust compiler was written in OCaml before Rust.\n\nSolving OCaml’s garbage collection and single-thread problems with zero-cost abstraction and ownership model is just proof of its value.\n\nAs a founder, ask your self do you use your own product? If not, why?`,
    date: '8:44 AM · Nov 19, 2024',
  },
  {
    id: '4',
    text: `Building is stealth is like building a chatbot without context.\n\nYou have nothing to go off of and you’ll hallucinate.\n\nLet your users tell you what they want!\n\n#buildinpublic`,
    date: '7:59 AM · Nov 7, 2024',
  },
  {
    id: '5',
    text: `🚀 ARES is officially live!\n\nNow you can instantly assess OWASP and SOC2 compliance right from VSCode with just one click.\n\nAlso it's completely free to use, go crazy.`,
    date: '3:27 PM · Oct 12, 2024',
  },
  {
    id: '6',
    text: `Great event with @pangeacyber today about the risks of LLM transactions—LLM variability gives attackers more leverage.\n\nNew exploits emerge daily, so pen test your own app. You know it best 😉`,
    date: '3:16 AM · Sep 14, 2024',
  },
  {
    id: '7',
    text: `🚀Just ran my first iteration of Grover's algorithm on a 2-qubit simulated quantum circuit.\n\n@qiskit provided the Hadamard/Pauli-X gates and framework for a basic build.\n\nI couldn't determine the state vector due to CPU limits. Planning to reduce the dataset for a simpler search.`,
    date: '2:20 AM · Aug 30, 2024',
  },
  {
    id: '8',
    text: `I’ve been loving the recognition jQuery has been getting recently…\n\nIt is one of the few JS libraries that has nearly zero downsides. Way ahead of its time 🚀`,
    date: '9:41 PM · Aug 27, 2024',
  },
  {
    id: '9',
    text: `Cross-Site Scripting is a very common security flaw. @strivesai analyzes your code to ensure it has the proper CORS and other critical security policies to secure your data. Backed by GDPR, ISO, and OWASP, your code will be bulletproof 🔒🚀`,
    date: '1:01 PM · Jul 31, 2024',
  },
  {
    id: '10',
    text: `Incredible past few months. 10xed (or at least caught up with y’all) in engineering scalable ML systems thru trial & collaboration. Excited to share more soon 🙌`,
    date: '12:24 AM · Aug 20, 2025',
  },
  {
    id: '11',
    text: `My first crack at creating a model distribution server using MLflow and MinIO. Next I want to expand the registry with a couple more models and increase observability across MLflow/MinIO.`,
    date: '05:36 PM · Aug 20, 2025',
  },
  {
    id: '12',
    text: `@Minio blessing us with local S3 is a gamechanger ⚡️`,
    date: '04:27 PM · Aug 21, 2025',
  },
  {
    id: '13',
    text: `I like to think of an agent as a car and MCP as a road. Agents can run on top of MCPs but they aren’t alternatives. MCPs are kinda like building blocks for agents`,
    date: '12:12 PM · Aug 23, 2025',
  },
  {
    id: '14',
    text: `Is the AI bubble finally bursting??

Vibe coding was never going to last and we often get mistaken that today's AI is still just a tool, not some AGI sorcery. 

The future = devs + AI. You can’t replace an engineer.`,
    date: '07:23 PM · Aug 29, 2025',
  },
];

export const LINKEDIN_POSTS = [
    {
        id: '1',
        text: `Thrilled to be among the selected students to participate in the Build Projects this semester! I’ll be working on a drone path planning system for high-quality image capture, applying robotics and software development concepts under the guidance of an industry expert.

Grateful to The Build Fellowship by Open Avenues and Boston University for this opportunity. Can’t wait to get started!`,
        date: '08:34 PM · Aug 31, 2025',
        tags: ['The Build Fellowship by Open Avenues', 'Boston University']
    },
        {
        id: '2',
        text: `I’m happy to share that I am pursuing my Master's in Computer Science at Boston University! 

Excited to expand my knowledge at the intersection of AI and cybersecurity, take on challenging projects, and connect with brilliant minds. I look forward to meeting new peers and making the most of this next chapter in my academic and professional growth.`,
        date: '07:40 PM · Aug 15, 2025',
        tags: ['Boston University']
    },
            {
        id: '3',
        text: `Exciting news! I just finished my first day as an Associate Application Developer at Patelco. Can't wait to learn and grow with such a dynamic team. Here's to a bright future! hashtag#newjob hashtag#associateapplicationdeveloper hashtag#patelco`,
        date: '08:52 PM · Apr 10, 2023',
        hashtags: ['#newjob', '#associateapplicationdeveloper', '#patelco']
    },
            {
        id: '4',
        text: `I’m happy to share that I’ve obtained a new certification: Amazon Web Services Cloud Practitioner from Amazon Web Services (AWS)!`,
        date: '03:56 PM · Feb 15, 2023',
        tags: ['Amazon Web Services (AWS)']
    }
]

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
  ],
  platforms: ['AWS', 'Salesforce', 'Azure', 'LangGraph', 'GCP'],
  frameworks: ['React', '.NET', 'Flask', 'TailwindCSS'],
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
  database: ['SQL', 'SOQL', 'Oracle', 'PostgreSQL'],
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
        title: "Automated Drone Path Planning",
        subtitle: "High-Quality Image Capture System to Support Drone Path Planning",
        id: 'drone-build-project',
        icon: Zap,
      }
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

CATEGORIZED_SKILLS['all'] = Array.from(
    new Set(Object.values(SKILLS).flat())
);

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
      'Developed AI agents via LangGraph, intuitive interfaces using React, and scalable PostgreSQL backend systems',
      'Designed system architecture for high availability and performance, ensuring robust data handling',
      'Conduct client discovery and demos, driving engagement with companies up to $50M ARR',
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
  { key: 'web', label: 'Web Applications' },
  { key: 'ai', label: 'Data Science & Machine Learning' },
  { key: 'security', label: 'Security & Compliance Tools' },
  { key: 'devops', label: 'Cloud & DevOps Engineering' },
  { key: 'research', label: 'Research & Experimental' },
  { key: 'open', label: 'Open Source & Contributions' },
    { key: 'infra', label: 'Embedded Systems & Infrastructure' },
  { key: 'other', label: 'Other' },
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
    type: 'github',
    link: 'https://github.com/devenshah2018/deven-shah-portfolio',
    status: 'Live',
    readMe: true,
    categories: ['web'],
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
    type: 'github',
    link: 'https://github.com/devenshah2018/qode',
    status: 'Paused',
    readMe: true,
    categories: ['research'],
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
    type: 'link',
    link: 'http://marketplace.visualstudio.com/items?itemName=strive-ai.strive',
    status: 'Live',
    categories: ['security', 'ai'],
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
    type: 'github',
    link: 'https://github.com/b-devera/crypto-forecasting-model',
    status: 'Completed',
    categories: ['ai', 'research'],
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
    type: 'github',
    link: 'https://github.com/devenshah2018/model-distribution-server',
    status: 'In Progress',
    categories: ['ai', 'infra', 'devops'],
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
    type: 'github',
    link: 'https://github.com/devenshah2018/small-molecule-mutation-prediction',
    status: 'Completed',
    readMe: true,
    categories: ['ai', 'research'],
  },
    {
    id: 'drone-build-project',
    title: 'Automated Drone Path Planning',
    subtitle: 'High-Quality Image Capture System to Support Drone Path Planning',
    period: '09/2025 – Present',
    sortDate: '2025-09',
    description:
      'Capturing high-quality image datasets for applications such as mapping, surveys, digital 3D models, and AI. Supported by The Build Fellowship.',
    technologies: getProjectSkillsFromMapping('drone-build-project'),
    type: 'github',
    link: '',
    status: 'In Progress',
    readMe: false,
    categories: ['ai', 'research'],
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
    coursework: [
        'Operating Systems',
        'Analysis of Algorithms'
    ]
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
    mapping.forEach((skill) => {
        if (skill.projects) {
            skill.projects.forEach((project) => {
                if (project.id === projectId) {
                    skills.push(skill.skill);
                }
            });
        }
    });
    return skills;
    
}