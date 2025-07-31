# Next.js Weather Application - Full-Stack Interview Test

## 🎯 Test Overview

This is a comprehensive full-stack development assessment that evaluates your skills in React, Next.js, TypeScript, API development, and test-driven development. You'll be building a weather application that demonstrates clean code practices, proper error handling, and thorough testing.

**Estimated Time**: 1-2 hours  
**Difficulty Level**: Mid-Level  
**Target Roles**: Full-Stack Developer

## � Quick Start

### Option 1: GitHub Codespaces (Recommended)
Click the badge below to instantly set up a complete development environment:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hands-in/interview-repo?quickstart=1)

### Option 2: Local Development
```bash
# Clone and setup
git clone https://github.com/hands-in/interview-repo.git
cd interview-repo
pnpm install

# Start the weather app
nx dev weather

# Run tests (in another terminal)
nx test weather

# Run tests in watch mode for TDD
nx test weather --watch
```

The application will be available at `http://localhost:3000`.

## 📋 Project Requirements

### Core Functionality
Build a weather application with the following features:

1. **Weather Display Interface**
   - Display weather information for countries and cities
   - Show temperature, description, humidity, wind speed, and weather icons
   - Allow users to select countries and optionally specific cities
   - Implement clean, responsive UI with proper loading states

2. **Weather API**
   - Create RESTful endpoints for weather data retrieval and updates
   - GET endpoint: Returns latest weather data (all cities if no city specified)
   - POST endpoint: Updates weather data for specific dates and locations
   - Implement proper HTTP status codes and error responses

3. **Weather Service Implementation**
   - Implement the `WeatherService` interface provided
   - getWeather: Returns weather data based on country, optionally filtered by city/date
   - updateWeather: Updates weather data for a specific date and location
   - Use the provided sample weather data

4. **Testing**
   - Write tests for your weather service and API endpoints
   - Include both success and error case testing
   - Follow test-driven development practices

### Technical Requirements

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS (pre-configured)
- **Testing**: Jest with comprehensive test suites
- **API Design**: RESTful endpoints with proper error handling
- **Code Quality**: Clean, maintainable, and well-documented code

## 📁 Project Structure

```
nextjs-weather/
├── src/
│   └── app/
│       ├── layout.tsx                    # Root layout
│       ├── page.tsx                      # Main weather page (provided)
│       ├── not-found.tsx                 # 404 page
│       └── api/weather
│           ├── route.ts                  # API endpoints (implement)
│           ├── DefaultWeatherService.ts  # Class interface (implement)
│           ├── WeatherService.test.ts    # Test suite (implement)
├── package.json
├── project.json                          # Nx configuration
├── jest.config.ts                        # Jest configuration
└── README.md                             # This file
```

## 🧪 Development Approach: TDD/BDD

This test is designed to be completed using **Test-Driven Development (TDD)** and **Behavior-Driven Development (BDD)** principles:

### 1. Start with Tests (Red Phase)
```bash
# Run tests to see what needs to be implemented
nx test weather --watch
```

The provided test file contains test cases that define the expected behavior. Review the test names to understand the requirements, then implement functionality to make tests pass.

### 2. Implement Functionality (Green Phase)
Write the minimal code needed to make each test pass:

1. **WeatherService Implementation**
   - Create a class that implements the `WeatherService` interface
   - Use the provided sample data from `weatherData.ts`
   - Implement getWeather and updateWeather methods

2. **API Routes Implementation**
   - Implement GET `/api/weather` endpoint with query parameters
   - Implement POST `/api/weather` endpoint for updates
   - Add proper validation and error responses

3. **Frontend Implementation**
   - Build UI components that consume your API
   - Add proper loading states and error handling
   - Make the interface responsive and accessible

### 3. Refactor and Improve (Refactor Phase)
- Clean up code and improve structure
- Add additional error handling
- Optimize performance
- Enhance user experience

## 📊 Available Sample Data

The test includes comprehensive sample weather data for multiple countries and cities:

**Available Countries:**
- United States (New York, Los Angeles, Seattle)
- United Kingdom (London, Manchester)
- Canada (Toronto, Vancouver, Montreal)
- Germany (Berlin, Munich)
- France (Paris, Nice)
- Japan (Tokyo, Osaka)
- Australia (Sydney, Melbourne)
- Brazil (São Paulo, Rio de Janeiro)
- India (Mumbai, New Delhi)
- Norway (Oslo, Bergen)

**Weather Types:**
- SUNNY: Clear and sunny conditions
- RAINY: Rain showers and precipitation
- CLOUDY: Overcast and cloudy skies
- HAIL: Hailstorms and severe weather
- SNOW: Snow and winter conditions

## 🎯 Implementation Tasks

### Phase 1: Backend Development (TDD Focus)
- [ ] **WeatherService Implementation**
  - [ ] Implement `getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[]`
  - [ ] Implement `updateWeather(date: Date, weather: WeatherData): void`
  - [ ] Handle case-insensitive country/city matching
  - [ ] Return latest data when no date specified
  - [ ] Return all cities when no city specified

