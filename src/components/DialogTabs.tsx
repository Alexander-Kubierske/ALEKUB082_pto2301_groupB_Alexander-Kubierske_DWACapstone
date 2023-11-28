import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

import { Episode, PodcastShow, Season } from "../services/podcastInterfaces";
import { usePlayerStore, useUserStore } from "../store/1storeIndex";
import { EpisodeAccordion } from "./1componentIndex";

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

  const handleRemoveFavorite = (episodeItem) => {
    removeFavoriteEpisode(podcastShow, season.title, episodeItem.title);
  };

  const handleAddFavorite = (episodeItem) => {
    addFavoriteEpisode(podcastShow, season.title, episodeItem.title);
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
          <div>
            {EpisodeAccordion(
              season,
              isPlaying,
              handlePlay,
              handleRemoveFavorite,
              handleAddFavorite,
              addFavoriteEpisode
            )}
          </div>
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
