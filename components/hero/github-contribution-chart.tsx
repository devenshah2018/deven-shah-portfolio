'use client';

import { GitHubCalendar } from 'react-github-calendar';
import { LINKS } from '@/lib/content-registry';
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
  return (
    <div className="w-full min-w-0">
      <div className={`github-calendar-wrapper rounded-lg ${compact ? 'p-2' : 'p-4'}`}>
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
      </div>
    </div>
  );
}
