import React from 'react';
import { Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PodcastShow, Season, Episode } from '../services/podcastInterfaces';

interface DialogTabsProps {
  podcastShow: PodcastShow | null;
}

const DialogTabs: React.FC<DialogTabsProps> = ({ podcastShow }) => {
  const [descriptionTabValue, setDescriptionTabValue] = React.useState(0);
  const [seasonsTabValue, setSeasonsTabValue] = React.useState(0);

  const handleDescriptionTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setDescriptionTabValue(newValue);
  };

  const handleSeasonsTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSeasonsTabValue(newValue);
  };

  const renderSeasonAccordions = (season: Season) => {
    return season.episodes.map((episode) => (
      <Accordion key={episode.episode}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{`${episode.title}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {`Episode ${episode.episode}: ${episode.title}\nDescription: ${episode.description}`}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ));
  };

  const renderEpisodeTabs = () => {
    return podcastShow?.seasons.map((season) => (
      <Tab key={season.season} label={`Season ${season.season}`}>
        {renderSeasonAccordions(season)}
      </Tab>
    ));
  };

  return (
    <div>
      <Tabs value={descriptionTabValue} onChange={handleDescriptionTabChange} aria-label="description-tabs">
        <Tab label="Description" />
        <Tab label="Episodes" />
      </Tabs>
      <div role="tabpanel" hidden={descriptionTabValue !== 0}>
        {descriptionTabValue === 0 && <Typography>{podcastShow?.description}</Typography>}
      </div>
      <div role="tabpanel" hidden={descriptionTabValue !== 1}>
        {descriptionTabValue === 1 && (
          <div>
            <Tabs value={seasonsTabValue} onChange={handleSeasonsTabChange} aria-label="season-tabs">
              {renderEpisodeTabs()}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogTabs;
