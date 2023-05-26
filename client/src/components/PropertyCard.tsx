import { Link } from "react-router-dom";
import { Property } from "../typings";
import ToggleHearts from "./ToggleHearts";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import axios from "axios";
import useLoginModalState from "../zustand/UseLoginModal";

function PropertyCard({ _id, city, country, images, price, state }: Property) {
  const user = userSlice((state) => state.user);
  const loginModal = useLoginModalState();

  return (
    <div className="relative ">
      {user ? (
        <ToggleHearts id={_id} />
      ) : (
        <div
          className="absolute top-4 right-[11px] cursor-pointer w-8 h-8 rounded-full"
          onClick={loginModal.onOpen}
        >
          <HeartIcon />
        </div>
      )}

      <Link to={`/apartment/${_id}`} className="flex flex-col gap-3">
        <div className="h-[300px]">
          <img
            src={images[0]}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
        <div className="">
          <h3 className="text-[16px] text-black font-semibold capitalize">{`${city}, ${state}, ${country}`}</h3>
          <p className="text-[16px] mt-1">
            <span className="font-semibold">{`$${price}`}</span>
            <span className="text-neutral-600 ml-1">night</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
