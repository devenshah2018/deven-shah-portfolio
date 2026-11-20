import { ArrowUpRight, BookOpen, Mic2 } from 'lucide-react';
import { PUBLICATIONS } from '@/database/content-registry';

const conferences = [
  {
    title: 'Detecting Deepfakes for the Courtroom: A Multi-Modal Forensic Output Framework',
    venue: 'IDFC 2026',
    url: 'https://idfc-conference.org/idfc2026/',
  },
  {
    title: 'Cross-Modal Inconsistency for Synthetic Identity Detection',
    venue: 'BEST 2026',
    url: 'https://sites.google.com/view/best-society/best-conference-2026?pli=1&authuser=0',
  },
  {
    title: 'Multi-Layer Financial Trust Architecture',
    venue: 'BEST 2026',
    url: 'https://sites.google.com/view/best-society/best-conference-2026?pli=1&authuser=0',
  },
];

export function ResearchSection() {
  return (
    <section id='research' className='bg-[#141414] py-16 sm:py-24'>
      <div className='container mx-auto max-w-7xl px-6 sm:px-10 lg:px-16'>
        <p className='section-eyebrow'>03</p>
        <h2 className='section-title'>Research</h2>

        <div className='mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16'>
          <section aria-labelledby='publications-heading'>
            <h3 id='publications-heading' className='section-eyebrow flex items-center gap-2'>
              <BookOpen aria-hidden='true' className='h-4 w-4' />
              Publications
            </h3>
            {PUBLICATIONS.map(publication => (
              <article key={publication.id} className='border-t border-[#343b35] pt-6'>
                <p className='text-xs text-[#a5c9bd]'>
                  Co-author <span className='mx-2 text-[#555]'>/</span>{' '}
                  {publication.datePublished.slice(0, 4)}
                </p>
                <h4 className='mt-4 text-xl font-medium leading-8 tracking-tight text-[#edede6]'>
                  <a
                    href={publication.url}
                    className='group inline-flex items-start gap-4 hover:text-[#a5c9bd]'
                  >
                    <span>{publication.title}</span>
                    <ArrowUpRight aria-hidden='true' className='mt-2 h-5 w-5 shrink-0' />
                  </a>
                </h4>
                <p className='mt-5 text-sm leading-6 text-[#aaa]'>{publication.publisher}</p>
                <p className='mt-1 text-xs leading-6 text-[#888]'>{publication.venue}</p>
              </article>
            ))}
          </section>
          <section aria-labelledby='conferences-heading'>
            <h3 id='conferences-heading' className='section-eyebrow flex items-center gap-2'>
              <Mic2 aria-hidden='true' className='h-4 w-4' />
              Conferences
            </h3>
            <div className='divide-y divide-[#2c2c29] border-t border-[#343b35]'>
              {conferences.map(conference => (
                <article key={conference.title} className='py-6 first:pt-6'>
                  <a
                    href={conference.url}
                    className='inline-flex min-h-11 items-center gap-2 text-xs font-medium tracking-wide text-[#a5c9bd] hover:text-[#d6eee3]'
                  >
                    {conference.venue}
                    <ArrowUpRight aria-hidden='true' className='h-3.5 w-3.5' />
                  </a>
                  <h4 className='mt-2 text-base font-medium leading-7 text-[#d4d4cd]'>
                    {conference.title}
                  </h4>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
