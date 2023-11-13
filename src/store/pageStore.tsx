import { create } from 'zustand'

/**
 * Custom Zustand hook to manage conditional page rendering.
 * @returns {object} An object containing the state and the setActivePage function.
 */
export const usePageStore = create((set) => ({
  /**
   * The currently active page.
   * @type {string} One of: 'home', 'search', 'profile', 'player'.
   */
  activePage: 'home',
  setActivePage: (page: 'home' | 'search' | 'profile' | 'player') => set({activePage: page}),
}));

