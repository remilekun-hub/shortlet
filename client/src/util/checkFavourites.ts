import { favouritesSlice } from "../zustand/userFavourites";
import { userSlice } from "../zustand/user";

export const isFavourite = (id: string): boolean => {
  const favourites = favouritesSlice((state) => state.favourites);
  const findFavourite = favourites.find((property) => property._id === id);

  return findFavourite?._id === id;
};
