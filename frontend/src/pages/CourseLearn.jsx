import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const CourseLearn = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // FETCH COURSE
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/courses/${id}`,
          { withCredentials: true }
        );

        setCourse(res.data.course);
        setActiveLesson(res.data.course.lessons[0]);

        //  important for progress
        setCompletedLessons(
          res.data.completedLessons || []
        );
      } catch (err) {
        console.error("FETCH COURSE ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

 
  // MARK LESSON COMPLETE
  
  const markComplete = async (lessonId) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/courses/lesson/complete`,
        {
          courseId: course._id,
          lessonId,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setCompletedLessons((prev) =>
          prev.includes(lessonId)
            ? prev
            : [...prev, lessonId]
        );
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to mark lesson complete"
      );
    }
  };


  // LOADING
  
  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-32">
        Loading course...
      </p>
    );
  }

  if (!course) return null;

 
  // UI

  return (
    <div className="
      min-h-screen pt-24 px-6
      bg-gradient-to-br from-black via-gray-900 to-indigo-950
      text-white
    ">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          {course.title}
        </h1>
        <p className="text-gray-400 mt-2">
          {course.description}
        </p>
      </motion.div>

     
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

       
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            md:col-span-1
            bg-white/5 backdrop-blur-lg
            border border-white/10
            rounded-2xl p-4
            h-fit
          "
        >
          <h2 className="font-semibold mb-4">
            Lessons
          </h2>

          {course.lessons.map((lesson) => {
            const isCompleted =
              completedLessons.includes(lesson._id);

            return (
              <div
                key={lesson._id}
                onClick={() => setActiveLesson(lesson)}
                className={`
                  p-3 mb-2 rounded-lg cursor-pointer
                  transition
                  ${
                    activeLesson?._id === lesson._id
                      ? "bg-indigo-600"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span>{lesson.title}</span>
                  {isCompleted && (
                    <span className="text-green-400 text-sm">
                      ✓
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markComplete(lesson._id);
                  }}
                  disabled={isCompleted}
                  className={`
                    mt-2 text-xs px-3 py-1 rounded-full
                    ${
                      isCompleted
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-400"
                    }
                  `}
                >
                  {isCompleted
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            );
          })}
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3"
        >
          <h2 className="text-xl font-semibold mb-4">
            {activeLesson?.title}
          </h2>

          <div className="
            aspect-video rounded-2xl overflow-hidden
            border border-white/10
            shadow-xl shadow-black/40
          ">
            <iframe
              src={activeLesson?.youtubeUrl}
              title="Course Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseLearn;



