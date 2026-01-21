import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TestTopic = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold capitalize">
          {topic} Test
        </h1>

        <ul className="text-gray-400 mt-6 space-y-2">
          <li>• 20 MCQs</li>
          <li>• 30 Minutes</li>
          <li>• Real assessment level</li>
          <li>• Auto result generation</li>
        </ul>

        <button
          onClick={() => navigate(`/tests/${topic}/config`)}
          className="btn-primary w-full mt-8"
        >
          Start Test
        </button>
      </motion.div>
    </div>
  );
};

export default TestTopic;
