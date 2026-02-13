import { useFavoriteStore } from "@/features/favorites/store/favoriteStore";
import FavoriteWeatherItem from "./FavoriteWeatherItem";

export default function FavoriteSection() {
  const favorites = useFavoriteStore((s) => s.favorites);

  return (
    <section
      aria-labelledby="favorite-heading"
      className="w-full flex flex-col lg:min-h-[450px]"
    >
      <header className="flex items-center gap-2 mb-3">
        <h2 className="text-card-title">즐겨찾는 장소</h2>
        <p className="text-sub">({favorites.length}/6)</p>
      </header>

      {favorites.length === 0 ? (
        <p className="text-sub mt-10 text-center">
          즐겨찾기한 장소가 없습니다.
        </p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <FavoriteWeatherItem
              key={fav.location}
              location={fav.location}
              nickname={fav.nickname}
              lat={fav.lat}
              lon={fav.lon}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
