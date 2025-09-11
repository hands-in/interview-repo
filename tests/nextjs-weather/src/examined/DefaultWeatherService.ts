import { WeatherService, WeatherData, WeatherQuery } from "../app/api/weather/WeatherService";
import { SAMPLE_WEATHER_DATA } from "../app/api/weather/weather-data";

export class DefaultWeatherService implements WeatherService {
	// Pre: The weather data is initialized with some sample data. There is only a single data entry for each city on a given day.
	private weatherData: WeatherData[];

	constructor() {
		this.weatherData = [...SAMPLE_WEATHER_DATA]
	}

	/**
	 * Updates weather data for a specific date and location.
	 *
	 * @param weather - The weather data object containing the updated information
	 */
	updateWeather(_weather: WeatherData): void {
		// TODO: Implement this method
		// Requirements:
		// 1. Find existing entry with same country, city, and date
		// 2. If found, update the existing entry
		// 3. If not found, add new entry to the dataset
		
		throw new Error("updateWeather method not implemented");
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
	 * - City only: Get most recent weather data for that city
	 * - Date only: Get weather for all cities on that date
	 * - Country only: Get most recent weather for all cities in the country
	 * - City and date: Get weather for that city on that date
	 */
	getWeather(_query: WeatherQuery): WeatherData[] {
		throw new Error("getWeather method not implemented");
	}
}
