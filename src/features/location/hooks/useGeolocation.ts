import { useState, useEffect } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  isLoading: boolean;
  error: string | null;
  permissionDenied: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    isLoading: true,
    error: null,
    permissionDenied: false,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        latitude: null,
        longitude: null,
        isLoading: false,
        error: "브라우저가 위치 정보를 지원하지 않습니다.",
        permissionDenied: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          isLoading: false,
          error: null,
          permissionDenied: false,
        });
      },
      (error) => {
        const permissionDenied = error.code === error.PERMISSION_DENIED;
        const timeout = error.code === error.TIMEOUT;

        setState({
          latitude: null,
          longitude: null,
          isLoading: false,
          error: permissionDenied
            ? "위치 권한이 거부되었습니다."
            : timeout
              ? "위치 정보 요청 시간이 초과되었습니다."
              : "위치 정보를 가져올 수 없습니다.",
          permissionDenied,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      },
    );
  }, []);

  return state;
}
