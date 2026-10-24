'use client';

import { useState } from 'react';
import { Loader2, Network } from 'lucide-react';

const skills = [
  'python',
  'typescript',
  'csharp',
  'java',
  'apex',
  'javascript',
  'sql',
  'soql',
  'html',
  'css',
  'bash',
  'rust',
  'cpp',
  'linux',
  'aws',
  'salesforce',
  'azure',
  'langgraph',
  'gcp',
  'jupyter',
  'supabase',
  'stripe',
  'huggingface',
  'ollama',
  'react',
  'dotnet',
  'flask',
  'tailwind',
  'angular',
  'aspnet',
  'nextjs',
  'nodejs',
  'vite',
  'fastapi',
  'oracle',
  'postgres',
  'mysql',
  'mongodb',
  'sqlite',
  'llms',
  'sklearn',
  'tensorflow',
  'pytorch',
  'cnns',
  'openai',
  'faiss',
  'clip',
  'docker',
  'github',
  'git',
  'rest',
  'graphql',
];

export default function CodonSkills({
  baseUrl = process.env.NEXT_PUBLIC_CODON_BASE_URL || 'https://codon-omega.vercel.app',
  height = 720,
}: {
  baseUrl?: string;
  height?: number;
}) {
  const title = 'Skill Ecosystem';
  const [loaded, setLoaded] = useState(false);
  const config = encodeURIComponent(JSON.stringify({ v: 1, skills, title }));

  return (
    <div className='relative overflow-hidden rounded-[18px] bg-[#0d1714]'>
      {!loaded && (
        <div
          role='status'
          className='absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#9ebba8]'
        >
          <Network aria-hidden='true' className='h-8 w-8 opacity-60' />
          <span className='inline-flex items-center gap-2 text-xs'>
            <Loader2
              aria-hidden='true'
              className='h-3.5 w-3.5 animate-spin motion-reduce:animate-none'
            />
            Loading skill graph…
          </span>
        </div>
      )}
      <iframe
        src={`${baseUrl.replace(/\/$/, '')}/graph.html#${config}`}
        title={title}
        width='100%'
        height={height}
        loading='lazy'
        referrerPolicy='no-referrer'
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 motion-reduce:transition-none ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          display: 'block',
          border: 0,
          borderRadius: 18,
          height: `min(${height}px, 80svh)`,
          minHeight: Math.min(height, 420),
        }}
      />
    </div>
  );
}
