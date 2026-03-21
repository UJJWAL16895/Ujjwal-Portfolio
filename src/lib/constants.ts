export const COLORS = {
  bgPrimary: '#0A0A0F',
  bgSecondary: '#12121A',
  bgTertiary: '#1A1A2E',
  accentCyan: '#00F0FF',
  accentPurple: '#8B5CF6',
  accentMagenta: '#FF006E',
  accentGreen: '#00FF88',
  accentOrange: '#FF8C00',
  textPrimary: '#EAEAEA',
  textSecondary: '#8888AA',
  textTertiary: '#555577',
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

export const TIMING = {
  entrance: { duration: 1, ease: 'power3.out' },
  hover: { duration: 0.3, ease: 'power2.out' },
  cursor: { dot: 0, ring: 0.15, ringEase: 'power2.out' },
  splitText: { stagger: 0.05, ease: 'power4.out' },
  magnetic: { attract: 0.3, return: 0.5, returnEase: 'elastic.out(1, 0.3)' },
  counter: { duration: 1.5, ease: 'power1.out' },
} as const;

export const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/UJJWAL16895/',
  linkedin: 'https://linkedin.com/in/ujjwalkumar16895',
  email: 'ujjwalkumar16895@gmail.com',
} as const;
