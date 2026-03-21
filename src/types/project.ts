export interface Project {
  id: string;
  number: string;
  type: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tech: string[];
  highlights: string[];
  accent: string;
  image: string;
  video?: string;
  github?: string;
  live?: string;
  featured: boolean;
}
