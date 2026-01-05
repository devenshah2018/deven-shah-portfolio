import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Study } from './types';

const studiesDirectory = path.join(process.cwd(), 'content/studies');

/**
 * Get all study file names from the studies directory
 */
function getStudyFileNames(): string[] {
  try {
    if (!fs.existsSync(studiesDirectory)) {
      return [];
    }
    return fs.readdirSync(studiesDirectory).filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading studies directory:', error);
    return [];
  }
}

/**
 * Parse a single MDX file and extract frontmatter + content
 */
function parseStudyFile(fileName: string): Study | null {
  try {
    const fullPath = path.join(studiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract id from filename (remove .mdx extension)
    const id = fileName.replace(/\.mdx$/, '');

    // Validate required fields
    if (!data['title'] || !data['excerpt'] || !data['date']) {
      console.warn(`Study ${id} is missing required fields (title, excerpt, or date)`);
      return null;
    }

    // Parse tags - can be string or array
    const tags = Array.isArray(data['tags']) ? data['tags'] : data['tags'] ? [data['tags']] : [];

    // Calculate reading time if not provided (average reading speed: 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = data['readingTime'] || Math.ceil(wordCount / 200);

    // Generate sortDate from date if not provided
    let sortDate = data['sortDate'];
    if (!sortDate && data['date']) {
      // Try to parse date and format as YYYY-MM
      const dateMatch = String(data['date']).match(/(\d{4})/);
      if (dateMatch) {
        const monthMatch = String(data['date']).match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
        if (monthMatch && monthMatch[1]) {
          const monthMap: Record<string, string> = {
            january: '01', february: '02', march: '03', april: '04',
            may: '05', june: '06', july: '07', august: '08',
            september: '09', october: '10', november: '11', december: '12'
          };
          const month = monthMap[monthMatch[1].toLowerCase()];
          sortDate = `${dateMatch[1]}-${month}`;
        } else {
          sortDate = `${dateMatch[1]}-01`;
        }
      } else {
        sortDate = new Date().toISOString().slice(0, 7); // Fallback to current month
      }
    }

    const study: Study = {
      id,
      slug: data['slug'] || id,
      title: String(data['title']),
      excerpt: String(data['excerpt']),
      date: String(data['date']),
      sortDate: sortDate || new Date().toISOString().slice(0, 7),
      tags: tags as string[],
      readingTime,
      content,
    };

    return study;
  } catch (error) {
    console.error(`Error parsing study file ${fileName}:`, error);
    return null;
  }
}

/**
 * Get all studies, sorted by date (newest first)
 */
export function getAllStudies(): Study[] {
  const fileNames = getStudyFileNames();
  const studies = fileNames
    .map((fileName) => parseStudyFile(fileName))
    .filter((study): study is Study => study !== null);

  return studies.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

/**
 * Get a study by its slug or id
 */
export function getStudyBySlug(slug: string): Study | null {
  const studies = getAllStudies();
  return studies.find((study) => study.slug === slug || study.id === slug) || null;
}

/**
 * Get a study by its id
 */
export function getStudyById(id: string): Study | null {
  const studies = getAllStudies();
  return studies.find((study) => study.id === id) || null;
}

/**
 * Export all studies for use in other modules
 * This is computed at module load time
 */
export const STUDIES: Study[] = getAllStudies();

