import { RESEARCH_PAPERS } from '@/lib/content-registry';
import { headers } from 'next/headers';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FileText, Calendar, Building2 } from 'lucide-react';
import { getMainSiteUrl } from '@/lib/url-utils';

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

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Refined Header */}
      <div className='border-b border-gray-800'>
        <div className='container mx-auto px-6 py-8 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-baseline gap-3 mb-3'>
                <h1 className='text-4xl font-bold tracking-tight'>Research</h1>
                <span className='text-lg font-mono text-cyan-400/80'>[PORTAL]</span>
              </div>
              <div className='flex items-center gap-4 text-xs font-mono text-gray-500'>
                <span>{RESEARCH_PAPERS.length} DOCUMENTS</span>
              </div>
            </div>
            <a
              href={getMainSiteUrl()}
              className='px-4 py-2 border border-gray-700 bg-black text-gray-300 font-medium text-xs hover:bg-gray-900 hover:text-white hover:border-gray-600 transition-all duration-200'
            >
              ← Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='container mx-auto px-6 py-12 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {RESEARCH_PAPERS.sort((a, b) => b.sortDate.localeCompare(a.sortDate)).map((paper, index) => (
            <Link
              key={paper.id}
              href={`/${paper.slug || paper.id}`}
              className='group block border border-gray-800 bg-gray-950 p-6 hover:border-gray-700 hover:bg-gray-900 transition-all duration-200'
            >
              {/* Paper Number */}
              <div className='flex items-center justify-between mb-4'>
                <span className='text-xs font-mono text-gray-500'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='text-xs font-mono text-cyan-400/70'>
                  {paper.sortDate}
                </span>
              </div>

              {/* Title */}
              <h2 className='text-lg font-bold mb-3 leading-snug group-hover:text-cyan-400 transition-colors'>
                {paper.title}
              </h2>

              {/* Metadata */}
              <div className='space-y-2 mb-4 text-xs text-gray-400'>
                {paper.institution && (
                  <div className='flex items-center gap-2'>
                    <Building2 className='h-3 w-3' />
                    <span>{paper.institution}</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <Calendar className='h-3 w-3' />
                  <span>{paper.date}</span>
                </div>
                {paper.status && (
                  <div className='inline-block border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 px-2 py-0.5 text-[10px] font-medium'>
                    {paper.status}
                  </div>
                )}
              </div>

              {/* Abstract Preview */}
              {paper.abstract && (
                <p className='text-xs leading-relaxed text-gray-400 line-clamp-3 mb-4'>
                  {paper.abstract}
                </p>
              )}

              {/* Keywords */}
              {paper.keywords && paper.keywords.length > 0 && (
                <div className='flex flex-wrap gap-1.5'>
                  {paper.keywords.slice(0, 3).map((keyword, i) => (
                    <span
                      key={i}
                      className='text-[10px] font-mono text-gray-500 border border-gray-800 px-1.5 py-0.5'
                    >
                      {keyword}
                    </span>
                  ))}
                  {paper.keywords.length > 3 && (
                    <span className='text-[10px] font-mono text-gray-600'>
                      +{paper.keywords.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Access Indicator */}
              <div className='mt-4 pt-4 border-t border-gray-800 flex items-center justify-between'>
                <span className='text-xs font-mono text-gray-500 uppercase'>View</span>
                <FileText className='h-3.5 w-3.5 text-gray-600 group-hover:text-cyan-400 transition-colors' />
              </div>
            </Link>
          ))}
        </div>

        {RESEARCH_PAPERS.length === 0 && (
          <div className='text-center py-24 border border-gray-800 p-12'>
            <FileText className='mx-auto h-12 w-12 mb-4 text-gray-700' />
            <p className='text-lg font-semibold mb-2'>No Documents Found</p>
            <p className='text-sm font-mono text-gray-600'>SYSTEM: STANDBY</p>
          </div>
        )}
      </div>

      {/* Footer Terminal Line */}
      <div className='border-t border-gray-800 mt-12'>
        <div className='container mx-auto px-6 py-4 max-w-7xl'>
          <div className='flex items-center gap-2 text-xs font-mono text-gray-600'>
            <span className='text-cyan-400/60'>$</span>
            <span>research.deven-shah.com</span>
            <span className='text-cyan-400/60 animate-pulse'>_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

