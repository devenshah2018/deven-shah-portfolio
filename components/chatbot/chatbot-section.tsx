'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, FileText, Code, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchResult {
  content_type: 'paper' | 'project';
  content_id: string;
  title: string;
  url: string;
  similarity: number;
  metadata?: {
    date?: string;
    institution?: string;
    status?: string;
    period?: string;
  };
}

export function ChatbotSection() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setIsSearching(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      setResults(data.results || []);
      
      if (data.results && data.results.length === 0) {
        setError('No relevant papers or projects found. Try rephrasing your query.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const formatSimilarity = (similarity: number) => {
    return `${Math.round(similarity * 100)}%`;
  };

  return (
    <section id='chatbot' className='bg-gradient-to-b from-slate-900 to-slate-950 py-20'>
      <div className='container mx-auto px-4 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className='border-slate-700/50 bg-slate-800/30 backdrop-blur-sm'>
            <CardHeader className='border-b border-slate-700/50'>
              <CardTitle className='flex items-center gap-3 text-2xl font-bold text-white'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-500'>
                  <Search className='h-5 w-5 text-white' />
                </div>
                <div>
                  <div>Find Papers & Projects</div>
                  <p className='text-sm font-normal text-slate-400'>
                    Ask me anything about my research or projects
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
              {/* Search Form */}
              <form onSubmit={handleSearch} className='mb-6'>
                <div className='flex gap-3'>
                  <div className='flex-1'>
                    <Input
                      type='text'
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder='e.g., "machine learning cryptocurrency prediction" or "quantum programming language"'
                      disabled={isSearching}
                      className='h-12 rounded-lg border-slate-600/50 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20'
                    />
                  </div>
                  <Button
                    type='submit'
                    disabled={isSearching || !query.trim()}
                    className='h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 font-medium text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-50'
                  >
                    {isSearching ? (
                      <>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className='mr-2 h-4 w-4' />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Error State */}
              {error && (
                <div className='mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4'>
                  <AlertCircle className='h-5 w-5 flex-shrink-0 text-red-400' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-red-300'>{error}</p>
                  </div>
                </div>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold text-slate-200'>
                    Found {results.length} result{results.length !== 1 ? 's' : ''}
                  </h3>
                  <div className='grid gap-4 md:grid-cols-2'>
                    {results.map((result, index) => (
                      <motion.div
                        key={`${result.content_type}-${result.content_id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className='group border-slate-700/50 bg-slate-800/40 transition-all hover:border-blue-500/50 hover:bg-slate-800/60'>
                          <CardContent className='p-5'>
                            <div className='flex items-start justify-between gap-3'>
                              <div className='flex-1'>
                                <div className='mb-2 flex items-center gap-2'>
                                  {result.content_type === 'paper' ? (
                                    <FileText className='h-4 w-4 text-blue-400' />
                                  ) : (
                                    <Code className='h-4 w-4 text-purple-400' />
                                  )}
                                  <span className='text-xs font-medium uppercase text-slate-400'>
                                    {result.content_type}
                                  </span>
                                  <span className='rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-300'>
                                    {formatSimilarity(result.similarity)}
                                  </span>
                                </div>
                                <h4 className='mb-2 text-lg font-semibold text-white group-hover:text-blue-300 transition-colors'>
                                  {result.title}
                                </h4>
                                {result.metadata && (
                                  <div className='flex flex-wrap gap-2 text-xs text-slate-400'>
                                    {result.metadata.date && (
                                      <span>{result.metadata.date}</span>
                                    )}
                                    {result.metadata.institution && (
                                      <span>• {result.metadata.institution}</span>
                                    )}
                                    {result.metadata.period && (
                                      <span>• {result.metadata.period}</span>
                                    )}
                                    {result.metadata.status && (
                                      <span className='rounded border border-slate-600 bg-slate-700/50 px-2 py-0.5'>
                                        {result.metadata.status}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className='mt-4'>
                              <a
                                href={result.url}
                                target={result.url.startsWith('http') ? '_blank' : undefined}
                                rel={result.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className='inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300'
                              >
                                View {result.content_type === 'paper' ? 'Paper' : 'Project'}
                                <ExternalLink className='h-3.5 w-3.5' />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isSearching && results.length === 0 && !error && (
                <div className='py-12 text-center'>
                  <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50'>
                    <Search className='h-8 w-8 text-slate-500' />
                  </div>
                  <p className='text-slate-400'>
                    Enter a query above to search through research papers and projects
                  </p>
                  <p className='mt-2 text-sm text-slate-500'>
                    Try asking about topics like machine learning, quantum computing, or specific technologies
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

