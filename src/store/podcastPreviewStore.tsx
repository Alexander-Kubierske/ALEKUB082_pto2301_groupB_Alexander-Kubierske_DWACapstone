import { create } from "zustand";
import PodcastFetchRequests from "../services/podcastAPICalls.tsx";
import { Podcast } from "../services/podcastInterfaces.ts";

const { fetchPodcastPreview } = PodcastFetchRequests;

interface DataStoreState {
  data: Podcast[];
  loading: boolean;
  fetchData: () => Promise<void>;
}

/**
 * Custom Zustand hook to store our podcast preview data
 * @returns {object} An object containing the data array and the fetchData function.
 */
export const usePodcastPreviewStore = create<DataStoreState>((set) => ({
  data: [],
  loading: false,
  fetchData: async () => {
    try {
      set({ loading: true });
      const response = await fetchPodcastPreview();
      set({ data: response });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
