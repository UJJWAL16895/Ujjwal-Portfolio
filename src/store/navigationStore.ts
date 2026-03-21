'use client';

import { create } from 'zustand';

interface NavigationStore {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeSection: 'hero',
  setActiveSection: (activeSection) => set({ activeSection }),
}));
