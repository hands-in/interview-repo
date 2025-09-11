import { WeatherService, WeatherData, WeatherQuery } from "../../../__dont_touch__/WeatherService";
import { SAMPLE_WEATHER_DATA } from "../../../__dont_touch__/weather-data";

export class DefaultWeatherService implements WeatherService {
	// Pre: The weather data is initialized with some sample data. There is only a single data entry for each city on a given day.
	private weatherData: WeatherData[] = SAMPLE_WEATHER_DATA;

	/**
	 * Updates weather data for a specific date and location.
	 *
	 * @param date - The date for which to update weather data
	 * @param weather - The weather data object containing the updated information
	 */
	updateWeather(weather: WeatherData): void {
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
	 * - The Country is always provided.
	 * - City only: Get today's weather for that city
	 * - Date only: Get weather for all cities on that date
	 * - Country only: Get today's weather for all cities in the country
	 * - City and date: Get weather for that city on that date
	 */
	getWeather(query: WeatherQuery): WeatherData[] {
		throw new Error("Method not implemented.");
	}
}
