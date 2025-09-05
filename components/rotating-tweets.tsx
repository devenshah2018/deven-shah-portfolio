import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TWEETS } from '@/lib/content-registry';

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface RotatingTweetsProps {
  className?: string;
}

export function RotatingTweets({ className }: RotatingTweetsProps) {
  const [index, setIndex] = useState(0);
  const [shuffledTweets] = useState(() => shuffleArray(TWEETS));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex(prev => (prev + 1) % shuffledTweets.length);
    }, 10000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, shuffledTweets.length]);

  return (
    <div
      className={cn('mx-auto flex w-full max-w-xl flex-col items-center gap-4', className)}
      aria-label='Rotating Tweets'
    >
      <div className='relative min-h-[220px] w-full'>
        <AnimatePresence mode='wait' initial={false}>
          {shuffledTweets[index] && (
            <motion.div
              key={shuffledTweets[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0 h-auto min-h-[220px] w-full'
              tabIndex={0}
              aria-label={`View tweet: ${shuffledTweets[index].text}`}
            >
              <div className='flex h-auto min-h-[220px] w-full flex-col overflow-hidden rounded-2xl border border-[#26282b] bg-[#18191b] shadow-xl'>
                <div className='flex items-center gap-3 px-6 pb-2 pt-5'>
                  <span className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#26282b] bg-[#23272f]'>
                    <img
                      src='/x-profile.png'
                      alt='Deven Shah profile'
                      className='h-10 w-10 rounded-full object-cover'
                    />
                  </span>
                  <div className='flex flex-col items-start'>
                    <span className='font-semibold leading-tight text-white'>Deven Shah</span>
                    <span className='text-sm text-[#8899a6]'>@devenshah2018</span>
                  </div>
                  <span className='ml-auto text-xs text-[#8899a6]'>
                    {shuffledTweets[index].date.replace(/\b(\w{3}) (\d{4})\b/, 'Feb 4')}
                  </span>
                </div>
                <div className='whitespace-pre-line px-6 pb-5 text-left text-lg leading-snug text-white'>
                  {shuffledTweets[index].text.split(/(@\w+|#\w+|https?:\/\/\S+)/g).map((part: string, i: number) => {
                    if (part.match(/^@\w+$/)) {
                      return <span key={i} className='text-blue-400 font-semibold'>{part}</span>;
                    }
                    if (part.match(/^#\w+$/)) {
                      return <span key={i} className='text-blue-400'>{part}</span>;
                    }
                    if (part.match(/^https?:\/\/\S+$/)) {
                      return (
                        <a key={i} href={part} target='_blank' rel='noopener noreferrer' className='text-blue-400 underline'>
                          {part}
                        </a>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
