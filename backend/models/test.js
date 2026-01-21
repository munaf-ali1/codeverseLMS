import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
   
    topic: {
      type: String, // react, js, cpp, mongodb ..
      required: true,
    },
    duration: {
      type: Number, // minutes
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
      questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestQuestion",
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
