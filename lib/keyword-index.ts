/**
 * Keyword Index for Content Registry
 * Extracts and indexes all keywords from projects, experiences, papers, and skills
 * to enable keyword-based boosting in search
 */

import {
  PROJECTS,
  EXPERIENCES,
  RESEARCH_PAPERS,
  EDUCATION,
  SKILL_MAPPINGS,
} from './content-registry';

export interface KeywordMapping {
  keyword: string;
  contentType: 'project' | 'experience' | 'paper' | 'education' | 'skill';
  contentIds: string[];
  weight: number; // Higher weight = more important (title > description > keywords)
}

export interface KeywordIndex {
  [keyword: string]: {
    projects: string[];
    experiences: string[];
    papers: string[];
    educations: string[];
    skills: string[];
  };
}

/**
 * Normalize keyword for indexing (lowercase, trim, handle special chars)
 * Also handles basic pluralization (simple cases)
 */
function normalizeKeyword(keyword: string): string {
  let normalized = keyword
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars except hyphens
    .replace(/\s+/g, ' '); // Normalize whitespace
  
  // Basic plural/singular normalization (simple cases)
  // This helps match "drones" with "drone", "projects" with "project", etc.
  if (normalized.endsWith('s') && normalized.length > 3) {
    // Store both singular and plural forms in the index
    // But for matching, we'll check both forms
  }
  
  return normalized;
}

/**
 * Get both singular and plural forms of a keyword for matching
 */
function getKeywordVariants(keyword: string): string[] {
  const normalized = normalizeKeyword(keyword);
  const variants = [normalized];
  
  // Add singular form if plural
  if (normalized.endsWith('s') && normalized.length > 3) {
    const singular = normalized.slice(0, -1);
    if (singular.length > 2) {
      variants.push(singular);
    }
  } else {
    // Add plural form if singular
    variants.push(normalized + 's');
  }
  
  return variants;
}

/**
 * Extract keywords from text (split by spaces, filter out stop words)
 */
function extractKeywordsFromText(text: string): string[] {
  if (!text) return [];
  
  // Common stop words to filter out
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
    'had', 'what', 'said', 'each', 'which', 'their', 'time', 'if',
    'up', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her',
    'would', 'make', 'like', 'into', 'him', 'has', 'two', 'more', 'very',
    'after', 'words', 'long', 'than', 'first', 'been', 'call', 'who',
    'oil', 'sit', 'now', 'find', 'down', 'day', 'did', 'get', 'come',
    'made', 'may', 'part', 'over', 'new', 'sound', 'take', 'only', 'little',
    'work', 'know', 'place', 'year', 'live', 'me', 'back', 'give', 'most',
    'very', 'after', 'thing', 'our', 'just', 'name', 'good', 'sentence',
    'man', 'think', 'say', 'great', 'where', 'help', 'through', 'much',
    'before', 'line', 'right', 'too', 'mean', 'old', 'any', 'same', 'tell',
    'boy', 'follow', 'came', 'want', 'show', 'also', 'around', 'form',
    'three', 'small', 'set', 'put', 'end', 'does', 'another', 'well',
    'large', 'must', 'big', 'even', 'such', 'because', 'turn', 'here',
    'why', 'ask', 'went', 'men', 'read', 'need', 'land', 'different',
    'home', 'us', 'move', 'try', 'kind', 'hand', 'picture', 'again',
    'change', 'off', 'play', 'spell', 'air', 'away', 'animal', 'house',
    'point', 'page', 'letter', 'mother', 'answer', 'found', 'study', 'still',
    'learn', 'should', 'america', 'world', 'high', 'every', 'near', 'add',
    'food', 'between', 'own', 'below', 'country', 'plant', 'last', 'school',
    'father', 'keep', 'tree', 'never', 'start', 'city', 'earth', 'eye',
    'light', 'thought', 'head', 'under', 'story', 'saw', 'left', 'don\'t',
    'few', 'while', 'along', 'might', 'close', 'something', 'seem', 'next',
    'hard', 'open', 'example', 'begin', 'life', 'always', 'those', 'both',
    'paper', 'together', 'got', 'group', 'often', 'run', 'important', 'until',
    'children', 'side', 'feet', 'car', 'mile', 'night', 'walk', 'white',
    'sea', 'began', 'grow', 'took', 'river', 'four', 'carry', 'state',
    'once', 'book', 'hear', 'stop', 'without', 'second', 'later', 'miss',
    'idea', 'enough', 'eat', 'face', 'watch', 'far', 'indian', 'really',
    'almost', 'let', 'above', 'girl', 'sometimes', 'mountain', 'cut', 'young',
    'talk', 'soon', 'list', 'song', 'leave', 'family', 'it\'s'
  ]);

  return text
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/[^\w-]/g, ''))
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
}

