export enum Weather {
	SUNNY = "SUNNY",
	RAINY = "RAINY",
	CLOUDY = "CLOUDY",
	HAIL = "HAIL",
	SNOW = "SNOW",
}

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

/**
 * Weather service interface for managing weather data
 * 
 * getWeather: Returns weather data based on parameters
 * - If no date but city is provided, returns latest weather report for that city
 * - If date provided but no city, returns weather report for each city in the country on that date (if available)
 * - If no city or no date provided, returns all the latest weather reports for each city in the country
 * - If both date and city provided, returns specific city weather
 * 
 * updateWeather: Updates weather data for a specific date and location
 */
export interface WeatherService {
	getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[];
	updateWeather(date: Date, weather: WeatherData): void;
}
