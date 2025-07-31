import { Test } from "@nestjs/testing";

import { WeatherService } from "./weather.service";

describe("WeatherService", () => {
	let service: WeatherService;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [WeatherService],
		}).compile();

		service = app.get<WeatherService>(WeatherService);
	});

	describe("getData", () => {
		it('should return "Hello API"', () => {
			expect(service.getHello()).toEqual("Hello API");
		});
	});
});
