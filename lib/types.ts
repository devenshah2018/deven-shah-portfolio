export type AccessPoint = {
  type: 'github' | 'vscode' | 'kaggle' | 'hosted' | 'web';
  url: string;
  label?: string;
};

export type SlideVideo = {
  page: number;
  src: string;
  /** Original video position and size, as percentages of the slide. */
  bounds: { left: number; top: number; width: number; height: number };
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
  /** Optional local video offered through the project's Demo player. */
  demoVideo?: string;
  /** Curated local preview, so rendering never depends on a third-party preview API. */
  thumbnail?: { src: string; alt: string };
  /** Same-origin PDF path, offered in the document viewer with a download. */
  paper?: string;
  /** Browser-friendly PDF preview and optional original presentation download. */
  slideDeck?: { pdf: string; source?: string; videos?: SlideVideo[] };
};
