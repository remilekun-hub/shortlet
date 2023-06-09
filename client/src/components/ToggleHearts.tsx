import React, { ReactElement, useEffect, useState } from "react";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import axios from "axios";

interface favourite {
  _id: string;
  propertyId: string;
}

type ToggleHeartsProp = {
  id: string;
};

function ToggleHearts({ id }: ToggleHeartsProp): ReactElement {
  const user = userSlice((state) => state.user);
  const userState = userSlice((state) => state);
  const userFavourites = userSlice((state) => state.user?.favourites);

  const addToFavourite = async (id: string) => {
    const { data } = await axios.patch(
      "http://localhost:5000/api/v1/users/favourites",
      {
        propertyId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const updateUser: any = {
      token: user?.token,
      id: data._id,
      name: data.name,
      image: data.image,
      favourites: [...data.favourites],
    };
    localStorage.setItem("user", JSON.stringify(updateUser));
    userState.setUser(updateUser);
  };

  const removeFavourite = async (id: string) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/users/favourites/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const updateUser: any = {
      token: user?.token,
      id: data._id,
      name: data.name,
      image: data.image,
      favourites: [...data.favourites],
    };

    localStorage.setItem("user", JSON.stringify(updateUser));
    userState.setUser(updateUser);
  };

  const myfav = userFavourites?.find((fav) => fav.propertyId === id);
  return (
    <div className="w-8 h-8 rounded-full top-4 right-[8px] absolute cursor-pointer">
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
