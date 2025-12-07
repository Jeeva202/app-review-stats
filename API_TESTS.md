# API Testing Guide - Postman/Thunder Client

## Start Server
```bash
npm run dev
```
Server runs on: `http://localhost:3000`

---

## 1. GET /health - Health Check
```
GET http://localhost:3000/health
```
**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-08T12:00:00.000Z"
}
```

---

## 2. GET /api/reviews/stats - Review Statistics
```
GET http://localhost:3000/api/reviews/stats
```
**Response:**
```json
{
  "averageRating": 3.45,
  "totalReviews": 100,
  "ratingDistribution": {
    "1": 10,
    "2": 15,
    "3": 25,
    "4": 30,
    "5": 20
  }
}
```

---

## 3. GET /api/reviews/average - Average Rating
```
GET http://localhost:3000/api/reviews/average
```
**Response:**
```json
{
  "averageRating": 3.45
}
```

---

## 4. GET /api/reviews/latest - Latest Comments
```
GET http://localhost:3000/api/reviews/latest
```

**With limit parameter:**
```
GET http://localhost:3000/api/reviews/latest?limit=5
```

**Response:**
```json
{
  "count": 10,
  "comments": [
    {
      "id": 1,
      "body": "Great product!",
      "user": "john_doe",
      "rating": 5,
      "createdAt": "2025-12-08T10:30:00.000Z"
    },
    {
      "id": 2,
      "body": "Good quality",
      "user": "jane_smith",
      "rating": 4,
      "createdAt": "2025-12-08T09:15:00.000Z"
    }
  ]
}
```

---

## 5. POST /api/reviews - Create New Comment

```
POST http://localhost:3000/api/reviews
Content-Type: application/json

{
  "body": "Excellent product, highly recommended!",
  "user": "test_user",
  "rating": 5
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "id": 101,
    "body": "Excellent product, highly recommended!",
    "user": "test_user",
    "rating": 5,
    "createdAt": "2025-12-08T12:45:00.000Z"
  }
}
```

**Error Response (400) - Missing fields:**
```json
{
  "success": false,
  "message": "Missing required fields: body, user, rating"
}
```

**Error Response (400) - Invalid rating:**
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

---

## Test Cases

### ✅ Valid Cases

**Test 1: Create with rating 1**
```json
{
  "body": "Not satisfied",
  "user": "user1",
  "rating": 1
}
```

**Test 2: Create with rating 5**
```json
{
  "body": "Perfect!",
  "user": "user2",
  "rating": 5
}
```

**Test 3: Get latest with limit 3**
```
GET http://localhost:3000/api/reviews/latest?limit=3
```

### ❌ Invalid Cases

**Test 4: Missing body**
```json
{
  "user": "user1",
  "rating": 5
}
```
Expected: 400 error

**Test 5: Missing user**
```json
{
  "body": "Good product",
  "rating": 4
}
```
Expected: 400 error

**Test 6: Rating too high (6)**
```json
{
  "body": "Test",
  "user": "user1",
  "rating": 6
}
```
Expected: 400 error

**Test 7: Rating too low (0)**
```json
{
  "body": "Test",
  "user": "user1",
  "rating": 0
}
```
Expected: 400 error

**Test 8: Empty body**
```json
{
  "body": "   ",
  "user": "user1",
  "rating": 3
}
```
Expected: 400 error

---

## Import into Postman/Thunder Client

### For Postman:
1. Create new collection
2. Add requests as shown above
3. Test each endpoint

### For Thunder Client:
1. Create new environment with variable: `base_url = http://localhost:3000`
2. Use `{{base_url}}` in requests
3. Test each endpoint

---

## Expected Behavior

- ✅ All GET endpoints return 200 with proper data
- ✅ POST with valid data returns 201 with created comment
- ✅ POST with invalid data returns 400 with error message
- ✅ Invalid routes return 404
- ✅ Average rating is between 0-5
- ✅ Rating distribution adds up to total reviews
