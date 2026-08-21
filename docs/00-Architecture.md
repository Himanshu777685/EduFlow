# EduFlow — System Architecture

## 1. Overview

EduFlow is a full-stack Learning Management System (LMS) built using the MERN stack. It provides separate functionality for students and educators, including course creation, course enrollment, lecture management, progress tracking, authentication, and online payments.

The application follows a client-server architecture where the React frontend communicates with a Node.js/Express backend through REST APIs.

---

## 2. Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Redux Toolkit
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* REST APIs

### External Services

* Firebase Authentication — Google authentication
* Cloudinary — Course thumbnails and lecture/video storage
* Razorpay — Online course payments

### Deployment

* Vercel — Frontend deployment
* Render — Backend deployment
* MongoDB Atlas — Database

---

## 3. High-Level Architecture

```text
                         ┌─────────────────────┐
                         │       Student       │
                         │      / Educator     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │   Vite + Tailwind   │
                         │   Redux + Router    │
                         └──────────┬──────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      Node.js        │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
      ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
      │   MongoDB     │     │   Cloudinary  │     │    Razorpay   │
      │    Atlas      │     │     Media     │     │    Payments   │
      │    Database   │     │    Storage    │     │               │
      └───────────────┘     └───────────────┘     └───────────────┘

                         ┌─────────────────────┐
                         │ Firebase Auth       │
                         │ Google Sign-In      │
                         └─────────────────────┘
```

---

## 4. Frontend Architecture

The frontend is built using React and follows a component-based architecture.

### Main Responsibilities

* User interface rendering
* Routing between pages
* Authentication state management
* Course browsing and enrollment
* Student lecture viewing
* Lecture completion tracking
* Educator course and lecture management
* Payment initiation
* API communication with the backend

### Main Frontend Layers

```text
React Components
       │
       ├── Pages
       │
       ├── Reusable Components
       │
       ├── Redux Store
       │
       ├── API / Axios Requests
       │
       └── Routing
```

Redux is used for application-level state such as authenticated user information and course-related state.

---

## 5. Backend Architecture

The backend is implemented using Node.js and Express.js.

It exposes REST APIs that handle authentication, courses, lectures, enrollment, progress tracking, and payments.

The backend follows a layered structure:

```text
Request
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

### Routes

Routes define the available API endpoints and connect incoming requests to the appropriate controllers.

Examples include:

* Authentication routes
* Course routes
* Lecture routes
* Payment routes
* User-related routes

### Middleware

Middleware is responsible for tasks such as:

* Authentication
* Authorization
* Request processing
* File upload handling

JWT-based authentication is used to identify authenticated users.

### Controllers

Controllers contain the main application logic, such as:

* Creating courses
* Updating courses
* Publishing courses
* Creating lectures
* Enrolling students
* Marking lectures as completed
* Processing payments

---

## 6. Database Architecture

EduFlow uses MongoDB Atlas with Mongoose for database management.

### Main Models

#### User

Stores user information and role-based information.

Important fields include:

* User information
* Role
* `enrolledCourses`
* `progress`

The `progress` field stores course progress and completed lectures.

```text
User
 ├── enrolledCourses[]
 │
 └── progress[]
       ├── course
       └── completedLectures[]
```

#### Course

Stores course information such as:

* Title
* Description
* Category
* Price
* Thumbnail
* Creator
* Enrollment information
* Publication status

A course maintains references to its creator and enrolled students.

#### Lecture

Stores information about individual lectures belonging to a course.

A lecture can contain:

* Lecture title
* Video
* Notes
* Course reference
* Preview/free access information

---

## 7. Authentication Architecture

EduFlow supports authentication using JWT and Google authentication through Firebase.

### Normal Authentication Flow

```text
User
 │
 ▼
Login/Register
 │
 ▼
Express API
 │
 ▼
Validate User
 │
 ▼
Generate JWT
 │
 ▼
Authenticated Session
```

The backend uses the authenticated user's ID (`req.userId`) to identify the current user when performing protected operations.

### Google Authentication

Google authentication is handled using Firebase Authentication.

```text
User
 │
 ▼
Google Sign-In
 │
 ▼
Firebase Authentication
 │
 ▼
Application Authentication Flow
 │
 ▼
