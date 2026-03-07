import { getResearchPaperBySlug, getProjectById } from '@/lib/content-registry';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Building2, ArrowLeft, FileText, Tag, Link2 } from 'lucide-react';
import { PDFViewer } from '@/components/research/pdf-viewer';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    return { title: 'Paper Not Found' };
  }

  return {
    title: `${paper.title} | Deven Shah`,
    description: paper.abstract?.substring(0, 160) || paper.title,
  };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  const relatedProject = paper.relatedProjectId ? getProjectById(paper.relatedProjectId) : null;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f0] flex flex-col">
      {/* Top nav - more padding, extra gap below */}
      <header className="shrink-0 border-b border-[#262626] bg-[#0d0d0d]/98 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-[1920px] px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/#education"
              className="inline-flex items-center gap-2 rounded-lg border border-[#262626] bg-[#1a1a1a] px-4 py-2.5 text-sm font-medium text-[#a3a3a3] transition-all hover:border-[#404040] hover:bg-[#262626] hover:text-[#f5f5f0]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#525252]">
              <FileText className="h-3.5 w-3.5" />
              Research Paper
            </span>
          </div>
        </div>
      </header>

      {/* Main content - generous top spacing, extends to bottom */}
      <div className="flex-1 flex flex-col min-h-0 pt-10 pb-0">
        <div className="mx-auto w-full max-w-[1920px] px-6 lg:px-12 flex flex-col lg:flex-row gap-8 lg:gap-10 flex-1 min-h-0">
          {/* Left side panel - paper info */}
          <aside className="shrink-0 lg:w-80 xl:w-96 flex flex-col gap-6 lg:border-r lg:border-[#262626] lg:pr-8">
            {/* Title - no container, clean typography */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded border border-[#262626] bg-[#1a1a1a] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#525252]">
                  Research
                </span>
              </div>
              <h1 className="text-xl font-semibold leading-snug text-[#f5f5f0] lg:text-2xl">
                {paper.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#737373]">
                {paper.institution && (
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#525252]" />
                    {paper.institution}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#525252]" />
                  {paper.date}
                </span>
              </div>
            </div>

            {/* Abstract */}
            {paper.abstract && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#525252]">
                  Abstract
                </h2>
                <p className="text-sm leading-relaxed text-[#a3a3a3]">
                  {paper.abstract}
                </p>
              </div>
            )}

            {/* Keywords */}
            {paper.keywords && paper.keywords.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#525252] flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" />
                  Keywords
                </h2>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-[#262626] bg-[#1a1a1a] px-2.5 py-1 text-xs text-[#a3a3a3]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related project */}
            {relatedProject && (
              <div className="space-y-3">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#525252] flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5" />
                  Related Project
                </h2>
                <Link
                  href={`/#project-${relatedProject.id}`}
                  className="block rounded-lg border border-[#262626] bg-[#1a1a1a] p-3 text-sm font-medium text-[#a3a3a3] transition-all hover:border-[#404040] hover:bg-[#262626] hover:text-[#f5f5f0]"
                >
                  {relatedProject.title}
                </Link>
              </div>
            )}
          </aside>

          {/* PDF viewer - extends to bottom of page */}
          <div className="flex-1 min-h-[500px] lg:h-[calc(100vh-6rem)] flex flex-col rounded-lg border border-[#262626] bg-[#1a1a1a] overflow-hidden shadow-2xl shadow-black/40">
            <PDFViewer pdfUrl={paper.pdfUrl} title={paper.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
