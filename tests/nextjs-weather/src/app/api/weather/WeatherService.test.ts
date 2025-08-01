import { beforeEach, describe, expect, it } from "@jest/globals";
import { WeatherService } from "../../../__test_data__/WeatherService";
import { DefaultWeatherService } from "./DefaultWeatherService";

describe("WeatherService Unit Tests", () => {
	let weatherService: WeatherService;

	beforeEach(() => {
		weatherService = new DefaultWeatherService();
	});

	describe("updateWeather", () => {
		it("should update weather for a specific date and location", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});

		it("should validate weather data before updating", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});
	});

	describe("getWeather", () => {
		it("should return empty array for non-existent country", () => {
			expect(false).toBe(true); // TODO: Implement this test
		});

		it("should return all latest weather for a country when no city or date specified", () => {
			const result = weatherService.getWeather({ country: "Germany" });
			expect(result).toHaveLength(2);
			const orderedResult = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			expect(orderedResult).toHaveLength(3);
			
			// First item (most recent date: 2025-08-31)
			expect(orderedResult.at(0)?.country).toBe("Germany");
			expect(orderedResult.at(0)?.city).toBe("Munich");
			expect(orderedResult.at(0)?.temperature).toBe(24);
			expect(orderedResult.at(0)?.description).toBe("Clear and sunny");
			expect(orderedResult.at(0)?.humidity).toBe(48);
			expect(orderedResult.at(0)?.windSpeed).toBe(5.6);
			expect(orderedResult.at(0)?.icon).toBe("sunny");
			expect(orderedResult.at(0)?.date).toBe("2025-08-31");
			expect(orderedResult.at(0)?.weather).toBe("SUNNY");
			
			// Second item (middle date: 2025-07-31)
			expect(orderedResult.at(1)?.country).toBe("Germany");
			expect(orderedResult.at(1)?.city).toBe("Berlin");
			expect(orderedResult.at(1)?.temperature).toBe(19);
			expect(orderedResult.at(1)?.description).toBe("Partly sunny with light clouds");
			expect(orderedResult.at(1)?.humidity).toBe(62);
			expect(orderedResult.at(1)?.windSpeed).toBe(8.9);
			expect(orderedResult.at(1)?.icon).toBe("partly-cloudy");
			expect(orderedResult.at(1)?.date).toBe("2025-07-31");
			expect(orderedResult.at(1)?.weather).toBe("CLOUDY");
			
			// Third item (oldest date: 2024-02-12)
			expect(orderedResult.at(2)?.country).toBe("Germany");
			expect(orderedResult.at(2)?.city).toBe("Berlin");
			expect(orderedResult.at(2)?.temperature).toBe(19);
			expect(orderedResult.at(2)?.description).toBe("Partly sunny with light clouds");
			expect(orderedResult.at(2)?.humidity).toBe(62);
			expect(orderedResult.at(2)?.windSpeed).toBe(8.9);
			expect(orderedResult.at(2)?.icon).toBe("partly-cloudy");
			expect(orderedResult.at(2)?.date).toBe("2024-02-12");
			expect(orderedResult.at(2)?.weather).toBe("CLOUDY");
		});

		it("should return latest city weather when city specified", () => {
			const result = weatherService.getWeather({ country: "Germany", city: "Berlin" });
			expect(result).toHaveLength(1);
			expect(result.at(0)?.city).toBe("Berlin");
			expect(result.at(0)?.date).toBe("2025-07-31");
		});
	});
});

