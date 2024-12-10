# OnTime-BackEnd-API Documentation

## `/users/register` - User Registration

### **Method**: `POST`

### **Description**:

This endpoint allows new users to register by providing their full name, email, and password. The password is securely hashed before storing in the database. On successful registration, a JSON Web Token (JWT) is generated and returned to the user.

---

### **Request Body**:

The request body should be in JSON format and include the following fields:

| Field                | Type     | Required | Description                                       |
| -------------------- | -------- | -------- | ------------------------------------------------- |
| `fullName.firstName` | `string` | Yes      | The user's first name (minimum 3 characters).     |
| `fullName.lastName`  | `string` | Yes      | The user's last name (minimum 3 characters).      |
| `email`              | `string` | Yes      | The user's email (must be a valid email address). |
| `password`           | `string` | Yes      | The user's password (stored securely as a hash).  |

---

### **Request Example**:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "SecurePassword123"
}
```

### **Response Example**:

#### 201 Created - Success:

```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64f005d1e9a32b001f8e5f2a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "createdAt": "2024-12-09T09:00:00.000Z",
    "updatedAt": "2024-12-09T09:00:00.000Z"
  }
}
```

#### 400 Bad Request - Validation Error:

If any field is missing or invalid (such as incorrect name length or an invalid email), the response will include error details.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "First Name should be minimum 3 letters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Invalid Email- please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "An error occurred during user registration."
}
```

## `/users/login` - User Login

### **Method**: `POST`

### **Description**:

This endpoint allows registered users to log in by providing their email and password. On successful login, a JSON Web Token (JWT) is generated and returned.

---

### **Request Body**:

The request body should be in JSON format and include the following fields:

| Field      | Type     | Required | Description                                       |
| ---------- | -------- | -------- | ------------------------------------------------- |
| `email`    | `string` | Yes      | The user's email (must be a valid email address). |
| `password` | `string` | Yes      | The user's password (minimum 3 characters).       |

---

### **Request Example**:

```json
{
  "email": "johndoe@example.com",
  "password": "SecurePassword123"
}
```

### **Response Example**:

#### 200 OK - Success:

When the user is successfully logged in, the response will include a JWT token.

