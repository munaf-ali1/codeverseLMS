import Test from "../models/test.js";
import TestQuestion from "../models/testQuestions.js";
import TestResult from "../models/testResult.js";
import {shuffleArray} from "../config/shuffle.js";


//ADMIN - Create a Test
export const createTest = async (req,res) =>{
    try {
        const {  topic,duration , totalQuestions} = req.body;
        if(!topic || !duration || !totalQuestions){
            return res.status(400).json({ message: "All fields are required"});
        }
        const test = await Test.create({
            topic,
            
            duration,
            totalQuestions,
            createdBy: req.user._id,

        })
         res.status(201).json({
            success: true,
            message: "Test created successfully",
            test,
        })
   
    } catch (error) {
        res.status(500).json({ message: "Test creation failed" });
        
    }
}

//Add mcq to question bank
export const addTestQuestion = async (req,res) =>{
    try {
        const question = await TestQuestion.create(req.body);
        res.status(201).json(question);
  
    } catch (error) {
        res.status(500).json({ message: "Question creation failed" });
        
    }
}

// Start Test 
export const startTest = async (req, res) => {
  const { testId } = req.params;

  const test = await Test.findById(testId);
  if (!test) return res.status(404).json({ message: "Test not found" });

  // fetch question bank
  let questions = await TestQuestion.find({ topic: test.topic });

  // randomize questions
  questions = shuffleArray(questions).slice(0, test.totalQuestions);

  // randomize options
  const formattedQuestions = questions.map((q) => {
    const correctAnswer = q.options[q.correctOption];
    const shuffledOptions = shuffleArray(q.options);

    return {
      questionId: q._id,
      question: q.question,
      options: shuffledOptions,
      correctAnswer, // hidden on frontend
    };
  });

  res.json({
    testId: test._id,
    title: test.title,
    duration: test.duration,
    questions: formattedQuestions,
  });
};

// Submit Test

export const submitTest = async (req, res) => {
  try {
    const { testId, answers, timeTaken } = req.body;

    //  Validate test
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

  const alreadySubmitted = await TestResult.findOne({
  user: req.user._id,
  test: testId,
});

if (alreadySubmitted) {
  return res.status(400).json({
    success: false,
    message: "Test already submitted",
  });
}



    let score = 0;
    const evaluatedAnswers = [];

    //  Evaluate answers 
    for (let ans of answers) {
      const question = await TestQuestion.findById(ans.questionId);

      if (!question) continue;

      const isCorrect =
        ans.selectedOption === question.correctAnswer;

      if (isCorrect) score++;

      evaluatedAnswers.push({
        question: question._id,
        selectedOption: ans.selectedOption,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    }

    const totalQuestions = evaluatedAnswers.length;

    const accuracy =
      totalQuestions === 0
        ? 0
        : ((score / totalQuestions) * 100).toFixed(2);

    // Save result
    const result = await TestResult.create({
      user: req.user._id,
      topic: test.topic,
      test: testId,
      score,
      totalQuestions,
      accuracy,
      timeTaken,
      answers: evaluatedAnswers,
    });

    res.status(200).json({
      success: true,
      resultId: result._id,
    });
  } catch (error) {
    console.error(" SUBMIT TEST ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






export const myTestHistory = async (req, res) => {
  try {
    const history = await TestResult.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 }) 
      .select("topic score totalQuestions accuracy createdAt");

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error("MY TEST HISTORY ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch test history",
    });
  }
};



export const getTestResult = async (req, res) => {
  const { id } = req.params;

  const result = await TestResult.findById(id)
    .populate("answers.question");

  if (!result) {
    return res.status(404).json({ message: "Result not found" });
  }

  res.json({ 
    sucess: true,

    result
   });
};
