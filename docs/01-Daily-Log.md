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


---

# Day 5: Responsive Navbar UI Completion

## Objective

Complete the navigation bar and ensure a seamless experience across desktop, tablet, and mobile devices.

## Tasks Performed

* Designed and finalized the responsive navigation bar layout.
* Implemented a mobile navigation menu for smaller screen sizes.
* Improved the alignment and spacing of navigation links and UI components.
* Enhanced the profile section with a cleaner avatar and dropdown interface.
* Optimized responsiveness using Tailwind CSS breakpoints.
* Fixed UI inconsistencies across different screen resolutions.

## Key Outcome

* A fully responsive and polished navigation bar that provides a consistent user experience on all supported devices.

**Status:** ✅ Completed Successfully

---

# Day 6: Password Reset Backend Implementation

## Objective

Develop a secure backend workflow for users to reset their passwords through email verification.

## Tasks Performed

### Forgot Password Functionality

* Created the **Forgot Password** API endpoint.
* Validated user email before processing the request.
* Generated a secure reset token using the Node.js `crypto` module.
* Hashed the reset token before storing it in the database.
* Configured a 15-minute expiration time for reset tokens.
* Integrated email functionality to send password reset links.
* Added proper error handling for invalid requests and email delivery failures.

### Reset Password Functionality

* Implemented the password reset API endpoint.
* Verified the reset token by comparing its hashed value with the stored token.
* Checked token expiration before allowing password updates.
* Validated password and confirm password fields.
* Encrypted the new password using `bcrypt`.
* Cleared the reset token and expiration fields after a successful password update.

## Security Features

* Secure token generation using cryptographic random bytes.
* Database stores only hashed reset tokens.
* Time-limited reset links to prevent misuse.
* One-time token usage by clearing reset credentials after success.

## Key Outcome

* Successfully completed a secure backend password reset system with token-based authentication and email verification.

**Status:** ✅ Completed Successfully

---

# Day 7: Password Reset Frontend Implementation

## Objective

Develop the frontend interface for requesting and completing password resets.

## Tasks Performed

### Forgot Password Page

* Designed the user interface for email submission.
* Connected the page to the backend API using Axios.
* Added loading indicators while processing requests.
* Displayed success and error notifications using toast messages.

### Reset Password Page

* Created the interface for entering and confirming a new password.
* Configured React Router to support dynamic reset password routes using URL parameters.
* Retrieved the reset token from the URL.
* Integrated the reset password API with the frontend.
* Implemented client-side validation for password confirmation.
* Displayed appropriate success and error messages based on API responses.

### Testing & Integration

* Verified communication between frontend and backend.
* Tested the complete password reset workflow from email request to password update.
* Confirmed successful redirection and user feedback after password reset.

## Key Outcome

* Successfully implemented and integrated the complete password reset feature, providing users with a smooth and secure password recovery experience.

**Status:** ✅ Completed Successfully
