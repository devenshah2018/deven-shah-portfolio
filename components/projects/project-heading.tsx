import type { Project } from '@/lib/types';

export function ProjectHeading({ project }: { project: Pick<Project, 'id' | 'title' | 'link'> }) {
  return (
    <h3 className='text-lg font-medium leading-snug tracking-tight text-[#f5f5f0] sm:text-xl'>
      <a
        href={project.link}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex min-h-11 items-center hover:text-[#a5c9bd]'
      >
        {project.title}
      </a>
    </h3>
  );
}
