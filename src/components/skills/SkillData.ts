import type { SkillCategory } from '@/types/skill';

export const skillCategories: SkillCategory[] = [
  {
    name: 'LANGUAGES',
    accent: 'var(--accent-cyan)',
    skills: [
      { name: 'C', proficiency: 85 },
      { name: 'C++', proficiency: 80 },
      { name: 'Java', proficiency: 75 },
      { name: 'Python', proficiency: 85 },
      { name: 'C#', proficiency: 90 },
      { name: 'JavaScript', proficiency: 80 },
    ],
  },
  {
    name: 'GAME DEVELOPMENT',
    accent: 'var(--accent-purple)',
    skills: [
      { name: 'Unity', proficiency: 90 },
      { name: 'Blender', proficiency: 70 },
      { name: 'Cinemachine', proficiency: 75 },
      { name: 'RoadArchitect', proficiency: 65 },
    ],
  },
  {
    name: 'ML & DATA',
    accent: 'var(--accent-magenta)',
    skills: [
      { name: 'Scikit-Learn', proficiency: 75 },
      { name: 'Pandas', proficiency: 80 },
      { name: 'NumPy', proficiency: 80 },
      { name: 'Hugging Face', proficiency: 70 },
      { name: 'NLTK', proficiency: 70 },
      { name: 'Spacy', proficiency: 65 },
      { name: 'XGBoost', proficiency: 65 },
    ],
  },
  {
    name: 'BACKEND',
    accent: 'var(--accent-green)',
    skills: [
      { name: 'Node.js', proficiency: 75 },
      { name: 'Express', proficiency: 75 },
      { name: 'FastAPI', proficiency: 70 },
      { name: 'REST APIs', proficiency: 80 },
    ],
  },
  {
    name: 'DATABASES',
    accent: 'var(--accent-orange)',
    skills: [
      { name: 'PostgreSQL', proficiency: 75 },
      { name: 'Firebase', proficiency: 80 },
      { name: 'Supabase', proficiency: 75 },
      { name: 'MongoDB', proficiency: 70 },
    ],
  },
  {
    name: 'TOOLS',
    accent: 'var(--accent-cyan)',
    skills: [
      { name: 'Git', proficiency: 85 },
      { name: 'Streamlit', proficiency: 70 },
      { name: 'Jupyter', proficiency: 75 },
      { name: 'VS Code', proficiency: 90 },
    ],
  },
];

export const keySkills = [
  { name: 'Unity', proficiency: 90 },
  { name: 'Python', proficiency: 85 },
  { name: 'C#', proficiency: 90 },
  { name: 'Node.js', proficiency: 75 },
  { name: 'ML/NLP', proficiency: 70 },
];
