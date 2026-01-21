import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const topics = [
  { name: "React", slug: "react" },
  { name: "JavaScript", slug: "javascript" },
  { name: "C++", slug: "cpp" },
  { name: "C", slug: "c" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Express", slug: "express" },
];

const Tests = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-12">
        Choose Test Topic
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <motion.div
            key={topic.slug}
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/tests/${topic.slug}`)}
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
            <h2 className="text-xl font-semibold">
              {topic.name}
            </h2>
            <p className="text-gray-400 mt-2">
              Real-time assessment test
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tests;
