import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useWeather } from "@/features/weather/hooks/useWeather";
import SearchWrapper from "@/features/search/components/SearchWrapper";
import WeatherPanel from "@/features/weather/components/WeatherPanel";
import WeatherSkeleton from "@/features/weather/components/WeatherSkeleton";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import FavoriteSection from "@/features/favorites/components/FavoriteSection";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useGeolocation } from "@/features/location/hooks/useGeolocation";
import { getDongNameFromCoords } from "@/features/location/lip/geocode";

export default function HomePage() {
  const navigate = useNavigate();
  const { searchText, setSearchText, setIsFocus, results, showDropdown } =
    useSearch();
  const { latitude, longitude, isLoading: isLoadingGeo } = useGeolocation();

  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 37.5665,
    lon: 126.978,
  });
  const [locationName, setLocationName] = useState("서울");
  const [showGeoNotice, setShowGeoNotice] = useState(false);

  useEffect(() => {
    if (!isLoadingGeo) {
      if (latitude && longitude) {
        setCoords({ lat: latitude, lon: longitude });
        getDongNameFromCoords(latitude, longitude).then((dongName) => {
          if (dongName) setLocationName(dongName);
        });
      } else {
        setShowGeoNotice(true);
        setCoords({ lat: 37.5665, lon: 126.978 });
        setLocationName("서울");
      }
    }
  }, [isLoadingGeo, latitude, longitude]);

  const {
    weatherData,
    hourlyData,
    isLoading,
    isError,
    error: weatherError,
  } = useWeather({ lat: coords.lat, lon: coords.lon });

  const handleSelect = (fullAddress: string) => {
    setSearchText(fullAddress);
    setIsFocus(false);
    navigate({ to: "/detail", search: { q: fullAddress } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] lg:items-start gap-12 relative">
      {showDropdown && (
        <div
          className="fixed inset-0 bg-black/20 z-[100]"
          onClick={() => setIsFocus(false)}
        />
      )}

      <div className="flex flex-col">
        <div className="z-[110]">
          <SearchWrapper
            value={searchText}
            onChange={setSearchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onSelect={handleSelect}
            results={results}
            showDropdown={showDropdown}
          />
        </div>

        {showGeoNotice && (
          <div className="mt-5 p-2 mb-4 text-center text-sub bg-yellow-50 border border-yellow-200 rounded-md">
            위치 권한을 거부하여, 기본 위치 서울 날씨를 표시합니다.
          </div>
        )}

        <div className="min-h-[350px]">
          {isLoading && <WeatherSkeleton />}

          {isError && (
            <div className="mt-6">
              <ErrorMessage
                title="날씨 정보를 불러올 수 없습니다"
                message={
                  weatherError instanceof Error
                    ? weatherError.message
                    : "알 수 없는 오류가 발생했습니다"
                }
              />
            </div>
          )}

          {!isLoading && !isError && weatherData && hourlyData && (
            <WeatherPanel
              weatherData={weatherData}
              hourlyData={hourlyData}
              locationName={locationName}
            />
          )}
        </div>
      </div>

      <FavoriteSection />
    </div>
  );
}
