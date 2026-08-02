import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
export const serverURL = "http://localhost:8000"
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Courses from './pages/Courses'
import About from './pages/About'


const App = () => {

  getCurrentUser()
  const {userData} = useSelector(state=>state.user)
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/signup' element= {!userData ? <SignUp/> : <Navigate to={"/"}/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/forget-password' element= {<ForgetPassword/>} />
        <Route path='/reset-password/:token' element= {<ResetPassword/>} />
        <Route path='/profile' element= {userData ? <Profile/> : <Navigate to={"/signup"}/>} />
        <Route path='/courses' element= {<Courses />} />
        <Route path='/about' element= {<About />} />
      </Routes>
    </>
  )
}

export default App
