import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverURL = "http://localhost:8000"
import { ToastContainer } from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Courses from './pages/Courses'
import About from './pages/About'
import EducatorDashboard from './pages/EducatorDashboard'
import CreatorCourses from './pages/CreatorCourses'
import CreateCourses from './pages/CreateCourses'
import getAllCourses from './customHooks/getAllCourses'
import getCreatorCourses from './customHooks/getCreatorCourses'
import CourseManagement from './pages/CourseManagement'
import { EditCourse } from './pages/EditCourse'
import CreateLecture from './pages/CreateLecture'
import EditLecture from './pages/EditLecutre'


const App = () => {

  getAllCourses();
  getCreatorCourses();
  getCurrentUser();
  const { userData } = useSelector(state => state.user)
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={userData?.user?.role === "educator" ? <EducatorDashboard /> : <Navigate to={"/signup"} />} />
        <Route path='/creator-courses' element={userData?.user?.role === "educator" ? <CreatorCourses /> : <Navigate to={"/signup"} />} />
        <Route path='/create-courses' element={userData?.user?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />} />
        <Route path="/courseforeducator/:courseId" element={userData?.user?.role === "educator" ? <CourseManagement /> : <Navigate to={"/signup"} />} />
        <Route path='/edit-course/:courseId' element={userData?.user?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />} />

        <Route
          path="/courseforeducator/:courseId/create-lecture"
          element={
            userData?.user?.role === "educator"
              ? <CreateLecture />
              : <Navigate to="/signup" />
          }
        />

        <Route
          path='/courseforeducator/:courseId/editLecture/:lectureId'
          element={
            userData?.user?.role === "educator" ?
              <EditLecture /> : <Navigate to="/signup" />
          }
        />


      </Routes>
    </>
  )
}

export default App
