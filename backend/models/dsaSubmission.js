import mongoose from "mongoose";

const dsaSubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DsaQuestion",
      required: true,
      index: true,
    },
    verdict: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Compilation Error",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      required: true,
    },
    language: {
      type: String,
      default: "cpp",
    },
    solved: {
      type: Boolean,
      default: false,
      index: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    lastSubmittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

dsaSubmissionSchema.index({ user: 1, question: 1 }, { unique: true });

export default mongoose.model("DsaSubmission", dsaSubmissionSchema);

