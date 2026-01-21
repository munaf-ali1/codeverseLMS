import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { serverUrl } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get(
          `${serverUrl}/api/courses/my-courses`,
          { withCredentials: true }
        );

        const testRes = await axios.get(
          `${serverUrl}/api/tests/my-history`,
          { withCredentials: true }
        );

        setCourses(coursesRes.data.courses || []);
        setTests(testRes.data.history || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

 
  const totalLessons = courses.reduce(
    (acc, c) => acc + (c.lessons?.length || 0),
    0
  );

  const completedLessons = courses.reduce(
    (acc, c) =>
      acc + (c.completedLessons?.length || 0),
    0
  );

  const avgAccuracy =
    tests.length > 0
      ? (
          tests.reduce(
            (a, t) =>
              a +
              ((t.score || 0) /
                (t.totalQuestions || 1)) *
                100,
            0
          ) / tests.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto space-y-12">

        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Student Dashboard 👋
        </motion.h1>

        
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard title="Courses Enrolled" value={courses.length} />
          <StatCard
            title="Lessons Completed"
            value={`${completedLessons}/${totalLessons}`}
          />
          <StatCard title="Tests Given" value={tests.length} />
          <StatCard title="Avg Accuracy" value={`${avgAccuracy}%`} />
        </div>

        
        <Section title="My Courses">
          {courses.length === 0 && (
            <p className="text-gray-400">
              No courses enrolled yet
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => {
              const lessonCount =
                course.lessons?.length || 0;

              const doneCount =
                course.completedLessons?.length || 0;

              const progress =
                lessonCount === 0
                  ? 0
                  : Math.round(
                      (doneCount / lessonCount) *
                        100
                    );

              return (
                <div
                  key={course._id}
                  className="bg-white/5 p-6 rounded-2xl"
                >
                  <h3 className="font-semibold mb-2">
                    {course.title}
                  </h3>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm mt-2 text-gray-400">
                    {progress}% completed
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/courses/${course._id}`
                      )
                    }
                    className="mt-4 text-sm text-indigo-400"
                  >
                    Continue →
                  </button>
                </div>
              );
            })}
          </div>
        </Section>

        
        <Section title="Recent Tests">
          {tests.length === 0 && (
            <p className="text-gray-400">
              No tests attempted yet
            </p>
          )}

          <div className="space-y-4">
            {tests.slice(0, 5).map((test) => (
              <div
                key={test._id}
                className="flex justify-between items-center bg-white/5 p-4 rounded-xl"
              >
                <div>
                  <p className="font-semibold capitalize">
                    {test.topic}
                  </p>
                  <p className="text-sm text-gray-400">
                    Score: {test.score}/
                    {test.totalQuestions}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/tests/result/${test._id}`
                    )
                  }
                  className="text-sm text-indigo-400"
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </Section>

        
        <Section title="Quick Actions">
          <div className="flex gap-6 flex-wrap">
            <ActionBtn
              label="Explore Courses"
              onClick={() => navigate("/courses")}
            />
            <ActionBtn
              label="Take a Test"
              onClick={() => navigate("/tests")}
            />
            <ActionBtn
              label="Practice DSA"
              onClick={() => navigate("/dsa")}
            />
          </div>
        </Section>

      </div>
    </div>
  );
};

export default Dashboard;

/* =========================
   SMALL COMPONENTS
========================= */

const StatCard = ({ title, value }) => (
  <div className="bg-white/5 rounded-2xl p-6">
    <p className="text-sm text-gray-400">
      {title}
    </p>
    <h2 className="text-2xl font-bold mt-2">
      {value}
    </h2>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold mb-6">
      {title}
    </h2>
    {children}
  </div>
);

const ActionBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition"
  >
    {label}
  </button>
);


