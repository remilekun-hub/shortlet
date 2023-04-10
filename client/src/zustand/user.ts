import { create } from "zustand";

type UserType = {
  name: string;
  isAdmin: boolean;
  id: string;
  token: string;
};

interface UserInterface {
  user: {
    name: string;
    isAdmin: boolean;
    id: string;
    token: string;
  } | null;
  setUser: (user: UserType) => void;
  removeUser: () => void;
}

export const userSlice = create<UserInterface>()((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  removeUser: () => set({ user: null }),
}));
