import { MediumCard } from "./1componentIndex";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import styled from "styled-components";
import { usePodcastPreviewStore } from "../store/1storeIndex";

interface CarouselProps {
  key: string;
  genre: string;
}

const CarouselContainer = styled.div`
  background: #d3d3d3;
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc(var(--img-gap) * 2 + var(--handle-size));
  align-items: center;
`;

const ProgressBar = styled.div`
  /* Add styling for the progress bar */
`;

const MoreLink = styled.a`
  /* Add styling for the "More" link */
`;

const HandleButton = styled.button`
  /* Add styling for the handle buttons (left and right) */
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const ItemContainer = styled.div`
  --items-per-screen: 4;
  --slider-index: 0;
  display: flex;
  flex-grow: 1;
  margin: 0 var(--img-gap);
  transform: translateX(calc(var(--slider-index) * -100%));
  transition: transform 250ms ease-in-out;
`;

const Carousel = (props: CarouselProps) => {
  const { data } = usePodcastPreviewStore();
  const { genre } = props;
  const genreFilter = data.filter((podcast) => podcast.genres.includes(genre));

  const CardSelection = genreFilter.slice(0, 10).map((item) => {
    return <MediumCard key={item.id} {...item} />;
  });

  return (
    <CarouselContainer>
      <CarouselHeader>
        <h3>{genre}</h3>
        <ProgressBar></ProgressBar>
        {genreFilter.length > 10 && <MoreLink>More &rsaquo;</MoreLink>}
      </CarouselHeader>

      <SliderContainer>
        <HandleButton className="handle handle-left">
          <ChevronLeft />
        </HandleButton>

        <ItemContainer>{CardSelection}</ItemContainer>

        <HandleButton className="handle handle-right">
          <ChevronRight />
        </HandleButton>
      </SliderContainer>
    </CarouselContainer>
  );
};

export default Carousel;

// my map function gets passed the genre id
