import { type NextRequest, NextResponse } from "next/server";
import { DefaultWeatherService } from "./DefaultWeatherService";
import { WeatherService } from "./WeatherService";
// import { WeatherData, Weather, WeatherService } from "./WeatherService";


/**
 * GET /api/weather
 * 
 * Query parameters:
 * - country: string (required) - The country name
 * - city: string (optional) - Specific city name  
 * - date: string (optional) - Date in YYYY-MM-DD format
 * 
 * Returns:
 * - If no city provided: all weather data for the country
 * - If no date provided: latest weather report
 * - If both provided: specific city weather for date
 */
export async function GET(_request: NextRequest) {
	const weatherService: WeatherService = new DefaultWeatherService(); 

	// TODO: Implement the GET endpoint
	return NextResponse.json(
		{ error: "Not implemented yet" }, 
		{ status: 501 }
	);
}

/**
 * POST /api/weather
 * 
 * Request body: WeatherData object
 * Updates weather for a specific date and location
 */
export async function POST(_request: NextRequest) {
	const weatherService: WeatherService = new DefaultWeatherService();

	// TODO: Implement the POST endpoint  
	return NextResponse.json(
		{ error: "Not implemented yet" }, 
		{ status: 501 }
	);
}
