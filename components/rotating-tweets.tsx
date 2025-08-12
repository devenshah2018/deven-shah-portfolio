import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TWEETS = [
  {
    id: "1",
    text: `Wrote 1376 lines for our validation layer, but have yet to find an edge case that fails.\n\nScales log for time complexity too.\n\nIdk if it’s over-engineered or just thorough.`,
    date: "1:30 PM · Jan 25, 2025",
  },
  {
    id: "2",
    text: `Since almost all my code is eventually compiled through LLVM, I was curious to get a deeper understanding to how it works.\n\nThis article helped me a lot to understand the fundamentals of LLVM, I thought I’d share!\n\nhttps://aosabook.org/en/v1/llvm.html`,
    date: "6:41 PM · Nov 20, 2024",
  },
  {
    id: "3",
    text: `The original Rust compiler was written in OCaml before Rust.\n\nSolving OCaml’s garbage collection and single-thread problems with zero-cost abstraction and ownership model is just proof of its value.\n\nAs a founder, ask your self do you use your own product? If not, why?`,
    date: "8:44 AM · Nov 19, 2024",
  },
  {
    id: "4",
    text: `Building is stealth is like building a chatbot without context.\n\nYou have nothing to go off of and you’ll hallucinate.\n\nLet your users tell you what they want!\n\n#buildinpublic`,
    date: "7:59 AM · Nov 7, 2024",
  },
  {
    id: "5",
    text: `🚀 ARES is officially live!\n\nNow you can instantly assess OWASP and SOC2 compliance right from VSCode with just one click.\n\nAlso it's completely free to use, go crazy.`,
    date: "3:27 PM · Oct 12, 2024",
  },
  {
    id: "6",
    text: `Great event with @pangeacyber today about the risks of LLM transactions—LLM variability gives attackers more leverage.\n\nNew exploits emerge daily, so pen test your own app. You know it best 😉`,
    date: "3:16 AM · Sep 14, 2024",
  },
  {
    id: "7",
    text: `🚀Just ran my first iteration of Grover's algorithm on a 2-qubit simulated quantum circuit.\n\n@qiskit provided the Hadamard/Pauli-X gates and framework for a basic build.\n\nI couldn't determine the state vector due to CPU limits. Planning to reduce the dataset for a simpler search.`,
    date: "2:20 AM · Aug 30, 2024",
  },
  {
    id: "8",
    text: `I’ve been loving the recognition jQuery has been getting recently…\n\nIt is one of the few JS libraries that has nearly zero downsides. Way ahead of its time 🚀`,
    date: "9:41 PM · Aug 27, 2024",
  },
  {
    id: "9",
    text: `Cross-Site Scripting is a very common security flaw. @strivesai analyzes your code to ensure it has the proper CORS and other critical security policies to secure your data. Backed by GDPR, ISO, and OWASP, your code will be bulletproof 🔒🚀`,
    date: "1:01 PM · Jul 31, 2024",
  },
];

interface RotatingTweetsProps {
  className?: string;
}

export function RotatingTweets({ className }: RotatingTweetsProps) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % TWEETS.length);
    }, 10000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const handleDotClick = (i: number) => {
    setIndex(i);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto flex flex-col items-center gap-4",
        className,
      )}
      aria-label="Rotating Tweets"
    >
      <div className="relative w-full min-h-[220px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={TWEETS[index].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-auto min-h-[220px]"
            tabIndex={0}
            aria-label={`View tweet: ${TWEETS[index].text}`}
          >
            <div className="rounded-2xl border border-[#26282b] bg-[#18191b] shadow-xl overflow-hidden w-full h-auto min-h-[220px] flex flex-col">
              <div className="flex items-center gap-3 px-6 pt-5 pb-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#23272f] border border-[#26282b]">
                  <img
                    src="/x-profile.png"
                    alt="Deven Shah profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-white font-semibold leading-tight">
                    Deven Shah
                  </span>
                  <span className="text-[#8899a6] text-sm">@devenshah2018</span>
                </div>
                <span className="ml-auto text-[#8899a6] text-xs">
                  {TWEETS[index].date.replace(/\b(\w{3}) (\d{4})\b/, "Feb 4")}
                </span>
              </div>
              <div className="px-6 pb-5 text-lg text-white leading-snug text-left whitespace-pre-line">
                {TWEETS[index].text}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
