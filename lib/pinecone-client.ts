import { Pinecone } from '@pinecone-database/pinecone';

let pineconeClient: Pinecone | null = null;
let pineconeIndex: any = null;

/**
 * Initialize Pinecone client
 */
export function getPineconeClient(): Pinecone {
  if (!pineconeClient) {
    const apiKey = 'pcsk_6Ec7xM_59ZgGmQrvg1bdjzc1GxnB7yDNL54UH6CtQcGUxmtxtKiS4sCJW6uMjgCCzmWuf5';
    
    if (!apiKey) {
      throw new Error('PINECONE_API_KEY environment variable is not set');
    }

    pineconeClient = new Pinecone({
      apiKey,
    });
  }

  return pineconeClient;
}

/**
 * Get or initialize Pinecone index
 */
export async function getPineconeIndex() {
  if (!pineconeIndex) {
    const client = getPineconeClient();
    const indexName = process.env['PINECONE_INDEX_NAME'] || 'portfolio';

    try {
      pineconeIndex = client.index(indexName);
    } catch (error) {
      console.error('Error connecting to Pinecone index:', error);
      throw new Error(`Failed to connect to Pinecone index: ${indexName}`);
    }
  }

  return pineconeIndex;
}

/**
 * Get Pinecone index host URL for REST API calls
 * Gets the host from the Pinecone client's index description
 */
export async function getPineconeIndexHost(): Promise<string> {
  try {
    const client = getPineconeClient();
    const indexName = process.env['PINECONE_INDEX_NAME'] || 'portfolio';
    
    // Get index description to retrieve the host
    const indexDescription = await client.describeIndex(indexName);
    
    // The host is in the index description
    if (indexDescription.host) {
      return indexDescription.host;
    }
  } catch (error) {
    console.error('Could not get index host from Pinecone:', error);
  }
  
  // Fallback: try to get from environment variable
  const indexHost = process.env['PINECONE_INDEX_HOST'];
  if (indexHost) {
    return indexHost;
  }
  
  // Last fallback: use the index object's host property if available
  try {
    const index = await getPineconeIndex();
    // Check various possible host properties
    const host = (index as any).host || (index as any).hostname || (index as any).url;
    if (host) {
      // Remove https:// if present
      return host.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
  } catch (error) {
    console.warn('Could not get host from index object:', error);
  }
  
  throw new Error('Could not determine Pinecone index host. Please set PINECONE_INDEX_HOST environment variable.');
}

/**
 * Check if index exists and is accessible
 */
export async function checkIndexConnection(): Promise<boolean> {
  try {
    const index = await getPineconeIndex();
    // Try to get index stats to verify connection
    await index.describeIndexStats();
    return true;
  } catch (error) {
    console.error('Pinecone index connection check failed:', error);
    return false;
  }
}

