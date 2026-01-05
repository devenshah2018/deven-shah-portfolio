'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { VideoPlayer } from './video-player';
import { MermaidDiagram } from './mermaid-diagram';

interface StudyContentProps {
  content: string;
}

/**
 * Medium-style markdown renderer for study content
 * Features clean typography, proper spacing, and aesthetic code blocks
 */
export function StudyContent({ content }: StudyContentProps) {
  return (
    <div className='study-content prose prose-invert prose-lg max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          // Headings
          h1: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return (
              <h1 id={id} className='mb-6 mt-12 text-4xl font-bold leading-tight text-white first:mt-0 scroll-mt-24'>
                {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return (
              <h2 id={id} className='mb-4 mt-10 text-3xl font-bold leading-tight text-white scroll-mt-24'>
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return (
              <h3 id={id} className='mb-3 mt-8 text-2xl font-semibold leading-snug text-white scroll-mt-24'>
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
            return (
              <h4 id={id} className='mb-2 mt-6 text-xl font-semibold text-slate-200 scroll-mt-24'>
                {children}
              </h4>
            );
          },

          // Paragraphs
          p: ({ children }) => (
            <p className='mb-6 text-lg leading-[1.75] text-slate-200'>
              {children}
            </p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className='mb-6 ml-6 list-disc space-y-3 text-slate-200'>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className='mb-6 ml-6 list-decimal space-y-3 text-slate-200'>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className='text-lg leading-relaxed text-slate-200'>{children}</li>
          ),

          // Links
          a: ({ href, children }) => {
            const isGitHubLink = href?.includes('github.com');
            return (
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className={
                  isGitHubLink
                    ? 'inline-flex items-center gap-1.5 px-2.5 py-1 mx-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:text-cyan-200 transition-all duration-200 no-underline'
                    : 'text-cyan-400 underline decoration-cyan-400/50 underline-offset-2 transition-colors hover:text-cyan-300 hover:decoration-cyan-300'
                }
              >
                {isGitHubLink && (
                  <svg
                    className='w-3.5 h-3.5'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {children}
              </a>
            );
          },

          // Code blocks
          code({ inline, className, children, ...props }: any) {
            const codeString = String(children).replace(/\n$/, '');
            const isMermaid = !inline && className === 'language-mermaid';
            
            if (isMermaid) {
              return <MermaidDiagram chart={codeString} />;
            }
            
            return !inline ? (
              <pre
                className='mb-6 overflow-x-auto rounded-xl border border-slate-800/50 bg-slate-900/50 p-5 text-base'
                {...props}
              >
                <code className='text-slate-100 font-mono'>{children}</code>
              </pre>
            ) : (
              <code
                className='rounded bg-slate-800/40 px-1.5 py-0.5 text-sm text-cyan-300 font-mono align-baseline before:content-none after:content-none'
                style={{ display: 'inline', whiteSpace: 'nowrap' }}
                {...props}
              >
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className='my-6 border-l-4 border-cyan-500/50 bg-slate-900/30 pl-6 italic text-slate-300'>
              {children}
            </blockquote>
          ),

          // Images
          img: ({ src, alt }) => (
            <div className='my-8'>
              <img
                src={src}
                alt={alt}
                className='w-full rounded-xl border border-slate-800/50'
              />
              {alt && (
                <p className='mt-3 text-center text-sm text-slate-500'>{alt}</p>
              )}
            </div>
          ),

          // Video player (using div with data attributes or className)
          div: ({ children, className, ...props }: any) => {
            const dataVideo = props['data-video'];
            const dataPoster = props['data-poster'];
            const dataTitle = props['data-title'];
            
            // Check for video player marker (data-video attribute or video-player class)
            if (dataVideo || className?.includes('video-player')) {
              const videoSrc = dataVideo || props['data-src'];
              const videoPoster = dataPoster || props['data-poster'];
              const videoTitle = dataTitle || props['data-title'];
              
              if (videoSrc) {
                return (
                  <div className='my-8'>
                    <VideoPlayer
                      src={videoSrc}
                      poster={videoPoster}
                      title={videoTitle}
                    />
                  </div>
                );
              }
            }
            
            // Render normal div with all props
            return <div className={className} {...props}>{children}</div>;
          },

          // Tables
          table: ({ children }) => (
            <div className='my-6 overflow-x-auto rounded-xl border border-slate-800/50'>
              <table className='w-full border-collapse'>{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className='border border-slate-800/50 bg-slate-900/50 px-4 py-3 text-left font-semibold text-slate-100'>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className='border border-slate-800/50 px-4 py-3 text-slate-200'>
              {children}
            </td>
          ),

          // Horizontal rule
          hr: () => (
            <hr className='my-8 border-0 border-t border-slate-800/50' />
          ),

          // Strong and emphasis
          strong: ({ children }) => (
            <strong className='font-semibold text-white'>{children}</strong>
          ),
          em: ({ children }) => (
            <em className='italic text-slate-200'>{children}</em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
