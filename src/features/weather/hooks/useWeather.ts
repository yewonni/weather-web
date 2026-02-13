import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/weatherApi";

interface UseWeatherParams {
  lat?: number;
  lon?: number;
}

export function useWeather({ lat, lon }: UseWeatherParams) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (!lat || !lon) throw new Error("좌표가 필요합니다.");
      return fetchWeather({ lat, lon });
    },
    enabled: !!(lat && lon),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  return {
    weatherData: data?.weatherData,
    hourlyData: data?.hourlyData,
    isLoading,
    isError,
    error,
    refetch,
  };
}
