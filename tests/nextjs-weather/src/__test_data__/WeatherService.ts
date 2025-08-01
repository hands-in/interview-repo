export interface WeatherData {
  country: string;
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  date: string;
  weather: Weather;
}

export enum Weather {
  SUNNY = "SUNNY",
  RAINY = "RAINY", 
  CLOUDY = "CLOUDY",
  HAIL = "HAIL",
  SNOW = "SNOW",
}

export interface WeatherService {
	updateWeather(date: Date, weather: WeatherData): void;
	getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[];
}
