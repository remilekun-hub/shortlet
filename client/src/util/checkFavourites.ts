import { favouritesSlice } from "../zustand/userFavourites";

export const isFavourite = (id: string): boolean => {
  const favourites = favouritesSlice((state) => state.favourites);
  const findFavourite = favourites.find((property) => property._id === id);

  return findFavourite?._id === id;
};

// const checkid = (movieid, bookmarks) => {
//   const bookmark = bookmarks.find((m) => m.id === movieid);

//   return movieid === bookmark?.id;
// };