/**
 * Build keyword index from all content
 */
export function buildKeywordIndex(): KeywordIndex {
  const index: KeywordIndex = {};

  // Helper to add keyword to index
  const addKeyword = (
    keyword: string,
    contentType: 'project' | 'experience' | 'paper' | 'education',
    contentId: string
  ) => {
    const normalized = normalizeKeyword(keyword);
    if (!normalized || normalized.length < 2) return;

    if (!index[normalized]) {
      index[normalized] = {
        projects: [],
        experiences: [],
        papers: [],
        educations: [],
        skills: [],
      };
    }

    if (contentType === 'project' && !index[normalized].projects.includes(contentId)) {
      index[normalized].projects.push(contentId);
    } else if (contentType === 'experience' && !index[normalized].experiences.includes(contentId)) {
      index[normalized].experiences.push(contentId);
    } else if (contentType === 'paper' && !index[normalized].papers.includes(contentId)) {
      index[normalized].papers.push(contentId);
    } else if (contentType === 'education' && !index[normalized].educations.includes(contentId)) {
      index[normalized].educations.push(contentId);
    }
  };

  // Index projects
  PROJECTS.forEach((project) => {
    // Title (high weight - add multiple times)
    const titleKeywords = extractKeywordsFromText(project.title);
    titleKeywords.forEach((kw) => {
      addKeyword(kw, 'project', project.id);
      addKeyword(kw, 'project', project.id); // Repeat for weight
      addKeyword(kw, 'project', project.id);
    });

    // Subtitle
    const subtitleKeywords = extractKeywordsFromText(project.subtitle);
    subtitleKeywords.forEach((kw) => {
      addKeyword(kw, 'project', project.id);
      addKeyword(kw, 'project', project.id);
    });

    // Description
    const descKeywords = extractKeywordsFromText(project.description);
    descKeywords.forEach((kw) => addKeyword(kw, 'project', project.id));

    // Technologies (high weight)
    project.technologies?.forEach((tech) => {
      const techKeywords = extractKeywordsFromText(tech);
      techKeywords.forEach((kw) => {
        addKeyword(kw, 'project', project.id);
        addKeyword(kw, 'project', project.id);
      });
    });

    // Categories
    project.categories?.forEach((cat) => {
      const catKeywords = extractKeywordsFromText(cat);
      catKeywords.forEach((kw) => {
        addKeyword(kw, 'project', project.id);
      });
    });
  });

  // Index experiences
  EXPERIENCES.forEach((exp) => {
    // Title (high weight)
    const titleKeywords = extractKeywordsFromText(exp.title);
    titleKeywords.forEach((kw) => {
      addKeyword(kw, 'experience', exp.id);
      addKeyword(kw, 'experience', exp.id);
      addKeyword(kw, 'experience', exp.id);
    });

    // Company (high weight)
    const companyKeywords = extractKeywordsFromText(exp.company);
    companyKeywords.forEach((kw) => {
      addKeyword(kw, 'experience', exp.id);
      addKeyword(kw, 'experience', exp.id);
      addKeyword(kw, 'experience', exp.id);
    });

    // Location
    const locationKeywords = extractKeywordsFromText(exp.location);
    locationKeywords.forEach((kw) => addKeyword(kw, 'experience', exp.id));

    // Description
    const descKeywords = extractKeywordsFromText(exp.description);
    descKeywords.forEach((kw) => addKeyword(kw, 'experience', exp.id));

    // Achievements (medium weight - important for domain-specific terms)
    exp.achievements?.forEach((achievement) => {
      const achievementKeywords = extractKeywordsFromText(achievement);
      achievementKeywords.forEach((kw) => {
        addKeyword(kw, 'experience', exp.id);
        addKeyword(kw, 'experience', exp.id);
      });
    });
  });

  // Index papers
  RESEARCH_PAPERS.forEach((paper) => {
    // Title (high weight)
    const titleKeywords = extractKeywordsFromText(paper.title);
    titleKeywords.forEach((kw) => {
      addKeyword(kw, 'paper', paper.id);
      addKeyword(kw, 'paper', paper.id);
      addKeyword(kw, 'paper', paper.id);
    });

    // Keywords (very high weight)
    paper.keywords?.forEach((keyword) => {
      const keywordTerms = extractKeywordsFromText(keyword);
      keywordTerms.forEach((kw) => {
        addKeyword(kw, 'paper', paper.id);
        addKeyword(kw, 'paper', paper.id);
        addKeyword(kw, 'paper', paper.id);
      });
    });

    // Institution
    const institutionKeywords = extractKeywordsFromText(paper.institution || '');
    institutionKeywords.forEach((kw) => {
      addKeyword(kw, 'paper', paper.id);
      addKeyword(kw, 'paper', paper.id);
    });
  });

  // Index education
  EDUCATION.forEach((edu) => {
    // Institution (high weight)
    const institutionKeywords = extractKeywordsFromText(edu.institution);
    institutionKeywords.forEach((kw) => {
      addKeyword(kw, 'education', edu.id);
      addKeyword(kw, 'education', edu.id);
      addKeyword(kw, 'education', edu.id);
    });

    // Degree
    const degreeKeywords = extractKeywordsFromText(edu.degree);
    degreeKeywords.forEach((kw) => {
      addKeyword(kw, 'education', edu.id);
      addKeyword(kw, 'education', edu.id);
    });

    // Concentration
    if (edu.concentration) {
      const concentrationKeywords = extractKeywordsFromText(edu.concentration);
      concentrationKeywords.forEach((kw) => {
        addKeyword(kw, 'education', edu.id);
        addKeyword(kw, 'education', edu.id);
      });
    }
  });

  // Index skills from SKILL_MAPPINGS
  SKILL_MAPPINGS.forEach((mapping) => {
    const skillKeywords = extractKeywordsFromText(mapping.skill);
    skillKeywords.forEach((kw) => {
      if (!index[kw]) {
        index[kw] = {
          projects: [],
          experiences: [],
          papers: [],
          educations: [],
          skills: [],
        };
      }

      // Ensure index entry exists (it should, but TypeScript needs this check)
      const indexEntry = index[kw];
      if (!indexEntry) {
        // This shouldn't happen, but handle it gracefully
        return;
      }

      // Add to projects
      mapping.projectIds?.forEach((projectId) => {
        if (!indexEntry.projects.includes(projectId)) {
          indexEntry.projects.push(projectId);
          indexEntry.projects.push(projectId); // Repeat for weight
        }
      });

      // Add to experiences
      mapping.experienceIds?.forEach((expId) => {
        if (!indexEntry.experiences.includes(expId)) {
          indexEntry.experiences.push(expId);
          indexEntry.experiences.push(expId); // Repeat for weight
        }
      });

      // Add to educations
      mapping.educationIds?.forEach((eduId) => {
        if (!indexEntry.educations.includes(eduId)) {
          indexEntry.educations.push(eduId);
          indexEntry.educations.push(eduId); // Repeat for weight
        }
      });
    });
  });

  return index;
}

