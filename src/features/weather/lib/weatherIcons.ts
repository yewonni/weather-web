import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
  WiDayCloudy,
  WiShowers,
} from "react-icons/wi";
import { IconType } from "react-icons";

export function getWeatherIcon(weatherCode: string): IconType {
  const code = weatherCode;

  if (code.startsWith("2")) return WiThunderstorm; // 천둥번개
  if (code.startsWith("3")) return WiShowers; // 이슬비
  if (code.startsWith("5")) return WiRain; // 비
  if (code.startsWith("6")) return WiSnow; // 눈
  if (code.startsWith("7")) return WiFog; // 안개
  if (code === "800") return WiDaySunny; // 맑음
  if (code === "801" || code === "802") return WiDayCloudy; // 구름 조금
  if (code.startsWith("80")) return WiCloudy; // 흐림

  return WiDaySunny;
}
