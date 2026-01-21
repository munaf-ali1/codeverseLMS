import AuthLayout from "../components/AuthLayout.jsx";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";



  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ ADD: show / hide password state
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
      alert("Login Successful 🚀");
      navigate(redirectTo);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to CodeVerse">
      {/*  ADD: hover + shadow effect on whole card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="
                cursor-pointer
                    bg-white/5 
        border border-white/10
        rounded-2xl p-6
        shadow-xl shadow-black/40
        hover:shadow-indigo-500/30
        transition
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />

          {/*  PASSWORD WITH EYE ICON */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              className="input pr-12"
            />

            {/*  Toggle Button */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                cursor-pointer select-none
                text-gray-400 hover:text-indigo-400
                transition
              "
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <motion.button className="btn-primary">
            Login
          </motion.button>
        </form>
      </motion.div>

      <p className="text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-indigo-400">Register</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
