# CampusDeals API Documentation

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "user_password": "password123",
  "role": "buyer", // Optional: "buyer", "seller", "admin"
  "user_phone": "1234567890",
  "user_studyyear": "3rd Year",
  "user_branch": "Computer Science",
  "user_section": "A",
  "user_residency": "Hostel"
}
```

**Response:**
```json
{
  "message": "✅ User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "user_email": "john@example.com",
  "user_password": "password123"
}
```

**Response:**
```json
{
  "message": "✅ Login successful",
  "token": "jwt_token_here",
  "user": {
    "userId": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

### 3. Get User Profile (Protected)
**GET** `/api/auth/profile`

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "message": "✅ Profile retrieved successfully",
  "user": {
    "user_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "role": "buyer",
    "user_phone": "1234567890",
    "user_studyyear": "3rd Year",
    "user_branch": "Computer Science",
    "user_section": "A",
    "user_residency": "Hostel",
    "payment_received": 0,
    "amount_given": 0
  }
}
```

## Protected Routes

All protected routes require the Authorization header:
```
Authorization: Bearer jwt_token_here
```

### Products
- **GET** `/api/products` - Public (view products)
- **POST** `/api/products` - Admin/Seller only (add product)
- **PUT** `/api/products/:id` - Admin/Seller only (update product)
- **DELETE** `/api/products/:id` - Admin only (delete product)

### Cart
- **POST** `/api/cart` - Authenticated user (add to cart)
- **GET** `/api/cart` - Authenticated user (get user's cart)
- **PUT** `/api/cart/:id` - Authenticated user (update cart item)
- **DELETE** `/api/cart/:id` - Authenticated user (remove from cart)

### Orders
- **POST** `/api/orders` - Authenticated user (create order)
- **GET** `/api/orders` - Authenticated user (get user's orders)
- **GET** `/api/orders/all` - Admin only (get all orders)
- **PUT** `/api/orders/:id` - User/Admin (update order status)
- **DELETE** `/api/orders/:id` - Admin only (delete order)

### Users
- **GET** `/api/users` - Admin only (get all users)
- **PUT** `/api/users/:id` - User/Admin (update user profile)
- **DELETE** `/api/users/:id` - Admin only (delete user)

## User Roles

1. **buyer** - Can browse products, add to cart, place orders
2. **seller** - Can add/update products, plus all buyer permissions
3. **admin** - Full access to all endpoints

## Error Responses

```json
{
  "message": "❌ Error description here"
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized (token required)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 409: Conflict (e.g., email already exists)
- 500: Internal Server Error

## Frontend Usage Example

```javascript
// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_email: 'john@example.com',
    user_password: 'password123'
  })
});

const loginData = await loginResponse.json();
const token = loginData.token;

// Store token (localStorage, sessionStorage, etc.)
localStorage.setItem('authToken', token);

// Use token in subsequent requests
const cartResponse = await fetch('/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```
