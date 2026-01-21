import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { serverUrl } from "../App.jsx";

const StartTest = () => {
  const { topic } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // CONFIG FROM TEST CONFIG PAGE
  const questionsCount = state?.questions || 10;
  const totalTime = (state?.time || 30) * 60; // seconds
  const testId = state?.testId; // IMPORTANT

  // STATE
  const [mcqs, setMcqs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH MCQs
  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/mcqs?topic=${topic}&limit=${questionsCount}`,
          { withCredentials: true }
        );
        setMcqs(res.data.mcqs || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMCQs();
  }, [topic, questionsCount]);

  // TIMER
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit(); //  AUTO SUBMIT
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);


  useEffect(() => {
  if (!testId) {
    alert("Invalid test session. Please start test again.");
    navigate("/tests");
  }
}, [testId, navigate]);


   console.log("testId =", testId);
  // SUBMIT HANDLER
  const handleSubmit = async () => {
    if (submitted || loading) return;

    try {
      setLoading(true);
      setSubmitted(true);

      // transform answers for backend
      const payloadAnswers = Object.keys(answers).map((index) => ({
        questionId: mcqs[index]._id,
        selectedOption: answers[index],
      }));

       const res = await axios.post(
  `${serverUrl}/api/tests/submit`,
  {
    testId,
    answers: payloadAnswers,
    timeTaken: totalTime - timeLeft,
  },
  { withCredentials: true }
);

    navigate(`/tests/result/${res.data.resultId}`);

    } catch (err) {
      alert("Test submission failed");
      setSubmitted(false);
      setLoading(false);
    }
  };

  // LOADING
  if (!mcqs.length) {
    return (
      <p className="text-center mt-40 text-gray-400">
        Loading questions...
      </p>
    );
  }

  const q = mcqs[current];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

 
  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold capitalize">
            {topic} Assessment
          </h1>

          <div className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-sm">
            ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* QUESTION CARD */}
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="
            bg-white/5 backdrop-blur-lg
            border border-white/10
            rounded-2xl p-8
            shadow-xl shadow-black/30
          "
        >
          <h2 className="text-lg font-semibold mb-6">
            Q{current + 1}. {q.question}
          </h2>

          <div className="space-y-4">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={`
                  flex items-center gap-4 p-4 rounded-xl
                  border cursor-pointer transition
                  ${
                    answers[current] === i
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 hover:bg-white/5"
                  }
                `}
              >
                <input
                  type="radio"
                  checked={answers[current] === i}
                  onChange={() =>
                    setAnswers({ ...answers, [current]: i })
                  }
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* FOOTER NAV */}
        <div className="flex justify-between items-center mt-8">

          <button
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
            className="
              px-5 py-2 rounded-full
              border border-white/20
              text-sm
              disabled:opacity-40
              hover:bg-white/10
              transition
            "
          >
            Previous
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-6 py-2 rounded-full
              text-sm font-semibold
              bg-red-600 hover:bg-red-500
              shadow-lg shadow-red-600/30
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Submitting..." : "Submit Test"}
          </button>

          <button
            disabled={current === mcqs.length - 1}
            onClick={() => setCurrent((c) => c + 1)}
            className="
              px-5 py-2 rounded-full
              border border-white/20
              text-sm
              disabled:opacity-40
              hover:bg-white/10
              transition
            "
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default StartTest;





