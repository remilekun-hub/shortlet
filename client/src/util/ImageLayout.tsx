import { ReactElement } from "react";

export const imageLayout = (images: string[]) => {
  const imagesNo = images.length;
  let imageGrid: ReactElement;
  switch (imagesNo) {
    case 5 || 6 || 7 || 8 || 9 || 10 || 11:
      imageGrid = (
        <div className="h-full grid grid-cols-4 grid-rows-2 gap-[6px]">
          <img
            src={images[0]}
            className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-1 col-end-3 cursor-pointer"
          />

          <img
            src={images[1]}
            className="w-full object-cover h-full object-center  col-start-3 col-end-4 row-start-1 row-end-2 cursor-pointer"
          />
          <img
            src={images[2]}
            className="w-full object-cover h-full object-center  col-start-4 col-end-5 row-start-1 row-end-2 cursor-pointer"
          />

          <img
            src={images[3]}
            className="w-full object-cover h-full object-center  col-start-3 col-end-4 row-start-2 row-end-3 cursor-pointer"
          />
          <img
            src={images[4]}
            className="w-full object-cover h-full object-center  col-start-4 col-end-4 row-start-2 row-end-3 cursor-pointer"
          />
        </div>
      );
      break;
    case 4:
      imageGrid = (
        <div className="h-full grid grid-cols-5 grid-rows-2 gap-[6px]">
          <img
            src={images[0]}
            className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-1 col-end-3 cursor-pointer"
          />

          <img
            src={images[1]}
            className="w-full object-cover h-full object-center row-start-1 row-end-2 col-start-3 col-end-4 cursor-pointer"
          />
          <img
            src={images[2]}
            className="w-full object-cover h-full object-center row-start-2 row-end-3 col-start-3 col-end-4 cursor-pointer"
          />
          <img
            src={images[3]}
            className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-4 col-end-6 cursor-pointer"
          />
        </div>
      );
      break;
    case 3:
      imageGrid = (
        <div className="h-full grid grid-cols-3 gap-[6px]">
          <img
            src={images[0]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />

          <img
            src={images[1]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />
          <img
            src={images[2]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />
        </div>
      );
      break;

    case 2:
      imageGrid = (
        <div className="h-full grid grid-cols-2 gap-[6px]">
          <img
            src={images[0]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />

          <img
            src={images[1]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />
        </div>
      );
      break;
    case 1:
      imageGrid = (
        <div className="h-full grid grid-cols-1 gap-[6px]">
          <img
            src={images[0]}
            className="w-full object-cover h-full object-center cursor-pointer"
          />
        </div>
      );
      break;

    default:
      return null;
      break;
  }
  return imageGrid;
};
