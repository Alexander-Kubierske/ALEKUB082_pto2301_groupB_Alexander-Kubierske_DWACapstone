import { Podcast, PodcastShow } from "./podcastInterfaces";

/**
 * Fetches a list of podcasts preview data and console logs the error then throws the error to be used
 * in the component that called the function.
 * @returns {Promise<Array<Podcast>>} - A Promise that resolves to the array of podcast data.
 * @throws {Error} - An error if the fetch request fails.
 */
const fetchPodcastPreview = async (): Promise<Podcast[]> => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error; 
    }
  };

  
/**
 * Fetches the data for a specific podcast identified by the ID passed to the function 
 * and console logs the error then throws the error to be used in the component that 
 * called the function.
 * @param {number} id - The ID of the podcast show to fetch.
 * @returns {Promise<PodcastShow>} A Promise that resolves to the podcast show data.
 * @throws {Error} An error if the fetch request fails.
 */
const fetchPodcastShow = async (id: number): Promise<PodcastShow> => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error; 
    }
  };

/**
 * Object containing functions for fetching podcast data.
 * @property {Function} fetchPodcastPreview - the function to fetch the preview data for podcasts
 * @property {Function} fetchPodcastShow - the function to fetch the data for a specific show by ID
 */
const PodcastFetchRequests = {
  fetchPodcastPreview,
  fetchPodcastShow
};

export default PodcastFetchRequests