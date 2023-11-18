import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { usePodcastInfoStore, usePodcastPreviewStore } from '../store/storeIndex';
import Typography from '@mui/material/Typography';
import DialogTabs from './DialogTabs';
import PodcastFetchRequests from '../services/podcastAPICalls';
import { PodcastShow } from '../services/podcastInterfaces';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PodcastDialog = () => {
  const [podcastShow, setPodcastShow] = useState<PodcastShow | null>(null);
  const { visible, currentPodcastId, toggleVisible, setId } = usePodcastInfoStore();
  const { data } = usePodcastPreviewStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const currentPodcast = data.find(podcast => podcast.id === currentPodcastId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PodcastFetchRequests.fetchPodcastShow(currentPodcastId);
        setPodcastShow(data);
      } catch (error) {
        console.error('Error fetching podcast data:', error);
      }
    };

    fetchData();
  }, [currentPodcastId]);

  const handleClose = () => {
    toggleVisible()
    setId(0)
  };

  const handlePlay = () => {
    console.log(`now playing `, currentPodcast?.title)
  }

  const dialogHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '20%', // 20% of the dialog height
    padding: '1rem',
  };

  const imageStyles = {
    maxWidth: '40%', // Adjust the width as needed
    marginRight: '16px', // Add some margin between image and title
    borderRadius: '8px',
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={visible}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
   
      >
        <div className='dialog__header' style={dialogHeaderStyles}>
          <img className='dialog__img' src={currentPodcast?.image} alt="Podcast Logo" style={imageStyles} onClick={handlePlay}></img>
          <div className='podcast__title__info'>
            <h1>{currentPodcast?.title}</h1>
            <h3>Seasons: {currentPodcast?.seasons}</h3>
            <h3>Last Update: {currentPodcast?.updated}</h3>
          </div>
        </div>

        <DialogContent style={{ overflowY: 'scroll' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description"
              id="description"
            >
              <Typography>Description</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
                {podcastShow?.description}
              </Typography>
            </AccordionDetails>
        </Accordion>
        {podcastShow ? (
            <DialogTabs podcastShow={podcastShow} />
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
};

export default PodcastDialog;