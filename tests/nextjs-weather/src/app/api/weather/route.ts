import { Weather, WeatherService } from "../../../__dont_touch__/WeatherService";
import { DefaultWeatherService } from "./DefaultWeatherService";
import { z } from "zod";
import { type NextRequest, NextResponse } from "next/server";

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
export async function GET(request: NextRequest) {
	const weatherService: WeatherService = new DefaultWeatherService();

	const date = request.nextUrl.searchParams.get("date");
	const city = request.nextUrl.searchParams.get("city");
	const country = request.nextUrl.searchParams.get("country");

	const WeatherQuerySchema = z.object({
		country: z.string(),
		city: z.string().optional(),
		date: z.coerce.date().optional(),
	});

	const parseResult = WeatherQuerySchema.safeParse({ date, city, country });

	if (!parseResult.success) {
		return NextResponse.json({ error: "Invalid request", details: parseResult.error.issues }, { status: 400 });
	}

	return NextResponse.json(weatherService.getWeather(parseResult.data));
}

/**
 * POST /api/weather
 *
 * Request body: WeatherData object
 * Updates weather for a specific date and location
 */
export async function POST(_request: NextRequest) {
	const WeatherDataSchema = z.object({
		country: z.string(),
		city: z.string(),
		temperature: z.number(),
		description: z.string(),
		humidity: z.number(),
		windSpeed: z.number(),
		icon: z.string(),
		date: z.string(),
		weather: z.enum(Weather),
	});

	const weatherService: WeatherService = new DefaultWeatherService();

	try {
		const body = await _request.json();
		const parseResult = WeatherDataSchema.safeParse(body);
		if (!parseResult.success) {
			return NextResponse.json({ error: "Invalid request body", details: parseResult.error.issues }, { status: 400 });
		}
		weatherService.updateWeather(parseResult.data);
		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid request body or server error" }, { status: 400 });
	}
}
