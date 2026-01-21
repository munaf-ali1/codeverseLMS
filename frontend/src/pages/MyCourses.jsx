import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/courses/my-courses`,
          { withCredentials: true }
        );

        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("MY COURSES ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);


  if (loading) {
    return (
      <p className="text-center mt-32 text-gray-400">
        Loading your courses...
      </p>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">
          My Courses
        </h1>

       
        {courses.length === 0 && (
          <p className="text-gray-400">
            You have not enrolled in any course yet.
          </p>
        )}

     
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const totalLessons =
              course.lessons?.length || 0;

            const completed =
              course.completedLessons?.length || 0;

            const progress =
              totalLessons === 0
                ? 0
                : Math.round(
                    (completed / totalLessons) * 100
                  );

            return (
              <motion.div
                key={`${course._id}-${index}`}
                whileHover={{ y: -8 }}
                onClick={() =>
                  navigate(`/courses/${course._id}`)
                }
                className="
                  cursor-pointer
                  bg-white/5 backdrop-blur-lg
                  border border-white/10
                  rounded-2xl p-6
                  shadow-xl shadow-black/40
                  hover:shadow-indigo-500/30
                  transition
                "
              >
                <h3 className="text-xl font-semibold">
                  {course.title}
                </h3>

                <p className="text-gray-400 mt-2 line-clamp-2">
                  {course.description}
                </p>

                {/* PROGRESS */}
                <div className="mt-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    {progress}% completed
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default MyCourses;

