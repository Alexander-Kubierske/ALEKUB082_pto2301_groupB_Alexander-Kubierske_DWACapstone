import { useState } from "react";
import { genres } from "../services/podcastAPICalls";
import Carousel from "../components/Carousel";
import PodcastDialog from "../components/PodcastDialog";

const HomePage = () => {
    // handle filtering of map
    // how many items
    // creating carousel 
    // rendering the items
    const genreArray = (Object.entries(genres) as [string, string][]).map(([genreId, genreName]) => ({
        genreId,
        genreName,
      }));

 
    const CarouselGenres = genreArray.map(({ genreId, genreName }) => (
        <Carousel key={genreId} genre={genreName} />
    ));


    return (
        <div>
            {CarouselGenres}
            <PodcastDialog/>
        </div>
    )
};

export default HomePage