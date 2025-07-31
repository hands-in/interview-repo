import { WeatherService, WeatherData } from "./WeatherService";
import { SAMPLE_WEATHER_DATA } from "../../../__test_data__/weather-data";

export class DefaultWeatherService implements WeatherService {
    private weatherData: WeatherData[] = SAMPLE_WEATHER_DATA;

    getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[] {
        throw new Error("Method not implemented.");
    }

    updateWeather(date: Date, weather: WeatherData): void {
        throw new Error("Method not implemented.");
    }
}