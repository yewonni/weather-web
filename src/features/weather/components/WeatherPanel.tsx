import WeatherCard from "./WeatherCard";
import HourlyTempCard from "./HourlyTempCard";
import { IconType } from "react-icons";

interface WeatherData {
  location: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
  weatherIcon: IconType;
}

interface HourlyTemp {
  hour: string;
  temp: number;
}

interface WeatherPanelProps {
  weatherData: WeatherData;
  hourlyData: HourlyTemp[];
  locationName?: string;
  lat: number;
  lon: number;
}

export default function WeatherPanel({
  weatherData,
  hourlyData,
  locationName,
  lat,
  lon,
}: WeatherPanelProps) {
  return (
    <div className="mt-6">
      <WeatherCard
        location={locationName ?? weatherData.location}
        lat={lat}
        lon={lon}
        currentTemp={weatherData.currentTemp}
        minTemp={weatherData.minTemp}
        maxTemp={weatherData.maxTemp}
        description={weatherData.description}
        WeatherIcon={weatherData.weatherIcon}
        variant="home"
      />
      <HourlyTempCard hourlyData={hourlyData} />
    </div>
  );
}
