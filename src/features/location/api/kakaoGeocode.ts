const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

let kakaoLoadPromise: Promise<void> | null = null;

function loadKakaoScript(): Promise<void> {
  if (kakaoLoadPromise) return kakaoLoadPromise;

  kakaoLoadPromise = new Promise((resolve, reject) => {
    if ((window as any).kakao && (window as any).kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_JS_KEY}&libraries=services&autoload=false`;

    script.onload = () => {
      (window as any).kakao.maps.load(() => {
        resolve();
      });
    };

    script.onerror = () => {
      reject(new Error("Kakao 지도 스크립트를 불러오는데 실패했습니다."));
      kakaoLoadPromise = null;
    };

    document.head.appendChild(script);
  });

  return kakaoLoadPromise;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function geocodeAddress(
  address: string,
): Promise<Coordinates | null> {
  try {
    await loadKakaoScript();

    return new Promise((resolve) => {
      const geocoder = new (window as any).kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: any[], status: string) => {
        if (
          status === (window as any).kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          resolve({
            latitude: parseFloat(result[0].y),
            longitude: parseFloat(result[0].x),
          });
        } else {
          resolve(null);
        }
      });
    });
  } catch (error) {
    return null;
  }
}

export async function geocodeCoords({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) {
  await loadKakaoScript();
  return new Promise<{ address_name: string } | null>((resolve) => {
    const geocoder = new (window as any).kakao.maps.services.Geocoder();
    geocoder.coord2Address(lon, lat, (result: any[], status: string) => {
      if (
        status === (window as any).kakao.maps.services.Status.OK &&
        result.length > 0
      ) {
        resolve({ address_name: result[0].address.address_name });
      } else {
        resolve(null);
      }
    });
  });
}
