import { create } from 'zustand';
import PodcastFetchRequests from '../services/podcastAPICalls.tsx'
import { Podcast } from '../services/podcastInterfaces.ts';

const { fetchPodcastPreview } = PodcastFetchRequests;

interface DataStoreState {
    /**
     * Array containing podcast preview data.
     * @type {Array} An array of objects representing podcast preview items.
     */
    data: Podcast[];
    /**
     * Asynchronous function to fetch podcast preview data from an API and update the store state.
     * @throws {Error} An error if the fetch request fails.
     */
    fetchData: () => Promise<void>;
  }

/**
 * Custom Zustand hook to store our podcast preview data
 * @returns {object} An object containing the data array and the fetchData function.
 */
export const usePodcastPreviewStore = create<DataStoreState>((set) => ({
    data: [],
    fetchData: async () => {
        try {
          const response = await fetchPodcastPreview();
          set({ data: response });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    },
  }));
