import { create } from "zustand";

type ToastStore = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  message: null,

  show: (message) => {
    set({ message });

    setTimeout(() => {
      set({ message: null });
    }, 3000);
  },

  hide: () => set({ message: null }),
}));
