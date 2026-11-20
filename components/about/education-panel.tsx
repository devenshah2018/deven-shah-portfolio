import { EDUCATION } from '@/database/content-registry';
import { ChevronDown } from 'lucide-react';

export function EducationPanel() {
  return (
    <section
      aria-labelledby='about-education-title'
      className='mt-9 border-t border-[#2c2c29] pt-6'
    >
      <h3 id='about-education-title' className='section-eyebrow'>
        Education
      </h3>
      <div className='divide-y divide-[#2c2c29]'>
        {EDUCATION.map(education => (
          <article
            key={education.id}
            id={`education-${education.id}`}
            className='py-5 first:pt-1 last:pb-0'
          >
            <div className='flex items-start gap-3'>
              <img
                src={education.logo}
                alt=''
                className='mt-1 h-7 w-7 shrink-0 rounded object-contain'
              />
              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1'>
                  <h4 className='text-sm font-medium leading-6 text-[#edede6]'>
                    {education.institution}
                  </h4>
                  <span className='text-xs tabular-nums text-[#999]'>{education.period}</span>
                </div>
                <p className='mt-1 text-sm leading-6 text-[#aaa]'>{education.degree}</p>
                <details className='group mt-2'>
                  <summary className='flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 text-xs font-medium text-[#a5c9bd] [&::-webkit-details-marker]:hidden'>
                    Coursework <span className='text-[#888]'>({education.coursework.length})</span>
                    <ChevronDown
                      aria-hidden='true'
                      className='h-3.5 w-3.5 transition-transform group-open:rotate-180'
                    />
                  </summary>
                  <ul className='mt-2 grid gap-x-5 gap-y-2 pb-2 text-xs leading-6 text-[#aaa] sm:grid-cols-2'>
                    {education.coursework.map(course => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
