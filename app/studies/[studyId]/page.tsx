import { getStudyBySlug, getAllStudies } from '@/lib/study-registry';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { StudyContent } from '@/components/studies/study-content';

type Props = {
  params: Promise<{ studyId: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const studies = getAllStudies();
    return studies.map((study) => ({
      studyId: study.slug || study.id,
    }));
  } catch (error) {
    console.error('Error generating static params for studies:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { studyId } = await params;
  const study = getStudyBySlug(studyId);

  if (!study) {
    return {
      title: 'Study Not Found',
    };
  }

  return {
    title: study.title,
    description: study.excerpt,
  };
}

export default async function StudyPage({ params }: Props) {
  const { studyId } = await params;
  const study = getStudyBySlug(studyId);
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (!study) {
    console.error(`Study not found for slug/id: ${studyId}`);
    console.error(`Available studies:`, getAllStudies().map(s => ({ id: s.id, slug: s.slug })));
    notFound();
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50'>
      {/* Header Bar */}
      <div className='border-b border-slate-800/50 bg-slate-950'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <Link
              href={subdomain === 'research' ? '/research' : '/studies'}
              className='flex items-center gap-2 px-4 py-2 border border-slate-800/50 bg-slate-900/30 text-slate-300 font-medium text-sm hover:bg-slate-900/50 hover:text-white hover:border-slate-700/50 transition-all duration-200 rounded-lg'
            >
              <ArrowLeft className='h-4 w-4' />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Medium-style centered layout */}
      <article className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl'>
        {/* Title Section */}
        <header className='mb-12 space-y-6'>
          <h1 className='text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-white'>
            {study.title}
          </h1>

          {/* Metadata */}
          <div className='flex flex-wrap items-center gap-6 text-base text-slate-400'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-slate-500' />
              <span>{study.date}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-slate-500' />
              <span>{study.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {study.tags && study.tags.length > 0 && (
            <div className='flex flex-wrap gap-2 pt-2'>
              {study.tags.map((tag, i) => (
                <span
                  key={i}
                  className='inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-lg'
                >
                  <Tag className='h-3 w-3' />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className='mb-12 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />

        {/* Content */}
        <div className='prose prose-lg max-w-none'>
          <StudyContent content={study.content} />
        </div>

        {/* Footer Divider */}
        <div className='mt-16 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent' />

        {/* Back to Studies */}
        <div className='mt-12 text-center'>
          <Link
            href={subdomain === 'research' ? '/research' : '/studies'}
            className='inline-flex items-center gap-2 px-6 py-3 border border-slate-800/50 bg-slate-900/30 text-slate-300 font-medium text-sm hover:bg-slate-900/50 hover:text-white hover:border-slate-700/50 transition-all duration-200 rounded-lg'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Studies
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className='mt-16 border-t border-slate-800/50 bg-slate-950'>
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
