import { Carousel } from "@mantine/carousel";
import imageLayout from "../util/ImageLayout";

interface Prop {
  images: string[];
}

function ImageBlock({ images }: Prop) {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <img src={url} className="object-cover w-full h-full" />
    </Carousel.Slide>
  ));

  return (
    <div>
      {images.length > 1 ? (
        <div className="hidden md:block h-[380px] rounded-[13px] overflow-hidden">
          {imageLayout(images)}
        </div>
      ) : (
        <div className="hidden md:block h-full rounded-[13px] overflow-hidden">
          <img src={images[0]} className=" w-full object-cover object-center" />
        </div>
      )}

      <div className="md:hidden rounded-xl overflow-hidden max-h-[450px]">
        <Carousel
          maw={"100%"}
          mx="auto"
          styles={{
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
            },
          }}
        >
          {slides}
        </Carousel>
      </div>
    </div>
  );
}

export default ImageBlock;
