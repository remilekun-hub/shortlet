import { Link } from "react-router-dom";
import { Property } from "../typings";

function PropertyCard({ _id, city, country, images, price }: Property) {
  return (
    <div className="relative ">
      <div className="w-10 h-10 rounded-full top-5 right-5 bg-green-500 absolute cursor-pointer" />
      <Link to={`/apartment/${_id}`} className="flex flex-col gap-3">
        <div className="h-[300px]">
          <img
            src={images[4]}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
        <div className="">
          <h3 className="text-[15px] text-black font-semibold">{`${city}, ${country}`}</h3>
          <p className="text-[16px] mt-1">
            <span className="font-semibold">{`$${price}`}</span>
            <span className="text-neutral-800 ml-1">night</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
