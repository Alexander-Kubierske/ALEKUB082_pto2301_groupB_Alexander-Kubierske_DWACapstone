import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

import { Podcast } from "../services/podcastInterfaces";
import { usePodcastInfoStore } from "../store/1storeIndex";

export default function MediumCard(cardProps: Podcast) {
  const { id, image, title } = cardProps;
  const { toggleVisible, setId } = usePodcastInfoStore();

  const handleClick = () => {
    toggleVisible();
    setId(id);
    console.log(id);
  };

  return (
    <Card sx={{ minWidth: "8.75rem", maxWidth: "8.75rem" }} className={id}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={`${title} banner image`}
        />
      </CardActionArea>
    </Card>
  );
}
