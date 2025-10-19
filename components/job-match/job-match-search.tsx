'use client';

import { useState } from 'react';
import { Search, X, Zap, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { matchJobDescription } from '@/lib/job-matcher';
import { useJobMatch } from './job-match-context';
import { motion, AnimatePresence } from 'framer-motion';

export function JobMatchSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { setMatchResult, setIsMatchView } = useJobMatch();

  const handleSearch = () => {
    if (!input.trim()) return;

    setIsProcessing(true);

    // Simulate processing delay for better UX
    setTimeout(() => {
      const result = matchJobDescription(input);
      setMatchResult(result);
      setIsMatchView(true);
      setIsProcessing(false);
      setIsOpen(false);
      setInput('');

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="group relative overflow-hidden bg-transparent from-purple-500/20 to-pink-500/20 rounded-full border-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label="Open Job Match Modal"
      >
        <motion.span
          animate={{
            filter: [
              'drop-shadow(0 0 0px #a78bfa)',
              'drop-shadow(0 0 8px #a78bfa)',
              'drop-shadow(0 0 0px #a78bfa)'
            ]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="inline-flex"
        >
          <Zap className="h-8 w-8 text-purple-400 transition-transform duration-300 group-hover:rotate-12" />
        </motion.span>
      </Button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
              onClick={() => !isProcessing && setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/80">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <Zap className="h-5 w-5 text-purple-400" />
                      <h2 className="text-base font-semibold text-white">Match</h2>
                    </div>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white"
                      disabled={isProcessing}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Body */}
                  <div className="px-6 pb-6 pt-2">
                    <textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Paste job description or keywords..."
                      className="w-full h-44 resize-none rounded-2xl border-none bg-slate-900/80 px-4 py-3 text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isProcessing}
                      autoFocus
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-2 px-6 pb-5">
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                      disabled={isProcessing}
                      className="h-9 text-sm text-slate-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSearch}
                      disabled={!input.trim() || isProcessing}
                      size="sm"
                      className="h-9 bg-gradient-to-r from-purple-500 to-pink-500 px-4 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="mr-2"
                          >
                            <RotateCw className="h-4 w-4" />
                          </motion.div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
