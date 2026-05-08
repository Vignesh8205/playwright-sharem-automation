# Playwright Sharem Automation Framework

Comprehensive Playwright automation framework for testing Sharem screen sharing application with Page Object Model (POM) architecture.

## 📋 Features

- ✅ **Page Object Model (POM)** - Clean, maintainable test structure
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Cross-Browser Testing** - Chrome, Firefox, Safari, Edge
- ✅ **Mobile Testing** - iPhone and Android device simulation
- ✅ **Network Simulation** - Throttling, offline testing, slow networks
- ✅ **Comprehensive Logging** - Debug-friendly test execution
- ✅ **Visual Reports** - HTML, JSON, and JUnit report formats
- ✅ **Video Recording** - Capture failures for debugging
- ✅ **Screenshot Capture** - On-failure and custom captures

## 📋 Prerequisites

- **Node.js** >= 16.x
- **npm** or **yarn**
- **Git**

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Vignesh8205/playwright-sharem-automation.git
cd playwright-sharem-automation
```

### Install Dependencies

```bash
npm install
npx playwright install
```

## 📁 Project Structure

```
playwright-sharem-automation/
├── tests/                 # Test specifications
├── pages/                 # Page Object Models
├── fixtures/              # Test fixtures
├── utils/                 # Utility functions
├── config/                # Configuration files
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies
└── README.md             # This file
```

## 🧪 Running Tests

```bash
npm test                      # Run all tests
npm run test:headed           # Run with browser visible
npm run test:debug            # Run in debug mode
npm run test:ui               # Interactive UI mode
npm run test:chrome           # Chrome only
npm run test:all-browsers     # All browsers
npm run report                # View HTML report
```

## 📊 Test Coverage

**44 Automatable Tests** covering:
- Performance (3)
- Network (3)
- Security (4)
- Accessibility (3)
- Storage (3)
- Mobile (3)
- Browser Compatibility (4)
- Concurrency (3)
- Error Handling (3)
- Data Validation (3)
- Browser Behavior (3)
- API Integration (1)
- Screen Share (5)

## 📝 Configuration

Create `.env` file:

```env
BASE_URL=https://sharemdev.netlify.app
API_BASE_URL=https://api.sharemdev.netlify.app
DEBUG=false
```

## 🎯 Best Practices

- Use Page Object Model for selectors
- Write descriptive test names
- Use fixtures for common setup
- Add meaningful assertions
- Use Logger for debugging

## 📝 License

MIT License

## 💬 Support

For issues or questions, create a GitHub issue.

---

**Happy Testing! 🚀**
