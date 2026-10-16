'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const EMPTY_CLOCK = { currentTime: '', timeZoneAbbr: '', timeZoneFull: '' };
const ClockContext = createContext(EMPTY_CLOCK);

/** Persist the clock across name/clock transitions without updating navigation controls. */
export function HeaderClockProvider({ children }: { children: ReactNode }) {
  const [clock, setClock] = useState(EMPTY_CLOCK);
  useEffect(() => {
    const formatters = new Map<string, { time: Intl.DateTimeFormat; zone: Intl.DateTimeFormat }>();
    const updateClock = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let formatter = formatters.get(tz);
      if (!formatter) {
        formatter = {
          time: new Intl.DateTimeFormat([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: tz,
          }),
          zone: new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
            timeZone: tz,
          }),
        };
        formatters.set(tz, formatter);
      }
      const now = new Date();
      const time = formatter.time.format(now);
      const abbr = formatter.zone.format(now).split(' ').pop() || tz;
      setClock({ currentTime: time, timeZoneAbbr: abbr, timeZoneFull: tz });
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>;
}

export function HeaderClock() {
  const { currentTime, timeZoneAbbr, timeZoneFull } = useContext(ClockContext);

  return (
    <span
      className='inline-flex select-none items-center whitespace-nowrap py-1 text-sm font-medium tracking-wide text-[#f5f5f0] sm:px-3 sm:text-lg sm:tracking-widest'
      title={timeZoneFull}
    >
      <svg
        className='mr-2 h-5 w-5 text-[#a3a3a3]'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' fill='none' />
        <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2' />
      </svg>
      <span className='tabular-nums'>{currentTime}</span>
      <span className='ml-2 text-xs font-medium uppercase tracking-wider text-[#a3a3a3]'>
        {timeZoneAbbr}
      </span>
    </span>
  );
}
