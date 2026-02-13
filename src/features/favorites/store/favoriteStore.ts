import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useToastStore } from "@/shared/store/toastStore";

export type FavoriteItem = {
  location: string;
  nickname: string;
  lat: number;
  lon: number;
};

type FavoriteStore = {
  favorites: FavoriteItem[];

  addFavorite: (item: FavoriteItem) => boolean;
  removeFavorite: (location: string) => void;
  updateNickname: (location: string, nickname: string) => void;
};

const MAX_FAVORITES = 6;

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) => {
        const { favorites } = get();

        if (favorites.length >= MAX_FAVORITES) {
          useToastStore.getState().show("즐겨찾기는 최대 6개까지 가능합니다");
          return false;
        }

        if (favorites.some((f) => f.location === item.location)) {
          return true;
        }

        set({
          favorites: [...favorites, item],
        });

        useToastStore.getState().show("즐겨찾기에 추가되었습니다");
        return true;
      },

      removeFavorite: (location) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.location !== location),
        }));

        useToastStore.getState().show("즐겨찾기에서 제거되었습니다");
      },

      updateNickname: (location, nickname) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.location === location ? { ...f, nickname } : f,
          ),
        }));

        useToastStore.getState().show("별칭이 수정되었습니다");
      },
    }),
    {
      name: "favorite-storage",
    },
  ),
);
