import { RESEARCH_PAPERS } from '@/lib/content-registry';
import { getAllStudies } from '@/lib/study-registry';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import { ResearchChatbot } from '@/components/chatbot/research-chatbot';
import { ResearchHero } from '@/components/research/research-hero';
import { ResearchPaperCard } from '@/components/research/research-paper-card';
import { StudyList } from '@/components/studies/study-list';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research studies, papers, and publications by Deven Shah',
};

export default async function ResearchIndexPage() {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (subdomain !== 'research') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-950 text-white'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Access Restricted</h1>
          <p className='text-slate-400'>This page is only accessible from the research subdomain.</p>
        </div>
      </div>
    );
  }

  const sortedPapers = RESEARCH_PAPERS.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  const studies = getAllStudies();
  const featuredStudy = studies.length > 0 ? studies[0] : undefined;

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50'>
      {/* Hero Section with Split Layout */}
      <ResearchHero papers={sortedPapers} studies={studies}>
        <ResearchChatbot />
      </ResearchHero>

      {/* Main Content: Studies (Primary) and Papers (Sidebar) */}
      <section className='border-t border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
            {/* Main Content: Studies */}
            <div className='lg:col-span-8 space-y-12'>
              {/* Section Header */}
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20'>
                      <BookOpen className='h-5 w-5 text-cyan-400' />
                    </div>
                    <h2 className='text-3xl lg:text-4xl font-bold tracking-tight text-white'>
                      Studies
                    </h2>
                  </div>
                  <p className='text-base text-slate-400 ml-14'>
                    In-depth research and analysis
                  </p>
                </div>
                {studies.length > 0 && (
                  <Link
                    href='/studies'
                    className='hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors border border-slate-800 rounded-lg hover:border-slate-700'
                  >
                    View all
                    <ArrowRight className='h-4 w-4' />
                  </Link>
                )}
              </div>

              {/* Studies Content */}
              {studies.length > 0 ? (
                <StudyList studies={studies.slice(0, 6)} featuredStudy={featuredStudy} />
              ) : (
                <div className='text-center py-24 border border-slate-800/50 bg-slate-900/30 rounded-2xl p-12'>
                  <BookOpen className='mx-auto h-12 w-12 mb-4 text-slate-600' />
                  <p className='text-xl font-semibold mb-2 text-white'>No Studies Found</p>
                  <p className='text-sm font-mono text-slate-500'>SYSTEM: STANDBY</p>
                </div>
              )}
            </div>

            {/* Sidebar: Papers */}
            <div className='lg:col-span-4'>
              <div className='sticky top-8 space-y-6'>
                {/* Papers Header */}
                <div className='space-y-2'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/50'>
                      <FileText className='h-5 w-5 text-slate-400' />
                    </div>
                    <h3 className='text-xl font-semibold tracking-tight text-slate-200'>
                      Papers
                    </h3>
                  </div>
                  <p className='text-sm text-slate-500 ml-14'>
                    Academic publications
                  </p>
                </div>

                {/* Papers List */}
                {sortedPapers.length > 0 ? (
                  <div className='space-y-3'>
                    {sortedPapers.slice(0, 3).map((paper) => (
                      <Link
                        key={paper.id}
                        href={`/${paper.slug || paper.id}`}
                        className='group block p-4 border border-slate-800/50 bg-slate-900/30 rounded-xl transition-all duration-200 hover:border-slate-700/50 hover:bg-slate-900/50'
                      >
                        <div className='mb-3 flex items-center justify-between'>
                          <span className='text-xs font-mono text-slate-500'>
                            {paper.sortDate}
                          </span>
                          {paper.status && (
                            <span className='px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-800/50 rounded border border-slate-800/50'>
                              {paper.status}
                            </span>
                          )}
                        </div>
                        <h4 className='mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-cyan-400 line-clamp-2'>
                          {paper.title}
                        </h4>
                        {paper.institution && (
                          <p className='text-xs text-slate-400 mb-2'>
                            {paper.institution}
                          </p>
                        )}
                        {paper.abstract && (
                          <p className='text-xs leading-relaxed text-slate-500 line-clamp-2'>
                            {paper.abstract}
                          </p>
                        )}
                      </Link>
                    ))}
                    {sortedPapers.length > 3 && (
                      <Link
                        href='#papers'
                        className='block text-center px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors border border-slate-800/50 bg-slate-900/30 rounded-xl hover:border-slate-700/50 hover:bg-slate-900/50'
                      >
                        View all {sortedPapers.length} papers
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className='text-center py-12 border border-slate-800/50 bg-slate-900/30 rounded-xl p-6'>
                    <FileText className='mx-auto h-8 w-8 mb-2 text-slate-600' />
                    <p className='text-sm font-semibold mb-1 text-white'>No Papers</p>
                    <p className='text-xs font-mono text-slate-500'>STANDBY</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Papers Section */}
      {sortedPapers.length > 3 && (
        <section id='papers' className='border-t border-slate-800/50 bg-slate-950'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl'>
            <div className='mb-12 space-y-2'>
              <div className='flex items-center gap-3'>
                <div className='p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/50'>
                  <FileText className='h-5 w-5 text-slate-400' />
                </div>
                <h2 className='text-2xl lg:text-3xl font-semibold tracking-tight text-slate-200'>
                  All Papers
                </h2>
              </div>
              <p className='text-sm text-slate-500 ml-14'>
                Complete collection of academic publications
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {sortedPapers.map((paper, index) => (
                <ResearchPaperCard key={paper.id} paper={paper} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className='border-t border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2.5 text-xs font-mono text-slate-500'>
              <span className='text-slate-600'>$</span>
              <span>research.deven-shah.com</span>
              <span className='text-slate-600 animate-pulse'>_</span>
            </div>
            <div className='text-xs text-slate-600'>
              © {new Date().getFullYear()} Deven Shah
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
