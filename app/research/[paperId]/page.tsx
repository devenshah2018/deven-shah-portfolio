import { getProjectById, getResearchPaperBySlug } from '@/lib/content-registry';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Building2, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { PDFViewer } from '@/components/research/pdf-viewer';
import { getMainSiteUrl } from '@/lib/url-utils';

type Props = {
  params: Promise<{ paperId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { paperId } = await params;
  const paper = getResearchPaperBySlug(paperId);

  if (!paper) {
    return {
      title: 'Paper Not Found',
    };
  }

  return {
    title: paper.title,
    description: paper.abstract?.substring(0, 160) || paper.title,
  };
}

export default async function ResearchPaperPage({ params }: Props) {
  const { paperId } = await params;
  const paper = getResearchPaperBySlug(paperId);
  const headersList = await headers();
  const subdomain = headersList.get('x-subdomain');

  if (!paper) {
    notFound();
  }

  // Only allow access from research subdomain
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

  const relatedProject = paper.relatedProjectId ? getProjectById(paper.relatedProjectId) : null;

  return (
    <div className='min-h-screen bg-black text-white'>
      {/* Refined Header Bar */}
      <div className='border-b border-gray-800'>
        <div className='container mx-auto px-6 py-4 max-w-7xl'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='flex items-center gap-2 px-3 py-1.5 border border-gray-800 bg-black text-gray-400 font-medium text-xs hover:bg-gray-900 hover:text-white hover:border-gray-700 transition-all duration-200'
            >
              <ArrowLeft className='h-3 w-3' />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-6 max-w-7xl'>
        {/* Title Section */}
        <div className='border border-gray-800 p-6 mb-6 bg-gray-950'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold mb-4 leading-tight'>{paper.title}</h1>
              <div className='flex flex-wrap items-center gap-3 text-xs text-gray-400'>
                {paper.institution && (
                  <span className='flex items-center gap-1.5'>
                    <Building2 className='h-3 w-3' />
                    {paper.institution}
                  </span>
                )}
                <span className='flex items-center gap-1.5'>
                  <Calendar className='h-3 w-3' />
                  {paper.date}
                </span>
                {paper.status && (
                  <span className='border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 px-2 py-0.5 text-[10px] font-medium'>
                    {paper.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]'>
          {/* Left Column - Metadata */}
          <div className='lg:col-span-4 space-y-4'>

                        {/* Keywords Block */}
                        {paper.keywords && paper.keywords.length > 0 && (
              <div className='border border-gray-800 p-4 bg-gray-950'>
                <h2 className='text-xs font-mono uppercase mb-4 text-gray-500 tracking-wider border-b border-gray-800 pb-2'>
                  KEYWORDS
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {paper.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className='text-xs font-mono text-gray-400 border border-gray-800 px-2 py-1'
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Project Block */}
            {relatedProject && (
              <div className='border border-cyan-400/30 p-4 bg-cyan-400/5'>
                <h2 className='text-xs font-mono uppercase mb-4 text-cyan-400/80 tracking-wider border-b border-cyan-400/20 pb-2 flex items-center gap-2'>
                  <LinkIcon className='h-3 w-3' />
                  RELATED PROJECT
                </h2>
                <a
                  href={`${getMainSiteUrl()}/#project-${relatedProject.id}`}
                  className='text-sm font-medium hover:underline text-cyan-400'
                >
                  {relatedProject.title}
                </a>
              </div>
            )}

            {/* Abstract Block */}
            {paper.abstract && (
              <div className='border border-gray-800 p-4 bg-gray-950 max-h-[400px] overflow-y-auto'>
                <h2 className='text-xs font-mono uppercase mb-4 text-gray-500 tracking-wider border-b border-gray-800 pb-2'>
                  ABSTRACT
                </h2>
                <p className='text-sm leading-relaxed text-gray-300'>{paper.abstract}</p>
              </div>
            )}


          </div>

          {/* Right Column - PDF Viewer */}
          <div className='lg:col-span-8'>
            <div className='border border-gray-800 h-full'>
              <PDFViewer pdfUrl={paper.pdfUrl} title={paper.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

