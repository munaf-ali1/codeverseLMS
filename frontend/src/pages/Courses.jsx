import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Courses = () => {
  //  redux
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // local state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState(null);

  // fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/courses`,
          { withCredentials: true }
        );
        setCourses(res.data.courses || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  //  check if already enrolled
  const isEnrolled = (courseId) => {
    return userData?.enrolledCourses?.includes(courseId);
  };

  //  enroll course
  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);

      await axios.post(
        `${serverUrl}/api/courses/enroll`,
        { courseId },
        { withCredentials: true }
      );

      // update redux immediately
      dispatch(
        setUserData({
          ...userData,
          enrolledCourses: [
            ...(userData?.enrolledCourses || []),
            courseId,
          ],
        })
      );
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div
      className="
        min-h-screen pt-28 px-6
        bg-gradient-to-br from-black via-gray-900 to-indigo-950
        text-white
      "
    >
      {/*  HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-14"
      >
        <h1
          className="
            text-4xl md:text-5xl font-extrabold
            bg-gradient-to-r from-indigo-400 to-purple-500
            bg-clip-text text-transparent
          "
        >
          Explore Courses
        </h1>
        <p className="text-gray-400 mt-3">
          Enroll in courses and start learning
        </p>
      </motion.div>

      {/*  LOADING  */}
      {loading && (
        <p className="text-center text-gray-400">
          Loading courses...
        </p>
      )}

      {/* EMPTY STATE  */}
      {!loading && courses.length === 0 && (
        <div className="text-center mt-32 text-gray-400">
          <p className="text-2xl">🚧 No courses available</p>
          <p className="mt-3">
            Courses will appear here once admin adds them.
          </p>
        </div>
      )}

      {/* COURSES GRID */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <motion.div
            key={course._id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={i}
            whileHover={{ y: -10 }}
            className="
              cursor-pointer
              bg-white/5 backdrop-blur-lg
              border border-white/10
              rounded-2xl p-8
              shadow-xl shadow-black/40
              hover:shadow-indigo-600/30
              transition
            "
          >
            <h3 className="text-xl font-semibold mb-3">
              {course.title}
            </h3>

            <p className="text-gray-400 mb-6 line-clamp-3">
              {course.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-400">
                {course.level || "Beginner"}
              </span>

              {/*  ENROLL BUTTON */}
              {isEnrolled(course._id) ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  disabled
                  className="
                    px-4 py-2 rounded-full text-sm font-semibold
                    bg-green-600 text-white
                    cursor-not-allowed
                  "
                >
                  Enrolled ✓
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={enrollingId === course._id}
                  onClick={() => handleEnroll(course._id)}
                  className="
                    cursor-pointer
                    px-4 py-2 rounded-full text-sm font-semibold
                    bg-indigo-600 hover:bg-indigo-500
                    shadow-lg shadow-indigo-600/40
                    transition
                    disabled:opacity-60
                  "
                >
                  {enrollingId === course._id
                    ? "Enrolling..."
                    : "Enroll"}
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses;




