import { beforeEach, describe, expect, it } from "@jest/globals";
import { WeatherService, WeatherData } from "../../../__test_data__/WeatherService";
import { DefaultWeatherService } from "./DefaultWeatherService";

describe("WeatherService Unit Tests", () => {
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

		it("should return empty array for non-existent country", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});
	});

	describe("updateWeather", () => {
		it("should update weather for a specific date and location", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});

		it("should validate weather data before updating", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});
	});
});

