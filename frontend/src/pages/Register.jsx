import AuthLayout from "../components/AuthLayout.jsx";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import { useLocation } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data.user));
      alert("Account Created Successfully 🚀");
      navigate(location.state?.from || "/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join CodeVerse">
      
      <motion.div
        whileHover={{ y: -4 }}
        className="
          transition-all duration-300
          hover:shadow-2xl hover:shadow-indigo-500/30
          rounded-2xl
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            name="name"
            onChange={handleChange}
            placeholder="Full name"
            className="input"
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />

          
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              className="input pr-12"
            />

           
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
            Register
          </motion.button>
        </form>
      </motion.div>

      <p className="text-center text-gray-400 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;



