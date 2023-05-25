import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface property {
  id: string;
}
interface favouritesSlice {
  favourites: property[];
  addFavourite: (propertyId: property) => void;
  removeFavourite: (PropertyId: string) => void;
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
              ...state.favourites.filter((property) => property.id != id),
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
