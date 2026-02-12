import { geocodeCoords, geocodeAddress } from "../api/kakaoGeocode";

// 좌표 -> 시/구/동 추출
export async function getDongNameFromCoords(lat: number, lon: number) {
  const result = await geocodeCoords({ lat, lon });
  if (!result?.address_name) return undefined;
  return result.address_name.split(" ").slice(0, 3).join(" ");
}

// 주소 -> 좌표 추출
export async function getCoordsFromAddress(address: string) {
  const result = await geocodeAddress(address);
  if (!result) return undefined;
  return { lat: result.latitude, lon: result.longitude };
}
