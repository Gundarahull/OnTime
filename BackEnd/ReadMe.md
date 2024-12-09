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
