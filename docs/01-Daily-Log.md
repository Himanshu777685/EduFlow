# Daily Log - 

# Day 1 - 10 july 2026

## 🎯 Goal
Set up the backend project and prepare the development environment.

## ✅ Completed Tasks
- Cloned the GitHub repository.
- Initialized the backend project.
- Installed all required npm dependencies.
- Created a basic Express server.
- Configured the initial project structure.
- Verified the server runs successfully.

## 📦 Dependencies Installed

```json
{
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.7.4",
  "nodemon": "^3.1.14",
  "validator": "^13.15.35"
}
```

## 🚧 Current Status
Project foundation is ready. The development environment has been configured successfully.

## ⏱️ Time Spent
Approx. 15 - 20 mins.

---

---

# 🚀 Day 2 — 11 July 2026

## 🎯 Goal
Implement the authentication foundation for EduFlow backend.

## ✅ Completed Tasks
- Connected the application to MongoDB using Mongoose.
- Created the database connection configuration.
- Designed the `User` model with:
  - Name
  - Email
  - Password
  - Role (Student/Teacher/Admin)
  - Avatar
  - Enrolled Courses
  - Timestamps
- Implemented authentication controllers:
  - Signup
  - Login
  - Logout
- Added input validation using `validator`.
- Checked for existing users before registration.
- Hashed passwords using `bcryptjs`.
- Generated JWT for authenticated users.
- Stored JWT in an HTTP-only cookie.
- Implemented secure login with password verification using `bcrypt.compare()`.


## 🚧 Current Status
The authentication backend is implemented. Signup, Login, and Logout controllers are complete. The next step is to protect routes and test all authentication endpoints.



## ⏱️ Time Spent
Approx. 2 hours.
