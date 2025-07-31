import { describe, expect, it } from "@jest/globals";
import { WeatherData } from "../../../__test_data__/WeatherService";

describe("Weather Integration Test", () => {
	describe("GET /api/weather", () => {
		it("should return 400 when country parameter is missing", async () => {
			const response = await fetch("/api/weather");
			expect(response.status).toBe(400);
		});

		it("should return weather data for valid country", async () => {
			const response = await fetch("/api/weather?country=Germany");
			expect(response.status).toBe(200);

			const data = (await response.json()) as WeatherData[];
			expect(Array.isArray(data)).toBe(true);
			expect(data.length).toBeGreaterThan(0);
			expect(data[0]).toHaveProperty("country");
			expect(data[0]).toHaveProperty("city");
			expect(data[0]).toHaveProperty("temperature");
			expect(data[0]?.country).toBe("Germany");
		});

		it("should return specific city weather when city parameter provided", async () => {
			const response = await fetch("/api/weather?country=Germany&city=Berlin");
			expect(response.status).toBe(200);

			const data = (await response.json()) as WeatherData[];
			expect(Array.isArray(data)).toBe(true);
			expect(data.length).toBe(1);
			expect(data[0]?.city).toBe("Berlin");
			expect(data[0]?.country).toBe("Germany");
		});

		it("should handle date parameter correctly", async () => {
			const response = await fetch("/api/weather?country=Germany&date=2025-07-31");
			expect(response.status).toBe(200);

			const data = (await response.json()) as WeatherData[];
			expect(Array.isArray(data)).toBe(true);
			if (data.length > 0) {
				expect(data[0]?.date).toBe("2025-07-31");
			}
		});

		it("should be case insensitive for country names", async () => {
			const response = await fetch("/api/weather?country=germany");
			expect(response.status).toBe(200);

			const data = (await response.json()) as WeatherData[];
			expect(Array.isArray(data)).toBe(true);
			expect(data.length).toBeGreaterThan(0);
			expect(data[0]?.country).toBe("Germany");
		});
	});

	describe("POST /api/weather", () => {
		it("should successfully update weather data with valid input", async () => {
			const updateData = {
				country: "TestCountry",
				city: "TestCity",
				temperature: 25,
				humidity: 60,
				windSpeed: 10,
				date: "2025-07-31",
			};

			const response = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			expect(response.status).toBe(200);

			const data = (await response.json()) as { success: boolean; message?: string };
			expect(data).toHaveProperty("success");
			expect(data.success).toBe(true);
		});

		it("should return 400 for invalid POST data", async () => {
			const invalidData = {
				country: "TestCountry",
			};

			const response = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidData),
			});

			expect(response.status).toBe(400);

			const data = (await response.json()) as { error: string };
			expect(data).toHaveProperty("error");
		});

		it("should handle malformed JSON in POST request", async () => {
			const response = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: '{"invalid": json}',
			});

			expect(response.status).toBe(400);

			const data = (await response.json()) as { error: string };
			expect(data).toHaveProperty("error");
		});

		it("should return 400 for invalid weather data", async () => {
			const invalidData = {
				country: "Germany",
				// Missing required fields
				temperature: "not-a-number",
			};

			const response = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(invalidData),
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result).toHaveProperty("error");
		});

		it("should return 400 for missing required fields", async () => {
			const incompleteData = {
				country: "Germany",
				// Missing most required fields
			};

			const response = await fetch("/api/weather", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(incompleteData),
			});

			expect(response.status).toBe(400);

			const result = await response.json();
			expect(result).toHaveProperty("error");
		});
	});
});
