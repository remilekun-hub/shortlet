import { create } from "zustand";

interface filterModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModalState = create<filterModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFilterModalState;
