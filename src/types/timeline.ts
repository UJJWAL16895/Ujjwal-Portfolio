export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  tech?: string[];
  accent: string;
  type: 'work' | 'education' | 'certification';
}
