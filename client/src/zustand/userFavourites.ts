import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface property {
  _id: string;
  city: string;
  country: string;
  singleImage: string;
  price: number;
}
interface favouritesSlice {
  favourites: property[];
  addFavourite: (property: property) => void;
  removeFavourite: (id: string) => void;
  removeAll: () => void;
}
export const favouritesSlice = create<favouritesSlice>()(
  devtools(
    persist(
      (set) => ({
        favourites: [],
        addFavourite: (property) => {
          set((state) => ({ favourites: [...state.favourites, property] }));
        },
        removeFavourite: (id) => {
          set((state) => ({
            favourites: [
              ...state.favourites.filter((property) => property._id != id),
            ],
          }));
        },
        removeAll: () => set({ favourites: [] }),
      }),
      {
        name: "favourites", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
