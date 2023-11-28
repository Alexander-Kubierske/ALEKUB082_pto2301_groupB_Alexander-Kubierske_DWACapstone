import { create } from "zustand";
import { Podcast } from "../services/podcastInterfaces";

interface PodcastInfoStore {
  visible: boolean;
  loading: boolean;
  currentPodcastId: Podcast["id"] | 0;
  toggleVisible: () => void;
  setLoading: (loading: boolean) => void;
  setId: (id: Podcast["id"]) => void;
}

export const usePodcastInfoStore = create<PodcastInfoStore>((set) => ({
  visible: false,
  loading: false,
  currentPodcastId: 0,
  toggleVisible: () => set((state) => ({ visible: !state.visible })),
  setLoading: (loading) => set({ loading }),
  setId: (currentPodcastId: Podcast["id"]) => set({ currentPodcastId }),
}));
