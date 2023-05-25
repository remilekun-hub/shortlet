import { create } from "zustand";

interface favourite {
  _id: string;
  propertyId: string;
}

type UserType = {
  name?: string;
  id?: string;
  token?: string;
  image?: string;
  favourites?: favourite[];
};

interface UserInterface {
  user: UserType | null;
  setUser: (user: UserType) => void;
  removeUser: () => void;
  addFavourite?: (propertyID: favourite) => void;
}

export const userSlice = create<UserInterface>()((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  removeUser: () => set({ user: null }),
}));
