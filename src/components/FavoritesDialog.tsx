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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
  //   const resultCardMap = itemsToRender.map((podcast: Podcast) => {
  //     return (
  //       <div
  //         className="search--Result--Container"
  //         onClick={() => handleClick(podcast.id)}
  //       >
  //         <div>
  //           <img
  //             src={podcast.image}
  //             alt={podcast.title}
  //             className="search--Result--Img"
  //           />
  //         </div>
  //         <div className="search--Result--text">
  //           <Typography variant="h5" component="div">
  //             {podcast.title}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             {podcast.updated}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             {podcast.genres}
  //           </Typography>
  //         </div>
  //       </div>
  //     );
  //   });
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
        <DialogContent></DialogContent>
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
