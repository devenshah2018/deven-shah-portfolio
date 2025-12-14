/**
 * Query-time boosting configuration and utilities
 * Adjust boost values here to fine-tune search relevance
 */

import { contentMatchesKeywords } from './keyword-index';

  // Boost amounts (0.0 - 1.0)
  // Higher values = stronger boost
export const BOOST_CONFIG = {
  // Boost for papers when query mentions paper/research terms
  PAPER_QUERY_BOOST: 0.2,
  
  // Boost for projects when query mentions project/work terms
  PROJECT_QUERY_BOOST: 0.15,
  
  // Boost for experiences when query mentions experience/job/career terms
  EXPERIENCE_QUERY_BOOST: 0.15,
  
  // Keyword matching boost - when query keywords match content registry keywords
  KEYWORD_MATCH_BOOST: 0.2,
  
  // Exact title match boost - when query keywords match title exactly
  TITLE_MATCH_BOOST: 0.3,
  
  // Content registry match boost - when query keywords match content registry
  CONTENT_REGISTRY_MATCH_BOOST: 0.25,
  
  // Penalty for results that don't match keywords when keywords are present
  // This helps filter out irrelevant results
  NO_KEYWORD_MATCH_PENALTY: 0.15,
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
 * Extract keywords from query
 * Removes stop words, handles possessive forms, and extracts domain-specific terms
 */
export function extractQueryKeywords(query: string): string[] {
  // Handle possessive forms (e.g., "deven's" -> "deven")
  let processedQuery = query.replace(/'s\b/g, '');
  
  // Common stop words
  const stopWords = new Set([
    'what', 'is', 'are', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at',
    'to', 'for', 'of', 'with', 'by', 'from', 'as', 'was', 'were', 'been', 'be',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
    'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
    'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
    'his', 'her', 'its', 'our', 'their', 'work', 'on', 'about', 'deven'
  ]);
  
  // Extract keywords (words longer than 2 chars, not stop words)
  const keywords = processedQuery
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/[^\w-]/g, ''))
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
  
  return keywords;
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
  const queryKeywords = extractQueryKeywords(query);

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

  // Keyword-based boosting using content registry
  if (queryKeywords.length > 0) {
    results.forEach((result) => {
      const contentType = result.content_type as 'project' | 'experience' | 'paper';
      
      // Track if this result has any keyword matches
      let hasAnyKeywordMatch = false;
      
      // Check if result matches content registry keywords
      const hasRegistryMatch = contentMatchesKeywords(result.content_id, contentType, queryKeywords);
      if (hasRegistryMatch) {
        result.similarity = Math.min(
          1.0,
          result.similarity + BOOST_CONFIG.CONTENT_REGISTRY_MATCH_BOOST
        );
        hasAnyKeywordMatch = true;
        boosted = true;
        console.log(
          `Content registry match: ${result.title} boosted by ${BOOST_CONFIG.CONTENT_REGISTRY_MATCH_BOOST}`
        );
      }

      // Check for exact title match
      const titleLower = result.title.toLowerCase();
      const titleMatches = queryKeywords.some(kw => titleLower.includes(kw));
      if (titleMatches) {
        result.similarity = Math.min(
          1.0,
          result.similarity + BOOST_CONFIG.TITLE_MATCH_BOOST
        );
        hasAnyKeywordMatch = true;
        boosted = true;
        console.log(
          `Title match: ${result.title} boosted by ${BOOST_CONFIG.TITLE_MATCH_BOOST}`
        );
      }

      // Check if result text contains query keywords
      const resultText = `${result.title} ${result.metadata?.['keywords'] || ''} ${result.metadata?.['technologies'] || ''} ${result.metadata?.['company'] || ''}`.toLowerCase();
      const keywordMatches = queryKeywords.filter(kw => resultText.includes(kw));
      if (keywordMatches.length > 0) {
        const keywordBoost = BOOST_CONFIG.KEYWORD_MATCH_BOOST * (keywordMatches.length / queryKeywords.length);
        result.similarity = Math.min(
          1.0,
          result.similarity + keywordBoost
        );
        hasAnyKeywordMatch = true;
        boosted = true;
      }
      
      // Apply penalty for results without keyword matches when keywords are present
      // This helps filter out irrelevant results
      if (!hasAnyKeywordMatch && queryKeywords.length > 0) {
        result.similarity = Math.max(
          0.0,
          result.similarity - BOOST_CONFIG.NO_KEYWORD_MATCH_PENALTY
        );
        boosted = true;
        console.log(
          `No keyword match: ${result.title} penalized by ${BOOST_CONFIG.NO_KEYWORD_MATCH_PENALTY}`
        );
      }
    });
  }

  // Re-sort by boosted similarity if any boosting was applied
  if (boosted) {
    results.sort((a, b) => b.similarity - a.similarity);
  }
}

