/**
 * Posts registry — static source of truth for social posts (X / LinkedIn).
 *
 * Migrated off the Supabase `posts` table; this is now the single source of
 * truth. To add a post, append an entry below. Served by `app/api/posts/route.ts`.
 */

export type PostType = 'x' | 'linkedin';

export interface Post {
  id: number;
  type: PostType;
  text: string;
  date: string;
  tags: string[] | null;
  hashtags: string[] | null;
}

export const POSTS: Post[] = [
  {
    id: 1,
    type: 'x',
    text: 'Wrote 1376 lines for our validation layer, but have yet to find an edge case that fails.\n\nScales log for time complexity too.\n\nIdk if it’s over-engineered or just thorough.',
    date: '01:30 PM · Jan 25, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 2,
    type: 'x',
    text: 'Since almost all my code is eventually compiled through LLVM, I was curious to get a deeper understanding to how it works.\n\nThis article helped me a lot to understand the fundamentals of LLVM, I thought I’d share!\n\nhttps://aosabook.org/en/v1/llvm.html',
    date: '06:41 PM · Nov 20, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 3,
    type: 'x',
    text: 'The original Rust compiler was written in OCaml before Rust.\n\nSolving OCaml’s garbage collection and single-thread problems with zero-cost abstraction and ownership model is just proof of its value.\n\nAs a founder, ask your self do you use your own product? If not, why?',
    date: '08:44 AM · Nov 19, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 4,
    type: 'x',
    text: 'Building is stealth is like building a chatbot without context.\n\nYou have nothing to go off of and you’ll hallucinate.\n\nLet your users tell you what they want!\n\n#buildinpublic',
    date: '07:59 AM · Nov 07, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 5,
    type: 'x',
    text: "🚀 ARES is officially live!\n\nNow you can instantly assess OWASP and SOC2 compliance right from VSCode with just one click.\n\nAlso it's completely free to use, go crazy.",
    date: '03:27 PM · Oct 12, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 6,
    type: 'x',
    text: 'Great event with @pangeacyber today about the risks of LLM transactions—LLM variability gives attackers more leverage.\n\nNew exploits emerge daily, so pen test your own app. You know it best 😉',
    date: '03:16 AM · Sep 14, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 7,
    type: 'x',
    text: "🚀Just ran my first iteration of Grover's algorithm on a 2-qubit simulated quantum circuit.\n\n@qiskit provided the Hadamard/Pauli-X gates and framework for a basic build.\n\nI couldn't determine the state vector due to CPU limits. Planning to reduce the dataset for a simpler search.",
    date: '02:20 AM · Aug 30, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 8,
    type: 'x',
    text: 'I’ve been loving the recognition jQuery has been getting recently…\n\nIt is one of the few JS libraries that has nearly zero downsides. Way ahead of its time 🚀',
    date: '09:41 PM · Aug 27, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 9,
    type: 'x',
    text: 'Cross-Site Scripting is a very common security flaw. @strivesai analyzes your code to ensure it has the proper CORS and other critical security policies to secure your data. Backed by GDPR, ISO, and OWASP, your code will be bulletproof 🔒🚀',
    date: '01:01 PM · Jul 31, 2024',
    tags: null,
    hashtags: null,
  },
  {
    id: 10,
    type: 'x',
    text: 'Incredible past few months. 10xed (or at least caught up with y’all) in engineering scalable ML systems thru trial & collaboration. Excited to share more soon 🙌',
    date: '12:24 AM · Aug 20, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 11,
    type: 'x',
    text: 'My first crack at creating a model distribution server using MLflow and MinIO. Next I want to expand the registry with a couple more models and increase observability across MLflow/MinIO.',
    date: '05:36 PM · Aug 20, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 12,
    type: 'x',
    text: '@Minio blessing us with local S3 is a gamechanger ⚡️',
    date: '04:27 PM · Aug 21, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 13,
    type: 'x',
    text: 'I like to think of an agent as a car and MCP as a road. Agents can run on top of MCPs but they aren’t alternatives. MCPs are kinda like building blocks for agents',
    date: '12:12 PM · Aug 23, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 14,
    type: 'x',
    text: "Is the AI bubble finally bursting??\n\nVibe coding was never going to last and we often get mistaken that today's AI is still just a tool, not some AGI sorcery. \n\nThe future = devs + AI. You can’t replace an engineer.",
    date: '07:23 PM · Aug 29, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 15,
    type: 'linkedin',
    text: 'Thrilled to be among the selected students to participate in the Build Projects this semester! I’ll be working on a drone path planning system for high-quality image capture, applying robotics and software development concepts under the guidance of an industry expert.\n\nGrateful to The Build Fellowship by Open Avenues and Boston University for this opportunity. Can’t wait to get started!',
    date: '08:34 PM · Aug 31, 2025',
    tags: ['The Build Fellowship by Open Avenues', 'Boston University'],
    hashtags: null,
  },
  {
    id: 16,
    type: 'linkedin',
    text: "I’m happy to share that I am pursuing my Master's in Computer Science at Boston University! \n\nExcited to expand my knowledge at the intersection of AI and cybersecurity, take on challenging projects, and connect with brilliant minds. I look forward to meeting new peers and making the most of this next chapter in my academic and professional growth.",
    date: '07:40 PM · Aug 15, 2025',
    tags: ['Boston University'],
    hashtags: null,
  },
  {
    id: 17,
    type: 'linkedin',
    text: "Exciting news! I just finished my first day as an Associate Application Developer at Patelco. Can't wait to learn and grow with such a dynamic team. Here's to a bright future! hashtag#newjob hashtag#associateapplicationdeveloper hashtag#patelco",
    date: '08:52 PM · Apr 10, 2023',
    tags: null,
    hashtags: ['#newjob', '#associateapplicationdeveloper', '#patelco'],
  },
  {
    id: 18,
    type: 'linkedin',
    text: 'I’m happy to share that I’ve obtained a new certification: Amazon Web Services Cloud Practitioner from Amazon Web Services (AWS)!',
    date: '03:56 PM · Feb 15, 2023',
    tags: ['Amazon Web Services (AWS)'],
    hashtags: null,
  },
  {
    id: 19,
    type: 'x',
    text: 'Virtualized llms and drones have been the playlist this week 😌',
    date: '09:21 AM · Oct 18, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 20,
    type: 'x',
    text: 'Spent the past 8 weeks as a fellow to dive deeper into drone tech and photogrammetry. Completely new space for me and definitely learned a lot! \n\nCheck out what I was up to 👇\nhttps://github.com/devenshah2018/drone-trajectory-planner/blob/main/main.ipynb',
    date: '12:34 AM · Oct 29, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 21,
    type: 'x',
    text: "Amazon laid off 14000 people this week.\n\nMany start learning only when they need to. Just a friendly reminder as engineers, we are students for life.\n\nReading whitepapers, diving into the math when it's confusing, exploring unfamiliar domains. Stay curious before reality hits.",
    date: '12:31 PM · Nov 01, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 22,
    type: 'x',
    text: "We have all been seeing Wikipedia being actively ripped apart right in front of us. \n\nSay what you want but \n@Wikipedia\n never charged a dime. Can't say the same about some of these new AI-powered knowledge bases. Knowledge should be free and accessible by everyone.",
    date: '02:08 AM · Nov 06, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 23,
    type: 'x',
    text: "The AutoML curse: 50 features = 1.1 QUADRILLION possible feature subsets.\n\nBrute force? Impossible.\nRandom search? Inefficient.\n\nSolution: Quantum QAOA sampler that efficiently navigates exponential search spaces, finding best models 4 million times faster.\n\nI'm calling it METIS.",
    date: '10:35 AM · Dec 24, 2025',
    tags: null,
    hashtags: null,
  },
  {
    id: 24,
    type: 'x',
    text: 'METIS IS OUT NOW 🚀\n\nIt leverages QAOA to explore the AutoML search space 1000x faster than traditional methods.\n\nCheck it out here:\nhttps://research.deven-shah.com/studies/metis',
    date: '2:10 PM · Jan 06, 2026',
    tags: null,
    hashtags: null,
  },
];
