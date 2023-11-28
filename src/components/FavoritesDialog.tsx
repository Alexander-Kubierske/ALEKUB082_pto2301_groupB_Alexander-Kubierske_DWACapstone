import * as React from "react";
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
import { useUserStore, usePodcastPreviewStore } from "../store/1storeIndex";

// <=========== FavoritesDialog Function ===========>

const FavoritesDialog = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //   const itemsToRender = props.props;

  // <=========== Dialog Logic ===========>

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // <=========== Item Mapping ===========>
  const FavoriteCard = () => {
    const { userData } = useUserStore();
    const { data } = usePodcastPreviewStore();
    console.log(data);
    const showMap = userData[0].favorite_eps.map((show) => {
      const matchingItem = data.find((item) => item.title === show.podcastShow);
      return (
        <Paper key={matchingItem.id}>
          <div style={{ display: "flex", padding: "2%" }}>
            <img
              src={matchingItem.image}
              alt={`favorite podcast ${matchingItem.title}`}
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
            </div>
          ))}
        </Paper>
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
          <FavoriteCard />
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
