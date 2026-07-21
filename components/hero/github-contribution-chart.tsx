'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { LINKS } from '@/database/content-registry';
import 'react-activity-calendar/tooltips.css';

const GITHUB_USERNAME = LINKS.github.replace(/^https?:\/\/github\.com\/?/, '').replace(/\/$/, '') || 'devenshah2018';

const WARM_DARK_THEME = {
  light: ['rgba(64, 64, 64, 0.4)', '#525252', '#737373', '#a3a3a3', '#d4d4d4'],
  dark: ['rgba(64, 64, 64, 0.4)', '#525252', '#737373', '#a3a3a3', '#d4d4d4'],
};

interface GitHubContributionChartProps {
  compact?: boolean;
}

export function GitHubContributionChart({ compact = false }: GitHubContributionChartProps) {
  // The calendar fetches contribution data on the client, so its server and client markup
  // differ. Render it only after mount (with a same-height placeholder) to avoid a hydration
  // mismatch and the resulting flash on the About section.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full min-w-0">
      <div className={`github-calendar-wrapper rounded-lg ${compact ? 'p-2' : 'p-4'}`}>
        {mounted ? (
          <GitHubCalendar
            username={GITHUB_USERNAME}
            theme={WARM_DARK_THEME}
            colorScheme="dark"
            blockSize={compact ? 10 : 14}
            blockMargin={compact ? 2 : 3}
            fontSize={compact ? 11 : 14}
            showWeekdayLabels={false}
            showMonthLabels={false}
            labels={{
              totalCount: '{{count}} contributions in the last year',
              legend: { less: 'Less', more: 'More' },
            }}
          />
        ) : (
          <div
            className={`w-full animate-pulse rounded-md bg-[#1a1a1a]/40 ${compact ? 'min-h-[70px]' : 'min-h-[94px]'}`}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