```json
{
  "success": true,
  "message": "User Logined successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 400 Bad Request - Validation Error:

If any field is missing or invalid (such as incorrect PASSWORD length or an invalid email), the response will include error details.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Invalid Email-Please Provide the Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Enter the Password with Min Length-3",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### 401 Unauthorized - Invalid Credentials:

If the email or password does not match any user in the database, the response will indicate invalid credentials.

```json
{
  "success": false,
  "message": "Invalid Password or Email",
  "data": []
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "An error occurred during user Login."
}
```

## `/users/profile` - Get User Profile

### **Method**: `GET`

### **Description**:

This endpoint fetches the profile of the authenticated user. A valid JWT token must be provided for authorization.

---

### **Headers**:

The request must include the `Authorization` header with the format:  
`Authorization: Bearer <JWT_TOKEN>`

Alternatively, the token can be provided in a cookie named `token`.

---

### **Response Codes**:

| Status Code | Description                                            |
| ----------- | ------------------------------------------------------ |
| `200`       | User profile fetched successfully.                     |
| `401`       | Unauthorized (missing, expired, or blacklisted token). |
| `404`       | User not found.                                        |
| `500`       | Internal server error during authorization.            |

---

### **Response Examples**:

#### **200 OK** - Success:

When the profile is fetched successfully, the response will include the user's data.

```json
{
  "success": true,
  "message": "Profile Fetched Successfully",
  "data": {
    "_id": "64f16b7e2e5f5c1234567890",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "createdAt": "2024-08-30T10:30:00.000Z",
    "updatedAt": "2024-09-01T12:45:00.000Z"
  }
}
```

#### 401 Unauthorized - No Token Provided:

If the request does not include a token, the response will indicate that the user is unauthorized.

```json
{
  "success": false,
  "message": "Unauthorized: No token provided."
}
```

#### 401 Unauthorized - Token Expired:

```json
{
  "success": false,
  "message": "Unauthorized: Token is blacklisted."
}
```

#### 401 Unauthorized - Token Expired:

```json
{
  "success": false,
  "message": "Unauthorized: Token has expired."
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "Internal server error during authorization."
}
```

## `/users/logout` - User Logout

### **Method**: `GET`

### **Description**:

This endpoint allows the user to log out by invalidating their JWT token. The token is added to a blacklist to prevent further use, and the authentication cookie is cleared.

---

### **Headers**:

The request must include the `Authorization` header with the format:  
`Authorization: Bearer <JWT_TOKEN>`

Alternatively, the token can be provided in a cookie named `token`.

---

### **Response Codes**:

| Status Code | Description                          |
| ----------- | ------------------------------------ |
| `200`       | Logout successful.                   |
| `400`       | Bad request (no token provided).     |
| `500`       | Internal server error during logout. |

---

### **Response Examples**:

#### **200 OK** - Success:

When the user logs out successfully, the response will confirm the action.

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

#### 400 Bad Request - No Token Provided:

If the request does not include a token, the response will indicate a bad request.

```json
{
  "success": false,
  "message": "Bad Request: No token provided for logout."
}
```

#### 500 Internal Server Error - General Error:

If there is an unexpected error during the logout process, the response will indicate a server error.

```json
{
  "success": false,
  "message": "Internal server error during logout."
}
```

## `/captain/register` - Captain Regitstration

### **Method**: `POST`

### **Request Body**:

The request body should be in JSON format and include the following fields:

| Field                | Type     | Required | Description                                          |
| -------------------- | -------- | -------- | ---------------------------------------------------- |
| `fullName.firstName` | `string` | Yes      | The captain's first name (minimum 3 characters).     |
| `fullName.lastName`  | `string` | Yes      | The captain's last name (minimum 3 characters).      |
| `email`              | `string` | Yes      | The captain's email (must be a valid email address). |
| `password`           | `string` | Yes      | The captain's password (stored securely as a hash).  |
| `vehicle.color`      | `string` | Yes      | The vehicle's color (valid color string).            |
| `vehicle.type`       | `string` | Yes      | The vehicle's type (e.g., car, truck).               |
| `vehicle.capacity`   | `number` | Yes      | The vehicle's capacity (must be a number).           |
| `vehicle.plate`      | `string` | Yes      | The vehicle's plate number (must be in uppercase).   |

### **Response Example**:

#### 201 Created - Success:

```json
{
  "success": true,
  "message": "Captain registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64f005d1e9a32b001f8e5f2a",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "johndoe@example.com",
    "vehicle": {
      "color": "Red",
      "type": "Car",
      "capacity": 5,
      "plate": "ABCD1234"
    }
  }
}
```

#### 400 Bad Request - Validation Error:

If any field is missing or invalid (such as incorrect name length or an invalid email), the response will include error details.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "First Name should be minimum 3 letters",
      "param": "fullName.firstName",
      "location": "body"
    },
    {
      "msg": "Invalid Email- please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "An error occurred during user registration."
}
```

## `/captain/login` - User Login

### **Method**: `POST`

### **Description**:

This endpoint allows registered captain to log in by providing their email and password. On successful login, a JSON Web Token (JWT) is generated and returned.

---

### **Request Body**:

The request body should be in JSON format and include the following fields:

| Field      | Type     | Required | Description                                       |
| ---------- | -------- | -------- | ------------------------------------------------- |
| `email`    | `string` | Yes      | The user's email (must be a valid email address). |
| `password` | `string` | Yes      | The user's password (minimum 3 characters).       |

---

### **Request Example**:

```json
{
  "email": "johndoe@example.com",
  "password": "SecurePassword123"
}
```

### **Response Example**:

