import { motion } from "framer-motion";

const TIMELINE_ITEMS = [
  {
    year: "2018-2022",
    title: "B.S. Software Engineering",
    org: "San Jose State University",
    color: "amber-400",
    type: "education",
  },
  {
    year: "2021-2022",
    title: "Solutions Architect",
    org: "NetApp",
    color: "blue-400",
    type: "work",
  },
  {
    year: "Feb 2023",
    title: "Certified Cloud Practitioner",
    org: "Amazon Web Services",
    color: "amber-400",
    type: "cert",
  },
  {
    year: "2023-2024",
    title: "Application Developer",
    org: "Patelco",
    color: "blue-400",
    type: "work",
  },
  {
    year: "2024",
    title: "Co-Founder & CTO",
    org: "Suno Analytics",
    color: "emerald-400",
    type: "work",
    active: true,
  },
  {
    year: "2025",
    title: "M.S. Computer Science",
    org: "Boston University",
    color: "amber-400",
    type: "education",
    active: true,
  },
];

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h3 className="mb-10 text-2xl font-bold text-white text-center tracking-tight">Career Timeline</h3>
      {/* Timeline Container */}
      <div className="relative flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-16 sm:gap-0 pt-8 pb-4">
        {/* Timeline Line - perfectly centered with cards */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500/30 via-slate-500/40 to-indigo-500/30 sm:left-0 sm:top-1/2 sm:bottom-auto sm:h-1 sm:w-full sm:-translate-y-1/2 sm:translate-x-0 sm:bg-gradient-to-r z-0" />
        {TIMELINE_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
            viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center sm:w-1/6 group min-w-[180px] max-w-[220px] px-2"
          >
            {/* Active indicator above card, but does not affect card alignment */}
            <div className={item.active ? 'mb-2 flex items-center gap-1 min-h-[22px]' : 'mb-2 min-h-[22px]'}>
              {item.active && (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400">ACTIVE</span>
                </>
              )}
            </div>
            {/* Card */}
            <div className={`relative flex flex-col items-center rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-6 shadow-md transition-all duration-200 w-full min-h-[120px] max-h-[120px] h-[120px]`}> 
              <div className={`mb-1 text-xs font-semibold text-${item.color}`}>{item.year}</div>
              <div className="mb-1 text-sm font-bold leading-tight text-white text-center line-clamp-2 break-words">{item.title}</div>
              <div className="truncate text-xs text-slate-400 text-center">{item.org}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}