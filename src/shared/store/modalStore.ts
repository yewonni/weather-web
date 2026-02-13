import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  location?: string;
  open: (location: string) => void;
  close: () => void;
};

export const useFavoriteModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  location: undefined,

  open: (location) => set({ isOpen: true, location }),
  close: () => set({ isOpen: false, location: undefined }),
}));
