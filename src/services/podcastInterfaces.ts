export interface Podcast {
    id: number;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genreIds: number[];
    updated: string;
  }
  
  export interface PodcastShow {
    id: number;
    title: string;
    image: string;
    episodes: number[];
  }