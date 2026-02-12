import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import WeatherCard from "@/features/weather/components/WeatherCard";
import HourlyTempCard from "@/features/weather/components/HourlyTempCard";
import LoadingSpinner from "@/shared/ui/LoadingSpinner";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import { getCoordsFromAddress } from "@/features/location/lip/geocode";
import { useWeather } from "@/features/weather/hooks/useWeather";
import { useFavorite } from "@/features/favorites/hooks/useFavorite";
import backIcon from "@/assets/back.svg";

export default function DetailPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/detail" });
  const address = searchParams.q as string;

  const [coords, setCoords] = useState<{ lat: number; lon: number }>();
  const [isLoadingCoords, setIsLoadingCoords] = useState(true);

  const { isFavorite, nickname, toggleFavorite, editNickname } = useFavorite();

  useEffect(() => {
    async function loadCoords() {
      if (!address) {
        setIsLoadingCoords(false);
        return;
      }
      const result = await getCoordsFromAddress(address);
      if (result) setCoords(result);
      setIsLoadingCoords(false);
    }
    loadCoords();
  }, [address]);

  const { weatherData, hourlyData, isLoading, isError, error } = useWeather({
    lat: coords?.lat,
    lon: coords?.lon,
  });

  const isLoadingAny = isLoadingCoords || isLoading;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[600px] flex flex-col">
        <button
          onClick={() => navigate({ to: ".." })}
          className="flex items-center gap-2 mb-8 text-sub hover:opacity-70 transition hover:-translate-x-0.5"
        >
          <img src={backIcon} alt="뒤로" className="w-4 h-4" />
          <span>뒤로</span>
        </button>

        {isLoadingAny && <LoadingSpinner />}

        {!isLoadingAny && isError && (
          <ErrorMessage
            title="해당 장소의 정보가 제공되지 않습니다"
            message={error instanceof Error ? error.message : "알 수 없는 오류"}
          />
        )}

        {!isLoadingAny && !isError && weatherData && hourlyData && (
          <>
            <WeatherCard
              location={address}
              currentTemp={weatherData.currentTemp}
              minTemp={weatherData.minTemp}
              maxTemp={weatherData.maxTemp}
              description={weatherData.description}
              WeatherIcon={weatherData.weatherIcon}
              variant="detail"
              isFavorite={isFavorite}
              nickname={nickname}
              onToggleFavorite={toggleFavorite}
              onEditNickname={editNickname}
            />
            <HourlyTempCard hourlyData={hourlyData} />
          </>
        )}
      </div>
    </div>
  );
}
