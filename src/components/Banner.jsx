import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BannerImage from "./BannerImage";

const Banner = () => {
  const images = [
    {id:1, url: "https://links.papareact.com/gi1", alt: "Graham Norton Book audible original" },
    {id:2, url: "https://links.papareact.com/6ff", alt: "Prime Video watch now" },
    {id:3, url: "https://links.papareact.com/7ma", alt: "Amazon music 3 months free limited offer" },
  ];
  return (
    <div className="relative">
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {images.map((data) => (
          <BannerImage 
          key={data.id} 
          data={data} />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
