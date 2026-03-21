'use client';

import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  progress: number;
  setProgress: (progress: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: true,
  progress: 0,
  setProgress: (progress) => set({ progress }),
  setLoading: (isLoading) => set({ isLoading }),
}));
