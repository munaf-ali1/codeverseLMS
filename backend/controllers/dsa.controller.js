import DsaQuestion from "../models/dsaQuestion.js";
import DsaSubmission from "../models/dsaSubmission.js";
import { runCppCode } from "../utils/runCppCode.js";


export const addDsaQuestion = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const question = await DsaQuestion.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      questionId: question._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add question" });
  }
};


export const getDsaTopics = async (req, res) => {
  try {
    const topics = await DsaQuestion.distinct("topic");
  res.json({ success: true, topics });
  } catch (error) {
     res.status(500).json({
      success: false,
      message: "Failed to fetch topics",
    });
    
  }
 
};


export const getQuestionsByTopic = async (req, res) => {
  try {
    const { topic, search } = req.query;

    //Filter
    const filter = {};

    if (topic && topic.trim() !== "") {
      filter.topic = topic.toLowerCase();
    }

    if (search && search.trim() !== "") {
      filter.title = { $regex: search, $options: "i" };
    }

    //QUESTIONS
    const questions = await DsaQuestion.find(filter)
      .select("title difficulty topic createdAt")
      .sort({ createdAt: -1 });

    // SUBMISSIONS 
    const submissionMap = {};

    if (req.user?._id) {
      const submissions = await DsaSubmission.find({
        user: req.user._id,
      });

      submissions.forEach((s) => {
        submissionMap[s.question.toString()] = {
          verdict: s.verdict,
          solved: s.solved,
        };
      });
    }

    //  MERGE STATUS
    const questionsWithStatus = questions.map((q) => {
      const status = submissionMap[q._id.toString()];

      return {
        ...q.toObject(),
        status: status
          ? status.solved
            ? "solved"
            : "attempted"
          : "unsolved",
        verdict: status?.verdict || null,
      };
    });

    res.json({
      success: true,
      questions: questionsWithStatus,
    });
  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
};






export const getSingleDsaQuestion = async (req, res) => {
  const question = await DsaQuestion.findById(req.params.id)
    .select("-hiddenTestCases");

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json({ success: true, question });
};


export const runCode = async (req, res) => {
  const { questionId, code } = req.body;

  const question = await DsaQuestion.findById(questionId);
  let results = [];

  for (let tc of question.sampleTestCases) {
    const output = await runCppCode(code, tc.input);
    results.push({
      input: tc.input,
      expected: tc.output.trim(),
      actual: output,
      passed: output === tc.output.trim(),
    });
  }

  res.json({ success: true, results });
};

//Submit Code


export const submitCode = async (req, res) => {
  try {
    const { questionId, code } = req.body;
    const userId = req.user._id;

    if (!questionId || !code) {
      return res.status(400).json({
        success: false,
        message: "Question ID and code required",
      });
    }

    const question = await DsaQuestion.findById(questionId)
      .select("+hiddenTestCases");

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    let verdict = "Accepted";

    // Run hidden test cases
    for (let tc of question.hiddenTestCases) {
      const output = await runCppCode(code, tc.input);

      if (output !== tc.output.trim()) {
        verdict = "Wrong Answer";
        break;
      }
    }

    // Find existing submission
    let submission = await DsaSubmission.findOne({
      user: userId,
      question: questionId,
    });

    if (!submission) {
      //  First attempt
      submission = await DsaSubmission.create({
        user: userId,
        question: questionId,
        verdict,
        solved: verdict === "Accepted",
        attempts: 1,
      });
    } else {
      //  Re-attempt
      submission.attempts += 1;
      submission.verdict = verdict;

      if (verdict === "Accepted") {
        submission.solved = true;
      }

      submission.lastSubmittedAt = new Date();
      await submission.save();
    }

    res.json({
      success: true,
      verdict,
      solved: submission.solved,
      attempts: submission.attempts,
    });
  } catch (error) {
    console.error("SUBMIT DSA ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Submission failed",
    });
  }
};



export const getDsaStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const solved = await DsaSubmission.countDocuments({
      user: userId,
      solved: true,
    });

    const attempted = await DsaSubmission.countDocuments({
      user: userId,
      solved: false,
    });

    res.json({
      success: true,
      solved,
      attempted,
    });
  } catch (error) {
    console.error("DSA STATS ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch DSA stats",
    });
  }
};







