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
  favourites: {}[];
  removeAll: () => void;
  addFavourite: (property: property) => void;
  // removeFavourite: (id: number) => void;
}
export const favouritesSlice = create<favouritesSlice>()(
  devtools(
    persist(
      (set) => ({
        favourites: [],
        removeAll: () => set({ favourites: [] }),
        addFavourite: (property) => {
          set((state) => ({ favourites: [...state.favourites, property] }));
        },
        // removeFavourite: (id) => {},
      }),
      {
        name: "favourites", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
