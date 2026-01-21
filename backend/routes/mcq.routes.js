import express from "express";
import protect from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/role.middleware.js";
import { addMCQ, getMCQs } from "../controllers/mcq.controller.js";

const McqRouter = express.Router();

McqRouter.post("/", protect, isAdmin, addMCQ); // admin
McqRouter.get("/", protect, getMCQs); // student

export default McqRouter;