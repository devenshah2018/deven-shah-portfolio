/**
 * Query-time boosting configuration and utilities
 * Adjust boost values here to fine-tune search relevance
 */

// Boost amounts (0.0 - 1.0)
// Higher values = stronger boost
export const BOOST_CONFIG = {
  // Boost for papers when query mentions paper/research terms
  PAPER_QUERY_BOOST: 0.2,
  
  // Boost for projects when query mentions project/work terms
  PROJECT_QUERY_BOOST: 0.15,
  
  // Boost for experiences when query mentions experience/job/career terms
  EXPERIENCE_QUERY_BOOST: 0.15,
} as const;

// Keywords that indicate a paper/research query
const PAPER_KEYWORDS = [
  'paper',
  'papers',
  'research',
  'publication',
  'publications',
  'academic',
  'study',
  'studies',
  'article',
  'articles',
];

// Keywords that indicate a project query
const PROJECT_KEYWORDS = [
  'project',
  'projects',
  'work',
  'portfolio',
  'build',
  'built',
  'development',
  'app',
  'application',
  'software',
];

// Keywords that indicate an experience query
const EXPERIENCE_KEYWORDS = [
  'experience',
  'experiences',
  'job',
  'jobs',
  'career',
  'work',
  'employment',
  'position',
  'positions',
  'internship',
  'internships',
];

export interface SearchResult {
  content_type: string;
  content_id: string;
  title: string;
  url: string;
  similarity: number;
  metadata: Record<string, any>;
}

/**
 * Check if a query is about papers/research
 */
export function isPaperQuery(query: string): boolean {
  const queryLower = query.trim().toLowerCase();
  return PAPER_KEYWORDS.some(keyword => queryLower.includes(keyword));
}

/**
 * Check if a query is about projects
 */
export function isProjectQuery(query: string): boolean {
  const queryLower = query.trim().toLowerCase();
  return PROJECT_KEYWORDS.some(keyword => queryLower.includes(keyword));
}

/**
 * Check if a query is about experiences
 */
export function isExperienceQuery(query: string): boolean {
  const queryLower = query.trim().toLowerCase();
  return EXPERIENCE_KEYWORDS.some(keyword => queryLower.includes(keyword));
}

/**
 * Apply query-time boosting to search results
 * Modifies results in-place and re-sorts by boosted similarity
 */
export function applyBoosting(
  query: string,
  results: SearchResult[]
): void {
  let boosted = false;

  // Boost papers if query mentions paper/research terms
  if (isPaperQuery(query)) {
    results.forEach((result) => {
      if (result.content_type === 'paper') {
        result.similarity = Math.min(
          1.0,
          result.similarity + BOOST_CONFIG.PAPER_QUERY_BOOST
        );
        boosted = true;
      }
    });
    console.log(
      `Paper query detected - boosted papers by ${BOOST_CONFIG.PAPER_QUERY_BOOST}`
    );
  }

  // Boost projects if query mentions project/work terms
  if (isProjectQuery(query)) {
    results.forEach((result) => {
      if (result.content_type === 'project') {
        result.similarity = Math.min(
          1.0,
          result.similarity + BOOST_CONFIG.PROJECT_QUERY_BOOST
        );
        boosted = true;
      }
    });
    console.log(
      `Project query detected - boosted projects by ${BOOST_CONFIG.PROJECT_QUERY_BOOST}`
    );
  }

  // Boost experiences if query mentions experience/job terms
  if (isExperienceQuery(query)) {
    results.forEach((result) => {
      if (result.content_type === 'experience') {
        result.similarity = Math.min(
          1.0,
          result.similarity + BOOST_CONFIG.EXPERIENCE_QUERY_BOOST
        );
        boosted = true;
      }
    });
    console.log(
      `Experience query detected - boosted experiences by ${BOOST_CONFIG.EXPERIENCE_QUERY_BOOST}`
    );
  }

  // Re-sort by boosted similarity if any boosting was applied
  if (boosted) {
    results.sort((a, b) => b.similarity - a.similarity);
  }
}

