import editIcon from "@/assets/edit.svg";
import starOnIcon from "@/assets/star-full.svg";
import starOffIcon from "@/assets/star-outline.svg";
import { IconType } from "react-icons";

type Props = {
  location: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  description?: string;
  WeatherIcon?: IconType;
  variant?: "home" | "detail";
  isFavorite?: boolean;
  nickname?: string;
  onToggleFavorite?: () => void;
  onEditNickname?: () => void;
};

export default function WeatherCard({
  location,
  currentTemp,
  minTemp,
  maxTemp,
  description = "맑음",
  WeatherIcon,
  variant = "home",
  isFavorite = false,
  nickname,
  onToggleFavorite,
  onEditNickname,
}: Props) {
  const showNicknameSection = variant === "detail" && isFavorite && nickname;
  const showStarOnly = variant === "detail";

  return (
    <section className="w-full p-4">
      <header className="mb-2">
        <div className="flex items-center justify-between">
          {showNicknameSection && (
            <div className="flex gap-2 items-center mb-4">
              <p className="text-body">{nickname}</p>
              <button onClick={onEditNickname} aria-label="별칭 수정하기">
                <img src={editIcon} alt="수정하기" className="w-4 h-4" />
              </button>
            </div>
          )}

          {!showNicknameSection && showStarOnly && <div />}

          {showStarOnly && (
            <button
              onClick={onToggleFavorite}
              aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <img
                src={isFavorite ? starOnIcon : starOffIcon}
                alt={isFavorite ? "즐겨찾기 됨" : "즐겨찾기"}
                className="w-8 h-8"
              />
            </button>
          )}
        </div>

        <h2 className="text-sub-title text-center md:text-left">{location}</h2>
      </header>

      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-2 mb-2">
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

      <dl className="flex justify-center md:justify-start gap-2 text-body text-sm">
        <div>
          <dt className="sr-only">최저 온도</dt>
          <dd>최저 {minTemp}°</dd>
        </div>
        <span aria-hidden>·</span>
        <div>
          <dt className="sr-only">최고 온도</dt>
          <dd>최고 {maxTemp}°</dd>
        </div>
      </dl>
    </section>
  );
}
