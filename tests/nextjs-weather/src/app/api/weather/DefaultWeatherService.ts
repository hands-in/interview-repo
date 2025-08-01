import { WeatherService, WeatherData } from "../../../__test_data__/WeatherService";
import { SAMPLE_WEATHER_DATA } from "../../../__test_data__/weather-data";

export class DefaultWeatherService implements WeatherService {
    // Pre: The weather data is initialized with some sample data. There is only a single data entry for each city on a given day.
    private weatherData: WeatherData[] = SAMPLE_WEATHER_DATA;

    /**
     * Updates weather data for a specific date and location.
     * 
     * @param date - The date for which to update weather data
     * @param weather - The weather data object containing the updated information
     */
    updateWeather(date: Date, weather: WeatherData): void {
        throw new Error("Method not implemented.");
    }

   /**
     * Retrieves weather data based on the provided parameters.
     * 
     * @param params - The parameters for weather data retrieval
     * @param params.country - The country for which to retrieve weather data
     * @param params.city - Optional city name. If provided, returns data for specific city
     * @param params.date - Optional date. If provided, returns data for specific date
     * @returns An array of weather data matching the specified criteria
     * 
     * @remarks
     * - If no date but city is provided, returns latest (up to date) weather report for that city
     * - If date provided but no city, returns weather report for each city in the country on that date
     * - If no city and no date provided, returns all the latest (up to date) weather reports for each city in the country
     * - If both date and city provided, returns the weather report for that city on that date
     */
    getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[] {
        throw new Error("Method not implemented.");
    }
}