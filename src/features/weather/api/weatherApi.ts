import { getWeatherIcon } from "../lib/weatherIcons";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface FetchWeatherParams {
  lat: number;
  lon: number;
}

function getKoreanWeatherDescription(weatherCode: string): string {
  const weatherMap: Record<string, string> = {
    // 천둥번개
    "200": "가벼운 비를 동반한 천둥번개",
    "201": "비를 동반한 천둥번개",
    "202": "폭우를 동반한 천둥번개",
    "210": "약한 천둥번개",
    "211": "천둥번개",
    "212": "강한 천둥번개",
    "221": "불규칙적 천둥번개",
    "230": "가벼운 이슬비를 동반한 천둥번개",
    "231": "이슬비를 동반한 천둥번개",
    "232": "강한 이슬비를 동반한 천둥번개",

    // 이슬비
    "300": "가벼운 이슬비",
    "301": "이슬비",
    "302": "강한 이슬비",
    "310": "가벼운 비를 동반한 이슬비",
    "311": "이슬비",
    "312": "강한 비를 동반한 이슬비",
    "313": "소나기와 이슬비",
    "314": "강한 소나기와 이슬비",
    "321": "소나기",

    // 비
    "500": "가벼운 비",
    "501": "비",
    "502": "강한 비",
    "503": "매우 강한 비",
    "504": "폭우",
    "511": "우박",
    "520": "가벼운 소나기",
    "521": "소나기",
    "522": "강한 소나기",
    "531": "불규칙적 소나기",

    // 눈
    "600": "가벼운 눈",
    "601": "눈",
    "602": "강한 눈",
    "611": "진눈깨비",
    "612": "가벼운 소나기 진눈깨비",
    "613": "소나기 진눈깨비",
    "615": "가벼운 비와 눈",
    "616": "비와 눈",
    "620": "가벼운 소나기 눈",
    "621": "소나기 눈",
    "622": "강한 소나기 눈",

    // 안개
    "701": "안개",
    "711": "연기",
    "721": "실안개",
    "731": "모래먼지",
    "741": "안개",
    "751": "모래",
    "761": "먼지",
    "762": "화산재",
    "771": "돌풍",
    "781": "토네이도",

    // 맑음
    "800": "맑음",

    // 흐림
    "801": "구름 조금",
    "802": "구름 많음",
    "803": "흐림",
    "804": "매우 흐림",
  };

  return weatherMap[weatherCode] || "알 수 없음";
}

export async function fetchWeather({ lat, lon }: FetchWeatherParams) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`,
  );

  if (!res.ok) throw new Error("현재 날씨 불러오기 실패");
  const data = await res.json();
  const { main, weather, name } = data;

  // 시간별 날씨 (3시간 단위)
  const hourlyRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`,
  );

  if (!hourlyRes.ok) throw new Error("시간별 날씨 불러오기 실패");
  const hourlyDataJson = await hourlyRes.json();
  const hourly = hourlyDataJson.list.slice(0, 8).map((h: any) => ({
    hour: new Date(h.dt * 1000).getHours().toString().padStart(2, "0"),
    temp: Math.round(h.main.temp),
  }));

  const weatherCode = weather[0].id.toString();

  return {
    weatherData: {
      location: name,
      currentTemp: Math.round(main.temp),
      minTemp: Math.round(main.temp_min),
      maxTemp: Math.round(main.temp_max),
      description: getKoreanWeatherDescription(weatherCode),
      weatherIcon: getWeatherIcon(weatherCode),
    },
    hourlyData: hourly,
  };
}
