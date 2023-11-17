import React, { useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { usePodcastInfoStore, usePodcastPreviewStore } from '../store/storeIndex';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const PodcastDialog = () => {
  const { visible, currentPodcastId, toggleVisible, setId } = usePodcastInfoStore();
  const { data } = usePodcastPreviewStore();
  const [value, setValue] = React.useState<number | null>(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const currentPodcast = data.find(podcast => podcast.id === currentPodcastId);
  console.log(currentPodcast)

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
        scroll='body'
      >
        <div className='dialog__header' style={dialogHeaderStyles}>
          <img className='dialog__img' src={currentPodcast?.image} alt="Podcast Logo" style={imageStyles} onClick={handlePlay}></img>
          <div className='podcast__title__info'>
            <h1>{currentPodcast?.title}</h1>
            <h3>Seasons: {currentPodcast?.seasons}</h3>
            <h3>Last Update: {currentPodcast?.updated}</h3>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                // please add a hook to save the rating to user profile
              }}
            />
          </div>
        </div>

        <DialogContent>
          <DialogContentText>
            {currentPodcast?.description}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
};

export default PodcastDialog;