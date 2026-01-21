import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { serverUrl } from "../App.jsx";

const DsaProblemPage = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [verdict, setVerdict] = useState(null);

  // FETCH QUESTION
  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const res = await axios.get(`${serverUrl}/api/dsa/${id}`, {
      withCredentials: true,
    });

    setQuestion(res.data.question);
    setCode(res.data.question.starterCode);
  };

 // RUN CODE (Sample TC)
  const runCode = async () => {
    try {
      setRunning(true);
      setResult(null);

      const res = await axios.post(
        `${serverUrl}/api/dsa/run`,
        { questionId: id, code },
        { withCredentials: true }
      );

      setResult(res.data.results);
    } catch (err) {
      alert("Code execution failed");
    } finally {
      setRunning(false);
    }
  };

  // SUBMIT CODE (Hidden TC)
  const submitCode = async () => {
    try {
      setRunning(true);
      setVerdict(null);

      const res = await axios.post(
        `${serverUrl}/api/dsa/submit`,
        { questionId: id, code, language: "cpp" },
        { withCredentials: true }
      );

      setVerdict(res.data.message || res.data.verdict);
    } catch (err) {
      alert("Submission failed");
    } finally {
      setRunning(false);
    }
  };

  if (!question) {
    return <p className="text-center mt-32 text-gray-400">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 overflow-y-auto max-h-[85vh]">

          <div>
            <h1 className="text-2xl font-bold">{question.title}</h1>
            <span
              className={`
                inline-block mt-2 px-3 py-1 rounded-full text-sm
                ${
                  question.difficulty === "easy"
                    ? "bg-green-600/20 text-green-400"
                    : question.difficulty === "medium"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-red-600/20 text-red-400"
                }
              `}
            >
              {question.difficulty}
            </span>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-300 whitespace-pre-line">
              {question.description}
            </p>
          </div>

          {question.constraints && (
            <div>
              <h2 className="font-semibold mb-2">Constraints</h2>
              <p className="text-gray-400 whitespace-pre-line">
                {question.constraints}
              </p>
            </div>
          )}

          {/* SAMPLE TEST CASES */}
          <div>
            <h2 className="font-semibold mb-3">Sample Test Cases</h2>

            {question.sampleTestCases.map((tc, i) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 rounded-xl p-4 mb-4"
              >
                <p className="text-sm text-gray-400 mb-1">Input</p>
                <pre className="text-sm bg-black/40 p-2 rounded">
                  {tc.input}
                </pre>

                <p className="text-sm text-gray-400 mt-3 mb-1">Output</p>
                <pre className="text-sm bg-black/40 p-2 rounded">
                  {tc.output}
                </pre>

                {tc.explanation && (
                  <>
                    <p className="text-sm text-gray-400 mt-3 mb-1">
                      Explanation
                    </p>
                    <p className="text-sm text-gray-300">
                      {tc.explanation}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/*  RIGHT: EDITOR  */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">

          <Editor
            height="65vh"
            defaultLanguage="cpp"
            value={code}
            onChange={(v) => setCode(v)}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
            }}
          />

          {/* ACTION BAR */}
          <div className="flex justify-between items-center p-4 border-t border-white/10 bg-black/30">
            <div className="flex gap-4">
              <button
                onClick={runCode}
                disabled={running}
                className="px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500"
              >
                Run
              </button>

              <button
                onClick={submitCode}
                disabled={running}
                className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-500"
              >
                Submit
              </button>
            </div>

            {verdict && (
              <span className="font-semibold text-indigo-400">
                {verdict}
              </span>
            )}
          </div>

          {/* RUN RESULT */}
          {result && (
            <div className="p-4 border-t border-white/10 bg-black/20 text-sm">
              {result.map((r, i) => (
                <div key={i} className="mb-2">
                  <span className={r.passed ? "text-green-400" : "text-red-400"}>
                    {r.passed ? "✔ Passed" : "✖ Failed"}
                  </span>{" "}
                  | Expected: {r.expected} | Got: {r.actual}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DsaProblemPage;






