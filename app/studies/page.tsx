import { getAllStudies } from '@/lib/study-registry';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { StudyList } from '@/components/studies/study-list';
import Link from 'next/link';
import { getMainSiteUrl } from '@/lib/url-utils';

export const metadata: Metadata = {
  title: 'Studies',
  description: 'Research studies and insights by Deven Shah',
};

export default async function StudiesPage() {
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  // Allow access from both main site and research subdomain
  const studies = getAllStudies();
  const featuredStudy = studies.length > 0 ? studies[0] : undefined;

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50'>
      {/* Header */}
      <div className='border-b border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20'>
                <BookOpen className='h-5 w-5 text-cyan-400' />
              </div>
              <h1 className='text-2xl font-bold tracking-tight text-white'>
                Studies
              </h1>
            </div>
            <Link
              href={subdomain === 'research' ? '/research' : getMainSiteUrl()}
              className='group flex items-center gap-2 px-4 py-2 border border-slate-800/50 bg-slate-900/30 text-slate-300 text-sm font-medium hover:bg-slate-900/50 hover:text-white hover:border-slate-700/50 transition-all duration-200 rounded-lg'
            >
              <ArrowLeft className='h-4 w-4 text-slate-400 group-hover:text-slate-300 transition-colors' />
              <span className='tracking-tight'>
                {subdomain === 'research' ? 'Research' : 'Portfolio'}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className='border-b border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 max-w-7xl'>
          <div className='mb-16 space-y-3'>
            <h2 className='text-4xl lg:text-5xl font-bold tracking-tight text-white'>
              Research Studies
            </h2>
            <p className='text-lg text-slate-400 max-w-2xl'>
              Deep dives, insights, and analysis on AI, machine learning, and computational systems.
            </p>
          </div>

          <StudyList studies={studies} featuredStudy={featuredStudy} />
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-2.5 text-xs font-mono text-slate-500'>
              <span className='text-slate-600'>$</span>
              <span>{subdomain === 'research' ? 'research.deven-shah.com' : 'deven-shah.com'}</span>
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
