'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, FileText, Code, ExternalLink, User, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      content: 'Hello! I can help you find relevant research papers, projects, and experiences. What would you like to search for?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prevMessageCountRef = useRef<number>(1);

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

    setMessages((prev) => [...prev, userMessage]);
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
        botContent = `I found ${results.length} relevant ${results.length === 1 ? 'result' : 'results'} for your query:`;
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
    <div className='flex h-[calc(100vh-200px)] flex-col border border-gray-800/50 bg-black shadow-2xl'>
      {/* Chat Header */}
      <div className='border-b border-gray-800/50 bg-gradient-to-r from-gray-950 to-black px-6 py-4 backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div className='relative flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/30 shadow-lg shadow-cyan-500/10'>
            <Image
              src='/x-profile.png'
              alt='Deven AI Assistant'
              width={40}
              height={40}
              className='object-cover w-full h-full'
            />
          </div>
          <div>
            <h3 className='text-sm font-bold text-white tracking-tight'>Deven AI (Assistant)</h3>
            <p className='text-[10px] font-mono text-cyan-400/60 tracking-wider'>SYSTEM: ONLINE</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent'
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
                <div className='relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/20 shadow-sm mt-0.5'>
                  <Image
                    src='/x-profile.png'
                    alt='Deven AI Assistant'
                    width={36}
                    height={36}
                    className='object-cover w-full h-full'
                  />
                </div>
              )}
              <div
                className={`max-w-[78%] space-y-2 ${
                  message.type === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-sm ${
                    message.type === 'user'
                      ? 'bg-cyan-600/90 text-white border border-cyan-500/30'
                      : 'bg-gray-950/80 text-gray-200 border border-gray-800/50'
                  }`}
                >
                  <p className='text-sm leading-relaxed font-medium'>{message.content}</p>
                </div>

                {/* Results */}
                {message.results && message.results.length > 0 && (
                  <div className='space-y-1 mt-2'>
                    {message.results.map((result, index) => (
                      <motion.a
                        key={`${result.content_type}-${result.content_id}`}
                        href={result.url}
                        target={result.url.startsWith('http') ? '_blank' : undefined}
                        rel={result.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, x: -8, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: index * 0.03, duration: 0.2 }}
                        className='group flex items-center gap-2.5 border-l-2 border-gray-800/60 bg-gray-950/60 backdrop-blur-sm pl-2.5 pr-2.5 py-1.5 rounded-r-md hover:border-cyan-500/70 hover:bg-gray-900/60 hover:shadow-md hover:shadow-cyan-500/10 transition-all duration-200'
                      >
                        {/* Icon and Type */}
                        <div className='flex items-center gap-1.5 flex-shrink-0'>
                          {result.content_type === 'paper' ? (
                            <div className='p-1 rounded bg-cyan-500/10 border border-cyan-500/20'>
                              <FileText className='h-2.5 w-2.5 text-cyan-400/80' />
                            </div>
                          ) : result.content_type === 'experience' ? (
                            <div className='p-1 rounded bg-orange-500/10 border border-orange-500/20'>
                              <Briefcase className='h-2.5 w-2.5 text-orange-400/80' />
                            </div>
                          ) : (
                            <div className='p-1 rounded bg-purple-500/10 border border-purple-500/20'>
                              <Code className='h-2.5 w-2.5 text-purple-400/80' />
                            </div>
                          )}
                          <span className='text-[9px] font-mono uppercase tracking-wider text-gray-500 font-semibold'>
                            {result.content_type === 'paper' ? 'P' : result.content_type === 'experience' ? 'E' : 'PR'}
                          </span>
                        </div>
                        
                        {/* Title - Main Content */}
                        <div className='flex-1 min-w-0'>
                          <h4 className='text-xs font-semibold text-white leading-tight group-hover:text-cyan-400/90 transition-colors truncate'>
                            {result.title}
                          </h4>
                          {result.metadata && (result.metadata.date || result.metadata.institution || result.metadata.period || result.metadata.company) && (
                            <div className='flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5'>
                              {result.metadata.date && (
                                <span className='font-mono text-gray-600'>{result.metadata.date}</span>
                              )}
                              {result.metadata.institution && (
                                <>
                                  {result.metadata.date && <span className='text-gray-700'>•</span>}
                                  <span className='truncate max-w-[120px] text-gray-500'>{result.metadata.institution}</span>
                                </>
                              )}
                              {result.metadata.company && (
                                <>
                                  {(result.metadata.date || result.metadata.institution) && <span className='text-gray-700'>•</span>}
                                  <span className='truncate max-w-[120px] text-gray-500'>{result.metadata.company}</span>
                                </>
                              )}
                              {result.metadata.period && (
                                <>
                                  {(result.metadata.date || result.metadata.institution || result.metadata.company) && <span className='text-gray-700'>•</span>}
                                  <span className='truncate text-gray-500'>{result.metadata.period}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Similarity Score */}
                        <div className='flex items-center gap-1.5 flex-shrink-0'>
                          <span className='text-[10px] font-mono font-bold text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20'>
                            {formatSimilarity(result.similarity)}
                          </span>
                          <ExternalLink className='h-3 w-3 text-gray-500 group-hover:text-cyan-400/80 transition-colors' />
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}
              </div>
              {message.type === 'user' && (
                <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 shadow-sm mt-0.5'>
                  <User className='h-4 w-4 text-gray-300' />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className='flex gap-3 justify-start'
          >
            <div className='relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg overflow-hidden border border-cyan-500/20 shadow-sm'>
              <Image
                src='/x-profile.png'
                alt='Deven AI Assistant'
                width={36}
                height={36}
                className='object-cover w-full h-full'
              />
            </div>
            <div className='rounded-xl border border-gray-800/50 bg-gray-950/80 px-4 py-2.5 shadow-lg backdrop-blur-sm'>
              <div className='flex items-center gap-2.5'>
                <Loader2 className='h-4 w-4 animate-spin text-cyan-400' />
                <span className='text-sm text-gray-300 font-medium'>Searching...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-800/50 bg-gradient-to-r from-gray-950 to-black p-4 backdrop-blur-sm'>
        <form onSubmit={handleSend} className='flex gap-2.5'>
          <Input
            ref={inputRef}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ask about papers, projects, or experiences...'
            disabled={isSearching}
            className='flex-1 border-2 border-gray-700/60 bg-gray-900/80 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:bg-gray-900 transition-all rounded-lg px-4 py-3 text-sm font-medium shadow-lg shadow-black/20'
          />
          <Button
            type='submit'
            disabled={isSearching || !input.trim()}
            className='rounded-lg border-2 border-cyan-500/40 bg-gradient-to-br from-cyan-600/90 to-cyan-700/80 px-5 py-3 text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-500 hover:to-cyan-600 hover:shadow-cyan-500/40 hover:border-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-cyan-600/90 disabled:hover:to-cyan-700/80 transition-all font-medium'
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

