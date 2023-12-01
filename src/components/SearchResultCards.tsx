import { Podcast } from "../services/podcastInterfaces";
import Typography from "@mui/material/Typography";
import { usePodcastInfoStore } from "../store/podcastInfoStore";

interface Props {
  props: Podcast[];
}

const SearchResultCards = (props: Props) => {
  const { toggleVisible, setId } = usePodcastInfoStore();

  const itemsToRender = props.props;

  const handleClick = (id: Podcast["id"]) => {
    toggleVisible();
    setId(id);
  };

  console.log("result printer ============> \n\n", itemsToRender);
  const resultCardMap = itemsToRender.map((podcast: Podcast) => {
    return (
      <div
        className="search--Result--Container"
        onClick={() => handleClick(podcast.id)}
      >
        <div>
          <img
            src={podcast.image}
            alt={podcast.title}
            className="search--Result--Img"
          />
        </div>
        <div className="search--Result--text">
          <Typography variant="h5" component="div">
            {podcast.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {podcast.updated}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {podcast.genres}
          </Typography>
        </div>
      </div>
    );
  });
  return <div className="search--Results">{resultCardMap}</div>;
};

export default SearchResultCards;
