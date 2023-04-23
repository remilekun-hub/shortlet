import { create } from "zustand";

interface ListingModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useListingModalState = create<ListingModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useListingModalState;
