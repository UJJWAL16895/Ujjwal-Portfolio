'use client';

import { create } from 'zustand';

export type CursorState =
  | 'DEFAULT'
  | 'HOVER_LINK'
  | 'HOVER_PROJECT'
  | 'HOVER_DISABLED'
  | 'TEXT_CURSOR'
  | 'HIDDEN';

interface CursorStore {
  cursorState: CursorState;
  isVisible: boolean;
  setCursorState: (state: CursorState) => void;
  setVisible: (visible: boolean) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  cursorState: 'DEFAULT',
  isVisible: true,
  setCursorState: (cursorState) => set({ cursorState }),
  setVisible: (isVisible) => set({ isVisible }),
}));
