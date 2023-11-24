import { genres } from "../services/podcastAPICalls";
import {
  Carousel,
  Navbar,
  PodcastDialog,
  PlayerBar,
} from "../components/1componentIndex";

const HomePage = () => {
  const genreArray = (Object.entries(genres) as [string, string][]).map(
    ([genreId, genreName]) => ({
      genreId,
      genreName,
    })
  );

  const CarouselGenres = genreArray.map(({ genreId, genreName }) => (
    <Carousel key={genreId} genre={genreName} />
  ));

  return (
    <div>
      <Navbar />
      {CarouselGenres}
      <PodcastDialog />
      <PlayerBar />
    </div>
  );
};

export default HomePage;
