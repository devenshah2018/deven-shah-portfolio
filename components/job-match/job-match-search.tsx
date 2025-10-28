'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Zap, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { matchJobDescription } from '@/lib/job-matcher';
import { useJobMatch } from './job-match-context';
import { motion, AnimatePresence } from 'framer-motion';

export function JobMatchSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { setMatchResult, setIsMatchView } = useJobMatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const result = matchJobDescription(input);
      setMatchResult(result);
      setIsMatchView(true);
      setIsProcessing(false);
      setIsOpen(false);
      setInput('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  // Focus input when popover opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function handle(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  // Keyboard: Escape closes, Enter submits
  function handleInputKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        ref={buttonRef}
        onClick={() => setIsOpen((v) => !v)}
        variant="outline"
        className="group relative overflow-hidden bg-transparent from-purple-500/20 to-pink-500/20 rounded-full border-none focus-visible:ring-2 focus-visible:ring-purple-400"
        aria-label="Open Job Match Input"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="job-match-popover"
        type="button"
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

      {/* Popover Input */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            id="job-match-popover"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 min-w-[260px] w-80 -translate-x-1/2"
            style={{
              top: 'calc(100% + 8px)',
              pointerEvents: 'auto',
              left: '28.5%'
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Job Match Input"
            tabIndex={-1}
          >
            {/* Arrow */}
            <div className="absolute -top-2 -translate-x-1/2 h-4 w-4 z-10" style={{ left: '28.5%'}}>
              <div className="h-4 w-4 rotate-45 bg-slate-900 border-l border-t border-slate-700/60 shadow-lg" />
            </div>
            <div className="relative rounded-xl border border-slate-800 bg-slate-900 shadow-2xl px-4 py-4">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex flex-col gap-2"
              >
                <input
                  ref={inputRef}
                  id="job-match-input"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleInputKey}
                  placeholder="Paste job description or keywords..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-base text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  disabled={isProcessing}
                  aria-label="Job description or keywords"
                  autoFocus
                  tabIndex={0}
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    disabled={isProcessing}
                    className="h-8 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!input.trim() || isProcessing}
                    size="sm"
                    className="h-8 bg-gradient-to-r from-purple-500 to-pink-500 px-4 text-xs font-semibold text-white shadow-md hover:from-purple-600 hover:to-pink-600 focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="mr-2"
                      >
                        <RotateCw className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    {isProcessing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
