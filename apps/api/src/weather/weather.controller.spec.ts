import { Test, TestingModule } from "@nestjs/testing";

import { WeatherController } from "../weather.controller";
import { WeatherService } from "../weather.service";

describe("WeatherController", () => {
	let weatherController: WeatherController;

	beforeEach(async () => {
		const weather: TestingModule = await Test.createTestingModule({
			controllers: [WeatherController],
			providers: [WeatherService],
		}).compile();

		weatherController = weather.get<WeatherController>(WeatherController);
	});

	describe("root", () => {
		it('should return "Hello API"', () => {
			expect(weatherController.getHello()).toBe("Hello API");
		});
	});
});
