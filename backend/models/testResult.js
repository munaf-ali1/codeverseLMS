import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    totalQuestions: Number,
    correctAnswers: Number,

    score: Number, // correctAnswers

    answers: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TestQuestion",
        },
        selectedOption: Number,
        isCorrect: Boolean,
      },
    ],

    timeTaken: Number, // seconds
  },
  { timestamps: true }
);

export default mongoose.model("TestResult", testResultSchema);

