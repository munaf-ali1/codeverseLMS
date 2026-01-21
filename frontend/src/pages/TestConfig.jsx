import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const TestConfig = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(10);
  const [time, setTime] = useState(30);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);

      // CREATE TEST IN BACKEND
      const res = await axios.post(
        `${serverUrl}/api/tests`,
        {
          topic,
          totalQuestions: questions,
          duration: time,
        },
        { withCredentials: true }
      );

      const testId = res.data.test._id;

      // NOW START TEST
      navigate(`/tests/${topic}/start`, {
        state: {
          testId,
          questions,
          time,
        },
      });
    } catch (err) {
      alert("Failed to start test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl">

        <h1 className="text-2xl font-bold mb-6 capitalize">
          {topic} Test Configuration
        </h1>

        <div className="space-y-4">

          <div>
            <label>No. of Questions</label>
            <input
              type="number"
              value={questions}
              onChange={(e) => setQuestions(+e.target.value)}
              className="w-full p-3 rounded bg-black/30"
            />
          </div>

          <div>
            <label>Time (minutes)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(+e.target.value)}
              className="w-full p-3 rounded bg-black/30"
            />
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 py-3 rounded-full"
          >
            {loading ? "Starting..." : "Start Test"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestConfig;

