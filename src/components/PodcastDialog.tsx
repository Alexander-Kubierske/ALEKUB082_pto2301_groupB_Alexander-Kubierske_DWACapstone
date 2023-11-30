import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useMediaQuery,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  usePodcastInfoStore,
  usePodcastPreviewStore,
} from "../store/1storeIndex";
import DialogTabs from "./DialogTabs";
import PodcastFetchRequests from "../services/podcastAPICalls";
import { PodcastShow } from "../services/podcastInterfaces";

const PodcastDialog = () => {
  const [podcastShow, setPodcastShow] = useState<PodcastShow | null>(null);
  const { visible, currentPodcastId, toggleVisible, setId } =
    usePodcastInfoStore();
  const { data, loading: previewLoading } = usePodcastPreviewStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentPodcast = data.find(
    (podcast) => podcast.id === currentPodcastId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PodcastFetchRequests.fetchPodcastShow(
          currentPodcastId
        );
        setPodcastShow(data);
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    };

    fetchData();
  }, [currentPodcastId]);

  const handleClose = () => {
    setPodcastShow(null);
    toggleVisible();
    setId(0);
  };

  const dialogHeaderStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "20%", // 20% of the dialog height
    padding: "1rem",
    marginBottom: "8vh",
  };

  const imageStyles = {
    maxWidth: "40%", // Adjust the width as needed
    marginRight: "16px", // Add some margin between image and title
    borderRadius: "8px",
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={visible}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="dialog__header" style={dialogHeaderStyles}>
          {previewLoading ? (
            <Skeleton
              variant="rectangular"
              width={imageStyles.maxWidth}
              height={140}
              style={imageStyles}
              animation="wave"
              component="img"
            />
          ) : (
            <img
              className="dialog__img"
              src={currentPodcast?.image}
              alt="Podcast Logo"
              style={imageStyles}
            />
          )}

          <div className="podcast__title__info">
            {previewLoading ? (
              <>
                <Skeleton width={100} height={20} animation="wave" />
                <Skeleton width={80} height={16} animation="wave" />
                <Skeleton width={120} height={16} animation="wave" />
              </>
            ) : (
              <>
                <h1>{currentPodcast?.title}</h1>
                <p>Seasons: {currentPodcast?.seasons}</p>
                <p>Last Update: {currentPodcast?.updated}</p>
              </>
            )}
          </div>
        </div>

        <DialogContent style={{ overflowY: "scroll" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description"
              id="description"
            >
              <Typography>Description</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {previewLoading ? (
                <Skeleton width={300} height={20} animation="wave" />
              ) : (
                <Typography>{podcastShow?.description}</Typography>
              )}
            </AccordionDetails>
          </Accordion>

          {previewLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              animation="wave"
            />
          ) : (
            <DialogTabs podcastShow={podcastShow} />
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
