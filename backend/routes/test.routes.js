import express from "express";
import protect from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/role.middleware.js";
import {
  createTest,
  addTestQuestion,
  startTest,
  submitTest,
  myTestHistory,
  getTestResult,
  
} from "../controllers/test.controller.js";

const testRouter = express.Router();




// admin
testRouter.post("/", protect,  createTest);
testRouter.post("/question", protect, isAdmin, addTestQuestion);
// student
testRouter.get("/:testId/start", protect, startTest);
testRouter.post("/submit", protect, submitTest);

testRouter.get("/my-history", protect, myTestHistory);
testRouter.get("/result/:id" ,protect,getTestResult);

export default testRouter;