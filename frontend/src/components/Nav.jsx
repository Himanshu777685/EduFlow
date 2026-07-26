import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { User, BookOpen, LogOut, LogIn, UserPen, LayoutDashboard } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";

const Nav = () => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const [openham, setOpenham] = useState(false);

    const handleLogOut = async () => {
        try {
            const result = await axios.get(serverURL + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            toast("Logout successfully")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-between px-5 py-3  bg-black/30 w-full fixed top-0 z-20 shadow-2xl'>

            <div className='flex items-center gap-2 lg:gap-3 lg:pl-10 '>

                <img src="EduFlowlogo.png" alt="" className='w-8 h-8 lg:w-12 lg:h-12  ' />
                <span className='font-extrabold text-lg md:text-2xl text-indigo-700'>EduFlow</span>

            </div>
            <div className='lg:flex gap-5 lg:gap-7 items-center lg:pr-10 hidden' >

                {userData?.user && (
                    userData?.user?.avatar ? <div className='w-5 h-5 lg:w-7 lg:h-7 rounded-full border'>
                        <img src='userData.avatar' className='w-full h-full rounded-full border object-cover' onClick={() => { setOpen(!open) }} />
                    </div> : <div className='w-5 h-5 lg:w-7 lg:h-7 rounded-full border border-black flex items-center justify-center bg-indigo-700 text-white font-bold text-xl cursor-pointer hover:scale-110' onClick={() => { setOpen(!open) }}> {userData?.user?.name.slice(0, 1).toUpperCase()}</div>)
                }

                {userData?.user?.role === "educator" && <div className='text-gray-700 text-lg cursor-pointer flex items-center hover:underline hover:text-indigo-800 '>
                    <MdSpaceDashboard className='w-5 h-5 lg:h-7 lg:w-7 ' />DashBoard
                </div>}

                {userData
                    ?
                    <div className='text-gray-700 text-lg cursor-pointer hover:underline hover:text-indigo-800 ' onClick={handleLogOut}>Logout</div>
                    : <>
                        <div className='text-gray-700 text-lg cursor-pointer hover:underline hover:text-indigo-800 ' onClick={() => navigate("/login")}>LogIn</div>
                        <div className='text-gray-700 text-lg cursor-pointer hover:underline hover:text-indigo-800 ' onClick={() => navigate("/signup")}>Create Account</div>
                    </>
                }
            </div>

            {open && (
                <div className="absolute right-17 top-12 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50" >

                    <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition cursor-pointer"
                     onClick={() => { 
                        setOpen(!open) 
                        navigate("/profile")
                     }}>
                        <User size={18} />
                        <span>My Profile</span>
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 transition cursor-pointer" onClick={() => { setOpen(!open) }}>
                        <BookOpen size={18} />
                        <span>My Courses</span>
                    </button>


                </div>
            )}

            <div className={`lg:hidden ${openham && "hidden"}`}> <RxHamburgerMenu className='w-10 h-10 cursor-pointer  lg:hidden'
                onClick={() => {
                    setOpenham(!openham);

                }}
            /> </div>
            <div className={`fixed flex flex-col w-screen md:w-[60%] lg:hidden h-screen rounded rounded-l-4xl bg-gray-900 text-white top-0 pt-16 px-5 gap-4 right-0 transform transition-transform duration-300 z-50
        ${openham ? "translate-x-0" : "translate-x-full"}`}>
                <RiCloseLargeFill className={`fixed top-0 right-0 fill-white w-10 h-10 m-3 ${!openham && "hidden"}`} onClick={() => {
                    setOpenham(!openham);
                }} />

                {userData?.user && <div className="flex flex-col items-center px-6 pb-6 border-b">


                    {userData?.user?.avatar ? <div className='w-20 h-20  rounded-full border'>
                        <img src='userData.avatar' className='w-full h-full rounded-full border object-cover' onClick={() => { setOpen(!open) }} />
                    </div> : <div className='w-20 h-20  rounded-full border border-black flex items-center justify-center bg-indigo-700 text-white font-bold text-3xl cursor-pointer hover:scale-110' onClick={() => { setOpen(!open) }}> {userData?.user?.name.slice(0, 1).toUpperCase()}</div>}


                    <h2 className="mt-3 text-xl text-white">
                        {userData?.user?.name}
                    </h2>

                    <p className="text-lg  text-amber-100 ">
                        {userData?.user?.email}
                    </p>


                </div>

                }

                <div className="py-4">
                    <button className="w-full flex items-center text-xl  hover:text-white hover:bg-black gap-4 px-6 py-4  transition" 
                    onClick={()=>navigate("/profile")}>
                        <User size={22} />
                        <span>My Profile</span>
                    </button>

                    <button className="w-full flex items-center text-xl text-white gap-4 px-6 py-4 hover:bg-gray-100 transition">
                        <BookOpen size={22} />
                        <span>My Courses</span>
                    </button>

                    {userData?.user?.role === "educator" && <button className="w-full flex items-center text-xl text-white gap-4 px-6 py-4 hover:bg-gray-100 transition">
                        <LayoutDashboard size={22}/>
                        <span>DashBoard</span>
                    </button>}
                </div>

                {userData
                    ?
                    <button className="w-full flex items-center text-xl text-red-600 gap-4 px-6 py-4 hover:bg-gray-100 transition" onClick={handleLogOut}>
                        <LogOut size={22} />
                        <span>Logout</span>
                    </button>
                    : <>
                        <button className="w-full flex items-center text-xl text-white gap-4 px-6 py-4 hover:bg-gray-100 transition" onClick={() => navigate("/login")}> <LogIn size={22} /> <span>LogIn</span></button>
                        <button className="w-full flex items-center text-xl text-white gap-4 px-6 py-4 hover:bg-gray-100 transition" onClick={() => navigate("/signup")}><UserPen size={22} /><span>Create Account</span></button>
                    </>
                }



            </div>
        </div>
    )
}

export default Nav
