import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Typography,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useUserStore, usePodcastPreviewStore } from "../store/1storeIndex";
import { FavoriteEpisodeAccordions } from "./1componentIndex";

interface EpisodeFromUser {
  title: string;
  date: string;
}

interface SeasonFromUser {
  title: string;
  episodes: EpisodeFromUser[];
}

interface FavoriteEpisodeShow {
  seasons: SeasonFromUser[];
  podcastShow: string;
}

// <=========== FavoritesDialog Function ===========>

const FavoritesDialog = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [sortingOption, setSortingOption] = useState("");

  // <=========== Dialog Logic ===========>

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // <=========== Filter Setting ===========>
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortingOption(event.target.value);
  };

  // <=========== Item Mapping ===========>

  const FavoriteCardComponent = (sortBy: any) => {
    const { userData } = useUserStore();
    const userDataArray = userData[0] as any; //<====== TS is too dumb to identify we have drilled down to the UserDataItemInterface item
    const { data } = usePodcastPreviewStore();
    const [cardsToRender, setCardsToRender] = useState(
      userDataArray?.favorite_eps
    );

    useEffect(() => {
      const currentSortingOption = sortBy.sortingOption;

      if (currentSortingOption === "Z-A") {
        const sortedFinalResultAscending = cardsToRender
          .slice()
          .sort((a: any, b: any) => b.podcastShow.localeCompare(a.podcastShow));

        setCardsToRender(sortedFinalResultAscending);
      } else if (currentSortingOption === "A-Z") {
        const sortedFinalResultDescending = cardsToRender
          .slice()
          .sort((a: any, b: any) => a.podcastShow.localeCompare(b.podcastShow));

        setCardsToRender(sortedFinalResultDescending);
      }
    }, [sortingOption]);

    const showMap = cardsToRender.map((show: FavoriteEpisodeShow) => {
      const matchingItem = data.find((item) => item.title === show.podcastShow);
      console.log("show", show);
      return (
        <div key={matchingItem!.id}>
          <Paper>
            <div style={{ display: "flex", padding: "2%" }}>
              <img
                src={matchingItem!.image}
                alt={`favorite podcast ${matchingItem!.title}`}
                style={{
                  maxWidth: "40%",
                  borderRadius: "8px",
                  paddingRight: "2%",
                }}
              />
              <Typography>{show.podcastShow}</Typography>
            </div>
            {show.seasons.map((season) => (
              <div>
                <Divider />
                <Typography sx={{ textAlign: "center" }}>
                  {season.title}
                </Typography>
                <Divider />
                <FavoriteEpisodeAccordions
                  season={season}
                  podcastShowId={matchingItem!.id}
                />
              </div>
            ))}
          </Paper>
        </div>
      );
    });
    return <div>{showMap}</div>;
  };
  // <=========== FavoritesDialog Return ===========>
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        View Favorite Episodes <ArrowForwardIosIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="My favorites">{"My favorites"}</DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="sorting"
              name="sorting"
              value={sortingOption}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="A-Z" control={<Radio />} label="A-Z" />
              <FormControlLabel value="Z-A" control={<Radio />} label="Z-A" />
            </RadioGroup>
          </FormControl>

          <Divider />

          <FavoriteCardComponent sortingOption={sortingOption} />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FavoritesDialog;
