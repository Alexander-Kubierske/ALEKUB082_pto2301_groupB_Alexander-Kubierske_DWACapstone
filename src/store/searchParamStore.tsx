import { create } from 'zustand';

interface ChipData {
  key: number;
  label: string;
}

interface SearchParamStore {
  checked: number[];
  chipData: ChipData[];
  setChecked: (newChecked: number[]) => void;
  setChipData: (newChipData: ChipData[]) => void;
}

/**
 * Manages the parameters user has input into the search.
 *
 * @typedef {Object} SearchParamStore
 * @property {number[]} checked - An array representing the checked state.
 * @property {ChipData} chipData - An array representing each chip to be rendered
 * @property {function} setChecked - A function to set which list items are checked.
 *  @param {number[]} newChecked - The new array to set as the checked state.
 * @property {function} setChecked - A function to set the chips in the state.
 *  @param {number[]} newChecked - The new array to set as the chips to be rendered.
 * 
 * @returns {UseSearchParamStore} The hook for using the store.
*/
export const useSearchParamStore = create<SearchParamStore>((set) => ({
  checked: [],
  chipData: [],
  setChecked: (newChecked) => set({ checked: newChecked }),
  setChipData: (newChipData) => set({ chipData: newChipData }),
}));