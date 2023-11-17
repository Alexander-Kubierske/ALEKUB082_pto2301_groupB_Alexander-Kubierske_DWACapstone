import { create } from 'zustand'
import { Podcast } from '../services/podcastInterfaces';

interface PodcastInfoStore {
    visible: boolean;
    currentPodcastId: Podcast['id'];
    toggleVisible: () => void;
    setId: (id: Podcast['id']) => void;
};

/**
 * The Zustand store that handles which podcast information is displayed in the podcast dialog and toggles the dialog
 *
 * @typedef {Object} PodcastInfoStore
 * @property {boolean} visible - A boolean indicating the visibility state.
 * @property {number} currentPodcastId - The ID associated with the podcast.
 * @property {function} toggleVisible - Toggles the visibility state for opening and closing the dialog.
 * @property {function} setId - Sets the ID of the podcast which is to be displayed.
 *
 * @param {(state: PodcastInfoStore) => void} set - Function to change the state
 * @returns {PodcastInfoStore} The associated information of the store.
 */
export const usePodcastInfoStore = create<PodcastInfoStore>((set)=>({
    visible: false,
    currentPodcastId: 0,
    toggleVisible:()=> set((state)=> ({visible: !state.visible})),
    setId: (currentPodcastId: Podcast['id']) => set({currentPodcastId})
})
);