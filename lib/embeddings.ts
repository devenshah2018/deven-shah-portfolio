import { pipeline } from '@xenova/transformers';

// Cache the model pipeline to avoid reloading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let embeddingPipeline: any = null;

/**
 * Initialize the embedding model pipeline
 * Model: all-MiniLM-L6-v2 (384 dimensions, lightweight and fast)
 */
async function getEmbeddingPipeline() {
  if (!embeddingPipeline) {
    // Use local model, no API key needed
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
      {
        quantized: true, // Use quantized model for faster loading
      }
    );
  }
  return embeddingPipeline;
}

/**
 * Generate embedding for a text string
 * @param text - Text to generate embedding for
 * @returns Promise<number[]> - Embedding vector (384 dimensions)
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const extractor = await getEmbeddingPipeline();
    const output = await extractor(text, {
      pooling: 'mean',
      normalize: true,
    });

    // Convert tensor to array - output.data is a TypedArray
    const embedding = Array.from(output.data as ArrayLike<number>);
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}

/**
 * Combine paper fields into searchable text
 * Weight important fields (title, keywords) by repeating them 2-3x
 */
export function combinePaperText(paper: {
  title: string;
  abstract?: string;
  keywords: string[];
  description?: string;
}): string {
  const parts: string[] = [];
  
  // Title - repeat 3x for high weight
  parts.push(`Title: ${paper.title}`);
  parts.push(paper.title);
  parts.push(paper.title);

  if (paper.description) {
    parts.push(paper.description);
  }

  if (paper.abstract) {
    parts.push(paper.abstract);
  }

  // Keywords - repeat 3x for very high weight
  if (paper.keywords && paper.keywords.length > 0) {
    const keywordsText = paper.keywords.join(' ');
    parts.push(keywordsText);
    parts.push(keywordsText);
    parts.push(keywordsText);
  }

  return parts.join(' ');
}

/**
 * Combine project fields into searchable text
 * Weight important fields (title, subtitle, technologies) by repeating them 2-3x
 */
export function combineProjectText(project: {
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  highlights?: string[];
}): string {
  const parts: string[] = [];
  
  // Title - repeat 3x for high weight
  parts.push(`Title: ${project.title}`);
  parts.push(project.title);
  parts.push(project.title);

  // Subtitle - repeat 2x for medium-high weight
  parts.push(`Subtitle: ${project.subtitle}`);
  parts.push(project.subtitle);
  parts.push(project.subtitle);

  // Description
  parts.push(project.description);

  if (project.fullDescription) {
    parts.push(project.fullDescription);
  }

  // Technologies - repeat 2x for high weight
  if (project.technologies && project.technologies.length > 0) {
    const techText = project.technologies.join(' ');
    parts.push(techText);
    parts.push(techText);
  }

  if (project.highlights && project.highlights.length > 0) {
    parts.push(project.highlights.join(' '));
  }

  return parts.join(' ');
}

/**
 * Combine experience fields into searchable text
 * Weight important fields (title, company, achievements) by repeating them 2-3x
 * Include location, period, and related project context
 */
export function combineExperienceText(experience: {
  title: string;
  company: string;
  description: string;
  achievements?: string[];
  location?: string;
  period?: string;
}): string {
  const parts: string[] = [];
  
  // Title - repeat 3x for high weight
  parts.push(`Title: ${experience.title}`);
  parts.push(experience.title);
  parts.push(experience.title);

  // Company - repeat 3x for high weight
  parts.push(`Company: ${experience.company}`);
  parts.push(experience.company);
  parts.push(experience.company);

  // Description
  parts.push(experience.description);

  // Location - add for context
  if (experience.location) {
    parts.push(`Location: ${experience.location}`);
    parts.push(experience.location);
  }

  // Period - add for context
  if (experience.period) {
    parts.push(`Period: ${experience.period}`);
  }

  // Achievements - repeat 2x since they contain specific work details
  if (experience.achievements && experience.achievements.length > 0) {
    const achievementsText = experience.achievements.join(' ');
    parts.push(achievementsText);
    parts.push(achievementsText);
  }

  return parts.join(' ');
}

/**
 * Combine study fields into searchable text
 * Weight important fields (title, tags, excerpt) by repeating them 2-3x
 * Include full content for comprehensive search
 */
export function combineStudyText(study: {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}): string {
  const parts: string[] = [];
  
  // Title - repeat 3x for high weight
  parts.push(`Title: ${study.title}`);
  parts.push(study.title);
  parts.push(study.title);

  // Excerpt - repeat 2x for medium-high weight
  parts.push(`Excerpt: ${study.excerpt}`);
  parts.push(study.excerpt);
  parts.push(study.excerpt);

  // Tags - repeat 3x for very high weight
  if (study.tags && study.tags.length > 0) {
    const tagsText = study.tags.join(' ');
    parts.push(tagsText);
    parts.push(tagsText);
    parts.push(tagsText);
  }

  // Content - full text for comprehensive search
  // Remove markdown syntax for cleaner embedding
  const cleanContent = study.content
    .replace(/^#+\s+/gm, '') // Remove markdown headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();
  
  parts.push(cleanContent);

  return parts.join(' ');
}

