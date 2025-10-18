export type AccessPoint = {
  type: 'github' | 'vscode' | 'kaggle' | 'hosted' | 'web';
  url: string;
  label?: string; // Optional custom label, defaults to 'Code', 'Extension', 'Kaggle', 'Live', etc.
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
  entry_point: string; // Deprecated: kept for backward compatibility
  link: string; // Deprecated: kept for backward compatibility
  status: string;
  gradient?: string;
  highlights?: string[];
  achievements?: string[];
  readMe?: boolean;
  categories?: string[];
  accessible_at: ('github' | 'vscode' | 'kaggle' | 'hosted')[];
  access_points?: AccessPoint[]; // New: multiple access points with individual URLs
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
