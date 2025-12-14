'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, FileText, Code, ExternalLink, User, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMainSiteUrl } from '@/lib/url-utils';

interface SearchResult {
  content_type: 'paper' | 'project' | 'experience';
  content_id: string;
  title: string;
  url: string;
  similarity: number;
  metadata?: {
    date?: string;
    institution?: string;
    status?: string;
    period?: string;
    company?: string;
    location?: string;
  };
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  results?: SearchResult[];
  timestamp: Date;
}

export function ResearchChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'I am HERMES, your knowledge index agent. What can I help you with?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef<number>(1);
  
  // Use absolute URL for the profile image to work on subdomains
  const profileImageUrl = useMemo(() => `${getMainSiteUrl()}/x-profile.png`, []);

  const scrollToBottom = () => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const isNearBottom = 
      container.scrollHeight - container.scrollTop - container.clientHeight < 200;
    
    // Only auto-scroll if user is already near bottom (not forcing scroll)
    // Use scrollTop to scroll only within the container, not the entire page
    if (isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Only scroll if a new message was added (message count increased)
    const currentMessageCount = messages.length;
    if (currentMessageCount > prevMessageCountRef.current) {
      // Small delay to ensure DOM has updated, then check if user is at bottom
      setTimeout(() => {
        scrollToBottom();
      }, 100);
      
      prevMessageCountRef.current = currentMessageCount;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isSearching) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    ((prev: any) => [...prev, userMessage]);
    setInput('');
    setIsSearching(true);

    try {
      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();
      
      // Check if there's an error message
      if (data.error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `❌ Error: ${data.error}${data.hint ? `\n\n💡 ${data.hint}` : ''}${data.details ? `\n\n📋 Details: ${data.details}` : ''}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      const results = data.results || [];

      let botContent = '';
      if (results.length > 0) {
        botContent = `${results.length} ${results.length === 1 ? 'result' : 'results'} found`;
      } else {
        // More helpful error message
        botContent = `I couldn't find any relevant papers or projects matching your query.\n\nPossible issues:\n\n1. **Embeddings not generated**: Run \`npm run generate-embeddings\`\n2. **Supabase function missing**: Create the \`match_content\` function (see CHATBOT_SETUP.md)\n3. **Query too specific**: Try broader terms like "machine learning" or "quantum computing"\n\nCheck the server logs for more details.`;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botContent,
        results: results.length > 0 ? results : undefined,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSearching(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatSimilarity = (similarity: number) => {
    return `${Math.round(similarity * 100)}%`;
  };

  return (
    <div className='flex h-[calc(100vh-200px)] flex-col border border-gray-800/60 bg-black shadow-2xl rounded-none overflow-hidden'>
      {/* Chat Header */}
      <div className='border-b border-gray-800/60 bg-gradient-to-br from-gray-950 via-gray-950 to-black px-6 py-4 backdrop-blur-sm'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3.5'>
            <div className='relative flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/40 shadow-lg shadow-cyan-500/10'>
              <Image
                src={profileImageUrl}
                alt='Assistant'
                width={40}
                height={40}
                className='object-cover w-full h-full'
                unoptimized
              />
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-transparent pointer-events-none' />
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2.5'>
                <h2 className='text-lg font-bold text-white tracking-tight leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent'>
                  Hermes
                </h2>
                <span className='px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-[10px] font-bold text-cyan-300 uppercase tracking-wider'>
                  DEVENAI
                </span>
              </div>
              <p className='text-[11px] font-medium text-gray-400 tracking-widest uppercase'>
                Knowledge Index Agent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto px-6 py-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-800/50 scrollbar-track-transparent'
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`flex items-start gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className='relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/30 shadow-md shadow-cyan-500/10 mt-0.5'>
                  <Image
                    src={profileImageUrl}
                    alt='Assistant'
                    width={32}
                    height={32}
                    className='object-cover w-full h-full'
                    unoptimized
                  />
                  <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none' />
                </div>
              )}
              <div
                className={`max-w-[80%] space-y-3 ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-cyan-600/95 to-cyan-700/90 text-white border border-cyan-500/40'
                      : 'bg-gray-950/90 text-gray-100 border border-gray-800/60'
                  }`}
                >
                  <p className='text-[13px] leading-relaxed font-medium tracking-tight'>{message.content}</p>
                </div>

                {/* Results */}
                {message.results && message.results.length > 0 && (
                  <div className='space-y-2 w-full'>
                    {message.results.map((result, index) => {
                      // Handle clicks for experience and project results - redirect to main site
                      const handleResultClick = (e: React.MouseEvent) => {
                        if (result.content_type === 'experience' || result.content_type === 'project') {
                          e.preventDefault();
                          // Determine main site URL based on current hostname
                          let mainSiteUrl: string;
                          const hostname = window.location.hostname;
                          if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
                            // Local development - use localhost
                            mainSiteUrl = 'http://localhost:3000';
                          } else if (hostname.includes('research.')) {
                            // Production research subdomain - use production main site
                            mainSiteUrl = 'https://deven-shah.com';
                          } else {
                            // Fallback to getMainSiteUrl
                            mainSiteUrl = getMainSiteUrl();
                          }
                          const hash = result.content_type === 'experience' 
                            ? `#experience-${result.content_id}`
                            : `#project-${result.content_id}`;
                          window.location.href = `${mainSiteUrl}${hash}`;
                        }
                        // For papers, use the default link behavior
                      };

                      return (
                      <motion.a
                        key={`${result.content_type}-${result.content_id}`}
                        href={(() => {
                          if (result.content_type === 'experience' || result.content_type === 'project') {
                            // Determine main site URL based on current hostname
                            const hostname = window.location.hostname;
                            let mainSiteUrl: string;
                            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
                              mainSiteUrl = 'http://localhost:3000';
                            } else if (hostname.includes('research.')) {
                              mainSiteUrl = 'https://deven-shah.com';
                            } else {
                              mainSiteUrl = getMainSiteUrl();
                            }
                            return `${mainSiteUrl}#${result.content_type === 'experience' ? 'experience' : 'project'}-${result.content_id}`;
                          }
                          return result.url;
                        })()}
                        onClick={handleResultClick}
                        target={result.content_type === 'paper' && result.url.startsWith('http') ? '_blank' : undefined}
                        rel={result.content_type === 'paper' && result.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.04, duration: 0.25, ease: 'easeOut' }}
                        className='group relative flex items-start gap-3 border border-gray-800/60 bg-gray-950/80 backdrop-blur-sm p-3.5 rounded-lg hover:border-cyan-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer'
                      >
                        {/* Icon and Type Badge */}
                        <div className='flex flex-col items-center gap-2 flex-shrink-0 pt-0.5'>
                          {result.content_type === 'paper' ? (
                            <div className='p-1.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 shadow-sm'>
                              <FileText className='h-3.5 w-3.5 text-cyan-400' />
                            </div>
                          ) : result.content_type === 'experience' ? (
                            <div className='p-1.5 rounded-md bg-orange-500/15 border border-orange-500/30 shadow-sm'>
                              <Briefcase className='h-3.5 w-3.5 text-orange-400' />
                            </div>
                          ) : (
                            <div className='p-1.5 rounded-md bg-purple-500/15 border border-purple-500/30 shadow-sm'>
                              <Code className='h-3.5 w-3.5 text-purple-400' />
                            </div>
                          )}
                          <span className='text-[9px] font-mono uppercase tracking-widest text-gray-500 font-bold leading-none'>
                            {result.content_type === 'paper' ? 'P' : result.content_type === 'experience' ? 'E' : 'PR'}
                          </span>
                        </div>
                        
                        {/* Main Content */}
                        <div className='flex-1 min-w-0 space-y-1.5'>
                          <div className='flex items-start justify-between gap-3'>
                            <h4 className='text-[13px] font-semibold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2'>
                              {result.title}
                            </h4>
                            {/* Similarity Score - Top Right */}
                            <div className='flex items-center gap-1.5 flex-shrink-0'>
                              <span className='text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/15 px-2 py-1 rounded border border-cyan-500/30 whitespace-nowrap'>
                                {formatSimilarity(result.similarity)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Metadata */}
                          {result.metadata && (result.metadata.date || result.metadata.institution || result.metadata.period || result.metadata.company) && (
                            <div className='flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-gray-400'>
                              {result.metadata.period && (
                                <span className='font-mono text-gray-500'>{result.metadata.period}</span>
                              )}
                              {result.metadata.company && (
                                <>
                                  {result.metadata.period && <span className='text-gray-600'>•</span>}
                                  <span className='text-gray-400 truncate max-w-[140px]'>{result.metadata.company}</span>
                                </>
                              )}
                              {result.metadata.institution && (
                                <>
                                  {(result.metadata.period || result.metadata.company) && <span className='text-gray-600'>•</span>}
                                  <span className='text-gray-400 truncate max-w-[140px]'>{result.metadata.institution}</span>
                                </>
                              )}
                              {result.metadata.date && (
                                <>
                                  {(result.metadata.period || result.metadata.company || result.metadata.institution) && <span className='text-gray-600'>•</span>}
                                  <span className='font-mono text-gray-500'>{result.metadata.date}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* External Link Icon */}
                        <div className='flex-shrink-0 pt-0.5'>
                          <ExternalLink className='h-3.5 w-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors' />
                        </div>
                      </motion.a>
                      );
                    })}
                  </div>
                )}
              </div>
              {message.type === 'user' && (
                <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/60 shadow-sm mt-0.5'>
                  <User className='h-4 w-4 text-gray-300' />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className='flex gap-3 justify-start'
          >
            <div className='relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/30 shadow-md shadow-cyan-500/10'>
              <Image
                src={profileImageUrl}
                alt='Assistant'
                width={32}
                height={32}
                className='object-cover w-full h-full'
                unoptimized
              />
              <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none' />
            </div>
            <div className='rounded-lg border border-gray-800/60 bg-gray-950/90 px-4 py-3 shadow-lg backdrop-blur-sm'>
              <div className='flex items-center gap-2.5'>
                <Loader2 className='h-3.5 w-3.5 animate-spin text-cyan-400' />
                <span className='text-[13px] text-gray-300 font-medium tracking-tight'>Searching...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-800/60 bg-gradient-to-r from-gray-950 to-black p-5 backdrop-blur-sm'>
        <form onSubmit={handleSend} className='flex gap-3'>
          <Input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ask about papers, projects, or experiences...'
            disabled={isSearching}
            className='flex-1 border border-gray-800/60 bg-gray-900/90 text-white placeholder:text-gray-500 focus:border-gray-700/60 focus:ring-1 focus:ring-gray-700/20 focus:bg-gray-900 transition-all rounded-lg px-4 py-3 text-[13px] font-medium tracking-tight shadow-lg shadow-black/30'
          />
          <Button
            type='submit'
            disabled={isSearching || !input.trim()}
            className='rounded-lg border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-600/95 to-cyan-700/90 px-5 py-3 text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-500 hover:to-cyan-600 hover:shadow-cyan-500/40 hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-600/95 disabled:hover:to-cyan-700/90 transition-all font-medium'
          >
            {isSearching ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Send className='h-4 w-4' />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

