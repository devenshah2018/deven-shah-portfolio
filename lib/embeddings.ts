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
 */
export function combinePaperText(paper: {
  title: string;
  abstract?: string;
  keywords: string[];
  description?: string;
}): string {
  const parts: string[] = [paper.title];

  if (paper.description) {
    parts.push(paper.description);
  }

  if (paper.abstract) {
    parts.push(paper.abstract);
  }

  if (paper.keywords && paper.keywords.length > 0) {
    parts.push(paper.keywords.join(' '));
  }

  return parts.join(' ');
}

/**
 * Combine project fields into searchable text
 */
export function combineProjectText(project: {
  title: string;
  subtitle: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  highlights?: string[];
}): string {
  const parts: string[] = [project.title, project.subtitle, project.description];

  if (project.fullDescription) {
    parts.push(project.fullDescription);
  }

  if (project.technologies && project.technologies.length > 0) {
    parts.push(project.technologies.join(' '));
  }

  if (project.highlights && project.highlights.length > 0) {
    parts.push(project.highlights.join(' '));
  }

  return parts.join(' ');
}

/**
 * Combine experience fields into searchable text
 */
export function combineExperienceText(experience: {
  title: string;
  company: string;
  description: string;
  achievements?: string[];
}): string {
  const parts: string[] = [
    experience.title,
    experience.company,
    experience.description,
  ];

  if (experience.achievements && experience.achievements.length > 0) {
    parts.push(experience.achievements.join(' '));
  }

  return parts.join(' ');
}

