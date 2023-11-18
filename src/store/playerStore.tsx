import { create } from 'zustand';
import { Episode } from '../services/podcastInterfaces';

interface PlayerStore {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  playEpisode: (episode: Episode) => void;
  pauseEpisode: () => void;
  setCurrentTime: (time: number) => void;
}

/**
 * The Zustand store that handles which podcast episode is currently being played
 *
 * @typedef {Object} PlayerStore - An object containing all the values of the current episode to be played.
 * @property {Episode | null} currentEpisode - holds either no episode or an object defined as Episode.
 * @property {boolean} isPlaying - The boolean holding whether an episode is playing or paused.
 * @property {number} currentTime - The current progress of the episode.
 * @property {function} playEpisode - Sets the isPlaying value to true.
 * @property {function} pauseEpisode - Sets the isPlaying value to False.
 * @property {function} setCurrentTime - Sets currentTime of the episode to a desired time.
 *
 * @param {(state: PodcastInfoStore) => void} set - Function to change the state
 * @returns {PodcastInfoStore} The associated information of the store.
 */
export const usePlayerStore = create<PlayerStore>((set) => ({
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
  playEpisode: (episode) => set({ currentEpisode: episode, isPlaying: true }),
  pauseEpisode: () => set({ isPlaying: false }),
  setCurrentTime: (time) => set({ currentTime: time }),
}));