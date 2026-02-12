import { useState } from "react";

export function useFavorite(initial?: {
  isFavorite?: boolean;
  nickname?: string;
}) {
  const [isFavorite, setIsFavorite] = useState(initial?.isFavorite ?? false);
  const [nickname, setNickname] = useState(initial?.nickname);

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
      setNickname(undefined);
    } else {
      const newNickname = prompt("별칭을 입력하세요:");
      if (newNickname) {
        setIsFavorite(true);
        setNickname(newNickname);
      }
    }
  };

  const editNickname = () => {
    const newNickname = prompt("새 별칭을 입력하세요:", nickname);
    if (newNickname) setNickname(newNickname);
  };

  return { isFavorite, nickname, toggleFavorite, editNickname };
}
