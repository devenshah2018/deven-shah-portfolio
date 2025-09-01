import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const TWEETS = [
  {
    id: '1',
    text: `Wrote 1376 lines for our validation layer, but have yet to find an edge case that fails.\n\nScales log for time complexity too.\n\nIdk if it’s over-engineered or just thorough.`,
    date: '1:30 PM · Jan 25, 2025',
  },
  {
    id: '2',
    text: `Since almost all my code is eventually compiled through LLVM, I was curious to get a deeper understanding to how it works.\n\nThis article helped me a lot to understand the fundamentals of LLVM, I thought I’d share!\n\nhttps://aosabook.org/en/v1/llvm.html`,
    date: '6:41 PM · Nov 20, 2024',
  },
  {
    id: '3',
    text: `The original Rust compiler was written in OCaml before Rust.\n\nSolving OCaml’s garbage collection and single-thread problems with zero-cost abstraction and ownership model is just proof of its value.\n\nAs a founder, ask your self do you use your own product? If not, why?`,
    date: '8:44 AM · Nov 19, 2024',
  },
  {
    id: '4',
    text: `Building is stealth is like building a chatbot without context.\n\nYou have nothing to go off of and you’ll hallucinate.\n\nLet your users tell you what they want!\n\n#buildinpublic`,
    date: '7:59 AM · Nov 7, 2024',
  },
  {
    id: '5',
    text: `🚀 ARES is officially live!\n\nNow you can instantly assess OWASP and SOC2 compliance right from VSCode with just one click.\n\nAlso it's completely free to use, go crazy.`,
    date: '3:27 PM · Oct 12, 2024',
  },
  {
    id: '6',
    text: `Great event with @pangeacyber today about the risks of LLM transactions—LLM variability gives attackers more leverage.\n\nNew exploits emerge daily, so pen test your own app. You know it best 😉`,
    date: '3:16 AM · Sep 14, 2024',
  },
  {
    id: '7',
    text: `🚀Just ran my first iteration of Grover's algorithm on a 2-qubit simulated quantum circuit.\n\n@qiskit provided the Hadamard/Pauli-X gates and framework for a basic build.\n\nI couldn't determine the state vector due to CPU limits. Planning to reduce the dataset for a simpler search.`,
    date: '2:20 AM · Aug 30, 2024',
  },
  {
    id: '8',
    text: `I’ve been loving the recognition jQuery has been getting recently…\n\nIt is one of the few JS libraries that has nearly zero downsides. Way ahead of its time 🚀`,
    date: '9:41 PM · Aug 27, 2024',
  },
  {
    id: '9',
    text: `Cross-Site Scripting is a very common security flaw. @strivesai analyzes your code to ensure it has the proper CORS and other critical security policies to secure your data. Backed by GDPR, ISO, and OWASP, your code will be bulletproof 🔒🚀`,
    date: '1:01 PM · Jul 31, 2024',
  },
  {
    id: '10',
    text: `Incredible past few months. 10xed (or at least caught up with y’all) in engineering scalable ML systems thru trial & collaboration. Excited to share more soon 🙌`,
    date: '12:24 AM · Aug 20, 2025',
  },
  {
    id: '11',
    text: `My first crack at creating a model distribution server using MLflow and MinIO. Next I want to expand the registry with a couple more models and increase observability across MLflow/MinIO.`,
    date: '05:36 PM · Aug 20, 2025',
  },
  {
    id: '12',
    text: `@Minio blessing us with local S3 is a gamechanger ⚡️`,
    date: '04:27 PM · Aug 21, 2025',
  },
  {
    id: '13',
    text: `I like to think of an agent as a car and MCP as a road. Agents can run on top of MCPs but they aren’t alternatives. MCPs are kinda like building blocks for agents`,
    date: '12:12 PM · Aug 23, 2025',
  },
  {
    id: '14',
    text: `Is the AI bubble finally bursting??

Vibe coding was never going to last and we often get mistaken that today's AI is still just a tool, not some AGI sorcery. 

The future = devs + AI. You can’t replace an engineer.`,
    date: '07:23 PM · Aug 29, 2025',
  },
];

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
