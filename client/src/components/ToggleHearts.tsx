import React, { ReactElement } from "react";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import { isFavourite } from "../util/checkFavourites";
import { favouritesSlice } from "../zustand/userFavourites";

type ToggleHeartsProp = {
  _id: string;
  city: string;
  country: string;
  singleImage: string;
  price: number;
};

function ToggleHearts({
  _id,
  city,
  country,
  singleImage,
  price,
}: ToggleHeartsProp): ReactElement {
  const user = userSlice((state) => state.user);
  const addFavourite = favouritesSlice((state) => state.addFavourite);
  const removeFavourite = favouritesSlice((state) => state.removeFavourite);
  return (
    <div className="w-8 h-8 rounded-full top-4 right-[11px] absolute cursor-pointer">
      {isFavourite(_id) ? (
        <div
          onClick={() => {
            removeFavourite(_id);
          }}
        >
          <HeartIcon red />
        </div>
      ) : (
        <div
          onClick={() => {
            addFavourite({ _id, city, country, singleImage, price });
          }}
        >
          <HeartIcon />
        </div>
      )}
    </div>
  );
}

export default ToggleHearts;
