# App Review Stats API

A backend REST API service for managing and analyzing application reviews and ratings. Built with TypeScript and Express.js, this service provides endpoints for retrieving review statistics, managing comments, and analyzing rating distributions.

## 📋 GitHub Repository

**Repository URL:** [https://github.com/yourusername/app-review-stats](https://github.com/yourusername/app-review-stats)

*Replace with your actual GitHub repository URL*

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/app-review-stats.git
cd app-review-stats

# Install dependencies
npm install
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Health Check
```
GET /health
```
Returns server health status.

### Review Statistics
```
GET /api/reviews/stats
```
Returns comprehensive review statistics including average rating and distribution.

### Average Rating
```
GET /api/reviews/average
```
Returns the average rating across all reviews.

### Latest Comments
```
GET /api/reviews/latest?limit=10
```
Returns the most recent comments/reviews. Optional `limit` parameter to specify number of results.

### Create Review
```
POST /api/reviews
Content-Type: application/json

{
  "body": "Review text",
  "user": "username",
  "rating": 5
}
```
Creates a new review/comment. Rating must be between 1-5.

For detailed request/response examples, see **API_TESTS.md**

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Testing:** Jest
- **HTTP Client:** Axios
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv for configuration

## 📁 Project Structure

```
src/
├── index.ts           # Entry point
├── server.ts          # Express app configuration
├── config.ts          # Configuration management
├── types.ts           # TypeScript type definitions
├── routes/
│   └── reviews.ts     # Review API routes
├── services/
│   └── reviewService.ts   # Business logic
└── utils/
    └── logger.ts      # Logging utility

tests/
└── reviews.test.ts    # API tests

API_TESTS.md           # Postman/Thunder Client test guide
jest.config.js         # Jest configuration
tsconfig.json          # TypeScript configuration
```

## 🧪 Testing

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# With coverage report
npm test:coverage
```

Test cases include:
- ✅ Valid review creation
- ✅ Rating validation (1-5 range)
- ✅ Required field validation
- ✅ Statistics calculation
- ✅ Error handling

See **API_TESTS.md** for detailed test scenarios and how to test with Postman/Thunder Client.

## 🔧 Configuration

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

## 📝 API Testing Guide

Two ways to test the API:

### 1. Using Postman or Thunder Client
- Import the requests from **API_TESTS.md**
- Start the server with `npm run dev`
- Test each endpoint as documented

### 2. Using Jest Tests
```bash
npm test
```

## 🎯 Features

- ✅ RESTful API design
- ✅ Input validation with detailed error messages
- ✅ Comprehensive error handling
- ✅ CORS support
- ✅ TypeScript for type safety
- ✅ Logging utility for debugging
- ✅ Jest test suite with comprehensive coverage
- ✅ Clean, maintainable code structure

## 📧 Support

For issues or questions, please check the GitHub repository or create an issue.

## 📄 License

ISC
