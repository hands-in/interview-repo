# Interview Tests

This directory contains all technical assessments used by Hands In during the interview process. Each test is designed for specific roles and evaluates different technical competencies.

## 🚀 Quick Start

### GitHub Codespaces (Recommended)
The fastest way to set up any test is using GitHub Codespaces:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/hands-in/interview-repo?quickstart=1)

### Local Development
```bash
# Clone and install dependencies
git clone https://github.com/hands-in/interview-repo.git
cd interview-repo
pnpm install

# Run a specific test (example with weather app)
nx dev weather       # Start development server
nx test weather      # Run tests
nx test weather --watch  # Run tests in watch mode for TDD
```

## 🎯 Test Categories

### Full-Stack Development
- **[Next.js Weather App](./nextjs-weather/)**: React/Next.js application testing full-stack development skills
  - **Skills Tested**: TypeScript, API design, error handling, testing, responsive UI
  - **Time**: 1-2 hours
  - **Commands**: `nx dev weather`, `nx test weather --watch`
  - **Focus**: Simple weather service interface with country/city data retrieval

### QA/Testing (Coming Soon)
- Automated testing frameworks
- Test strategy and planning
- Bug reporting and test case design

### Backend Development (Coming Soon)
- API design and implementation
- Database modeling and optimization
- System architecture and scalability

### DevOps (Coming Soon)
- Infrastructure as Code
- CI/CD pipeline setup
- Container orchestration
- Monitoring and logging

## 📋 Test Administration Guidelines

### For Interviewers

#### Pre-Test Setup
1. **Environment Preparation**
   - Ensure the candidate has access to the repository
   - Verify all dependencies are installed
   - Test that the development environment works
   - Prepare any necessary API keys or external resources

2. **Time Management**
   - Each test directory specifies estimated completion time
   - Allow buffer time for questions and environment setup
   - Consider candidate's experience level when setting expectations

3. **Communication Guidelines**
   - Clarify that questions are encouraged
   - Explain the evaluation process
   - Set clear expectations about deliverables

#### During the Test
- **Observation Points**:
  - How does the candidate approach problem-solving?
  - Do they read documentation thoroughly?
  - How do they handle unexpected issues?
  - What questions do they ask?

- **Available Support**:
  - Answer clarifying questions about requirements
  - Help with environment setup issues
  - Provide guidance on tooling if needed
  - Do not provide solution hints or implementation guidance

#### Post-Test Evaluation
- **Technical Assessment**:
  - Code quality and organization
  - Problem-solving approach
  - Use of best practices
  - Test coverage and quality

- **Soft Skills Assessment**:
  - Communication during the process
  - Question quality and frequency
  - Time management
  - Adaptability to feedback

## 🧑‍💻 For Candidates

### Before You Start
1. **Read Carefully**: Each test has specific requirements and constraints
2. **Ask Questions**: Clarify anything that's unclear before coding
3. **Plan Your Approach**: Take time to understand the problem before implementing
4. **Check Your Environment**: Ensure all tools are working properly

### During the Test
- **Focus Areas**:
  - Write clean, readable code
  - Follow the specified requirements
  - Include appropriate error handling
  - Add meaningful tests
  - Document your decisions

- **Best Practices**:
  - Commit your changes regularly
  - Use meaningful commit messages
  - Comment complex logic
  - Handle edge cases
  - Follow established code style

### What We Evaluate

#### Technical Skills
- **Code Quality**: Clean, maintainable, and well-structured code
- **Problem Solving**: Logical approach to breaking down and solving problems
- **Technology Proficiency**: Effective use of the required tech stack
- **Testing**: Appropriate test coverage and quality
- **Documentation**: Clear README updates and code comments

#### Process Skills
- **Requirement Analysis**: Understanding and following specifications
- **Time Management**: Prioritizing features and managing scope
- **Communication**: Asking relevant questions and explaining decisions
- **Debugging**: Ability to identify and resolve issues

## 📊 Test Difficulty Levels

### Junior Level (1-2 years experience)
- Basic implementation following provided examples
- Focus on functionality over optimization
- Guided requirements with clear acceptance criteria
- Emphasis on learning and following best practices

### Mid Level (3-5 years experience)
- Independent problem-solving with minimal guidance
- Consideration of performance and scalability
- Test-driven development approach
- Architectural decision-making

### Senior Level (5+ years experience)
- Complex problem-solving with ambiguous requirements
- System design and architecture considerations
- Leadership and mentoring simulation
- Performance optimization and security considerations

## 🔧 Test Environment Setup

Each test includes its own setup instructions, but general requirements include:

### Software Requirements
- Node.js 22
- pnpm package manager
- Git
- Modern web browser
- Code editor (VS Code recommended)

### Common Commands
```bash
# Install dependencies for all tests
pnpm install

# Run a specific test's development server
nx dev [test-name]           # e.g., nx dev weather

# Run tests
nx test [test-name]          # e.g., nx test weather
nx test [test-name] --watch  # Run in watch mode for TDD

# Build production version
nx build [test-name]         # e.g., nx build weather
```

## 📝 Adding New Tests

### Test Creation Checklist
- [ ] Create descriptive directory name
- [ ] Add comprehensive README with requirements
- [ ] Include starter code and assets
- [ ] Define clear acceptance criteria
- [ ] Specify evaluation rubric
- [ ] Add time estimates
- [ ] Test the setup process
- [ ] Update this directory's README

### Required Files
- `README.md`: Complete test instructions
- `package.json`: Dependencies and scripts
- `project.json`: Nx configuration
- `src/`: Starter code and assets
- `.env.example`: Environment variable template (if needed)

## 🎓 Learning Resources

For candidates who want to prepare, here are some recommended resources:

### General
- [MDN Web Docs](https://developer.mozilla.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

### Full-Stack Development
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Testing
- [Testing JavaScript](https://testingjavascript.com/)
- [Playwright Documentation](https://playwright.dev/)

---

**Good luck with your assessment!** Remember, we're not just evaluating your final solution, but also your problem-solving process and communication skills.
