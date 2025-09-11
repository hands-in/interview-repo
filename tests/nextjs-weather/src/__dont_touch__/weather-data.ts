import { Weather, WeatherData } from "./WeatherService";


/**
 * Sample weather data for testing purposes
 * This data serves as a mock database for the weather application
 */
export const SAMPLE_WEATHER_DATA: WeatherData[] = [
  // United States
  {
    country: "United States",
    city: "New York",
    temperature: 22,
    description: "Partly cloudy with light winds",
    humidity: 65,
    windSpeed: 8.5,
    icon: "partly-cloudy",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "United States",
    city: "Los Angeles",
    temperature: 28,
    description: "Sunny and warm",
    humidity: 45,
    windSpeed: 6.2,
    icon: "sunny",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  {
    country: "United States",
    city: "Seattle",
    temperature: 18,
    description: "Light rain with overcast skies",
    humidity: 85,
    windSpeed: 12.3,
    icon: "rainy",
    date: "2025-07-31",
    weather: Weather.RAINY
  },
  
  // United Kingdom
  {
    country: "United Kingdom",
    city: "London",
    temperature: 16,
    description: "Cloudy with occasional drizzle",
    humidity: 78,
    windSpeed: 9.8,
    icon: "cloudy",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "United Kingdom",
    city: "Manchester",
    temperature: 14,
    description: "Heavy rain showers",
    humidity: 92,
    windSpeed: 15.4,
    icon: "heavy-rain",
    date: "2025-07-31",
    weather: Weather.RAINY
  },
  
  // Canada
  {
    country: "Canada",
    city: "Toronto",
    temperature: 20,
    description: "Clear skies and pleasant",
    humidity: 55,
    windSpeed: 7.1,
    icon: "sunny",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  {
    country: "Canada",
    city: "Vancouver",
    temperature: 17,
    description: "Overcast with light rain",
    humidity: 80,
    windSpeed: 10.2,
    icon: "light-rain",
    date: "2025-07-31",
    weather: Weather.RAINY
  },
  {
    country: "Canada",
    city: "Montreal",
    temperature: -5,
    description: "Light snow flurries",
    humidity: 70,
    windSpeed: 11.8,
    icon: "snow",
    date: "2025-07-31",
    weather: Weather.SNOW
  },
  
  // Germany
  {
    country: "Germany",
    city: "Berlin",
    temperature: 19,
    description: "Partly sunny with light clouds",
    humidity: 62,
    windSpeed: 8.9,
    icon: "partly-cloudy",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "Germany",
    city: "Berlin",
    temperature: 19,
    description: "Partly sunny with light clouds",
    humidity: 62,
    windSpeed: 8.9,
    icon: "partly-cloudy",
    date: "2024-02-12",
    weather: Weather.CLOUDY
  },
  {
    country: "Germany",
    city: "Munich",
    temperature: 24,
    description: "Clear and sunny",
    humidity: 48,
    windSpeed: 5.6,
    icon: "sunny",
    date: "2025-08-31",
    weather: Weather.SUNNY
  },
  
  // France
  {
    country: "France",
    city: "Paris",
    temperature: 21,
    description: "Mild with scattered clouds",
    humidity: 58,
    windSpeed: 7.8,
    icon: "partly-cloudy",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "France",
    city: "Nice",
    temperature: 27,
    description: "Sunny and warm",
    humidity: 52,
    windSpeed: 4.3,
    icon: "sunny",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  
  // Japan
  {
    country: "Japan",
    city: "Tokyo",
    temperature: 30,
    description: "Hot and humid",
    humidity: 75,
    windSpeed: 6.7,
    icon: "sunny",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  {
    country: "Japan",
    city: "Osaka",
    temperature: 26,
    description: "Thunderstorms expected",
    humidity: 88,
    windSpeed: 13.2,
    icon: "thunderstorm",
    date: "2025-07-31",
    weather: Weather.RAINY
  },
  
  // Australia
  {
    country: "Australia",
    city: "Sydney",
    temperature: 15,
    description: "Cool and breezy",
    humidity: 65,
    windSpeed: 14.5,
    icon: "windy",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "Australia",
    city: "Melbourne",
    temperature: 12,
    description: "Cold with light hail",
    humidity: 82,
    windSpeed: 18.9,
    icon: "hail",
    date: "2025-07-31",
    weather: Weather.HAIL
  },
  
  // Brazil
  {
    country: "Brazil",
    city: "São Paulo",
    temperature: 23,
    description: "Warm with afternoon showers",
    humidity: 72,
    windSpeed: 9.1,
    icon: "rain-showers",
    date: "2025-07-31",
    weather: Weather.RAINY
  },
  {
    country: "Brazil",
    city: "Rio de Janeiro",
    temperature: 29,
    description: "Sunny and hot",
    humidity: 68,
    windSpeed: 8.2,
    icon: "sunny",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  
  // India
  {
    country: "India",
    city: "Mumbai",
    temperature: 32,
    description: "Hot and humid with monsoon clouds",
    humidity: 85,
    windSpeed: 12.4,
    icon: "humid",
    date: "2025-07-31",
    weather: Weather.CLOUDY
  },
  {
    country: "India",
    city: "New Delhi",
    temperature: 38,
    description: "Very hot and dry",
    humidity: 35,
    windSpeed: 4.8,
    icon: "very-hot",
    date: "2025-07-31",
    weather: Weather.SUNNY
  },
  
  // Norway
  {
    country: "Norway",
    city: "Oslo",
    temperature: 8,
    description: "Cold with heavy snow",
    humidity: 88,
    windSpeed: 16.7,
    icon: "heavy-snow",
    date: "2025-07-31",
    weather: Weather.SNOW
  },
  {
    country: "Norway",
    city: "Bergen",
    temperature: 6,
    description: "Freezing rain and sleet",
    humidity: 95,
    windSpeed: 22.1,
    icon: "freezing-rain",
    date: "2025-07-31",
    weather: Weather.HAIL
  }
];

/**
 * Helper function to get weather data by country
 */
export function getWeatherByCountry(country: string): WeatherData[] {
  return SAMPLE_WEATHER_DATA.filter(
    data => data.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Helper function to get weather data by city
 */
export function getWeatherByCity(city: string): WeatherData | undefined {
  return SAMPLE_WEATHER_DATA.find(
    data => data.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Helper function to get all available countries
 */
export function getAvailableCountries(): string[] {
  return Array.from(new Set(SAMPLE_WEATHER_DATA.map(data => data.country)));
}

/**
 * Helper function to get all cities for a specific country
 */
export function getCitiesForCountry(country: string): string[] {
  return SAMPLE_WEATHER_DATA
    .filter(data => data.country.toLowerCase() === country.toLowerCase())
    .map(data => data.city);
}
