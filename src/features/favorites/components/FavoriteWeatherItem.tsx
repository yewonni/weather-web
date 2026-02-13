import { useWeather } from "@/features/weather/hooks/useWeather";
import FavoriteCard from "./FavoriteCard";
import FavoriteCardSkeleton from "./FavoriteCardSkeleton";
import ErrorMessage from "@/shared/ui/ErrorMessage";

interface Props {
  location: string;
  nickname: string;
  lat: number;
  lon: number;
}

export default function FavoriteWeatherItem({
  location,
  nickname,
  lat,
  lon,
}: Props) {
  const { weatherData, isLoading, isError } = useWeather({ lat, lon });

  if (isLoading) {
    return (
      <li>
        <FavoriteCardSkeleton />
      </li>
    );
  }

  if (isError || !weatherData) {
    return (
      <li>
        <div className="rounded-md p-5 shadow-md bg-red-50 border border-red-200">
          <ErrorMessage
            title={`${nickname || location}`}
            message="날씨 정보를 불러올 수 없습니다."
          />
        </div>
      </li>
    );
  }

  return (
    <li>
      <FavoriteCard
        name={nickname || location}
        location={location}
        currentTemp={weatherData.currentTemp}
        minTemp={weatherData.minTemp}
        maxTemp={weatherData.maxTemp}
      />
    </li>
  );
}
