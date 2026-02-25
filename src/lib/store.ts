"use client";

import { create } from "zustand";

interface AppState {
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  searchOpen: boolean;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  rightPanelOpen: false,
  searchOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
}));
