import { create } from 'zustand'

const usePageStore = create((set) => ({
  activePage: 'home',
  setActivePage: (page:string) => set({activePage: page}),
}));

export default usePageStore