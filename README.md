# Authentication Backend (Node.js + Express + MySQL)

This project is an **Authentication Backend System** that handles all user authentication operations such as **signup, login, OTP verification, and rate limiting**.
It is built using **Node.js**, **Express.js**, and **MySQL** for secure and scalable user authentication.

---

## Features

* User Registration (Signup)
* User Login
* Password Hashing using **bcrypt**
* OTP Verification
* Rate Limiting to prevent spam requests
* JWT Authentication
* Environment-based configuration
* Secure API structure
* MySQL Database Integration

---

## Tech Stack

* **Node.js**
* **Express.js**
* **MySQL**
* **JWT (jsonwebtoken)**
* **bcrypt**
* **dotenv**
* **express-rate-limit**

---

## Project Structure

```
project-root
│
├── config
│   ├── db.js
│   └── envConfig.js
│
├── controllers
│   └── authController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── rateLimiter.js
│
├── models
│   └── userModel.js
│
├── routes
│   └── authRoutes.js
│
├── utils
│   ├── generateToken.js
│   └── validator.js
│
├── .env
├── app.js
├── server.js
└── package.json
```

---

## Installation

Clone the repository

```
git clone https://github.com/yourusername/auth-backend.git
```

Navigate to project folder

```
cd auth-backend
```

Install dependencies

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root folder.

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=auth_db

JWT_SECRET=supersecretkey
JWT_EXPIRE=1d
```

---

## Run the Server

Development mode

```
npm run dev
```

Production mode

```
npm start
```

Server will start at:

```
http://localhost:5000
```

---

## API Endpoints

### Register User

```
POST /api/auth/register
```

### Login User

```
POST /api/auth/login
```

### Verify OTP

```
POST /api/auth/verify-otp
```

### Reset Password

```
POST /api/auth/reset-password
```

---

## Security Features

* Password hashing with **bcrypt**
* JWT authentication
* OTP verification
* Rate limiting protection
* Environment variable configuration

---

## Future Improvements

* Email OTP service integration
* Refresh token system
* Social login (Google/Github)
* Account lock after multiple failed attempts

---

## License

This project is open source and available under the **MIT License**.
