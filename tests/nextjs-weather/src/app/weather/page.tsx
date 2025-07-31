"use client";

import { useState, useEffect } from "react";
import { WeatherData } from "../../__test_data__/WeatherService";

export default function WeatherPage() {
	const [weatherData, setWeatherData] = useState<WeatherData[] | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const [city, setCity] = useState<string>("London");
	const [country, setCountry] = useState<string>("United Kingdom");
	const [date, setDate] = useState<Date | null>(null);

	const fetchWeatherData = async () => {
		setLoading(true);
		setError(undefined);

		try {
			const response = await fetch(
				`/api/weather?${new URLSearchParams({
					country,
					...(date ? { date: date?.toISOString() } : {}),
					...(!city ? {} : { city }),
				}).toString()}`,
				{ method: "GET" },
			);

			if (!response.ok) {
				throw new Error("Weather data not found");
			}

			const data: WeatherData[] = await response.json();
			setWeatherData(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWeatherData();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 max-w-md">
			<h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>

			<div className="mb-6 space-y-4">
				<input
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					placeholder="Enter country name"
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<div className="flex gap-2">
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Enter city name"
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="button"
						onClick={() => setCity("")}
						className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
					>
						Clear
					</button>
				</div>
				<div className="flex gap-2">
					<input
						type="date"
						value={date?.toISOString().split("T")[0] || ""}
						onChange={(e) => setDate(new Date(e.target.value))}
						placeholder="Enter date"
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="button"
						onClick={() => setDate(null)}
						className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
					>
						Clear
					</button>
				</div>
				<button
					type="button"
					onClick={fetchWeatherData}
					disabled={loading}
					className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
				>
					{loading ? "Loading..." : "Get Weather"}
				</button>
			</div>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			{weatherData && weatherData.length > 0 && (
				<div className="space-y-4">
					{weatherData.map((weather) => (
						<div key={weather.date} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
							<div className="flex justify-between items-start mb-2">
								<h3 className="text-lg font-semibold">{weather.city}</h3>
								<span className="text-sm text-gray-500">{weather.country}</span>
							</div>
							<div className="text-2xl font-bold text-blue-600 mb-2">{weather.temperature}°C</div>
							<div className="text-gray-600 mb-1">{weather.description}</div>
							<div className="text-sm text-gray-500">{new Date(weather.date).toLocaleDateString()}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
