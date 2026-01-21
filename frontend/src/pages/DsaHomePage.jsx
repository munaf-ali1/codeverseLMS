import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App.jsx";

const DsaHomePage = () => {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState({ solved: 0, attempted: 0 });
  const [topic, setTopic] = useState("");
  const [search, setSearch] = useState("");

  /* FETCH DATA  */

  useEffect(() => {
    fetchTopics();
    fetchStats();
    fetchQuestions();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [topic, search]);

  const fetchTopics = async () => {
    const res = await axios.get(`${serverUrl}/api/dsa/topics`, {
      withCredentials: true,
    });
    setTopics(res.data.topics || []);
  };

  const fetchStats = async () => {
    const res = await axios.get(`${serverUrl}/api/dsa/stats`, {
      withCredentials: true,
    });
    setStats(res.data || { solved: 0, attempted: 0 });
  };

  const fetchQuestions = async () => {
    const res = await axios.get(
      `${serverUrl}/api/dsa/questions?topic=${topic}&search=${search}`,
      { withCredentials: true }
    );
    setQuestions(res.data.questions || []);
  };

  // UI

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-24">
      <div className="max-w-7xl mx-auto space-y-10">

        {/*  HEADER  */}
        <div>
          <h1 className="text-4xl font-bold text-indigo-400">
            CodeVerse DSA
          </h1>
          <p className="text-gray-400 mt-2">
            Practice Data Structures & Algorithms like LeetCode
          </p>
        </div>

        {/*  STATS BAR*/}
        <div className="grid grid-cols-3 gap-6">
          <Stat label="Solved" value={stats.solved} color="text-green-400" />
          <Stat label="Attempted" value={stats.attempted} color="text-yellow-400" />
          <Stat
            label="Total"
            value={stats.solved + stats.attempted}
            color="text-indigo-400"
          />
        </div>

        {/*  TOPICS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-3">
            <TopicCard
              active={topic === ""}
              label="All"
              onClick={() => setTopic("")}
            />
            {topics.map((t) => (
              <TopicCard
                key={t}
                active={topic === t}
                label={t}
                onClick={() => setTopic(t)}
              />
            ))}
          </div>
        </div>

        {/*  SEARCH BAR  */}
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full p-3 rounded-xl
            bg-white/5 border border-white/10
            focus:outline-none focus:border-indigo-500
          "
        />

        {/*  QUESTIONS TABLE */}
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-4 px-6 py-3 text-sm text-gray-400 border-b border-white/10">
            <span>Title</span>
            <span>Status</span>
            <span>Difficulty</span>
            <span></span>
          </div>

          {questions.length === 0 && (
            <p className="p-6 text-gray-400">No questions found</p>
          )}

          {questions.map((q) => (
            <div
              key={q._id}
              onClick={() => navigate(`/dsa/${q._id}`)}
              className="
                grid grid-cols-4 px-6 py-4
                hover:bg-white/10 cursor-pointer
                border-b border-white/5
              "
            >
              <span className="font-medium">{q.title}</span>

              <span>
                {q.status === "solved" && (
                  <span className="text-green-400">✔ Solved</span>
                )}
                {q.status === "attempted" && (
                  <span className="text-yellow-400">⏳ Attempted</span>
                )}
                {q.status === "unsolved" && (
                  <span className="text-gray-400">○ Unsolved</span>
                )}
              </span>

              <span
                className={
                  q.difficulty === "easy"
                    ? "text-green-400"
                    : q.difficulty === "medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {q.difficulty}
              </span>

              <span className="text-indigo-400 text-sm">
                Solve →
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DsaHomePage;

/* SMALL COMPONENTS  */

const Stat = ({ label, value, color }) => (
  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
    <p className="text-gray-400 text-sm">{label}</p>
    <h2 className={`text-2xl font-bold mt-2 ${color}`}>
      {value}
    </h2>
  </div>
);

const TopicCard = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`
      px-5 py-2 rounded-full text-sm font-semibold
      ${active ? "bg-indigo-600" : "bg-white/10 hover:bg-white/20"}
    `}
  >
    {label}
  </button>
);





