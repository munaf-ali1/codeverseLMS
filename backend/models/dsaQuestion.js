import mongoose from "mongoose";



const sampleTestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
});

const hiddenTestCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
});



const dsaQuestionSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String, // array, string, dp, tree
      required: true,
      lowercase: true,
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    constraints: {
      type: String,
    },

    

    functionSignature: {
      type: String,
      required: true,
      // example:
      // vector<int> twoSum(vector<int>& nums, int target)
    },

    returnType: {
      type: String,
      required: true,
      // example: vector<int>
    },

    inputFormat: {
      type: String,
      required: true,
      // example: nums = [2,7,11,15], target = 9
    },

    outputFormat: {
      type: String,
      required: true,
      // example: [0,1]
    },

    starterCode: {
      type: String,
      required: true,
      // ONLY FUNCTION, NO MAIN
      // example:
      // vector<int> twoSum(vector<int>& nums, int target) {
      //     // code here
      // }
    },

    /* TEST CASES */

    sampleTestCases: {
      type: [sampleTestCaseSchema],
      validate: [(v) => v.length > 0, "At least one sample test case required"],
    },

    hiddenTestCases: {
      type: [hiddenTestCaseSchema],
      validate: [(v) => v.length > 0, "At least one hidden test case required"],
      select: false, //  never expose to frontend
    },

    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DsaQuestion", dsaQuestionSchema);


