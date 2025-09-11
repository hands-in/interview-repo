# Next.js Weather Application - Full-Stack Interview Test

## 🎯 Test Overview

This is a comprehensive full-stack development assessment that evaluates your skills in React, Next.js, TypeScript, API development, and test-driven development. You'll be building a weather application that demonstrates clean code practices, proper error handling, and thorough testing.

**Estimated Time**: 1-1.5 hours  
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

## � What's Provided vs What You Need to Implement

### ✅ Already Provided (Ready to Use)

#### Frontend Pages
- **[`src/app/page.tsx`](src/app/page.tsx)** - Landing page with navigation to demo pages
- **[`src/app/weather/get/page.tsx`](src/app/weather/get/page.tsx)** - Complete weather display page
  - ✅ Country/city selection form
  - ✅ API integration for GET requests
  - ✅ Weather data display components
  - ✅ Error handling and loading states
  - ✅ Responsive design

#### Backend Structure
- **[`src/app/api/WeatherService.ts`](src/app/api/WeatherService.ts)** - Complete interface definition
  - ✅ WeatherService interface with method signatures
  - ✅ WeatherData type definition
  - ✅ Weather enum with all weather types
  - ✅ Clear documentation of expected behavior

- **[`src/app/api/weatherData.ts`](src/app/api/weatherData.ts)** - Complete sample data
  - ✅ 22 weather entries across 10 countries
  - ✅ Helper functions for data filtering
  - ✅ Realistic weather data with all required fields

#### Testing Framework
- **[`src/app/api/WeatherService.test.ts`](src/app/api/WeatherService.test.ts)** - Test structure with examples
  - ✅ Test suite organization with describe blocks
  - ✅ Test case names that define expected behavior
  - ✅ One example test implementation to guide your approach
  - ✅ Placeholder tests covering all major functionality

#### Configuration
- ✅ Next.js 15 setup with App Router
- ✅ TypeScript configuration with strict mode
- ✅ Tailwind CSS styling framework
- ✅ Jest testing configuration
- ✅ Nx workspace integration

### 🚧 What You Need to Implement

#### 1. Weather Service Class
**File: Create your implementation (suggested: `src/app/api/WeatherServiceImpl.ts`)**
- [ ] Create a class that implements the `WeatherService` interface
- [ ] Implement `getWeather(params: { country: string; city?: string; date?: Date }): WeatherData[]`
  - [ ] Return all cities when no city specified
  - [ ] Return latest data when no date specified
  - [ ] Handle case-insensitive country/city matching
- [ ] Implement `updateWeather(date: Date, weather: WeatherData): void`
  - [ ] Add new weather data or update existing entries
  - [ ] Validate input data before updating

#### 2. Test Implementation
**File: [`src/app/api/WeatherService.test.ts`](src/app/api/WeatherService.test.ts)** (Structure provided)
- [ ] Replace placeholder tests with actual implementations
- [ ] Test your WeatherService class methods

#### 3. API Endpoints
**File: [`src/app/api/route.ts`](src/app/api/route.ts)** (Currently has placeholder implementation)
- [ ] **POST `/api/weather`** endpoint
  - [ ] Parse and validate request body (WeatherData object)
  - [ ] Use your WeatherService to update data
  - [ ] Return success/error responses with appropriate status codes
  - [ ] Test API endpoint behavior (GET and POST)

#### 4. Update Weather Form Integration
**File: [`src/app/weather/update/page.tsx`](src/app/weather/update/page.tsx)** (50% complete)
- [ ] Complete the `handleSubmit` function
  - [ ] Create WeatherData object from form state
  - [ ] Send POST request to `/api/weather`
  - [ ] Handle response and update UI state (success/error)
  - [ ] Reset form on successful submission


### 📋 Implementation Checklist

#### Backend (Priority 1)
- [ ] Create WeatherService implementation class
- [ ] Implement POST `/api/weather` endpoint with data validation
- [ ] Add proper error handling and HTTP status codes

#### Testing (Priority 2)
- [ ] Implement unit tests for your WeatherService methods
- [ ] Test error scenarios and edge cases
- [ ] Verify test coverage of core functionality

#### Frontend Integration (Priority 3)  
- [ ] Complete the update weather form submission logic
- [ ] Test the weather display page with your GET endpoint
- [ ] Ensure proper error handling in the UI


## �📱 Demo Pages

The test includes two demo pages to help you test and implement your solution:

### 1. Weather Display Page (`/weather/get`)
- **Status**: ✅ Ready to use
- **Purpose**: Test your GET endpoint implementation
- **Features**: 
  - Country and city selection
  - Displays weather data from your API
  - Error handling and loading states
  - Already connected to `/api/weather`

### 2. Update Weather Page (`/weather/update`)
- **Status**: 🚧 50% Complete
- **Purpose**: Implement POST endpoint functionality
- **What's Done**:
  - Complete form UI with all weather fields
  - Form validation and state management
  - Error and success messaging
  - Responsive design
- **What You Need to Do**:
  - Implement the API call in the form submission
  - Handle the response properly
  - Ensure your POST endpoint accepts the data format

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
│       ├── page.tsx                      # Main weather page (starter code)
│       ├── not-found.tsx                 # 404 page
│       ├── weather/
│       │   ├── get/
│       │   │   └── page.tsx              # Weather display page (ready to test GET endpoint)
│       │   └── update/
│       │       └── page.tsx              # Weather update page (50% complete - implement POST)
│       └── api/
│           ├── route.ts                  # API endpoints (implement)
│           ├── WeatherService.ts         # Service interface (provided)
│           ├── WeatherService.test.ts    # Test suite (implement)
│           └── weatherData.ts            # Sample data (provided)
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

## 🎯 Implementation Approach

### Recommended Order
1. **Start with Backend** - Implement WeatherService class and API endpoints
2. **Test as You Go** - Use the provided tests to guide your implementation
3. **Complete Frontend** - Finish the update weather form integration
4. **Refine and Test** - Add error handling and edge case coverage

### Phase 1: Core Backend (Essential)
- Implement WeatherService class with getWeather and updateWeather methods
- Complete GET and POST API endpoints in `route.ts`
- Ensure proper error handling and validation

### Phase 2: Frontend Integration (Essential)
- Complete the update weather form submission in `weather/update/page.tsx`
- Test both demo pages work with your API implementation

### Phase 3: Testing & Quality (Essential)
- Implement the test cases in `WeatherService.test.ts`
- Add error handling tests
- Ensure code quality and TypeScript compliance

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