/**
 * Get singleton keyword index (cached)
 */
let cachedIndex: KeywordIndex | null = null;

export function getKeywordIndex(): KeywordIndex {
  if (!cachedIndex) {
    cachedIndex = buildKeywordIndex();
  }
  return cachedIndex;
}

/**
 * Find content IDs that match query keywords
 * Handles plural/singular variations
 */
export function findMatchingContent(
  queryKeywords: string[],
  contentType?: 'project' | 'experience' | 'paper'
): {
  projects: string[];
  experiences: string[];
  papers: string[];
} {
  const index = getKeywordIndex();
  const matches = {
    projects: new Set<string>(),
    experiences: new Set<string>(),
    papers: new Set<string>(),
  };

  queryKeywords.forEach((queryKw) => {
    // Get both singular and plural variants
    const variants = getKeywordVariants(queryKw);
    
    variants.forEach((variant) => {
      const indexEntry = index[variant];

      if (indexEntry) {
        if ((!contentType || contentType === 'project') && indexEntry.projects) {
          indexEntry.projects.forEach((id) => matches.projects.add(id));
        }
        if ((!contentType || contentType === 'experience') && indexEntry.experiences) {
          indexEntry.experiences.forEach((id) => matches.experiences.add(id));
        }
        if ((!contentType || contentType === 'paper') && indexEntry.papers) {
          indexEntry.papers.forEach((id) => matches.papers.add(id));
        }
      }
    });
  });

  return {
    projects: Array.from(matches.projects),
    experiences: Array.from(matches.experiences),
    papers: Array.from(matches.papers),
  };
}

/**
 * Check if a content ID matches any query keywords
 */
export function contentMatchesKeywords(
  contentId: string,
  contentType: 'project' | 'experience' | 'paper',
  queryKeywords: string[]
): boolean {
  const matches = findMatchingContent(queryKeywords, contentType);
  
  if (contentType === 'project') {
    return matches.projects.includes(contentId);
  } else if (contentType === 'experience') {
    return matches.experiences.includes(contentId);
  } else if (contentType === 'paper') {
    return matches.papers.includes(contentId);
  }
  
  return false;
}

