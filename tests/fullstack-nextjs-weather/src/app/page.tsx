export default function WeatherPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8">
			<div className="max-w-md mx-auto">
				<h1 className="text-3xl font-bold text-white text-center mb-8">Weather App</h1>

				<p className="text-center text-white/70 text-sm mt-4">
					Add your OpenWeatherMap API key to NEXT_PUBLIC_WEATHER_API_KEY environment variable
				</p>
			</div>
		</div>
	);
}
