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
  accessible_at: ('github' | 'vscode' | 'kaggle' | 'hosted')[];
  access_points?: AccessPoint[];
  related_experiences?: string[];
};

export type ResearchPaper = {
  id: string;
  slug?: string; // Custom URL slug (e.g., 'crypto-forecasting'). Falls back to id if not provided
  title: string;
  authors?: string[];
  institution?: string;
  conference?: string;
  journal?: string;
  date: string;
  sortDate: string;
  description?: string;
  pdfUrl: string;
  keywords: string[];
  abstract?: string;
  doi?: string;
  citations?: number;
  status?: 'Published' | 'Under Review' | 'Preprint' | 'In Progress';
  relatedProjectId?: string;
};

export type Study = {
  id: string;
  slug?: string; // Custom URL slug. Falls back to id if not provided
  title: string;
  excerpt: string;
  date: string;
  sortDate: string;
  tags: string[];
  readingTime: number; // in minutes
  content: string; // MDX content
};
