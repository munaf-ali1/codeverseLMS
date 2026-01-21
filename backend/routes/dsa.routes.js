import express from "express";
import protect from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/role.middleware.js";
import {
  addDsaQuestion,
  getDsaTopics,
  getQuestionsByTopic,
  getSingleDsaQuestion,
  runCode,
  submitCode,
  getDsaStats
} from "../controllers/dsa.controller.js";

const DsaRouter = express.Router();

// ADMIN
DsaRouter.post("/", protect, isAdmin, addDsaQuestion);

// STUDENT
DsaRouter.get("/stats", protect, getDsaStats);
DsaRouter.get("/topics", protect, getDsaTopics);
DsaRouter.get("/questions", protect, getQuestionsByTopic);
DsaRouter.get("/:id", protect, getSingleDsaQuestion);

DsaRouter.post("/run", protect, runCode);
DsaRouter.post("/submit", protect, submitCode);


export default DsaRouter;

