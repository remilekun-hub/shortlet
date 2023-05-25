import React, { ReactElement, useEffect, useState } from "react";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import axios from "axios";
import useFetch from "../util/useFetch";
import { favouritesSlice } from "../zustand/userFavourites";

type ToggleHeartsProp = {
  id: string;
};

type dataType = {
  _id: string;
};
function ToggleHearts({ id }: ToggleHeartsProp): ReactElement {
  const user = userSlice((state) => state.user);
  const Myfavourites = favouritesSlice();

  const addToFavourite = async (id: string) => {
    await axios.post(
      "http://localhost:5000/api/v1/favourites",
      {
        propertyId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    Myfavourites.addFavourite({ id: id });
  };
  const removeFavourite = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/v1/favourites/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    Myfavourites.removeFavourite(id);
  };

  const myfav = Myfavourites.favourites?.find((fav) => fav.id === id);
  console.log(myfav);
  return (
    <div className="w-8 h-8 rounded-full top-4 right-[11px] absolute cursor-pointer">
      {myfav ? (
        <div onClick={() => removeFavourite(id)}>
          <HeartIcon red />
        </div>
      ) : (
        <div onClick={() => addToFavourite(id)}>
          <HeartIcon />
        </div>
      )}
    </div>
  );
}

export default ToggleHearts;