- [ ] **API Routes Implementation**
  - [ ] GET `/api/weather?country=<name>` - Get all cities in a country
  - [ ] GET `/api/weather?country=<name>&city=<name>` - Get specific city weather
  - [ ] GET `/api/weather?country=<name>&date=<date>` - Get weather for specific date
  - [ ] POST `/api/weather` - Update weather data
  - [ ] Implement proper HTTP status codes (200, 400, 404, 500)
  - [ ] Add request validation and error handling

### Phase 2: Frontend Development
- [ ] **Weather Display Components**
  - [ ] Country selection/search interface
  - [ ] Weather data display with proper styling
  - [ ] City-specific weather detail view
  - [ ] Loading states and error boundaries

- [ ] **User Experience**
  - [ ] Responsive design for mobile and desktop
  - [ ] Proper accessibility (ARIA labels, keyboard navigation)
  - [ ] Intuitive navigation and user flow
  - [ ] Error messages and user feedback

### Phase 3: Testing and Quality
- [ ] **Test Coverage**
  - [ ] Unit tests for WeatherService methods
  - [ ] Integration tests for API endpoints
  - [ ] Error handling and edge case tests

- [ ] **Code Quality**
  - [ ] TypeScript strict mode compliance
  - [ ] Clean code principles
  - [ ] Proper documentation and comments

## 🧪 Testing Strategy

### Test-Driven Development
The test file provides test cases with descriptive names that define the expected behavior. Focus on making tests pass rather than over-implementing features.

### Key Test Areas
- WeatherService method functionality
- API endpoint behavior and error handling
- Data validation and edge cases

## 📈 Evaluation Criteria

### Technical Implementation (35%)
- **Code Quality**: Clean, readable, and maintainable code
- **TypeScript Usage**: Proper type definitions and type safety
- **Architecture**: Well-structured components and services
- **Best Practices**: Following React/Next.js conventions
- **Performance**: Efficient data handling and rendering

### API Design (25%)
- **RESTful Design**: Proper HTTP methods and endpoints
- **Error Handling**: Comprehensive error responses with appropriate status codes
- **Validation**: Input validation and data sanitization
- **Documentation**: Clear API interface and usage examples

### Testing (25%)
- **TDD Approach**: Evidence of test-driven development
- **Test Coverage**: Comprehensive test suite covering functionality
- **Test Quality**: Meaningful, well-structured tests
- **Edge Cases**: Testing error conditions and boundary cases

### User Experience (15%)
- **Interface Design**: Clean, intuitive, and accessible UI
- **Responsiveness**: Works well across different screen sizes
- **Error Handling**: Graceful handling of errors with user feedback
- **Performance**: Fast loading and smooth interactions

## 💡 Implementation Tips

### Getting Started
1. **Read the tests first** - They define the expected behavior
2. **Start with the backend** - Implement WeatherService and API routes
3. **Use the sample data** - Import and utilize the provided weather data
4. **Follow TDD** - Write tests, watch them fail, implement, refactor

### Best Practices
- **Type everything**: Use TypeScript interfaces for all data structures
- **Handle errors gracefully**: Always provide meaningful error messages
- **Keep it simple**: Focus on core functionality before adding extras
- **Test edge cases**: Consider invalid inputs and error scenarios

### Common Pitfalls to Avoid
- **Skipping tests**: Tests are part of the evaluation
- **Overcomplicating**: Focus on requirements rather than extra features
- **Poor error handling**: Always handle potential failures
- **Ignoring accessibility**: Ensure the app is usable by everyone

## � Available Commands

```bash
# Development
nx dev weather              # Start development server
nx build weather            # Build for production

# Testing
nx test weather             # Run all tests once
nx test weather --watch     # Run tests in watch mode (recommended for TDD)
nx test weather --coverage  # Run tests with coverage report

# Code Quality
nx lint weather             # Run linting
pnpm typecheck             # TypeScript type checking
```

## 🌟 Bonus Implementation Ideas

If you complete the core requirements quickly, consider these enhancements:

### Advanced Features
- **Search Functionality**: Implement autocomplete for countries/cities
- **Weather History**: Track and display weather changes over time
- **Favorites**: Allow users to save favorite locations
- **Data Visualization**: Add charts for weather trends

### Technical Enhancements
- **Caching**: Implement API response caching
- **Real API Integration**: Connect to a live weather service
- **State Management**: Use React Context or external state management
- **Progressive Enhancement**: Add offline support

### UI/UX Improvements
- **Animations**: Smooth transitions and micro-interactions
- **Themes**: Light/dark mode toggle
- **Advanced Layouts**: Dashboard-style interface
- **Mobile App Feel**: PWA features

## ❓ Frequently Asked Questions

**Q: Should I implement all the tests at once?**
A: No! Follow TDD - implement one test at a time, make it pass, then move to the next.

**Q: Can I modify the sample data?**
A: You can extend it, but don't remove existing data as tests may depend on it.

**Q: How detailed should error handling be?**
A: Comprehensive - handle invalid inputs, missing data, and edge cases gracefully.

**Q: Should I focus more on frontend or backend?**
A: Both are important, but start with backend (API) as the frontend depends on it.

