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

import { Episode, PodcastShow, Season } from "../services/podcastInterfaces";
import { usePlayerStore } from "../store/1storeIndex";

interface DialogTabsProps {
  podcastShow: PodcastShow | null;
}

const DialogTabs: React.FC<DialogTabsProps> = ({ podcastShow }) => {
  const [seasonsTabValue, setSeasonsTabValue] = React.useState(1);
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } =
    usePlayerStore();

  const handleSeasonsTabChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setSeasonsTabValue(newValue);
  };

  const handlePlay = (episode: Episode) => {
    console.log("handleplay fired \n\n");
    if (isPlaying) {
      pauseEpisode();
      console.log("pause fired \n\n", "should pause(false?)", isPlaying);
    } else {
      playEpisode(episode);
      console.log("play fired \n\n", "should play(true?)", isPlaying);
    }
    console.log("current episode: \n\n", currentEpisode);
  };

  const renderEpisodeAccordions = (season: Season) => {
    const reversedEpisodes = [...season.episodes].reverse();
    return reversedEpisodes.map((episode) => (
      <Accordion key={episode.episode}>
        <AccordionSummary
          expandIcon={
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handlePlay(episode);
              }}
            >
              {currentEpisode === episode ? (
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
          <Typography>{`${episode.title}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {episode.description ? (
              <>{`Description: ${episode.description}`}</>
            ) : (
              <br />
            )}
            {!episode.description && "No description"}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ));
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
