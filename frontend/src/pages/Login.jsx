import React, { useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'
import axios from 'axios';
import { serverURL } from '../App';
import { toast } from 'react-toastify';

const Login = () => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const result = await axios.post(serverURL + '/api/auth/login', { email, password }, { withCredentials: true })
      console.log(result.data);
      setLoading(false);
      toast.success("Logged in successfully")

      if(result){
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }

  }

  return (
    <div className='flex w-full h-screen items-center justify-center bg-cover bg-center px-4 sm:px-6' style={{
      backgroundImage:
        "url('signup-bg.jpg')",
    }}>
      <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-6 sm:p-8  w-md md:w-[50%] lg:w-[40%]">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="/EduFlowlogo.png"
            alt="EduFlow Logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />

          <h1 className="text-2xl sm:text-3xl font-extrabold">
            EduFlow
          </h1>
        </div>

        <form className='space-y-5' onSubmit={handleLogin}>


          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl   bg-white/30 focus:outline-none "
              onChange={(e) => setEmail(e.target.value)} value={email}
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className='relative'>
              <input
                type={show ? "text" : "password"}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl   bg-white/30 focus:outline-none "
                onChange={(e) => setPassword(e.target.value)} value={password}
              />
              <button
                type='button'
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-700 hover:text-black"
              >
                {show ? <LuEye size={18} /> : <LuEyeClosed size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit px-10 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color='white'/> : "Login"}
            </button>
          </div>
          

          <div className="flex items-center">
            <div className="grow h-px bg-gray-700"></div>
            <span className="mx-4 text-sm text-gray-800">OR</span>
            <div className="grow h-px bg-gray-700"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 bg-white/60 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            Continue with Google
          </button>

          <p className="text-center text-sm text-amber-50">
            Don't have an account?{" "}
            <span
              className="text-cyan-400 hover:underline cursor-pointer font-semibold"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </span>
          </p>


        </form>
      </div>

    </div>
  )
}

export default Login
