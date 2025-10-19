'use client';

import React, { createContext, useContext, useState } from 'react';
import { MatchResult } from '@/lib/job-matcher';

interface JobMatchContextType {
  matchResult: MatchResult | null;
  isMatchView: boolean;
  setMatchResult: (result: MatchResult | null) => void;
  setIsMatchView: (value: boolean) => void;
  clearMatch: () => void;
}

const JobMatchContext = createContext<JobMatchContextType | undefined>(undefined);

export function JobMatchProvider({ children }: { children: React.ReactNode }) {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isMatchView, setIsMatchView] = useState(false);

  const clearMatch = () => {
    setMatchResult(null);
    setIsMatchView(false);
  };

  return (
    <JobMatchContext.Provider
      value={{
        matchResult,
        isMatchView,
        setMatchResult,
        setIsMatchView,
        clearMatch,
      }}
    >
      {children}
    </JobMatchContext.Provider>
  );
}

export function useJobMatch() {
  const context = useContext(JobMatchContext);
  if (!context) {
    throw new Error('useJobMatch must be used within JobMatchProvider');
  }
  return context;
}
