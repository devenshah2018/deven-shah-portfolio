import { RESEARCH_PAPERS } from '@/lib/content-registry';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { ResearchChatbot } from '@/components/chatbot/research-chatbot';
import { ResearchHero } from '@/components/research/research-hero';
import { ResearchPaperCard } from '@/components/research/research-paper-card';

export const metadata: Metadata = {
  title: 'Research Papers',
  description: 'Research papers and publications by Deven Shah',
};

export default async function ResearchIndexPage() {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (subdomain !== 'research') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-900 text-white'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Access Restricted</h1>
          <p className='text-slate-400'>This page is only accessible from the research subdomain.</p>
        </div>
      </div>
    );
  }

  const sortedPapers = RESEARCH_PAPERS.sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Hero Section with Split Layout */}
      <ResearchHero>
        <ResearchChatbot />
      </ResearchHero>

      {/* Papers Section */}
      <section className='border-b border-gray-800/50 bg-black'>
        <div className='container mx-auto px-6 lg:px-8 py-16 max-w-7xl'>
          <div className='mb-10 flex items-center gap-3'>
            <FileText className='h-6 w-6 text-cyan-400' />
            <h2 className='bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl'>
              Publications
            </h2>
          </div>

          {/* Papers Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedPapers.map((paper, index) => (
              <ResearchPaperCard key={paper.id} paper={paper} index={index} />
            ))}
          </div>

          {RESEARCH_PAPERS.length === 0 && (
            <div className='text-center py-24 border border-gray-800/60 bg-gray-950/40 p-12'>
              <FileText className='mx-auto h-12 w-12 mb-4 text-gray-700' />
              <p className='text-xl font-bold mb-2 text-white'>No Documents Found</p>
              <p className='text-sm font-mono text-gray-500'>SYSTEM: STANDBY</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800/60 bg-black'>
        <div className='container mx-auto px-6 lg:px-8 py-6 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 text-xs font-mono text-gray-500'>
              <span className='text-cyan-400/70'>$</span>
              <span>research.deven-shah.com</span>
              <span className='text-cyan-400/70 animate-pulse'>_</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
