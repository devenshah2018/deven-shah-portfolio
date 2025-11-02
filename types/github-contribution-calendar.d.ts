declare module 'github-contribution-calendar' {
  import * as React from 'react';
  export interface GitHubCalendarProps {
    token?: string;
    username: string;
    year?: number;
    theme?: string;
    cellSize?: number | string;
    showLabels?: boolean;
    background?: string;
    labelColor?: string;
    showTotalContributions?: boolean;
    fontSize?: number | string;
    titleColor?: string;
  }
  export const GitHubCalendar: React.FC<GitHubCalendarProps>;
}
