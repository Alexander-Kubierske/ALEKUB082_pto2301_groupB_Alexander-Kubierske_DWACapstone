import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { usePodcastPreviewStore } from "../store/1storeIndex";
import { MediumCard } from "./1componentIndex"; // Assuming the correct import path for MediumCard

interface CarouselProps {
  key: string;
  genre: string;
}

const CarouselComponent = (props: CarouselProps) => {
  const { data, loading } = usePodcastPreviewStore();
  const { genre } = props;
  const genreFilter = data.filter((podcast) => podcast.genres.includes(genre));

  const CardSelection = genreFilter.slice(0, 10).map((item) => {
    return <MediumCard key={item.id} {...item} loading={loading} />;
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={true}
      arrows
      centerMode={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={7000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {CardSelection}
    </Carousel>
  );
};

export default CarouselComponent;
