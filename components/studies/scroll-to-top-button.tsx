'use client';

import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className='inline-flex items-center gap-2 px-6 py-3 border border-slate-800/50 bg-slate-900/30 text-slate-300 font-medium text-sm hover:bg-slate-900/50 hover:text-white hover:border-slate-700/50 transition-all duration-200 rounded-lg'
    >
      <ArrowUp className='h-4 w-4' />
      Scroll to Top
    </button>
  );
}

