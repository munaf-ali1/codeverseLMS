import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const AddLesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    youtubeUrl: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${serverUrl}/api/courses/${courseId}/lesson`,
        form,
        { withCredentials: true }
      );

      alert("Lesson added successfully 🎉");
      navigate("/admin/courses");
    } catch (err) {
      alert("Failed to add lesson");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <h1 className="text-3xl font-bold mb-10">
        Add Lesson
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          max-w-xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
        "
      >
        <input
          name="title"
          placeholder="Lesson title"
          onChange={handleChange}
          className="input mb-4"
        />

        <input
          name="youtubeUrl"
          placeholder="YouTube link"
          onChange={handleChange}
          className="input mb-6"
        />

        <button className="btn-primary">
          Add Lesson
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
