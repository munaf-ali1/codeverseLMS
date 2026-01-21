import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "",
    playlistUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${serverUrl}/api/courses/add`,
        form,
        { withCredentials: true }
      );

      alert("✅ Course added successfully");
      setForm({
        title: "",
        description: "",
        level: "",
        playlistUrl: "",
      });
    } catch (err) {
      alert("❌ Failed to add course");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-black via-gray-900 to-indigo-950 text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          w-full max-w-lg
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
          shadow-2xl shadow-black/40
          hover:shadow-indigo-600/30
          transition
        "
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Add New Course
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="input"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="input h-24 resize-none"
          />

          <input
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Level (Beginner / Intermediate)"
            className="input"
          />

          <input
            name="playlistUrl"
            value={form.playlistUrl}
            onChange={handleChange}
            placeholder="YouTube Playlist URL"
            className="input"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full mt-4 py-3 rounded-full font-semibold
              bg-indigo-600 hover:bg-indigo-500
              shadow-lg shadow-indigo-600/40
              transition
            "
          >
            Add Course
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCourse;
