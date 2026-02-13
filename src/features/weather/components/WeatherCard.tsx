import editIcon from "@/assets/edit.svg";
import starOnIcon from "@/assets/star-full.svg";
import starOffIcon from "@/assets/star-outline.svg";
import { IconType } from "react-icons";
import { useFavoriteStore } from "@/features/favorites/store/favoriteStore";
import { useFavoriteModalStore } from "@/shared/store/modalStore";

type Props = {
  location: string;
  lat: number;
  lon: number;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  description?: string;
  WeatherIcon?: IconType;
  variant?: "home" | "detail";
};

export default function WeatherCard({
  location,
  lat,
  lon,
  currentTemp,
  minTemp,
  maxTemp,
  description = "맑음",
  WeatherIcon,
  variant = "home",
}: Props) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const openModal = useFavoriteModalStore((s) => s.open);

  const favoriteItem = favorites.find((f) => f.location === location);
  const favorite = !!favoriteItem;
  const nickname = favoriteItem?.nickname;

  const showStar = variant === "detail";
  const showNickname = variant === "detail" && favorite && nickname;

  const handleToggle = () => {
    if (favorite) {
      removeFavorite(location);
    } else {
      const success = addFavorite({
        location,
        nickname: location,
        lat,
        lon,
      });

      if (success) {
        openModal(location);
      }
    }
  };

  return (
    <section className="w-full p-4">
      <header className="mb-2">
        <div className="flex items-center justify-between gap-2 mb-4">
          {showNickname && (
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <p className="text-body truncate" title={nickname}>
                {nickname}
              </p>

              <button
                onClick={() => openModal(location)}
                className="flex-shrink-0"
              >
                <img
                  src={editIcon}
                  title="별칭 수정"
                  alt="별칭 수정"
                  className="w-4 h-4"
                />
              </button>
            </div>
          )}

          {!showNickname && showStar && <div />}

          {showStar && (
            <button
              onClick={handleToggle}
              className="flex-shrink-0"
              aria-label={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <img
                src={favorite ? starOnIcon : starOffIcon}
                alt={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                title={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                className="w-8 h-8"
              />
            </button>
          )}
        </div>

        <h2
          className="text-sub-title text-center md:text-left truncate"
          title={location}
        >
          {location}
        </h2>
      </header>

      <div className="flex flex-col items-center md:flex-row md:justify-between mb-2">
        <p
          className="text-primary-title"
          aria-label={`현재 온도 ${currentTemp}도`}
        >
          {currentTemp}°
        </p>

        {WeatherIcon && (
          <WeatherIcon
            className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-yellow-500"
            aria-label={`${description} 날씨 아이콘`}
          />
        )}
      </div>

      <p className="text-body text-center md:text-left mb-1">{description}</p>

      <p className="text-body text-sm text-center md:text-left">
        최저 {minTemp}° · 최고 {maxTemp}°
      </p>
    </section>
  );
}
