import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const TestResultSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const res = await axios.get(
        `${serverUrl}/api/tests/result/${id}`,
        { withCredentials: true }
      );
      setResult(res.data.result);
    };
    fetchResult();
  }, [id]);

  if (!result) {
    return <p className="text-center mt-40 text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Test Result 🎯
        </h1>

        <div className="space-y-3 text-center">
          <p>Topic: <b>{result.topic}</b></p>
          <p>Score: <b>{result.score} / {result.totalQuestions}</b></p>
          <p>Accuracy: <b>{((result.score / result.totalQuestions) * 100).toFixed(2)}%</b></p>
          <p>Time Taken: <b>{Math.floor(result.timeTaken / 60)} min</b></p>
        </div>

        <button
          onClick={() => navigate(`/tests/analysis/${id}`)}
          className="w-full mt-8 bg-indigo-600 py-3 rounded-full"
        >
          View Full Analysis
        </button>
      </div>
    </div>
  );
};

export default TestResultSummary;


