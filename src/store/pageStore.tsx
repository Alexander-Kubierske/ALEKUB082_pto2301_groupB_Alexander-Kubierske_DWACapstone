import { create } from 'zustand'

interface PageStoreState {
  activePage: 'home' | 'search' | 'profile' | 'player';
  previousPage: 'home' | 'search' | 'profile' | 'player';
  setActivePage: (page: 'home' | 'search' | 'profile' | 'player') => void;
}

/**
 * Custom Zustand hook to manage conditional page rendering.
 * @returns {PageStoreState} Returns an object containing the activePage variable and a setActivePage function
 */
export const usePageStore = create<PageStoreState>((set) => ({
  /**
   * The currently active page.
   * @type {string} One of: 'home', 'search', 'profile', 'player'.
   */
  activePage: 'home',
  previousPage: 'home',
  setActivePage: (page) => set((state) => ({ activePage: page, previousPage: state.activePage })),
}));

