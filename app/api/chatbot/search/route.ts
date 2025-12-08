import { NextRequest, NextResponse } from 'next/server';
import { getPineconeIndexHost } from '@/lib/pinecone-client';
import { applyBoosting } from '@/lib/boosting';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Query is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    console.log('Searching Pinecone for query:', query.trim());

    try {
      // Use REST API directly for text search with integrated embeddings
      // The SDK's query method doesn't support text queries for integrated embeddings
      const indexHost = await getPineconeIndexHost();
      const apiKey = process.env['PINECONE_API_KEY'] || 'pcsk_6Ec7xM_59ZgGmQrvg1bdjzc1GxnB7yDNL54UH6CtQcGUxmtxtKiS4sCJW6uMjgCCzmWuf5';
      const namespace = '__default__'; // Default namespace (required for API version 2025-04+)
      
      // Use REST API for text search
      const response = await fetch(`https://${indexHost}/records/namespaces/${namespace}/search`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Api-Key': apiKey,
          'X-Pinecone-Api-Version': '2025-10',
        },
        body: JSON.stringify({
          query: {
            inputs: {
              text: query.trim(),
            },
            top_k: 10,
          },
          fields: [
            'content_type',
            'content_id',
            'title',
            'url',
            'date',
            'institution',
            'company',
            'period',
            'keywords',
            'technologies',
            'status',
            'relatedProjectId',
            'location',
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Pinecone API error: ${response.status} - ${errorText}`);
      }

      const queryResponse = await response.json();

      console.log('Pinecone query response:', {
        hasResult: !!queryResponse.result,
        hasResults: !!queryResponse.results, // Check both formats
        hitsCount: queryResponse.result?.hits?.length || queryResponse.results?.hits?.length || 0,
      });

      // Handle both response formats (result vs results)
      const hits = queryResponse.result?.hits || queryResponse.results?.hits;
      
      if (!hits || hits.length === 0) {
        return NextResponse.json({
          results: [],
          error: 'No results returned from Pinecone',
        });
      }

      // Format results from Pinecone
      // Response format: { result: { hits: [{ _id, _score, fields: {...} }] } }
      // OR: { results: { hits: [{ id, score, ...fields }] } } (for upsertRecords)
      // Transform URLs to use localhost if running in development
      const isDevelopment = process.env.NODE_ENV === 'development' || !process.env['VERCEL_ENV'];
      
      const results = hits.map((hit: any) => {
        // Check if using new API format (with fields object) or old format (flat)
        const fields = hit.fields || hit;
        const id = hit._id || hit.id || '';
        const score = hit._score !== undefined ? hit._score : (hit.score !== undefined ? hit.score : 0);
        
        // Transform URL to localhost if in development
        let url = fields.url || '';
        if (isDevelopment && url) {
          // Replace production URLs with localhost
          url = url
            .replace('https://research.deven-shah.com', 'http://research.localhost:3000')
            .replace('https://deven-shah.com', 'http://localhost:3000');
        }
        
        return {
          content_type: fields.content_type || 'unknown',
          content_id: fields.content_id || id,
          title: fields.title || 'Untitled',
          url: url,
          similarity: score, // Pinecone returns _score or score
          metadata: {
            content_type: fields.content_type,
            content_id: fields.content_id,
            title: fields.title,
            url: url,
            date: fields.date,
            institution: fields.institution,
            company: fields.company,
            period: fields.period,
            keywords: fields.keywords,
            technologies: fields.technologies,
            status: fields.status,
            relatedProjectId: fields.relatedProjectId,
            location: fields.location,
          },
        };
      });

      // Apply query-time boosting based on query content
      applyBoosting(query, results);

      console.log('Boosted results:', results.map((r: any) => ({
        title: r.title,
        similarity: r.similarity.toFixed(4),
        content_type: r.content_type,
      })));

      // Filter results with minimum similarity threshold
      // Pinecone scores are typically 0-1, with higher being more similar
      const filteredResults = results
        .filter((r: any) => r.similarity >= 0.1) // Minimum similarity threshold
        .slice(0, 5); // Top 5 results

      console.log('Filtered results:', filteredResults.length, 'out of', results.length);
      console.log('Top results:', filteredResults.map((r: any) => ({
        title: r.title,
        similarity: r.similarity.toFixed(4),
        content_type: r.content_type,
      })));

      if (filteredResults.length === 0) {
        return NextResponse.json({
          results: [],
          error: 'No relevant results found. Try rephrasing your query.',
          hint: 'Make sure embeddings are generated: npm run generate-pinecone-embeddings',
        });
      }

      return NextResponse.json({
        results: filteredResults,
      });
    } catch (pineconeError: any) {
      console.error('Pinecone query error:', pineconeError);
      
      // Check if it's a connection/configuration error
      if (pineconeError.message?.includes('API key') || pineconeError.message?.includes('index')) {
        return NextResponse.json(
          {
            error: 'Pinecone configuration error',
            details: pineconeError.message,
            hint: 'Please check your PINECONE_API_KEY and PINECONE_INDEX_NAME environment variables',
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error: 'Error querying Pinecone',
          details: pineconeError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