**Q: What if I don't finish everything?**
A: Quality over quantity - focus on doing fewer things well rather than rushing through everything.

## 🎯 Success Indicators

You're on the right track if:
- ✅ Tests are passing and guiding your development
- ✅ API endpoints return proper data and error responses
- ✅ Frontend handles loading states and errors gracefully
- ✅ Code is clean, typed, and well-documented
- ✅ Application works smoothly for the happy path and edge cases

## 📞 Need Help?

- **Environment Issues**: Ask your interviewer for assistance with setup
- **Requirement Clarification**: Questions about requirements are encouraged
- **Technical Guidance**: Focus on approach and best practices, not specific implementation details

---

**Good luck!** Remember, we're evaluating your problem-solving process, code quality, and testing approach as much as the final product. Take your time to write clean, well-tested code that demonstrates your best practices.

## 🎯 Implementation Tasks

### 1. Frontend Development (page.tsx)
- [ ] Create a form to input location/city name
- [ ] Display weather information in a visually appealing format
- [ ] Implement loading states and error handling
- [ ] Make the UI responsive and accessible
- [ ] Add proper TypeScript types for your components

### 2. API Development (route.ts)
- [ ] Implement the GET endpoint to fetch weather data
- [ ] Implement the POST endpoint to update weather data
- [ ] Add proper request validation
- [ ] Implement error handling with appropriate HTTP status codes
- [ ] Return data in the `ExampleWeatherData` format

### 3. Weather Service Implementation
- [ ] Create a class that implements `WeatherPredictorService`
- [ ] Implement `getWeather(date: Date): Weather` method
- [ ] Implement `updateWeather(date: Date, weather: Weather): void` method
- [ ] Add proper data persistence (in-memory is acceptable)
- [ ] Handle edge cases and invalid inputs

### 4. Testing (WeatherService.test.ts)
- [ ] Write tests for the weather API endpoints
- [ ] Test both successful responses and error cases
- [ ] Test the WeatherPredictorService implementation
- [ ] Achieve good test coverage
- [ ] Use proper Jest testing patterns

### 5. Optional Enhancements
- [ ] Integrate with a real weather API (OpenWeatherMap, etc.)
- [ ] Add weather forecasting for multiple days
- [ ] Implement data caching
- [ ] Add weather history tracking
- [ ] Include weather-based UI themes

## 📊 Evaluation Criteria

### Technical Implementation (40%)
- **Code Quality**: Clean, readable, and maintainable code
- **TypeScript Usage**: Proper type definitions and type safety
- **Architecture**: Well-structured components and services
- **Best Practices**: Following React/Next.js conventions

### API Design (25%)
- **RESTful Design**: Proper HTTP methods and status codes
- **Error Handling**: Comprehensive error responses
- **Validation**: Input validation and sanitization
- **Documentation**: Clear API interface

### Testing (20%)
- **Test Coverage**: Comprehensive test suite
- **Test Quality**: Meaningful and well-structured tests
- **Edge Cases**: Testing error conditions and edge cases
- **Testing Best Practices**: Following Jest conventions

### User Experience (15%)
- **Interface Design**: Clean and intuitive UI
- **Responsiveness**: Works well on different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Efficient rendering and data fetching

## 💡 Implementation Tips

### Getting Started
1. Start with the API implementation (`route.ts` and `WeatherService.ts`)
2. Write tests as you implement features
3. Build the frontend to consume your API
4. Iterate and improve based on testing

### Best Practices
- Use TypeScript interfaces for all data structures
- Implement proper error boundaries in React
- Add loading states for better UX
- Use semantic HTML elements
- Follow accessibility guidelines

### Common Pitfalls to Avoid
- Don't skip error handling
- Don't forget to validate API inputs
- Don't neglect responsive design
- Don't write tests as an afterthought

## 🔧 Available Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run Jest tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage report

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript compiler check
```

## 🌟 Bonus Points

Implementing any of these will demonstrate advanced skills:

- **Performance Optimization**: Implement caching, memoization, or other optimizations
- **Real API Integration**: Connect to a live weather service
- **Advanced UI**: Animations, micro-interactions, or advanced layouts
- **State Management**: Use React Context or external state management
- **Progressive Enhancement**: Offline support or service workers
- **Monitoring**: Error tracking or performance monitoring

## ❓ Frequently Asked Questions

**Q: Can I use external libraries?**
A: Yes, but justify your choices. Prefer built-in solutions when possible.

**Q: Should I implement real weather API integration?**
A: Optional. Focus on the core requirements first, then enhance if time permits.

**Q: How detailed should my tests be?**
A: Cover the main functionality and edge cases. Aim for meaningful tests over 100% coverage.

**Q: What if I don't finish everything?**
A: Prioritize core functionality and code quality over feature completeness.

## 📞 Need Help?

- **Environment Issues**: Ask your interviewer for assistance
- **Requirement Clarification**: Questions about requirements are encouraged
- **Technical Guidance**: Focus on implementation approach, not specific solutions

---

**Good luck!** Remember to focus on code quality, testing, and clear communication of your approach.
