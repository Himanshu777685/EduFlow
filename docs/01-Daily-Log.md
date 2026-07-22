# Daily Log - 

# Day 1 

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

# 🚀 Day 2 

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

# Day 3 – Authentication UI & API Integration


## 🚀 What I Built

### Signup Page
- Designed a responsive signup page using React and Tailwind CSS.
- Added input fields for:
  - Full Name
  - Email
  - Password
  - Role (Student / Educator)
- Implemented password show/hide functionality using React Icons.
- Added loading spinner using `react-spinners`.
- Connected the signup form with the backend using Axios.
- Displayed success and error notifications using React Toastify.
- Redirected users after successful signup.

### Login Page
- Designed a responsive login page with a consistent UI.
- Implemented email and password authentication.
- Connected the login form with the backend API.
- Added loading state during authentication requests.
- Displayed toast notifications for login success and failure.
- Added navigation between Login and Signup pages.

## 🐛 Debugging & Fixes
- Fixed Express middleware issue caused by:
  ```js
  app.use(cookieParser);
  ```
  to
  ```js
  app.use(cookieParser());
  ```
- Resolved JWT configuration error:
  ```
  secretOrPrivateKey must have a value
  ```
  by correctly configuring environment variables.
- Debugged API requests using browser DevTools (Network tab) and backend logs.
- Improved frontend-backend authentication flow.

## 📚 What I Learned
- Building controlled forms in React.
- Managing loading states with `useState`.
- Making authenticated API requests using Axios and `withCredentials`.
- Using React Toastify for user-friendly notifications.
- Importance of Express middleware configuration.
- Proper usage of environment variables for JWT authentication.
- Practical debugging techniques for full-stack applications.


# Day 4 – Redux Toolkit & Custom Hooks

## 🚀 What I Learned

### Redux Toolkit
- Learned the purpose of global state management.
- Understood how Redux solves prop drilling.
- Explored the Redux architecture:
  - Store
  - Slice
  - Actions
  - Reducers
  - Dispatch
  - Selectors
- Configured Redux Toolkit in the project.
- Connected the Redux Store with the React application.
- Learned how components read and update global state.

### Custom Hooks
- Learned how custom hooks help reuse logic across multiple components.
- Understood that custom hooks share logic, not UI.
- Created and used custom hooks following React conventions.
- Improved component organization by separating business logic from UI.

## 📚 Key Concepts
- Difference between local state (`useState`) and global state (Redux).
- Difference between Context API and Redux.
- Reusing logic through custom hooks.
- Writing cleaner and more scalable React applications.

## 🚀 Progress
- Completed authentication UI.
- Integrated login and signup with the backend.
- Configured Redux Toolkit for global state management.
- Started using custom hooks to build a more maintainable project structure.
- Continued moving the project toward a production-ready architecture.