#### 200 OK - Success:

When the captain is successfully logged in, the response will include a JWT token.

```json
{
  "success": true,
  "message": "User Logined successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 400 Bad Request - Validation Error:

If any field is missing or invalid (such as incorrect PASSWORD length or an invalid email), the response will include error details.

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Invalid Email-Please Provide the Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Enter the Password with Min Length-3",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### 401 Unauthorized - Invalid Credentials:

If the email or password does not match any captain in the database, the response will indicate invalid credentials.

```json
{
  "success": false,
  "message": "Invalid Password or Email",
  "data": []
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "An error occurred during user Login."
}
```

## `/captain/profile` - Get Captain Profile

### **Method**: `GET`

### **Description**:

This endpoint fetches the profile of the authenticated Captain. A valid JWT token must be provided for authorization.

---

### **Headers**:

The request must include the `Authorization` header with the format:  
`Authorization: Bearer <JWT_TOKEN>`

Alternatively, the token can be provided in a cookie named `token`.

---

### **Response Codes**:

| Status Code | Description                                            |
| ----------- | ------------------------------------------------------ |
| `200`       | Captain profile fetched successfully.                  |
| `401`       | Unauthorized (missing, expired, or blacklisted token). |
| `404`       | Captain not found.                                     |
| `500`       | Internal server error during authorization.            |

---

### **Response Examples**:

#### **200 OK** - Success:

When the profile is fetched successfully, the response will include the user's data.

```json
{
  "success": true,
  "message": "Captain Profile Fetched Successfully",
  "data": {
    "fullName": {
      "firstName": "Rahul",
      "lastName": "Looser"
    },
    "vehicle": {
      "color": "red",
      "type": "motorcycle",
      "capacity": 2,
      "plate": "APO3AS1234"
    },
    "_id": "6757e78e22a0341cd248e16e",
    "email": "abc123@example.com",
    "socketId": null,
    "status": "inactive",
    "lastLogin": null,
    "createdAt": "2024-12-10T07:02:38.580Z",
    "updatedAt": "2024-12-10T07:02:38.580Z"
  }
}
```

#### 401 Unauthorized - No Token Provided:

If the request does not include a token, the response will indicate that the user is unauthorized.

```json
{
  "success": false,
  "message": "Unauthorized: No token provided."
}
```

#### 401 Unauthorized - Token Expired:

```json
{
  "success": false,
  "message": "Unauthorized: Token is blacklisted."
}
```

#### 401 Unauthorized - Token Expired:

```json
{
  "success": false,
  "message": "Unauthorized: Token has expired."
}
```

#### 500 Internal Server Error - General Error:

If there is an internal error (e.g., database issues or server-side exceptions), the response will indicate a failure.

```json
{
  "success": false,
  "message": "Internal server error during authorization."
}
```

## `/captain/logout` - User Logout

### **Method**: `GET`

### **Description**:

This endpoint allows the captain to log out by invalidating their JWT token. The token is added to a blacklist to prevent further use, and the authentication cookie is cleared.

---

### **Headers**:

The request must include the `Authorization` header with the format:  
`Authorization: Bearer <JWT_TOKEN>`

Alternatively, the token can be provided in a cookie named `token`.

---

### **Response Codes**:

| Status Code | Description                          |
| ----------- | ------------------------------------ |
| `200`       | Logout successful.                   |
| `400`       | Bad request (no token provided).     |
| `500`       | Internal server error during logout. |

---

### **Response Examples**:

#### **200 OK** - Success:

When the Captain logs out successfully, the response will confirm the action.

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

#### 400 Bad Request - No Token Provided:

If the request does not include a token, the response will indicate a bad request.

```json
{
  "success": false,
  "message": "Bad Request: No token provided for logout."
}
```

#### 500 Internal Server Error - General Error:

If there is an unexpected error during the logout process, the response will indicate a server error.

```json
{
  "success": false,
  "message": "Internal server error during logout."
}
```