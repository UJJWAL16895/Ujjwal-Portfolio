export interface Skill {
  name: string;
  icon?: string;
  proficiency?: number;
}

export interface SkillCategory {
  name: string;
  accent: string;
  skills: Skill[];
}
