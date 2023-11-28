import React from "react";
import {
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
import { Episode } from "../services/podcastInterfaces";

interface EpisodeAccordionProps {
  episode: Episode;
  currentEpisode: Episode | null;
  isPlaying: boolean;
  handlePlay: (episode: Episode) => void;
  handleRemoveFavorite: (episode: Episode) => void;
  handleAddFavorite: (episode: Episode) => void;
  favoriteEpisodes: string[]; // Assuming favoriteEpisodes contains episode titles
}

const EpisodeAccordion: React.FC<EpisodeAccordionProps> = ({
  episode,
  currentEpisode,
  isPlaying,
  handlePlay,
  handleRemoveFavorite,
  handleAddFavorite,
  favoriteEpisodes,
}) => {
  console.log(episode);
  return (
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
        <Typography>{episode.title}</Typography>
        <Button>
          {favoriteEpisodes.includes(episode.title) ? (
            <RecommendTwoToneIcon
              onClick={() => handleRemoveFavorite(episode)}
            />
          ) : (
            <RecommendIcon onClick={() => handleAddFavorite(episode)} />
          )}
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {episode.description ? <>{episode.description}</> : <br />}
          {!episode.description && "No description"}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default EpisodeAccordion;
