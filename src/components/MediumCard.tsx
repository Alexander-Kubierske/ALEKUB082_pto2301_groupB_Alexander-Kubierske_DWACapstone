import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Podcast } from "../services/podcastInterfaces";

export default function MediumCard(cardProps: Podcast) {
  const { description, genres, id, image, seasons, title, updated } = cardProps;

  const handleClick = () => {
    console.log(title)
  }

  return (
    <Card sx={{ maxWidth: 140 }} className={id}>
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
};



    // actual
    // <Card sx={{ maxWidth: 140 }} className={cardProps.id}>
    //   <CardActionArea onClick={handleClick}>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={cardProps.image}
    //       alt={`${cardProps.title} banner image`}
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //         {cardProps.title}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       add to watch later
    //     </Button>
    //   </CardActions>
    // </Card>