export type AccessPoint = {
  type: 'github' | 'vscode' | 'kaggle' | 'hosted' | 'web';
  url: string;
  label?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  sortDate: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  allTechnologies?: string[];
  entry_point: string;
  link: string;
  status: string;
  gradient?: string;
  highlights?: string[];
  achievements?: string[];
  readMe?: boolean;
  categories?: string[];
  current_work?: boolean;
  summary?: string;
  accessible_at: ('github' | 'vscode' | 'kaggle' | 'hosted')[];
  access_points?: AccessPoint[];
  related_experiences?: string[];
  /** Path to a demo video (in /public). When set, the project row plays this instead of a screenshot. */
  demoVideo?: string;
};
