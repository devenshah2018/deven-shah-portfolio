'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, RotateCw } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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
          <Zap className="h-8 w-8 text-purple-400 transition-transform duration-300" />
        </motion.span>
      </Button>

      {/* Popover Input */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            id="job-match-popover"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-3 w-[480px]"
            style={{
              top: 'calc(100% + 4px)',
              pointerEvents: 'auto',
              left: '18.5%',
              transform: 'translateX(-50%)'
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Job Match Analysis Input"
            tabIndex={-1}
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 z-10">
              <div className="h-4 w-4 rotate-45 bg-slate-900 border-l border-t border-slate-700/80 shadow-xl" />
            </div>
            
            {/* Main Content */}
            <div className="relative rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="border-b border-slate-800/50 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-600/20 ring-1 ring-purple-500/30">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">Job Match Analysis</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Paste a job description to find relevant experience</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="p-6 space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="job-match-input" className="block text-sm font-medium text-slate-300">
                    Job Description
                  </label>
                  <textarea
                    ref={inputRef as any}
                    id="job-match-input"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleInputKey}
                    placeholder="Paste the job description or key requirements here...&#10;&#10;Example:&#10;• 5+ years of experience with React and TypeScript&#10;• Strong knowledge of Python and machine learning&#10;• Experience with cloud platforms (AWS, Azure, GCP)"
                    rows={6}
                    className="w-full rounded-lg border border-slate-700/80 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none font-mono leading-relaxed"
                    disabled={isProcessing}
                    aria-label="Job description or requirements"
                    autoFocus
                    tabIndex={0}
                  />
                  <p className="text-xs text-slate-500">
                    {input.length > 0 ? `${input.length} characters` : 'Supports plain text, bullet points, and full job postings'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setInput('');
                    }}
                    variant="ghost"
                    size="sm"
                    disabled={isProcessing}
                    className="h-9 px-4 text-sm text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!input.trim() || isProcessing}
                    size="sm"
                    className="h-9 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 hover:from-purple-700 hover:to-indigo-700 focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                        <Zap className="mr-2 h-4 w-4" />
                        Analyze Match
                      </>
                    )}
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
