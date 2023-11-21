import { create } from "zustand";

export interface ChipDataInterface {
  key: number;
  label: string;
}

interface SearchParamStore {
  checked: number[];
  chipData: ChipDataInterface[];
  setChecked: (newChecked: number[]) => void;
  setChipData: (newChipData: ChipDataInterface[]) => void;
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

  /**
   * Updates the `checked` state array.
   *
   * @function
   * @name setChecked
   * @memberof SearchParamStore
   * @param {number[]} newChecked - The new array to set as the checked state.
   * @returns {void}
   */
  setChecked: (newChecked) => set((state) => ({ checked: newChecked })),

  /**
   * Updates the `chipData` state array.
   *
   * @function
   * @name setChipData
   * @memberof SearchParamStore
   * @param {ChipDataInterface[]} newChipData - The new array to set as the chips to be rendered.
   * @returns {void}
   */
  setChipData: (newChipData) => set((state) => ({ chipData: newChipData })),
}));
