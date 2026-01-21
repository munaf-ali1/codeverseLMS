import TestQuestion from "../models/testQuestions.js";



// Add MCQ to Question Bank
export const addMCQ = async (req, res) => {
  try {
    const mcq = await TestQuestion.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      mcq,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// Get MCQs by Topic
export const getMCQs = async (req, res) => {
  const { topic, limit } = req.query;

  const mcqs = await TestQuestion.aggregate([
    { $match: { topic } },
    { $sample: { size: Number(limit) } }, //  random questions
  ]);

  res.json({
    success: true,
    mcqs,
  });
};