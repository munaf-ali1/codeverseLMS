import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { motion } from "framer-motion";

const AddMCQ = () => {
  const [form, setForm] = useState({
    topic: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: null,
  });

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm({ ...form, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.topic ||
      !form.question ||
      form.options.some((o) => !o) ||
      form.correctAnswer === null
    ) {
      return alert("Please fill all fields properly");
    }

    try {
      await axios.post(
        `${serverUrl}/api/mcqs`,
        form,
        { withCredentials: true }
      );

      alert("MCQ added successfully ");

      // reset form
      setForm({
        topic: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: null,
      });
    } catch (err) {
      alert("Failed to add MCQ");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          max-w-2xl mx-auto
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
          shadow-xl shadow-black/40
        "
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Add MCQ Question
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TOPIC */}
          <div>
            <label className="block mb-2 text-gray-300">
              Select Topic
            </label>
            <select
              value={form.topic}
              onChange={(e) =>
                setForm({ ...form, topic: e.target.value })
              }
              className="input"
            >
              <option value="">-- Select Topic --</option>
              <option value="react">React</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="mongodb">MongoDB</option>
              <option value="express">Express</option>
            </select>
          </div>

          {/* QUESTION */}
          <div>
            <label className="block mb-2 text-gray-300">
              Question
            </label>
            <textarea
              placeholder="Enter question here..."
              value={form.question}
              onChange={(e) =>
                setForm({ ...form, question: e.target.value })
              }
              className="input h-24"
            />
          </div>

          {/* OPTIONS */}
          <div>
            <label className="block mb-3 text-gray-300">
              Options (select correct one)
            </label>

            <div className="space-y-3">
              {form.options.map((opt, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-4
                    bg-black/30 border border-white/10
                    rounded-xl px-4 py-3
                  "
                >
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={form.correctAnswer === i}
                    onChange={() =>
                      setForm({ ...form, correctAnswer: i })
                    }
                  />

                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(i, e.target.value)
                    }
                    className="flex-1 bg-transparent outline-none text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-full font-semibold
              bg-indigo-600 hover:bg-indigo-500
              shadow-lg shadow-indigo-600/40
              transition
            "
          >
            Add Question
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMCQ;

