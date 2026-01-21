import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../redux/userSlice";
import { serverUrl } from "../App";

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

   const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(logoutUser());
      setOpen(false);
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const linkStyle = ({ isActive }) =>
    `
    px-5 py-2 rounded-full text-sm font-semibold transition
    ${
      isActive
        ? "bg-indigo-600 text-white"
        : "border border-white/30 text-gray-200 hover:bg-indigo-600 hover:text-white"
    }
    `;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-0 w-full z-50
        bg-gray-900/80 backdrop-blur-lg
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
        >
          <Typewriter
            words={["CodeVerse"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={110}
          />
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">

          

          {/* STUDENT */}
          {isLoggedIn && userData?.role === "student" && (
            <>
              <NavLink to="/dashboard" className={linkStyle}>
                Dashboard
              </NavLink>

              <NavLink to="/dsa" className={linkStyle}>
                DSA Practice
              </NavLink>

               <NavLink to="/my-courses" className={linkStyle}>
                My Courses
              </NavLink>
            </>
          )}

          {/* ADMIN */}
          {isLoggedIn && userData?.role === "admin" && (
            <>
              <NavLink to="/admin/add-course" className={linkStyle}>
                Add Course
              </NavLink>

              {/*  DSA ADD BUTTON */}
              <NavLink to="/admin/add-dsa" className={linkStyle}>
                Add DSA
              </NavLink>
            </>
          )}

          {/* AUTH */}
          {!isLoggedIn && (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkStyle}>
                Register
              </NavLink>
            </>
          )}

          {/* LOGOUT */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="
                px-5 py-2  rounded-full text-sm font-semibold
                bg-red-600 hover:bg-red-500 transition
              "
            >
              Logout
            </button>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {/* MOBILE MENU */}
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="
        md:hidden
        bg-gray-900/95 backdrop-blur-lg
        border-t border-white/10
        px-4 py-4
      "
    >
      <div className="flex flex-wrap gap-2 justify-center">

        {/* STUDENT */}
        {isLoggedIn && userData?.role === "student" && (
          <>
            <NavLink
              onClick={() => setOpen(false)}
              to="/dashboard"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              Dashboard
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/dsa"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              DSA
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/my-courses"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              My Courses
            </NavLink>
          </>
        )}

        {/* ADMIN */}
        {isLoggedIn && userData?.role === "admin" && (
          <>
            <NavLink
              onClick={() => setOpen(false)}
              to="/admin/add-course"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              Add Course
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/admin/add-dsa"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              Add DSA
            </NavLink>
          </>
        )}

        {/* AUTH (NOT LOGGED IN) */}
        {!isLoggedIn && (
          <>
            <NavLink
              onClick={() => setOpen(false)}
              to="/login"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              Login
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              to="/register"
              className="px-3 py-1 text-xs rounded-full border border-white/30 text-gray-200 hover:bg-indigo-600"
            >
              Register
            </NavLink>
          </>
        )}

        
      </div>
    </motion.div>
  )}
</AnimatePresence>

      
    </motion.nav>
  );
};

export default Navbar;










