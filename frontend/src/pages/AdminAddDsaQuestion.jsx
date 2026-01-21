import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { serverUrl } from "../App.jsx";

const emptySample = { input: "", output: "", explanation: "" };
const emptyHidden = { input: "", output: "" };

const AdminAddDsaQuestion = () => {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "easy",
    description: "",
    constraints: "",

    functionSignature: "",
    returnType: "",
    inputFormat: "",
    outputFormat: "",

    starterCode: "",
  });

  const [sampleCases, setSampleCases] = useState([{ ...emptySample }]);
  const [hiddenCases, setHiddenCases] = useState([{ ...emptyHidden }]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSampleChange = (i, field, value) => {
    const updated = [...sampleCases];
    updated[i] = { ...updated[i], [field]: value };
    setSampleCases(updated);
  };

  const handleHiddenChange = (i, field, value) => {
    const updated = [...hiddenCases];
    updated[i] = { ...updated[i], [field]: value };
    setHiddenCases(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/dsa`,
        {
          ...form,
          sampleTestCases: sampleCases,
          hiddenTestCases: hiddenCases,
        },
        { withCredentials: true }
      );

      alert("✅ DSA Question Added");

      setForm({
        title: "",
        topic: "",
        difficulty: "easy",
        description: "",
        constraints: "",

        functionSignature: "",
        returnType: "",
        inputFormat: "",
        outputFormat: "",

        starterCode: "",
      });

      setSampleCases([{ ...emptySample }]);
      setHiddenCases([{ ...emptyHidden }]);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-indigo-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold mb-8">➕ Add DSA Question</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
          <input name="topic" value={form.topic} onChange={handleChange} placeholder="Topic (array, dp)" className="input" />

          <select name="difficulty" value={form.difficulty} onChange={handleChange} className="input">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input h-28" />
          <textarea name="constraints" value={form.constraints} onChange={handleChange} placeholder="Constraints" className="input h-20" />

          <input name="functionSignature" value={form.functionSignature} onChange={handleChange} placeholder="Function Signature" className="input" />
          <input name="returnType" value={form.returnType} onChange={handleChange} placeholder="Return Type" className="input" />
          <input name="inputFormat" value={form.inputFormat} onChange={handleChange} placeholder="Input Format" className="input" />
          <input name="outputFormat" value={form.outputFormat} onChange={handleChange} placeholder="Output Format" className="input" />

          <textarea name="starterCode" value={form.starterCode} onChange={handleChange} placeholder="Starter Code (Function only)" className="input h-40 font-mono" />

          {/* SAMPLE CASES */}
          <Section title="Sample Test Cases">
            {sampleCases.map((tc, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-4">
                <input className="input" placeholder="Input" value={tc.input} onChange={(e) => handleSampleChange(i, "input", e.target.value)} />
                <input className="input" placeholder="Output" value={tc.output} onChange={(e) => handleSampleChange(i, "output", e.target.value)} />
                <input className="input" placeholder="Explanation" value={tc.explanation} onChange={(e) => handleSampleChange(i, "explanation", e.target.value)} />
              </div>
            ))}
            <AddBtn onClick={() => setSampleCases([...sampleCases, { ...emptySample }])} />
          </Section>

          {/* HIDDEN CASES */}
          <Section title="Hidden Test Cases">
            {hiddenCases.map((tc, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-4">
                <input className="input" placeholder="Input" value={tc.input} onChange={(e) => handleHiddenChange(i, "input", e.target.value)} />
                <input className="input" placeholder="Output" value={tc.output} onChange={(e) => handleHiddenChange(i, "output", e.target.value)} />
              </div>
            ))}
            <AddBtn onClick={() => setHiddenCases([...hiddenCases, { ...emptyHidden }])} />
          </Section>

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Adding..." : "Add Question"}
          </button>

        </form>
      </motion.div>
    </div>
  );
};

export default AdminAddDsaQuestion;

const Section = ({ title, children }) => (
  <div>
    <h2 className="font-semibold mb-3">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const AddBtn = ({ onClick }) => (
  <button type="button" onClick={onClick} className="text-indigo-400 text-sm hover:underline">
    ➕ Add More
  </button>
);


