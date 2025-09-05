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
  type: string;
  link: string;
  status: string;
  gradient?: string;
  highlights?: string[];
  achievements?: string[];
  readMe?: boolean;
  categories?: string[];
};