import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const TestHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get(
        `${serverUrl}/api/tests/my-history`,
        { withCredentials: true }
      );
      setHistory(res.data.history);
    };
    fetchHistory();
  }, []);

  if (!history.length) {
    return <p className="text-center mt-40 text-gray-400">No tests attempted yet</p>;
  }

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          My Test History 📚
        </h1>

        {history.map((t) => (
          <div
            key={t._id}
            className="bg-white/5 p-6 rounded-2xl flex justify-between items-center"
          >
            <div>
              <p className="font-semibold capitalize">{t.topic}</p>
              <p className="text-sm text-gray-400">
                Score: {t.score}/{t.totalQuestions}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/tests/result/${t._id}`)}
                className="px-4 py-2 bg-indigo-600 rounded-full"
              >
                Result
              </button>

              <button
                onClick={() => navigate(`/tests/analysis/${t._id}`)}
                className="px-4 py-2 border border-white/20 rounded-full"
              >
                Analysis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHistory;
