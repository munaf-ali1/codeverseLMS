import express from "express";
import {
  createCourse,
  addLesson,
  getAllCourses,
  getSingleCourse,
  enrollCourse,
  myCourses,
  markLessonComplete,
} from "../controllers/course.controller.js";

import protect from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/role.middleware.js";

const courseRouter = express.Router();

  // ADMIN ROUTES


// Create course
courseRouter.post("/add", protect, isAdmin, createCourse);

// Add lesson to course
courseRouter.post(
  "/:courseId/lesson",
  protect,
  isAdmin,
  addLesson
);


  // STUDENT ROUTES


// Get all courses
courseRouter.get("/", protect, getAllCourses);

// Get enrolled courses
courseRouter.get("/my-courses", protect, myCourses);

// Enroll in course
courseRouter.post("/enroll", protect, enrollCourse);

// Get single course (LEARN PAGE)

courseRouter.get("/:id", protect, getSingleCourse);

courseRouter.post(
  "/lesson/complete",
  protect,
  markLessonComplete
);


export default courseRouter;
