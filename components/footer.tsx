'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LINKS } from '@/lib/content-registry';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='border-t bg-muted/50'>
      <div className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between gap-6 md:flex-row'>
          <div className='text-center md:text-left'>
            <h3 className='mb-2 text-lg font-bold'>Deven Shah</h3>
            <p className='text-sm text-muted-foreground'>
              Co-founder & CTO at Suno Analytics | Graduate MSCS Student at Boston University
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' asChild>
              <a
                href={LINKS.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Linkedin className='h-4 w-4' />
              </a>
            </Button>
            <Button variant='ghost' size='icon' asChild>
              <a href={LINKS.github} target='_blank' rel='noopener noreferrer'>
                <Github className='h-4 w-4' />
              </a>
            </Button>
            <Button variant='ghost' size='icon' asChild>
              <a href={`mailto:${LINKS.email}`}>
                <Mail className='h-4 w-4' />
              </a>
            </Button>
            <Separator orientation='vertical' className='h-6' />
            <Button variant='ghost' size='icon' onClick={scrollToTop}>
              <ArrowUp className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <Separator className='my-6' />

        <div className='flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row'>
          <p>© 2025 Deven Shah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
