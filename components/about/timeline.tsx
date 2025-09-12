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
    year: "2023",
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
      <div className="relative flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4 pt-8 pb-4 px-2 sm:px-4">
        {/* Desktop Timeline Line - only spans between cards */}
        <div className="hidden sm:block absolute left-[10%] top-1/2 -translate-y-1/2 h-1 w-[80%] bg-gradient-to-r from-blue-500/30 via-slate-500/40 to-indigo-500/30 z-0" />
        {/* Mobile Timeline: left-side vertical line */}
        <div className="block sm:hidden absolute left-6 z-0 rounded-full"
          style={{
            top: `calc(${100 / (TIMELINE_ITEMS.length * 2)}% + 0.5rem)`,
            height: `calc(${100 - 100 / TIMELINE_ITEMS.length}% - 1rem)`,
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(100,116,139,0.5), rgba(99,102,241,0.4))'
          }}
        />
        {TIMELINE_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
            viewport={{ once: true }}
            className="relative z-10 w-full sm:flex-1 sm:max-w-[180px] group px-0 sm:px-1 flex flex-col items-stretch sm:items-center"
          >
            {/* Card: Mobile-specific sharp, compact, enterprise look */}
            <div className={`relative flex flex-row sm:flex-col items-center sm:items-center rounded-md sm:rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 sm:px-8 sm:py-4 shadow transition-all duration-200 w-full sm:w-full sm:h-auto gap-2 sm:gap-3`}> 
              <div className={`text-xs font-semibold text-${item.color} min-w-[48px] text-left sm:text-center`}>{item.year}</div>
              <div className="flex-1 sm:flex-none flex flex-col justify-center sm:items-center sm:space-y-2">
                <div className="text-xs sm:text-xs font-bold text-white text-left sm:text-center truncate sm:whitespace-nowrap">{item.title}</div>
                <div className="text-[10px] sm:text-xs text-slate-400 text-left sm:text-center truncate sm:whitespace-nowrap">{item.org}</div>
              </div>
              {/* Subtle active icon to the right of the card for mobile */}
              {item.active && (
                <span className="block sm:hidden ml-2 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse border border-emerald-300/60 shadow" title="Active" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}