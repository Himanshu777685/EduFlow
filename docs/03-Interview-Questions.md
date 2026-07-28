# LMS Project Interview Questions (Current Progress)

This document contains implementation-based interview questions for the features completed so far in the LMS project.

---

# 1. Project Introduction

## Project Overview

* Explain your LMS project in detail.
* Why did you decide to build an LMS?
* What features have you implemented so far?
* Describe the overall architecture of your project.
* Which technologies have you used and why?

---

# 2. Authentication Module

## Signup

* Explain your signup flow.
* How is user data validated?
* Why do you hash passwords before storing them?
* What happens if a user tries to register with an existing email?

## Login

* Explain the login flow from frontend to backend.
* How are user credentials verified?
* How is JWT generated after successful login?
* Why do you return the token inside a cookie instead of the response body?

## Logout

* How does logout work in your application?
* How do you invalidate user sessions?

---

# 3. JWT Authentication

## Theory

* What is JWT?
* Explain Header, Payload and Signature.
* Why did you choose JWT?
* What are the advantages and disadvantages of JWT?

## Implementation

* Where do you generate the JWT?
* How do you verify it?
* What information have you stored inside the payload?
* How do protected routes identify the logged-in user?

---

# 4. Cookies

## Concepts

* What are HTTP-only cookies?
* Why are they safer than localStorage?
* Explain SameSite and Secure attributes.
* Why is `withCredentials: true` required?

## Implementation

* How do you set cookies after login?
* How do you clear cookies during logout?
* What deployment issues did you face because of cookies?

---

# 5. Protected Routes

## Backend

* Explain your authentication middleware.
* How does middleware verify JWT?
* How is `req.userId` populated?

## Frontend

* How do you prevent unauthenticated users from accessing protected pages?
* How do you fetch the current logged-in user after refreshing the page?

---

# 6. Get Current User

## Implementation

* Why did you create a Get Current User API?
* Why is it called after page refresh?
* Why do you use `.select("-password")`?
* How is Redux updated after fetching the user?

---

# 7. Profile Picture Upload

## Multer

* Why did you use Multer?
* Explain multipart/form-data.
* Difference between `req.file` and `req.body`.

## ImageKit

* Why use ImageKit instead of storing images in MongoDB?
* Explain your complete image upload flow.
* What benefits does ImageKit provide?

---

# 8. Responsive Navbar

## UI Implementation

* How did you make your navbar responsive?
* Which Tailwind CSS utilities did you use?
* How does the navbar behave on mobile devices?
* How did you implement the profile dropdown?
* What UI challenges did you face?

---

# 9. Forgot Password Feature

## Backend

* Explain the complete Forgot Password workflow.
* Why generate a random reset token?
* Why hash the reset token before storing it?
* Why should reset tokens expire?
* Why return the same response even if the email doesn't exist?

## Email

* How is the password reset email sent?
* Why store email credentials inside environment variables?
* What happens if email delivery fails?

---

# 10. Reset Password Feature

## Backend

* How do you verify the reset token?
* Why compare the hashed token instead of the original token?
* How do you check whether the reset link has expired?
* Why clear the reset token after a successful password reset?

## Frontend

* How do you retrieve the reset token from the URL?
* Why use dynamic routes?
* How do you validate password and confirm password?
* How does the frontend communicate with the backend?

---

# 11. API Integration

* Why did you use Axios?
* How do you handle API errors?
* How do you show loading states?
* How do you display success and error messages?
* How is Axios configured for authenticated requests?

---

# 12. Error Handling

* How do you handle validation errors?
* Why use try-catch blocks?
* Which HTTP status codes have you used?
* How do you handle unexpected server errors?

---

# 13. Security

* Why hash passwords?
* Why use bcrypt?
* Why hash reset tokens?
* How do HTTP-only cookies improve security?
* What additional security improvements would you add?

---

# 14. Implementation Deep Dive

* Explain the complete Signup flow.
* Explain the complete Login flow.
* Explain the complete Forgot Password flow.
* Explain the complete Reset Password flow.
* Explain how authentication works from beginning to end.
* Draw the request-response cycle of your authentication system.
* Which feature was the most difficult to implement and why?
* Which bug took the longest to solve?
* If you were to improve this authentication system, what would you change?

---

## Practical Coding Questions

* Write middleware to verify a JWT.
* Generate a JWT after successful login.
* Hash a password using bcrypt.
* Compare a password using bcrypt.
* Generate a secure reset token using `crypto`.
* Hash the reset token before saving it.
* Upload a profile image using Multer.
* Fetch the currently logged-in user using cookies.
* Create a protected API endpoint.
* Explain how your responsive navbar is implemented.

---

**Current Coverage:** Authentication Module, JWT, Cookies, Protected Routes, Profile Upload, Responsive Navbar, Forgot Password, Reset Password, Email Integration, and API Communication.
