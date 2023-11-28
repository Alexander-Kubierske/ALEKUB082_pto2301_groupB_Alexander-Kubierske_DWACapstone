import { CardActionArea, Card, Skeleton, CardMedia } from "@mui/material";

import { Podcast } from "../services/podcastInterfaces";
import { usePodcastInfoStore } from "../store/1storeIndex";

interface MediumCardProps extends Podcast {
  loading: boolean;
}

export default function MediumCard({
  id,
  image,
  title,
  loading,
}: MediumCardProps) {
  const { toggleVisible, setId } = usePodcastInfoStore();

  const handleClick = () => {
    toggleVisible();
    setId(id);
  };

  return (
    <Card sx={{ minWidth: "8.75rem", maxWidth: "8.75rem" }} className={id}>
      <CardActionArea onClick={handleClick}>
        {loading ? (
          <Skeleton variant="rectangular" width={210} height={140} />
        ) : (
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={`${title} banner image`}
          />
        )}
      </CardActionArea>
    </Card>
  );
}
