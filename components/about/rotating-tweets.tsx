import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  onPostTypeChange?: (type: 'tweet' | 'linkedin') => void;
}

export function RotatingTweets({ className, onPostTypeChange }: RotatingTweetsProps) {
  const [shuffledPosts, setShuffledPosts] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [fetchedPosts, setFetchedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setFetchedPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  // Rotate posts every 5 seconds
  useEffect(() => {
    if (fetchedPosts.length > 0) {
      setShuffledPosts(shuffleArray(fetchedPosts));
      setIndex(0);
    }
  }, [fetchedPosts]);

  // Rotate posts every 5 seconds
  useEffect(() => {
    if (shuffledPosts.length === 0) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % shuffledPosts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shuffledPosts]);

  // Notify parent of post type change
  useEffect(() => {
    if (onPostTypeChange && shuffledPosts.length) {
      onPostTypeChange(shuffledPosts[index]?.type || 'tweet');
    }
  }, [index, shuffledPosts, onPostTypeChange]);

  return (
    <div
      className={cn('mx-auto flex w-full max-w-xl flex-col items-center gap-4', className)}
      aria-label='Rotating Tweets'
    >
      <div className='relative min-h-[220px] w-full'>
        <AnimatePresence mode='wait' initial={false}>
          {shuffledPosts.length > 0 && shuffledPosts[index] && (
            <motion.div
              key={shuffledPosts[index].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0 h-auto min-h-[220px] w-full'
              tabIndex={0}
              aria-label={`View post: ${shuffledPosts[index].text}`}
            >
              <div className='flex h-auto min-h-[220px] w-full flex-col overflow-hidden rounded-2xl border border-[#26282b] bg-[#18191b] shadow-xl'>
                <div className='flex items-center gap-3 px-6 pb-2 pt-5'>
                  <span className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#26282b] bg-[#23272f]'>
                    {shuffledPosts[index].type === 'linkedin' ? (
                      <img
                        src='/linkedin-profile.jpeg'
                        alt='Deven Shah profile'
                        className='h-10 w-10 rounded-full object-cover'
                      />
                    ) : (
                      <img
                        src='/x-profile.png'
                        alt='Deven Shah profile'
                        className='h-10 w-10 rounded-full object-cover'
                      />
                    )}
                  </span>
                  <div className='flex flex-col items-start'>
                    <span className='font-semibold leading-tight text-white'>Deven Shah</span>
                    <span className='text-sm text-[#8899a6]'>
                      {shuffledPosts[index].type === 'linkedin'
                        ? '@deven-a-shah'
                        : '@devenshah2018'}
                    </span>
                  </div>
                  <span className='ml-auto text-xs text-[#8899a6]'>
                    {shuffledPosts[index].date}
                  </span>
                </div>
                <div className='whitespace-pre-line px-6 pb-5 text-left text-lg leading-snug text-white'>
                  {(() => {
                    const post = shuffledPosts[index];
                    let tags: string[] = [];
                    let hashtags: string[] = [];
                    if (post.type === 'linkedin') {
                      tags = post.tags || [];
                      hashtags = post.hashtags || [];
                    }
                    // Combine tags and hashtags for LinkedIn, else empty
                    const highlightList =
                      post.type === 'linkedin' ? [...(tags || []), ...(hashtags || [])] : [];
                    // Build regex to split on tags/hashtags/mentions/links
                    const splitRegex = new RegExp(
                      `(${[...highlightList.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), '@\\w+', '#\\w+', 'https?:\\/\\/\\S+'].filter(Boolean).join('|')})`,
                      'g'
                    );
                    // Remove 'hashtag' prefix from LinkedIn hashtags in the text before rendering
                    const cleanText =
                      post.type === 'linkedin' && post.hashtags && post.hashtags.length
                        ? post.text.replace(/hashtag(?=#\w+)/g, '')
                        : post.text;
                    return cleanText.split(splitRegex).map((part: string, i: number) => {
                      if (post.type === 'linkedin' && highlightList.includes(part)) {
                        // Style tags and hashtags differently
                        if ((hashtags || []).includes(part)) {
                          return (
                            <span key={i} className='font-semibold text-blue-400'>
                              {part}
                            </span>
                          );
                        }
                        if ((tags || []).includes(part)) {
                          return (
                            <span key={i} className='font-semibold text-emerald-400'>
                              {part}
                            </span>
                          );
                        }
                      }
                      if (part.match(/^@\w+$/)) {
                        return (
                          <span key={i} className='font-semibold text-blue-400'>
                            {part}
                          </span>
                        );
                      }
                      if (part.match(/^#\w+$/)) {
                        return (
                          <span key={i} className='text-blue-400'>
                            {part}
                          </span>
                        );
                      }
                      if (part.match(/^https?:\/\/\S+$/)) {
                        return (
                          <a
                            key={i}
                            href={part}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-400 underline'
                          >
                            {part}
                          </a>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    });
                  })()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