EduFlow User Session
```

Firebase is responsible for the Google authentication process while EduFlow maintains its application-specific user data and roles.

---

## 8. Role-Based Architecture

EduFlow has two primary roles:

### Student

Students can:

* Browse courses
* Enroll in free courses
* Purchase paid courses
* Access enrolled course lectures
* Watch lectures
* Mark lectures as completed
* Track course progress

### Educator

Educators can:

* Create courses
* Update courses
* Upload thumbnails
* Create lectures
* Upload lecture content
* Manage courses
* Publish or unpublish courses
* View course-related information

Authorization is performed on protected backend operations to ensure users can only perform actions allowed by their role.

---

## 9. Course and Enrollment Flow

```text
Student
   │
   ▼
Browse Courses
   │
   ▼
Select Course
   │
   ├── Free Course ──► Enroll
   │
   └── Paid Course ──► Razorpay Payment
                            │
                            ▼
                         Verify
                            │
                            ▼
                         Enroll
```

After successful enrollment, the course is associated with the student.

The course also maintains enrolled student information.

---

## 10. Lecture Progress Architecture

EduFlow maintains lecture completion information for each student's enrolled course.

```text
Student
   │
   ▼
Open Course
   │
   ▼
Open Lecture
   │
   ▼
Complete Lecture
   │
   ▼
Backend
   │
   ▼
User.progress
   │
   ├── course
   │
   └── completedLectures[]
```

This allows the application to persist lecture completion even after the student refreshes or logs in again.

---

## 11. Media Storage Architecture

Large media files are not stored directly inside MongoDB.

Cloudinary is used for media storage.

```text
Educator
   │
   ▼
Upload Video / Thumbnail
   │
   ▼
Backend
   │
   ▼
Cloudinary
   │
   ▼
Media URL
   │
   ▼
MongoDB
```

MongoDB stores the relevant media URL and course/lecture information rather than storing the actual video file.

---

## 12. Payment Architecture

Razorpay is used for paid course purchases.

```text
Student
   │
   ▼
Select Paid Course
   │
   ▼
Create Razorpay Order
   │
   ▼
Razorpay Checkout
   │
   ▼
Payment
   │
   ▼
Backend Verification
   │
   ▼
Verify Signature / Payment Status
   │
   ▼
Enroll Student
```

The backend verifies the payment before granting access to the paid course.

Sensitive Razorpay credentials are stored as backend environment variables.

---

## 13. API Communication

The React frontend communicates with the Express backend using HTTP requests through Axios.

```text
React Component
      │
      ▼
Axios Request
      │
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
Database / External Service
      │
      ▼
JSON Response
      │
      ▼
React UI
```

Protected requests use the application's authentication mechanism to identify the logged-in user.

---

## 14. Deployment Architecture

EduFlow is deployed using separate frontend and backend services.

```text
                   Internet
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │ React Frontend  │
             └────────┬────────┘
                      │
                  API Requests
                      │
                      ▼
             ┌─────────────────┐
             │     Render      │
             │ Express Server  │
             └────────┬────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   MongoDB Atlas  Cloudinary    Razorpay
```

### Vercel

Hosts the React frontend.

### Render

Hosts the Node.js/Express backend.

### MongoDB Atlas

Hosts the application's database.

### Cloudinary

Stores uploaded media.

### Firebase

Provides Google authentication.

### Razorpay

Handles paid course transactions.

---

## 15. Environment Configuration

Sensitive configuration values are stored using environment variables.

Examples include:

```text
MongoDB connection string
JWT secret
Cloudinary credentials
Razorpay API credentials
Firebase configuration
```

Backend secrets are kept on the Render environment and are not exposed through the frontend.

---

## 16. Overall Data Flow

A typical authenticated request follows this flow:

```text
User
 │
 ▼
React Frontend
 │
 ▼
Axios
 │
 ▼
Express Route
 │
 ▼
Authentication / Authorization
 │
 ▼
Controller
 │
 ├──────────────► MongoDB
 │
 ├──────────────► Cloudinary
 │
 └──────────────► Razorpay
 │
 ▼
Response
 │
 ▼
React / Redux
 │
 ▼
Updated UI
```

This architecture separates the user interface, application logic, database, authentication, media storage, and payment services, making the system easier to maintain and extend.
