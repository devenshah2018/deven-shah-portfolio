import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeMermaid from 'rehype-mermaid';

type ReadMeMarkdownProps = {
  readMeContent: string;
};

const ReadMeMarkdown: React.FC<ReadMeMarkdownProps> = ({ readMeContent }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, rehypeMermaid]}
    components={{
      h1: ({ children }) => (
        <h1 className='mb-4 mt-8 text-4xl font-bold text-blue-300'>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className='mb-3 mt-6 text-3xl font-bold text-blue-200'>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className='mb-2 mt-4 text-2xl font-semibold text-blue-100'>{children}</h3>
      ),
      p: ({ children }) => (
        <p className='mb-4 text-lg leading-relaxed text-slate-100'>{children}</p>
      ),
      ul: ({ children }) => <ul className='mb-4 list-inside list-disc pl-6'>{children}</ul>,
      ol: ({ children }) => <ol className='mb-4 list-inside list-decimal pl-6'>{children}</ol>,
      li: ({ children }) => <li className='mb-2 text-base text-slate-200'>{children}</li>,
      a: ({ href, children }) => (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-400 underline hover:text-blue-300'
        >
          {children}
        </a>
      ),
      code({ inline, className, children, ...props }: any) {
        return !inline ? (
          <pre
            className={className + ' mb-6 overflow-x-auto rounded-xl bg-slate-900 p-5 text-base'}
            {...props}
          >
            <code>{children}</code>
          </pre>
        ) : (
          <code className={className + ' rounded bg-slate-800 px-2 py-1 text-blue-300'} {...props}>
            {children}
          </code>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className='mb-4 border-l-4 border-blue-400 pl-4 italic text-slate-300'>
          {children}
        </blockquote>
      ),
      table: ({ children }) => <table className='my-6 w-full border-collapse'>{children}</table>,
      th: ({ children }) => (
        <th className='border border-slate-800 bg-slate-900 px-4 py-2 font-semibold text-blue-300'>
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className='border border-slate-800 px-4 py-2 text-slate-200'>{children}</td>
      ),
    }}
  >
    {readMeContent}
  </ReactMarkdown>
);

export default ReadMeMarkdown;
