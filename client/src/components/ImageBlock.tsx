import imageLayout from "../util/ImageLayout";
import { useState, useEffect } from "react";

interface ImageBlockProp {
  images: string[];
}

function ImageBlock({ images }: ImageBlockProp) {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [viewPortWidth, setViewPortWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const imageSlider = document.querySelector("#image-slide");

    imageSlider?.classList.add("slider");

    const T = setTimeout(() => {
      imageSlider?.classList.remove("slider");
    }, 500);

    return () => {
      clearTimeout(T);
    };
  }, [currentImage]);

  return (
    <div>
      {images.length > 1 && viewPortWidth >= 768 ? (
        <div className="h-[380px] rounded-[13px] overflow-hidden">
          {imageLayout(images)}
        </div>
      ) : (
        <div className="w-full h-[300px] mx-auto md:h-[400px] relative overflow-hidden rounded-xl">
          <div className="absolute inset-0">
            <img
              id="image-slide"
              src={images[currentImage]}
              alt="apartment image"
              className={`h-full w-screen  object-cover object-center transition`}
            />
          </div>
          <div
            className={`cursor-pointer z-[50] rounded-full  bg-black/30 w-7 h-7 justify-center items-center absolute left-2 top-[48%] ${
              currentImage === 0 || images.length < 2 ? "hidden" : "flex"
            }`}
            onClick={() =>
              currentImage > 0 ? setCurrentImage(currentImage - 1) : undefined
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>

          <div
            className={`cursor-pointer z-[50] rounded-full  bg-black/30 w-7 h-7 justify-center items-center absolute right-2 top-[48%] ${
              currentImage === images.length - 1 || images.length < 2
                ? "hidden"
                : "flex"
            }`}
            onClick={() =>
              currentImage < images.length - 1
                ? setCurrentImage(currentImage + 1)
                : undefined
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageBlock;
