import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          tertiary: '#1A1A2E',
        },
        accent: {
          cyan: '#00F0FF',
          purple: '#8B5CF6',
          magenta: '#FF006E',
          green: '#00FF88',
          orange: '#FF8C00',
        },
        text: {
          primary: '#EAEAEA',
          secondary: '#8888AA',
          tertiary: '#555577',
        },
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
