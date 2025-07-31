export default function WeatherPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold text-white text-center mb-8">
					🌤️ Weather Application
				</h1>
				
				<div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 text-white">
					<h2 className="text-xl font-semibold mb-4">Welcome to the Weather App Test!</h2>
					<p className="mb-4">
						This is your starting point. You need to implement a full-stack weather application that:
					</p>
					<ul className="list-disc list-inside space-y-2 mb-4">
						<li>Shows weather information for different countries and cities</li>
						<li>Returns latest weather data when no date specified</li>
						<li>Returns all cities when no specific city requested</li>
						<li>Has a working API backend with proper error handling</li>
						<li>Includes tests that guide your implementation</li>
						<li>Demonstrates clean code and best practices</li>
					</ul>
					<div className="bg-yellow-500/20 border border-yellow-400/30 rounded p-4">
						<p className="font-medium">💡 Getting Started:</p>
						<ol className="list-decimal list-inside mt-2 space-y-1">
							<li>Run <code className="bg-black/20 px-2 py-1 rounded">nx test weather --watch</code> to see the tests</li>
							<li>Implement the WeatherService interface</li>
							<li>Build your API endpoints</li>
							<li>Create the frontend interface</li>
						</ol>
					</div>
				</div>

				{/* TODO: Replace this section with your weather application interface */}
				<div className="bg-white rounded-lg shadow-xl p-8">
					<div className="text-center text-gray-600">
						<div className="text-6xl mb-4">🚧</div>
						<h3 className="text-xl font-semibold mb-2">Implementation Needed</h3>
						<p className="mb-4">
							Replace this placeholder with your weather application interface.
						</p>
						<div className="bg-gray-50 rounded-lg p-4 text-left">
							<h4 className="font-medium mb-2">Your interface should include:</h4>
							<ul className="list-disc list-inside space-y-1 text-sm">
								<li>Country selection or search</li>
								<li>Optional city selection within chosen country</li>
								<li>Weather data display (temperature, humidity, wind, etc.)</li>
								<li>Error handling for invalid selections</li>
								<li>Loading states during API calls</li>
								<li>Responsive design for mobile and desktop</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-8 text-center text-white/70">
					<p className="text-sm">
						💡 <strong>Tip:</strong> Use the sample data provided in <code>weatherData.ts</code> for your implementation.
						<br />
						Available countries include Germany, United States, Canada, Japan, and more!
					</p>
				</div>
			</div>
		</div>
	);
}
