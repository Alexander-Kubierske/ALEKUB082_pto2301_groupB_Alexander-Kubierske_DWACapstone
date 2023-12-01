import { useState, useEffect } from "react";
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
import PodcastFetchRequests from "../services/podcastAPICalls";
import { PodcastShow, Episode, Season } from "../services/podcastInterfaces";
import { usePlayerStore, useUserStore } from "../store/1storeIndex";

interface EpisodeFromUser {
  title: string;
  date: string;
}

interface SeasonFromUser {
  title: string;
  episodes: EpisodeFromUser[];
}

interface FavoriteEpisodeAccordionsProps {
  season: SeasonFromUser;
  podcastShowId: PodcastShow["id"];
}

const FavoriteEpisodeAccordions: React.FC<FavoriteEpisodeAccordionsProps> = ({
  season,
  podcastShowId,
}) => {
  const { currentEpisode, isPlaying, playEpisode, pauseEpisode } =
    usePlayerStore();
  const { removeFavoriteEpisode } = useUserStore();
  // <=========== Media Control Logic ===========>
  const handlePlay = (episode: Episode) => {
    if (isPlaying) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  };

  // <=========== Remove from favorites ===========>

  const handleRemoveFavorite = (episodeItem: Episode) => {
    removeFavoriteEpisode(podcastShow!, season?.title, episodeItem?.title);
  };

  // <=========== Fetch the podcast ===========>
  const [podcastShow, setPodcastShow] = useState<PodcastShow | null>(null);
  const [episodesToRender, setEpisodesToRender] = useState<Episode[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PodcastFetchRequests.fetchPodcastShow(podcastShowId);
        setPodcastShow(data);

        // <=========== Get favEps as podcastShow object ===========>
        // <== Matching Season from the specific show data ==>
        const matchingSeason = data?.seasons?.find(
          (podcastShowSeason: Season) =>
            podcastShowSeason.title === season.title
        );

        // <== Extract names from favorites array ==>
        const userDataEpTitles = season.episodes.map(
          (episode) => episode.title
        );

        // <== Function to filter episodes and include the date from the userData ==>
        interface filterEpisodesWithTitleAndDateProps {
          episodes: Episode[];
          titles: string[];
          usersFavEps: EpisodeFromUser[];
        }
        const filterEpisodesWithTitleAndDate = ({
          episodes,
          titles,
          usersFavEps,
        }: filterEpisodesWithTitleAndDateProps) => {
          return episodes
            .filter((episode) => titles.includes(episode.title))
            .map((episode) => ({
              ...(episode as Episode), // Inline type assertion for the original episode
              date:
                usersFavEps.find((item) => item.title === episode.title)
                  ?.date || null,
            }));
        };

        // <== Extract episodes from the show data with title and date ==>
        const matchingEpisodesWithTitleAndDate = filterEpisodesWithTitleAndDate(
          {
            episodes: matchingSeason!.episodes,
            titles: userDataEpTitles,
            usersFavEps: season.episodes,
          }
        );

        setEpisodesToRender(matchingEpisodesWithTitleAndDate);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData();
  }, []);
  const reversedEpisodes = [...episodesToRender].reverse();

  return reversedEpisodes.map((episodeItem) => (
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
          <RecommendTwoToneIcon
            onClick={() => handleRemoveFavorite(episodeItem)}
          />
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
          <Typography>{`Favorited at: ${episodeItem.date}`}</Typography>
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));
};

export default FavoriteEpisodeAccordions;
