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

// Extract skills from job description by matching against our actual skills
export function extractMatchedSkills(text: string): string[] {
  const normalized = text.toLowerCase();
  const matchedSkills = new Set<string>();

  // Keywords to exclude (ubiquitous tools that don't meaningfully differentiate)
  const excludedKeywords = ['github', 'git', 'gitlab', 'bitbucket'];

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
