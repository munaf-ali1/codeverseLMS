import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true, // react, js, cpp
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: Number, // index of option (0,1,2,3)
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TestQuestion", mcqSchema);
