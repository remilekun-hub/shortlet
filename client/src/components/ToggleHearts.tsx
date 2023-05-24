import React, { ReactElement, useEffect, useState } from "react";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import axios from "axios";
import useFetch from "../util/useFetch";

type ToggleHeartsProp = {
  id: string;
};

type dataType = {
  _id: string;
};
function ToggleHearts({ id }: ToggleHeartsProp): ReactElement {
  const user = userSlice((state) => state.user);
  const [favourites, setFavourites] = useState<dataType[] | null | undefined>();
  useEffect(() => {
    getFavourite().then((d: any) => setFavourites(d));
    console.log({ favourites });
  }, []);

  const getFavourite = async () => {
    try {
      const { data } = await axios.get<dataType[]>(
        `http://localhost:5000/api/v1/favourites`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

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
  };
  const removeFavourite = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/v1/favourites/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  };
  const isFav = favourites?.find((d) => d._id === id);
  return (
    <div className="w-8 h-8 rounded-full top-4 right-[11px] absolute cursor-pointer">
      {isFav ? (
        <div
          onClick={() => {
            removeFavourite(id);
          }}
        >
          <HeartIcon red />
        </div>
      ) : (
        <div
          onClick={() => {
            addToFavourite(id);
          }}
        >
          <HeartIcon />
        </div>
      )}

      {/* <div
        onClick={() => {
          addToFavourite(id);
        }}
      >
        <HeartIcon />
      </div> */}
    </div>
  );
}

export default ToggleHearts;
