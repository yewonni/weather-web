import { useEffect, useState } from "react";
import { useFavoriteStore } from "../store/favoriteStore";
import { useFavoriteModalStore } from "@/shared/store/modalStore";

export default function FavoriteNicknameModal() {
  const { isOpen, location, close } = useFavoriteModalStore();
  const favorites = useFavoriteStore((s) => s.favorites);
  const updateNickname = useFavoriteStore((s) => s.updateNickname);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (!location) return;

    const item = favorites.find((f) => f.location === location);
    setValue(item?.nickname ?? "");
  }, [location, favorites]);

  if (!isOpen || !location) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[320px] shadow-xl">
        <h3 className="text-lg mb-4">별칭 수정</h3>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={close}>취소</button>

          <button
            onClick={() => {
              updateNickname(location, value);
              close();
            }}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
