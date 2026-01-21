import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const TestAnalysis = () => {
  const { id } = useParams();
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
    return <p className="text-center mt-40 text-gray-400">Loading analysis...</p>;
  }

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-center">
          Test Analysis 🧠
        </h1>

        {result.answers.map((ans, idx) => (
          <div
            key={idx}
            className="bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">
                Q{idx + 1}. {ans.question.question}
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  ans.isCorrect
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {ans.isCorrect ? "Correct" : "Wrong"}
              </span>
            </div>

            <div className="space-y-2">
              {ans.question.options.map((opt, i) => {
                let style = "border-white/10";

                if (i === ans.question.correctAnswer) {
                  style = "border-green-500 bg-green-500/10";
                }

                if (
                  i === ans.selectedOption &&
                  i !== ans.question.correctAnswer
                ) {
                  style = "border-red-500 bg-red-500/10";
                }

                return (
                  <div
                    key={i}
                    className={`p-3 border rounded-xl ${style}`}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestAnalysis;
