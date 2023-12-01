import React from "react";
import {
  Tabs,
  Tab,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import RecommendTwoToneIcon from "@mui/icons-material/RecommendTwoTone";
import RecommendIcon from "@mui/icons-material/Recommend";

import { Episode, PodcastShow, Season } from "../services/podcastInterfaces";
import { usePlayerStore, useUserStore } from "../store/1storeIndex";
import { UserDataItemInterface } from "../store/userStore";

interface DialogTabsProps {
  podcastShow: PodcastShow | null;
}

const DialogTabs: React.FC<DialogTabsProps> = ({ podcastShow }) => {
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } =
    usePlayerStore();
  const { userData, addFavoriteEpisode, removeFavoriteEpisode } =
    useUserStore();

  const [seasonsTabValue, setSeasonsTabValue] = React.useState(1);

  const handleSeasonsTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSeasonsTabValue(newValue);
  };

  const handlePlay = (episode: Episode) => {
    if (isPlaying) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  };

  const handleRemoveFavorite = (
    podcastShow: PodcastShow,
    season: Season,
    episodeItem: Episode
  ) => {
    console.log(episodeItem);
    removeFavoriteEpisode(podcastShow, season?.title, episodeItem.title);
  };

  const handleAddFavorite = (
    podcastShow: PodcastShow,
    season: Season,
    episodeItem: Episode
  ) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "long" }); // Get month name
    const year = currentDate.getFullYear();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const dateEpFavorited = `${day} ${month} ${year} ${hour}:${minute}`;

    const newFavEpisodeObject = {
      title: episodeItem.title,
      dateAdded: dateEpFavorited,
    };
    addFavoriteEpisode(podcastShow, season.title, newFavEpisodeObject);
  };

  const renderEpisodeAccordions = (season: Season) => {
    const reversedEpisodes = [...season.episodes].reverse();

    interface EpisodeFromUser {
      title: string;
      date: string;
    }

    interface SeasonFromUser {
      title: string;
      episodes: EpisodeFromUser;
    }

    interface Fav {
      podcastShow: string;
      seasons: SeasonFromUser[];
    }

    const foundShow = (userData as any).find((show: UserDataItemInterface) =>
      show.favorite_eps?.some(
        (fav: Fav) => fav.podcastShow === podcastShow?.title
      )
    );

    const favoriteEpisodes =
      (foundShow?.favorite_eps || []) //userData
        .map((showCheck: Fav) => showCheck as Fav)
        .find((fav: Fav) => fav?.podcastShow === podcastShow?.title)
        ?.seasons?.find((seasonCheck: Fav) => seasonCheck)?.episodes || [];

    return reversedEpisodes.map((episodeItem) => {
      const isFavorite = (favoriteEpisodes as EpisodeFromUser[]).some(
        (favoriteEp: EpisodeFromUser) => favoriteEp.title === episodeItem.title
      );

      return (
        <Accordion key={episodeItem.episode}>
          <AccordionSummary
            expandIcon={
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(episodeItem);
                }}
              >
                {currentEpisode === episodeItem ? (
                  isPlaying ? (
                    <PauseCircleIcon />
                  ) : (
                    <PlayCircleIcon />
                  )
                ) : (
                  <PlayCircleIcon />
                )}
              </Button>
            }
          >
            <Typography>{`${episodeItem.title}`}</Typography>
            <Button>
              {isFavorite ? (
                <RecommendTwoToneIcon
                  onClick={() =>
                    handleRemoveFavorite(podcastShow!, season, episodeItem)
                  }
                />
              ) : (
                <RecommendIcon
                  onClick={() =>
                    handleAddFavorite(podcastShow!, season, episodeItem)
                  }
                />
              )}
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {episodeItem.description ? (
                <>{`Description: ${episodeItem.description}`}</>
              ) : (
                <br />
              )}
              {!episodeItem.description && "No description"}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  const renderSeasonTabs = () => {
    return podcastShow?.seasons.map((season) => (
      <Tab
        key={season.season}
        label={`Season ${season.season} (${season.episodes.length})`}
        onClick={(event) => handleSeasonsTabChange(event, season.season)}
        value={season.season}
      />
    ));
  };

  const renderTabPanels = () => {
    return podcastShow?.seasons.map((season) => (
      <Box
        key={season.season}
        role="tabpanel"
        hidden={seasonsTabValue !== season.season}
        id={`season-tabpanel-${season.season}`}
        aria-labelledby={`season-tab-${season.season}`}
      >
        <div
          style={{
            display: "flex",
            padding: "0.1rem",
            justifyContent: "center",
          }}
        >
          <img
            src={season.image}
            alt={`season image`}
            style={{ maxWidth: "40%" }}
          />
        </div>
        {seasonsTabValue === season.season && (
          <div>{renderEpisodeAccordions(season)}</div>
        )}
      </Box>
    ));
  };

  return (
    <div>
      <Tabs
        value={seasonsTabValue}
        onChange={handleSeasonsTabChange}
        aria-label="season-tabs"
      >
        {renderSeasonTabs()}
      </Tabs>
      {renderTabPanels()}
    </div>
  );
};

export default DialogTabs;
