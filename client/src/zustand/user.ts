import { create } from "zustand";

type UserType = {
  name: string;
  isAdmin: boolean;
};

interface UserInterface {
  user: {
    name: string;
    isAdmin: boolean;
  } | null;
  setUser: (user: UserType) => void;
  removeUser: () => void;
}

export const userSlice = create<UserInterface>()((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  removeUser: () => set({ user: null }),
}));
