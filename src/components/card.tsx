import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { usePodcastPreviewStore } from '../store/podcastPreviewStore';



export default function MediumCard() {


  console.log("data")

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="./src/images/garf.jpeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          add to watch later
        </Button>
      </CardActions>
    </Card>
  );
};

  // const { data, fetchData } = usePodcastPreviewStore();

  // useEffect(() => {
  //   fetchData();
  // }, []);