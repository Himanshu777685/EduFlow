# EduFlow

EduFlow is a full-stack Learning Management System (LMS) built with the MERN stack. It provides separate workflows for students and educators, including course creation, enrollment, lecture management, progress tracking, authentication, and online payments.

## Live Demo

* **Frontend:** [EduFlow — Live Application](https://edu-flow-five-murex.vercel.app/)
* **Backend:** [EduFlow — Backend API](https://eduflow-kr11.onrender.com/)

## Overview

EduFlow was built as a practical full-stack project to implement and understand authentication, role-based authorization, REST APIs, database relationships, cloud storage, payment processing, and production deployment.

## Features

### Student

* User registration and login
* Google authentication
* Browse published courses
* View course details
* Enroll in free courses
* Purchase paid courses through Razorpay
* Access enrolled courses and lectures
* Preview selected free lectures
* Mark lectures as completed
* Persist and track course progress
* View enrolled courses
* Reset forgotten password through email

### Educator

* Educator authentication
* Create courses
* Edit and delete courses
* Upload course thumbnails
* Create and manage lectures
* Upload lecture videos and notes
* Publish and unpublish courses
* View enrolled students and course information

## Tech Stack

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
* JWT
* Cookie Parser
* Bcrypt.js
* Multer
* Nodemailer
* Validator

### External Services

* **Firebase Authentication** — Google Sign-In
* **Cloudinary** — Course thumbnails and lecture/video storage
* **Razorpay** — Online payments
* **MongoDB Atlas** — Production database

### Deployment

* **Vercel** — Frontend
* **Render** — Backend

## Architecture

EduFlow follows a client-server architecture.

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

Detailed system architecture, database relationships, authentication flow, payment flow, and deployment architecture are documented in [architecture.md](./architecture.md).

## Authentication

EduFlow uses JWT-based authentication with HTTP-only cookies for application sessions.

Google Sign-In is implemented through Firebase Authentication. The application supports two roles:

* **Student**
* **Educator**

Protected backend operations use the authenticated user's ID (`req.userId`) and role-based authorization to control access.

## Course Enrollment

EduFlow supports both free and paid courses.

### Free Courses

Students can directly enroll in free courses. Enrollment is persisted in the student's `enrolledCourses` and the course's `enrolledStudent` data.

### Paid Courses

Paid courses use Razorpay for payment processing. The backend verifies the payment before granting course access.

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
Course Enrollment
```

## Lecture Progress

Student lecture completion is stored persistently in the user document.

```text
User
 ├── enrolledCourses[]
 │
 └── progress[]
       ├── course
       └── completedLectures[]
```

This allows completed lectures to remain available after page refreshes and future sessions.

## Media Storage

Course thumbnails and lecture media are stored using Cloudinary rather than directly inside MongoDB.

```text
Educator
   │
   ▼
Upload Media
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

## API

The frontend communicates with the Express backend through REST APIs.

Main API groups include:

```text
/api/auth
/api/user
/api/course
/api/lecture
/api/payment
```

Detailed endpoint documentation is available in [API.md](./API.md).

## Project Structure

```text
EduFlow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── redux/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
├── architecture.md
├── API.md
└── README.md
```

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Firebase project
* Cloudinary account
* Razorpay account

### Clone the Repository

```bash
git clone <your-repository-url>
cd EduFlow
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Example frontend environment variable:

```env
VITE_SERVER_URL=http://localhost:8000
```

### Backend Setup

```bash
cd backend
npm install
node index.js
```

For development with Nodemon:

```bash
npm run dev
```

Example backend environment variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:5173
```

Never commit real credentials or `.env` files to the repository.

## Deployment

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Production build:

```bash
npm run build
```

Vite generates the production files in the `dist` directory.

### Backend — Render

The Node.js/Express backend is deployed on Render.

Build command:

```bash
npm install
```

Start command:

```bash
node index.js
```

The backend uses the `PORT` environment variable provided by Render in production.

### Production Services

```text
Frontend  → Vercel
Backend   → Render
Database  → MongoDB Atlas
Media     → Cloudinary
Auth      → Firebase
Payments  → Razorpay
```

## Security

* HTTP-only authentication cookies
* Secure cookies in production
* Cross-site cookie configuration for the deployed frontend and backend
* Password hashing using bcrypt
* JWT-based authentication
* Role-based authorization
* Server-side payment verification
* Environment variables for sensitive credentials
* Backend input validation

## Current Limitations

* Large video uploads are limited by the current Cloudinary plan.
* The project does not currently have a comprehensive automated testing suite.
* Advanced analytics and recommendation features are not currently implemented.

## Future Improvements

* Automated API and integration testing
* Improved large-file video uploads
* Advanced student analytics
* Course search and filtering
* Course reviews and ratings
* Notifications
* More detailed educator analytics
* Improved video delivery
* Admin dashboard

## Documentation

* [Architecture Documentation](./architecture.md)
* [API Documentation](./API.md)

## Project Status

**Deployed and functional.**

EduFlow was developed as a full-stack project to gain practical experience with MERN development, REST APIs, authentication, database modeling, cloud services, payment integration, media handling, and production deployment.

## Author

**Himanshu Kumar**

B.Tech CSE (Data Science)

## Live Application

* [**Open EduFlow**](https://edu-flow-five-murex.vercel.app/)
* [**Backend API**](https://eduflow-kr11.onrender.com/)
