import { beforeEach, describe, expect, it } from "@jest/globals";
import { WeatherService } from "../../../__test_data__/WeatherService";
import {DefaultWeatherService } from "./DefaultWeatherService";

describe("WeatherService", () => {
	let weatherService: WeatherService;

	beforeEach(() => {
		weatherService = new DefaultWeatherService();
	});

	describe("getWeather", () => {
		it("should return all latest weather for a country when no city or date specified", () => {
			const result = weatherService.getWeather({ country: "Germany" });
			expect(result).toHaveLength(2);
			const orderedResult = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			expect(orderedResult.at(0)?.country).toBe("Germany");
			expect(orderedResult.at(0)?.date).toBe("2025-07-31");
		});

		it("should return latest city weather when city specified", () => {
			const result = weatherService.getWeather({ country: "Germany", city: "Berlin" });
			expect(result).toHaveLength(1);
			expect(result.at(0)?.city).toBe("Berlin");
			expect(result.at(0)?.date).toBe("2025-07-31");
		});

		it("should return latest weather when no date specified", () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should return empty array for non-existent country", () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should be case insensitive for country names", () => {
			expect(false).toBe(true); // TODO: Implement
		});
	});

	describe("updateWeather", () => {
		it("should update weather for a specific date and location", () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should validate weather data before updating", () => {
			expect(false).toBe(true); // TODO: Implement
		});
	});
});

describe("Weather API Routes", () => {
	describe("GET /api/weather", () => {
		it("should return 400 when country parameter is missing", async () => {
			const response = await fetch("/api/weather");
			expect(response.status).toBe(400);
		});

		it("should return weather data for valid country", async () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should return specific city weather when city parameter provided", async () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should return 404 for non-existent country", async () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should handle date parameter correctly", async () => {
			expect(false).toBe(true); // TODO: Implement
		});
	});

	describe("POST /api/weather", () => {
		it("should successfully update weather with valid data", async () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should return 400 for invalid weather data", async () => {
			expect(false).toBe(true); // TODO: Implement
		});

		it("should return 400 for missing required fields", async () => {
			expect(false).toBe(true); // TODO: Implement
		});
	});
});
