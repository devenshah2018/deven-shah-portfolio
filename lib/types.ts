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
};

export type ResearchPaper = {
  id: string;
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
  relatedProjectId?: string; // Optional one-to-one connection to a project
};
