import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { serverURL } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${serverURL}/api/auth/forget-password`,
        { email }
      );

      toast.success(res.data.message);
      setEmail("");
      navigate("/login")

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-100 border p-6 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-5">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border w-full p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;