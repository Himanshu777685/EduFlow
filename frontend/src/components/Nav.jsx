import React, { useState } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { User, BookOpen, LogOut, LogIn, UserPen, LayoutDashboard, Home, Info, ChevronDown } from "lucide-react";
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
            const result = await axios.get(
                serverURL + "/api/auth/logout",
                { withCredentials: true }
            );

            dispatch(setUserData(null));
            toast("Logout successfully")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='
            flex justify-between items-center
            px-4 md:px-6 lg:px-10
            py-4
            bg-white/90 backdrop-blur-xl
            border-b border-slate-200
            w-full fixed top-0 z-50
            shadow-sm
        '>

            {/* ================= LOGO ================= */}

            <div
                className='flex items-center gap-2 lg:gap-3 cursor-pointer'
                onClick={() => navigate("/")}
            >

                <img
                    src="EduFlowlogo.png"
                    alt="EduFlow"
                    className='w-9 h-9 lg:w-11 lg:h-11 object-contain'
                />

                <span className='
                    font-extrabold
                    text-xl md:text-2xl
                    tracking-tight
                    text-slate-900
                '>
                    Edu<span className='text-indigo-600'>Flow</span>
                </span>

            </div>


            {/* ================= DESKTOP NAV ================= */}

            <div className='
                hidden lg:flex
                items-center
                gap-10
                lg:gap-12
                
            '>

                <div
                    className='
                        flex items-center gap-2
                        text-sm font-medium
                        text-slate-600
                        hover:text-indigo-600
                        cursor-pointer
                        transition
                    '
                    onClick={() => navigate("/")}
                >
                    <Home size={17} />
                    Home
                </div>


                <div
                    className='
                        flex items-center gap-2
                        text-sm font-medium
                        text-slate-600
                        cursor-pointer
                        hover:text-indigo-600
                        transition
                    '
                    onClick={() => navigate("/courses")}
                >
                    <BookOpen size={17} />
                    Courses
                </div>


                <div
                    className='
                        flex items-center gap-2
                        text-sm font-medium
                        text-slate-600
                        cursor-pointer
                        hover:text-indigo-600
                        transition
                    '
                    onClick={() => navigate("/about")}
                >
                    <Info size={17} />
                    About
                </div>

            </div>


            {/* ================= DESKTOP RIGHT ================= */}

            <div className='
                hidden lg:flex
                gap-3
                items-center
                
            '>

                {/* ================= USER LOGGED IN ================= */}

                {userData?.user && (

                    <>
                        {/* Educator Dashboard */}

                        {userData?.user?.role === "educator" && (

                            <div
                                className='
                                    flex items-center gap-2
                                    px-4 py-2
                                    rounded-xl
                                    text-slate-600
                                    text-sm font-medium
                                    cursor-pointer
                                    hover:bg-indigo-50
                                    hover:text-indigo-600
                                    transition
                                '
                                onClick={() => navigate("/dashboard")}
                            >
                                <MdSpaceDashboard className='w-5 h-5' />
                                Dashboard
                            </div>

                        )}


                        {/* ================= PROFILE ================= */}

                        <div className='relative'>

                            <button
                                className='
                                    flex items-center gap-2
                                    px-2 py-1.5
                                    rounded-xl
                                    hover:bg-slate-100
                                    transition
                                    cursor-pointer
                                '
                                onClick={() => { setOpen(!open) }}
                            >

                                {userData?.user?.avatar ?

                                    <div className='
                                        w-9 h-9
                                        rounded-full
                                        overflow-hidden
                                        border-2 border-slate-200
                                    '>

                                        <img
                                            src={userData.user.avatar}
                                            alt="profile"
                                            className='
                                                w-full h-full
                                                rounded-full
                                                object-cover
                                            '
                                        />

                                    </div>

                                    :

                                    <div className='
                                        w-9 h-9
                                        rounded-full
                                        border-2 border-indigo-100
                                        flex items-center justify-center
                                        bg-indigo-600
                                        text-white
                                        font-bold
                                        text-lg
                                    '>
                                        {userData?.user?.name
                                            ?.slice(0, 1)
                                            .toUpperCase()}
                                    </div>
                                }


                                <span className='
                                    text-sm
                                    font-medium
                                    text-slate-700
                                    max-w-[100px]
                                    truncate
                                '>
                                    {userData?.user?.name}
                                </span>


                                <ChevronDown
                                    size={16}
                                    className={`
                                        text-slate-400
                                        transition-transform
                                        ${open ? "rotate-180" : ""}
                                    `}
                                />

                            </button>


                            {/* ================= PROFILE DROPDOWN ================= */}

                            {open && (

                                <div className='
                                    absolute
                                    right-0
                                    top-12
                                    mt-2
                                    w-56
                                    bg-white
                                    rounded-2xl
                                    shadow-xl
                                    border border-slate-200
                                    overflow-hidden
                                    py-2
                                    z-50
                                '>

                                    <button
                                        className='
                                            flex items-center gap-3
                                            w-full
                                            px-4 py-3
                                            text-sm
                                            text-slate-700
                                            hover:bg-indigo-50
                                            hover:text-indigo-600
                                            transition
                                            cursor-pointer
                                        '
                                        onClick={() => {
                                            setOpen(!open)
                                            navigate("/profile")
                                        }}
                                    >
                                        <User size={18} />
                                        <span>My Profile</span>
                                    </button>


                                    <button
                                        className='
                                            flex items-center gap-3
                                            w-full
                                            px-4 py-3
                                            text-sm
                                            text-slate-700
                                            hover:bg-indigo-50
                                            hover:text-indigo-600
                                            transition
                                            cursor-pointer
                                        '
                                        onClick={() => {
                                            setOpen(!open)
                                            navigate("/courses")
                                        }}
                                    >
                                        <BookOpen size={18} />
                                        <span>My Courses</span>
                                    </button>


                                    <div className='
                                        h-px
                                        bg-slate-100
                                        my-1
                                    ' />


                                    <button
                                        className='
                                            flex items-center gap-3
                                            w-full
                                            px-4 py-3
                                            text-sm
                                            text-red-500
                                            hover:bg-red-50
                                            transition
                                            cursor-pointer
                                        '
                                        onClick={handleLogOut}
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>

                                </div>

                            )}

                        </div>

                    </>

                )}


                {/* ================= LOGGED OUT ================= */}

                {!userData && (

                    <>

                        <div
                            className='
                                px-4 py-2
                                text-sm font-medium
                                text-slate-600
                                cursor-pointer
                                hover:text-indigo-600
                                transition
                            '
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </div>


                        <div
                            className='
                                px-5 py-2.5
                                rounded-xl
                                bg-indigo-600
                                text-white
                                text-sm font-medium
                                cursor-pointer
                                shadow-lg shadow-indigo-200
                                hover:bg-indigo-700
                                transition
                            '
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                        </div>

                    </>

                )}

            </div>


            {/* ================= MOBILE HAMBURGER ================= */}

            <div className='lg:hidden'>

                <button
                    className='
                        w-10 h-10
                        flex items-center justify-center
                        rounded-xl
                        hover:bg-slate-100
                        transition
                        cursor-pointer
                    '
                    onClick={() => {
                        setOpenham(!openham);
                    }}
                >

                    {openham
                        ?
                        <RiCloseLargeFill className='w-7 h-7' />
                        :
                        <RxHamburgerMenu className='w-7 h-7' />
                    }

                </button>

            </div>


            {/* ================= MOBILE SIDEBAR ================= */}

            <div className={`
                fixed
                flex flex-col
                w-[85%] sm:w-[380px]
                lg:hidden
                h-screen
                bg-white
                top-0
                pt-5
                right-0
                shadow-2xl
                border-l border-slate-200
                transform
                transition-transform
                duration-300
                z-50

                ${openham
                    ? "translate-x-0"
                    : "translate-x-full"
                }
            `}>


                {/* ================= MOBILE HEADER ================= */}

                <div className='
                    flex items-center justify-between
                    px-5
                    pb-5
                    border-b border-slate-100
                '>

                    <div className='flex items-center gap-2'>

                        <img
                            src="EduFlowlogo.png"
                            alt="EduFlow"
                            className='w-9 h-9 object-contain'
                        />

                        <span className='
                            text-xl
                            font-extrabold
                            text-slate-900
                        '>
                            Edu<span className='text-indigo-600'>Flow</span>
                        </span>

                    </div>


                    <RiCloseLargeFill
                        className='
                            w-7 h-7
                            cursor-pointer
                            text-slate-600
                            hover:text-indigo-600
                            transition
                        '
                        onClick={() => {
                            setOpenham(!openham);
                        }}
                    />

                </div>


                {/* ================= MOBILE USER ================= */}

                {userData?.user && (

                    <div className='
                        mx-5 mt-5
                        p-4
                        rounded-2xl
                        bg-indigo-50
                        border border-indigo-100
                    '>

                        <div className='flex items-center gap-3'>

                            {userData?.user?.avatar ?

                                <div className='
                                    w-12 h-12
                                    rounded-full
                                    overflow-hidden
                                    border-2 border-white
                                '>

                                    <img
                                        src={userData.user.avatar}
                                        className='
                                            w-full h-full
                                            rounded-full
                                            object-cover
                                        '
                                    />

                                </div>

                                :

                                <div className='
                                    w-12 h-12
                                    rounded-full
                                    flex items-center justify-center
                                    bg-indigo-600
                                    text-white
                                    font-bold
                                    text-xl
                                '>
                                    {userData?.user?.name
                                        ?.slice(0, 1)
                                        .toUpperCase()}
                                </div>
                            }


                            <div className='min-w-0'>

                                <h2 className='
                                    text-base
                                    font-semibold
                                    text-slate-800
                                    truncate
                                '>
                                    {userData?.user?.name}
                                </h2>

                                <p className='
                                    text-xs
                                    text-slate-500
                                    truncate
                                '>
                                    {userData?.user?.email}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* ================= MOBILE NAV LINKS ================= */}

                <div className='px-5 py-6 space-y-2'>


                    {/* Home */}

                    <button
                        className='
                            w-full
                            flex items-center
                            gap-4
                            px-4 py-3.5
                            rounded-xl
                            text-indigo-600
                            bg-indigo-50
                            font-medium
                            transition
                        '
                        onClick={() => {
                            setOpenham(false)
                            navigate("/")
                        }}
                    >
                        <Home size={20} />
                        <span>Home</span>
                    </button>


                    {/* Courses */}

                    <button
                        className='
                            w-full
                            flex items-center
                            gap-4
                            px-4 py-3.5
                            rounded-xl
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-indigo-600
                            font-medium
                            transition
                        '
                        onClick={() => {
                            setOpenham(false)
                            navigate("/courses")
                        }}
                    >
                        <BookOpen size={20} />
                        <span>Courses</span>
                    </button>


                    {/* About */}

                    <button
                        className='
                            w-full
                            flex items-center
                            gap-4
                            px-4 py-3.5
                            rounded-xl
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-indigo-600
                            font-medium
                            transition
                        '
                        onClick={() => {
                            setOpenham(false)
                            navigate("/about")
                        }}
                    >
                        <Info size={20} />
                        <span>About</span>
                    </button>


                    {/* ================= USER OPTIONS ================= */}

                    {userData?.user && (

                        <>

                            <button
                                className='
                                    w-full
                                    flex items-center
                                    gap-4
                                    px-4 py-3.5
                                    rounded-xl
                                    text-slate-600
                                    hover:bg-slate-50
                                    hover:text-indigo-600
                                    font-medium
                                    transition
                                '
                                onClick={() => {
                                    setOpenham(false)
                                    navigate("/profile")
                                }}
                            >
                                <User size={20} />
                                <span>My Profile</span>
                            </button>


                            <button
                                className='
                                    w-full
                                    flex items-center
                                    gap-4
                                    px-4 py-3.5
                                    rounded-xl
                                    text-slate-600
                                    hover:bg-slate-50
                                    hover:text-indigo-600
                                    font-medium
                                    transition
                                '
                                onClick={() => {
                                    setOpenham(false)
                                    navigate("/courses")
                                }}
                            >
                                <BookOpen size={20} />
                                <span>My Courses</span>
                            </button>


                            {userData?.user?.role === "educator" && (

                                <button
                                    className='
                                        w-full
                                        flex items-center
                                        gap-4
                                        px-4 py-3.5
                                        rounded-xl
                                        text-slate-600
                                        hover:bg-slate-50
                                        hover:text-indigo-600
                                        font-medium
                                        transition
                                    '
                                    onClick={() => {
                                        setOpenham(false)
                                        navigate("/dashboard")
                                    }}
                                >
                                    <LayoutDashboard size={20} />
                                    <span>Dashboard</span>
                                </button>

                            )}

                        </>

                    )}

                </div>


                {/* ================= MOBILE BOTTOM ================= */}

                <div className='
                    mt-auto
                    p-5
                    border-t border-slate-100
                '>

                    {userData ?

                        <button
                            className='
                                w-full
                                flex items-center justify-center
                                gap-3
                                px-4 py-3
                                rounded-xl
                                bg-red-50
                                text-red-500
                                font-medium
                                hover:bg-red-100
                                transition
                            '
                            onClick={handleLogOut}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>

                        :

                        <div className='space-y-3'>

                            <button
                                className='
                                    w-full
                                    flex items-center justify-center
                                    gap-3
                                    px-4 py-3
                                    rounded-xl
                                    border border-slate-200
                                    text-slate-700
                                    font-medium
                                    hover:border-indigo-300
                                    hover:text-indigo-600
                                    transition
                                '
                                onClick={() => {
                                    setOpenham(false)
                                    navigate("/login")
                                }}
                            >
                                <LogIn size={20} />
                                <span>Login</span>
                            </button>


                            <button
                                className='
                                    w-full
                                    flex items-center justify-center
                                    gap-3
                                    px-4 py-3
                                    rounded-xl
                                    bg-indigo-600
                                    text-white
                                    font-medium
                                    shadow-lg
                                    shadow-indigo-200
                                    hover:bg-indigo-700
                                    transition
                                '
                                onClick={() => {
                                    setOpenham(false)
                                    navigate("/signup")
                                }}
                            >
                                <UserPen size={20} />
                                <span>Create Account</span>
                            </button>

                        </div>

                    }

                </div>

            </div>


            {/* ================= MOBILE OVERLAY ================= */}

            {openham && (

                <div
                    className='
                        fixed inset-0
                        bg-slate-900/20
                        backdrop-blur-sm
                        z-40
                        lg:hidden
                    '
                    onClick={() => setOpenham(false)}
                />

            )}

        </div>
    )
}

export default Nav