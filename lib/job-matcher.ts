// Job description matching utility using direct skill mappings
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

// Keyword dictionary mapping related terms to skills
// Only includes skills that exist in SKILLS registry from content-registry.ts
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

// Extract skills from job description by matching against our actual skills
export function extractMatchedSkills(text: string): string[] {
  const normalized = text.toLowerCase();
  const matchedSkills = new Set<string>();

  // Keywords to exclude (ubiquitous tools that don't meaningfully differentiate)
  const excludedKeywords = ['github', 'git', 'gitlab', 'bitbucket'];

  // First, check keyword dictionary for related skills
  Object.entries(KEYWORD_TO_SKILLS).forEach(([keyword, relatedSkills]) => {
    if (normalized.includes(keyword.toLowerCase())) {
      relatedSkills.forEach(skill => {
        // Only add if the skill exists in our SKILLS registry
        const skillExists = Object.values(SKILLS)
          .flat()
          .some(s => (s as string).toLowerCase() === skill.toLowerCase());
        
        if (skillExists) {
          // Find the actual skill with correct casing
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

  // Check all skills from SKILLS registry
  Object.values(SKILLS)
    .flat()
    .forEach(skill => {
      const skillStr = skill as string;
      const skillLower = skillStr.toLowerCase();
      
      // Skip excluded keywords
      if (excludedKeywords.includes(skillLower)) {
        return;
      }
      
      // Special handling for "C" - only match if it has spaces around it
      if (skillLower === 'c') {
        // Match " C " or "C " at start or " C" at end or just "C" if entire text
        const cPattern = /(?:^|\s)c(?:\s|$)/i;
        if (cPattern.test(text)) {
          matchedSkills.add(skillStr);
        }
        return;
      }
      
      // Check for exact or partial matches
      if (normalized.includes(skillLower)) {
        matchedSkills.add(skillStr);
      }
      
      // Check for common variations
      const variations = [skillStr];
      if (variations.some(v => normalized.includes(v.toLowerCase()))) {
        matchedSkills.add(skillStr);
      }
    });

  return Array.from(matchedSkills);
}

// Main matching function using SKILL_MAPPINGS
export function matchJobDescription(jobDescription: string): MatchResult {
  // Extract matched skills from the job description
  const matchedSkills = extractMatchedSkills(jobDescription);
  
  // Get skill mappings for matched skills
  const matchedSkillMappings = SKILL_MAPPINGS.filter(mapping =>
    matchedSkills.some(skill => 
      skill.toLowerCase() === mapping.skill.toLowerCase()
    )
  );

  // Collect unique experiences from skill mappings
  const experienceIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.experiences?.forEach(exp => {
      experienceIds.add(exp.id);
    });
  });

  // Get full experience objects and sort by relevance
  const matchedExperiences = EXPERIENCES.filter(exp =>
    experienceIds.has(exp.id)
  ).sort((a, b) => {
    // Count how many matched skills each experience has
    const aSkillCount = matchedSkillMappings.filter(m =>
      m.experiences?.some(e => e.id === a.id)
    ).length;
    const bSkillCount = matchedSkillMappings.filter(m =>
      m.experiences?.some(e => e.id === b.id)
    ).length;
    return bSkillCount - aSkillCount;
  });

  // Collect unique projects from skill mappings
  const projectIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.projects?.forEach(proj => {
      projectIds.add(proj.id);
    });
  });

  // Get full project objects and sort by relevance
  const matchedProjects = PROJECTS.filter(proj =>
    projectIds.has(proj.id)
  ).sort((a, b) => {
    // Count how many matched skills each project has
    const aSkillCount = matchedSkillMappings.filter(m =>
      m.projects?.some(p => p.id === a.id)
    ).length;
    const bSkillCount = matchedSkillMappings.filter(m =>
      m.projects?.some(p => p.id === b.id)
    ).length;
    return bSkillCount - aSkillCount;
  });

  // Collect unique education from skill mappings
  const educationIds = new Set<string>();
  matchedSkillMappings.forEach(mapping => {
    mapping.education?.forEach(edu => {
      educationIds.add(edu.id);
    });
  });

  // Get full education objects, or default to all if none matched
  const matchedEducation = educationIds.size > 0
    ? EDUCATION.filter(edu => educationIds.has(edu.id))
    : EDUCATION;

  // Calculate match score based on matches
  const totalPossibleItems = EXPERIENCES.length + PROJECTS.length + matchedSkills.length;
  const totalMatched = matchedExperiences.length + matchedProjects.length + matchedSkills.length;
  const matchScore = Math.min(100, Math.round((totalMatched / totalPossibleItems) * 100));

  return {
    skills: matchedSkills,
    experiences: matchedExperiences,
    projects: matchedProjects,
    education: matchedEducation,
    matchScore,
    extractedKeywords: matchedSkills, // Using skills as keywords
    matchedSkillMappings,
  };
}
