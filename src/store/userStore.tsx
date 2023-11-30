import { create } from "zustand";
import { PodcastShow } from "../services/podcastInterfaces";

interface UserDataInterface {
  user_id: string; // UUID
  favorite_eps: null | [];
  subscribed: null | [];
  progress: null | [];
}

// {
//   favorite_eps: [
//     {
//       podcastShow: "This Podcast Will Kill You",
//       seasons: [
//         {
//           title: "Season 1",
//           episodes: ['Ep 4 The Poop Show', 'Ep 5 Plague Part 1: The GMOAT']
//           episodes: [ {title:'Ep 4 The Poop Show', date:"30 november 2023 17:00" }]
//         }
//       ]
//     }
//   ],
//   user_id: "e8336c38-2618-4b51-927a-319ea3f6068a",
//   progress: null,
//   subscribed: null
// };

interface UserStore {
  user: null | "check" | string;
  userData: "" | UserDataInterface[];
  prevUserData: "" | UserDataInterface[];
  setUser: (newUser: string) => void;
  setUserData: (newUserData: UserDataInterface[]) => void;
  addFavoriteEpisode: (
    podcastShow: PodcastShow,
    seasonTitle: string,
    newEpisode: {}
  ) => void;
  removeFavoriteEpisode: (
    podcastShow: PodcastShow,
    seasonTitle: string,
    episodeId: string
  ) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: "",
  userData: "",
  prevUserData: "",
  setUser: (newUser) => set({ user: newUser }),
  setUserData: (newUserData) =>
    set((state) => ({
      prevUserData: state.userData,
      userData: newUserData,
    })),

  addFavoriteEpisode: (podcastShow, seasonTitle, newEpisode) =>
    set((state) => ({
      userData: state.userData.map((user) => {
        let updatedFavoriteEps = [...user.favorite_eps];

        // Check if the podcastShow already exists based on the title
        const existingShowIndex = updatedFavoriteEps.findIndex(
          (fav) => fav.podcastShow === podcastShow.title
        );

        if (existingShowIndex !== -1) {
          // Podcast show exists, update seasons and episodes
          const existingShow = updatedFavoriteEps[existingShowIndex];

          // Initialize updatedSeasons
          let updatedSeasons = existingShow.seasons.map((season) => {
            if (season.title === seasonTitle) {
              // Season exists, add the new episode
              return { ...season, episodes: [...season.episodes, newEpisode] };
            }
            return season;
          });

          // If the specified season doesn't exist, create a new season
          if (!existingShow.seasons.some((s) => s.title === seasonTitle)) {
            updatedSeasons.push({
              title: seasonTitle,
              episodes: [newEpisode],
            });
          }

          // Update the existing show with the updated seasons
          updatedFavoriteEps[existingShowIndex] = {
            ...existingShow,
            seasons: updatedSeasons,
          };
        } else {
          // Podcast show doesn't exist, create a new one
          updatedFavoriteEps.push({
            podcastShow: podcastShow.title,
            seasons: [
              {
                title: seasonTitle,
                episodes: [newEpisode],
              },
            ],
          });
        }

        return {
          ...user,
          favorite_eps: updatedFavoriteEps,
        };
      }),
    })),

  removeFavoriteEpisode: (podcastShow, seasonTitle, episodeToRemove) => {
    set((state) => ({
      userData: state.userData.map((user) => {
        let updatedFavoriteEps = [...user.favorite_eps];

        const existingShowIndex = updatedFavoriteEps.findIndex(
          (fav) => fav.podcastShow === podcastShow.title
        );

        if (existingShowIndex !== -1) {
          const existingShow = updatedFavoriteEps[existingShowIndex];

          const existingSeasonIndex = existingShow.seasons.findIndex(
            (season) => season.title === seasonTitle
          );

          if (existingSeasonIndex !== -1) {
            const existingSeason = existingShow.seasons[existingSeasonIndex];

            // Filter out the episode to be removed by comparing strings
            const updatedEpisodes = existingSeason.episodes.filter(
              (episode) => episode !== episodeToRemove
            );

            if (updatedEpisodes.length > 0) {
              existingShow.seasons[existingSeasonIndex] = {
                ...existingSeason,
                episodes: updatedEpisodes,
              };
            } else {
              existingShow.seasons.splice(existingSeasonIndex, 1);
            }

            if (existingShow.seasons.length > 0) {
              updatedFavoriteEps[existingShowIndex] = existingShow;
            } else {
              updatedFavoriteEps.splice(existingShowIndex, 1);
            }
          }
        }

        return {
          ...user,
          favorite_eps: updatedFavoriteEps,
        };
      }),
    }));
  },
}));
