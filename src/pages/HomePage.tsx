import { genres } from "../services/podcastAPICalls";
import { Carousel, Navbar} from "../components/componentIndex";
import PodcastDialog from "../components/PodcastDialog";

const HomePage = () => {
    const genreArray = (Object.entries(genres) as [string, string][]).map(([genreId, genreName]) => ({
        genreId,
        genreName,
      }));

 
    const CarouselGenres = genreArray.map(({ genreId, genreName }) => (
        <Carousel key={genreId} genre={genreName} />
    ));


    return (
        <div>
            <Navbar/>
            {CarouselGenres}
            <PodcastDialog/>
        </div>
    )
};

export default HomePage