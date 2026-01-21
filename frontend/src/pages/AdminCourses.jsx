import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get(
        `${serverUrl}/api/courses`,
        { withCredentials: true }
      );
      setCourses(res.data.courses || []);
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-10">Admin – Courses</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            whileHover={{ y: -8 }}
            onClick={() =>
              navigate(`/admin/add-lesson/${course._id}`)
            }
            className="
              cursor-pointer
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-6
              hover:shadow-indigo-600/30
              transition
            "
          >
            <h3 className="text-xl font-semibold">
              {course.title}
            </h3>
            <p className="text-gray-400 mt-2">
              {course.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
