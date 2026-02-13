import { useEffect, useState } from "react";
import { useGeolocation } from "./useGeolocation";
import { getDongNameFromCoords } from "../lip/geocode";

const DEFAULT_COORDS = {
  lat: 37.5665,
  lon: 126.978,
};

const DEFAULT_LOCATION_NAME = "서울";

export function useCurrentLocationWeather() {
  const { latitude, longitude, isLoading: isLoadingGeo } = useGeolocation();

  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [locationName, setLocationName] = useState(DEFAULT_LOCATION_NAME);
  const [showGeoNotice, setShowGeoNotice] = useState(false);

  useEffect(() => {
    if (isLoadingGeo) return;

    if (latitude && longitude) {
      setCoords({ lat: latitude, lon: longitude });

      getDongNameFromCoords(latitude, longitude).then((dongName) => {
        if (dongName) setLocationName(dongName);
      });
    } else {
      setShowGeoNotice(true);
      setCoords(DEFAULT_COORDS);
      setLocationName(DEFAULT_LOCATION_NAME);
    }
  }, [isLoadingGeo, latitude, longitude]);

  return {
    coords,
    locationName,
    showGeoNotice,
    isLoadingGeo,
  };
}
