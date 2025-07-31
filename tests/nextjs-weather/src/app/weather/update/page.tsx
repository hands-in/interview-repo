"use client";

import { useState } from "react";

// TODO: Import the correct types when implementing
// import { WeatherData, Weather } from "../api/WeatherService";

// Temporary enum for the form - replace with actual import
enum Weather {
	SUNNY = "SUNNY",
	RAINY = "RAINY",
	CLOUDY = "CLOUDY",
	HAIL = "HAIL",
	SNOW = "SNOW",
}

export default function UpdateWeatherPage() {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	
	// Form state
	const [country, setCountry] = useState<string>("Germany");
	const [city, setCity] = useState<string>("Berlin");
	const [date, setDate] = useState<string>("2025-07-31");
	const [temperature, setTemperature] = useState<number>(22);
	const [description, setDescription] = useState<string>("Partly cloudy");
	const [humidity, setHumidity] = useState<number>(65);
	const [windSpeed, setWindSpeed] = useState<number>(8.5);
	const [weather, setWeather] = useState<Weather>(Weather.CLOUDY);
	const [icon, setIcon] = useState<string>("partly-cloudy");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(undefined);
		setSuccess(false);

		try {
			// TODO: Implement the POST request to update weather
			// Hint: Create a WeatherData object from the form state
			// Send it to the /api/weather endpoint using POST method
			// Handle the response appropriately
			
			console.log("Form submitted with data:", {
				country,
				city,
				date,
				temperature,
				description,
				humidity,
				windSpeed,
				weather,
				icon
			});

			// Placeholder - Replace with actual API call
			throw new Error("Update functionality not implemented yet");
			
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to update weather");
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setCountry("Germany");
		setCity("Berlin");
		setDate("2025-07-31");
		setTemperature(22);
		setDescription("Partly cloudy");
		setHumidity(65);
		setWindSpeed(8.5);
		setWeather(Weather.CLOUDY);
		setIcon("partly-cloudy");
		setSuccess(false);
		setError(undefined);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">
						🌦️ Update Weather Data
					</h1>
					<p className="text-white/80">
						Update weather information for any city and date
					</p>
				</div>

				<div className="bg-white rounded-lg shadow-xl p-8">
					{success && (
						<div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
							✅ Weather data updated successfully!
						</div>
					)}

					{error && (
						<div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
							❌ {error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Location Information */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
									Country *
								</label>
								<input
									type="text"
									id="country"
									value={country}
									onChange={(e) => setCountry(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
									City *
								</label>
								<input
									type="text"
									id="city"
									value={city}
									onChange={(e) => setCity(e.target.value)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
						</div>

						{/* Date */}
						<div>
							<label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
								Date *
							</label>
							<input
								type="date"
								id="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>

						{/* Weather Type and Icon */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-2">
									Weather Type *
								</label>
								<select
									id="weather"
									value={weather}
									onChange={(e) => setWeather(e.target.value as Weather)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								>
									<option value={Weather.SUNNY}>SUNNY</option>
									<option value={Weather.RAINY}>RAINY</option>
									<option value={Weather.CLOUDY}>CLOUDY</option>
									<option value={Weather.HAIL}>HAIL</option>
									<option value={Weather.SNOW}>SNOW</option>
								</select>
							</div>

							<div>
								<label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
									Weather Icon
								</label>
								<input
									type="text"
									id="icon"
									value={icon}
									onChange={(e) => setIcon(e.target.value)}
									placeholder="e.g., sunny, cloudy, rainy"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						{/* Temperature and Description */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2">
									Temperature (°C) *
								</label>
								<input
									type="number"
									id="temperature"
									value={temperature}
									onChange={(e) => setTemperature(Number(e.target.value))}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
									Description *
								</label>
								<input
									type="text"
									id="description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder="e.g., Partly cloudy with light winds"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
						</div>

						{/* Humidity and Wind Speed */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-2">
									Humidity (%) *
								</label>
								<input
									type="number"
									id="humidity"
									value={humidity}
									onChange={(e) => setHumidity(Number(e.target.value))}
									min="0"
									max="100"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label htmlFor="windSpeed" className="block text-sm font-medium text-gray-700 mb-2">
									Wind Speed (km/h) *
								</label>
								<input
									type="number"
									id="windSpeed"
									value={windSpeed}
									onChange={(e) => setWindSpeed(Number(e.target.value))}
									min="0"
									step="0.1"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								disabled={loading}
								className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? "Updating..." : "Update Weather"}
							</button>

							<button
								type="button"
								onClick={resetForm}
								className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
							>
								Reset
							</button>
						</div>
					</form>

					{/* TODO Section for Interviewee */}
					<div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
						<h3 className="font-medium text-yellow-800 mb-2">🚧 TODO: Complete the Implementation</h3>
						<p className="text-yellow-700 text-sm mb-2">
							This form is ready to use, but you need to implement the update functionality:
						</p>
						<ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
							<li>Create a WeatherData object from the form state</li>
							<li>Send a POST request to <code className="bg-yellow-100 px-1 rounded">/api/weather</code></li>
							<li>Handle the response and update the UI accordingly</li>
							<li>Make sure your API endpoint accepts and validates the data</li>
						</ul>
					</div>
				</div>

				{/* Navigation */}
				<div className="mt-8 text-center">
					<a
						href="/weather/get"
						className="inline-block bg-white/20 text-white px-6 py-2 rounded-md font-medium hover:bg-white/30 transition-colors"
					>
						← Back to Weather View
					</a>
				</div>
			</div>
		</div>
	);
}
