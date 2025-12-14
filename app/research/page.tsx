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
    <div className='min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white'>
      {/* Hero Section with Split Layout */}
      <ResearchHero>
        <ResearchChatbot />
      </ResearchHero>

      {/* Papers Section */}
      <section className='border-b border-gray-800/30 bg-gradient-to-b from-black to-gray-950'>
        <div className='container mx-auto px-6 lg:px-8 py-20 max-w-7xl'>
          <div className='mb-12 flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-gray-900/50 border border-gray-800/40'>
              <FileText className='h-5 w-5 text-gray-500' />
            </div>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
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
            <div className='text-center py-24 border border-gray-800/40 bg-gray-950/30 backdrop-blur-sm rounded-lg p-12'>
              <FileText className='mx-auto h-12 w-12 mb-4 text-gray-700' />
              <p className='text-xl font-bold mb-2 text-white'>No Documents Found</p>
              <p className='text-sm font-mono text-gray-600'>SYSTEM: STANDBY</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-gray-800/30 bg-black'>
        <div className='container mx-auto px-6 lg:px-8 py-8 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2.5 text-xs font-mono text-gray-600'>
              <span className='text-gray-700'>$</span>
              <span>research.deven-shah.com</span>
              <span className='text-gray-700 animate-pulse'>_</span>
            </div>
            <div className='text-xs text-gray-700'>
              © {new Date().getFullYear()} Deven Shah
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
