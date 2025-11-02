import { SKILLS, SKILL_MAPPINGS, EXPERIENCES, PROJECTS, EDUCATION } from './content-registry';

export interface MatchResult {
  skills: string[];
  experiences: typeof EXPERIENCES;
  projects: typeof PROJECTS;
  education: typeof EDUCATION;
  matchScore: number;
  extractedKeywords: string[];
  matchedSkillMappings: typeof SKILL_MAPPINGS;
}

const KEYWORD_TO_SKILLS: Record<string, string[]> = {
  'microsoft': ['Azure', 'C#', '.NET'],
  'aws': ['AWS'],
  'amazon': ['AWS'],
  'google cloud': ['GCP'],
  'gcp': ['GCP'],
  'machine learning': ['Tensorflow', 'Pytorch', 'Sklearn', 'Python'],
  'ml': ['Tensorflow', 'Pytorch', 'Sklearn', 'Python'],
  'ai': ['Tensorflow', 'Pytorch', 'LLMs', 'Python', 'LangGraph'],
  'artificial intelligence': ['Tensorflow', 'Pytorch', 'LLMs', 'Python', 'LangGraph'],
  'deep learning': ['Tensorflow', 'Pytorch', 'Python'],
  'data science': ['Python', 'Sklearn', 'Jupyter'],
  'frontend': ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS'],
  'front-end': ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS'],
  'backend': ['Python', 'C#', 'Java', 'TypeScript', 'Flask', 'Bash'],
  'back-end': ['Python', 'C#', 'Java', 'TypeScript', 'Flask', 'Bash'],
  'fullstack': ['React', 'TypeScript', 'PostgreSQL', 'Next.js'],
  'full-stack': ['React', 'TypeScript', 'PostgreSQL', 'Next.js'],
  'database': ['PostgreSQL', 'MongoDB', 'SQL', 'Oracle', 'MySQL'],
  'devops': ['Docker', 'Github/Git', 'GCP', 'AWS', 'Azure'],
  'containerization': ['Docker'],
  'cloud': ['AWS', 'Azure', 'GCP'],
  'web development': ['React', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
  'rest': ['REST API'],
  'api': ['REST API', 'GraphQL', 'Apex'],
  'version control': ['Github/Git'],
  'react': ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  'javascript': ['JavaScript', 'TypeScript', 'React'],
  'python': ['Python', 'Flask'],
  'typescript': ['TypeScript', 'React', 'Next.js'],
  'sql': ['SQL', 'PostgreSQL', 'MySQL', 'Oracle'],
  'nosql': ['MongoDB'],
  'data engineering': ['Python', 'SQL', 'Bash'],
  'analytics': ['Python', 'SQL'],
  'microservices': ['Docker', 'REST API', 'GraphQL'],
  'salesforce': ['Salesforce', 'Apex', 'SOQL'],
  'sfdc': ['Salesforce', 'Apex', 'SOQL'],
  'crm': ['Salesforce'],
  'dotnet': ['.NET', 'C#', 'ASP.NET Core'],
  '.net': ['.NET', 'C#', 'ASP.NET Core'],
  'asp.net': ['ASP.NET Core', '.NET', 'C#'],
  'angular': ['Angular', 'TypeScript'],
  'llm': ['LLMs', 'Python', 'LangGraph'],
  'large language model': ['LLMs', 'Python', 'LangGraph'],
  'langgraph': ['LangGraph', 'Python'],
  'scikit-learn': ['Sklearn', 'Python'],
  'sklearn': ['Sklearn', 'Python'],
  'tensorflow': ['Tensorflow', 'Python'],
  'pytorch': ['Pytorch', 'Python'],
  'rust': ['Rust'],
  'c++': ['C++'],
  'cpp': ['C++'],
  'jupyter': ['Jupyter', 'Python'],
  'notebook': ['Jupyter', 'Python'],
};

export function extractMatchedSkills(text: string): string[] {
  const normalized = text.toLowerCase();
  const matchedSkills = new Set<string>();

  const excludedKeywords = ['github', 'git', 'gitlab', 'bitbucket'];

  Object.entries(KEYWORD_TO_SKILLS).forEach(([keyword, relatedSkills]) => {
    if (normalized.includes(keyword.toLowerCase())) {
      relatedSkills.forEach(skill => {
        const skillExists = Object.values(SKILLS)
          .flat()
          .some(s => (s as string).toLowerCase() === skill.toLowerCase());
        
        if (skillExists) {
          const actualSkill = Object.values(SKILLS)
            .flat()
            .find(s => (s as string).toLowerCase() === skill.toLowerCase()) as string;
          
          if (actualSkill && !excludedKeywords.includes(actualSkill.toLowerCase())) {
            matchedSkills.add(actualSkill);
          }
        }
      });
    }
  });

  Object.values(SKILLS)
    .flat()
    .forEach(skill => {
      const skillStr = skill as string;
      const skillLower = skillStr.toLowerCase();
      
      if (excludedKeywords.includes(skillLower)) {
        return;
      }
      
      if (skillLower === 'c') {
        const cPattern = /(?:^|\s)c(?:\s|$)/i;
        if (cPattern.test(text)) {
          matchedSkills.add(skillStr);
        }
        return;
      }
      
      if (normalized.includes(skillLower)) {
        matchedSkills.add(skillStr);
      }
      
      const variations = [skillStr];
      if (variations.some(v => normalized.includes(v.toLowerCase()))) {
        matchedSkills.add(skillStr);
      }
    });

  return Array.from(matchedSkills);
}

export function matchJobDescription(jobDescription: string): MatchResult {
  const matchedSkills = extractMatchedSkills(jobDescription);
  
  const matchedSkillMappings = SKILL_MAPPINGS.filter(mapping =>
    matchedSkills.some(skill => 
      skill.toLowerCase() === mapping.skill.toLowerCase()
    )
  );

  const experienceIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.experienceIds?.forEach(id => {
      experienceIds.add(id);
    });
  });

  const matchedExperiences = EXPERIENCES.filter(exp =>
    experienceIds.has(exp.id)
  ).sort((a, b) => {
    const aSkillCount = matchedSkillMappings.filter(m =>
      m.experienceIds?.includes(a.id)
    ).length;
    const bSkillCount = matchedSkillMappings.filter(m =>
      m.experienceIds?.includes(b.id)
    ).length;
    return bSkillCount - aSkillCount;
  });

  const projectIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.projectIds?.forEach(id => {
      projectIds.add(id);
    });
  });

  const matchedProjects = PROJECTS.filter(proj =>
    projectIds.has(proj.id)
  ).sort((a, b) => {
    const aSkillCount = matchedSkillMappings.filter(m =>
      m.projectIds?.includes(a.id)
    ).length;
    const bSkillCount = matchedSkillMappings.filter(m =>
      m.projectIds?.includes(b.id)
    ).length;
    return bSkillCount - aSkillCount;
  });

  const educationIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.educationIds?.forEach(id => {
      educationIds.add(id);
    });
  });

  const matchedEducation = educationIds.size > 0
    ? EDUCATION.filter(edu => educationIds.has(edu.id))
    : EDUCATION;

  const totalPossibleItems = EXPERIENCES.length + PROJECTS.length + matchedSkills.length;
  const totalMatched = matchedExperiences.length + matchedProjects.length + matchedSkills.length;
  const matchScore = Math.min(100, Math.round((totalMatched / totalPossibleItems) * 100));

  return {
    skills: matchedSkills,
    experiences: matchedExperiences,
    projects: matchedProjects,
    education: matchedEducation,
    matchScore,
    extractedKeywords: matchedSkills,
    matchedSkillMappings,
  };
}
