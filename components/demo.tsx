'use client';

import { DEMO_REGISTRY } from '@/lib/demo-registry';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export default function DemoGallery() {
  return (
    <section id='demos' className='bg-gradient-to-b from-slate-900 to-slate-950 py-20 sm:py-28'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='mx-auto max-w-7xl'
      >
        <div className='mb-10 text-center'>
          <h2 className='mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
            Demo Gallery
          </h2>
          <div className='mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500' />
          <p className='mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-slate-400 sm:text-lg'>
            Explore high-fidelity demos of my platforms, products, and technical achievements.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {DEMO_REGISTRY.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map((demo, idx) => (
            <motion.div
              key={demo.path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true }}
              className='group'
            >
              <Card className='flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl transition-all duration-500 hover:border-blue-500/80 hover:shadow-blue-500/30'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      {demo.project && (
                        <Badge className='rounded-full border border-blue-700/40 bg-gradient-to-r from-blue-700/80 to-blue-400/60 px-2 py-1 text-xs font-semibold text-blue-100 shadow-sm'>
                          {demo.project}
                        </Badge>
                      )}
                      <span className='font-mono text-xs tracking-wide text-slate-400'>
                        {formatDate(demo.timestamp)}
                      </span>
                    </div>
                    {demo.public_url && (
                      <Button
                        asChild
                        variant='ghost'
                        size='icon'
                        className='ml-2 h-8 w-8 rounded-full text-blue-400 hover:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
                        aria-label='View public demo link'
                      >
                        <a href={demo.public_url} target='_blank' rel='noopener noreferrer'>
                          <ExternalLink className='h-5 w-5 drop-shadow-[0_1px_4px_rgba(59,130,246,0.25)]' />
                        </a>
                      </Button>
                    )}
                  </div>
                  <CardTitle className='mt-2 text-xl font-bold text-white drop-shadow-sm'>
                    {demo.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-1 flex-col pt-0'>
                  <div className='relative mb-4 aspect-video w-full overflow-hidden rounded-xl border border-slate-800/40 bg-black shadow-lg'>
                    <video
                      src={demo.path}
                      controls
                      className='h-full w-full rounded-xl object-cover transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
                      preload='metadata'
                    />
                    {demo.public_url && (
                      <a
                        href={demo.public_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute right-2 top-2 z-10 rounded-full bg-blue-900/80 p-1 text-blue-300 shadow-lg transition hover:bg-blue-800/90 focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900'
                        aria-label='Open demo tweet'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    )}
                  </div>
                  <div className='mt-auto flex items-center justify-between'>
                    <span className='font-mono text-xs text-slate-500'>
                      {demo.path.replace('/demos/', '')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
