import { genres } from "../services/podcastAPICalls";
import {
  CarouselComponent,
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

  const buttonRender = "home";

  const CarouselGenres = genreArray.map(({ genreId, genreName }) => (
    <div key={genreId}>
      <h3>{genreName}</h3>
      <CarouselComponent key={genreId} genre={genreName} />
    </div>
  ));

  return (
    <div>
      <Navbar buttonRender={buttonRender} />
      <div className="items-display">{CarouselGenres}</div>
      <PodcastDialog />
      <PlayerBar />
    </div>
  );
};

export default HomePage;
