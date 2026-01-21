import Course from "../models/course.js";
import User from "../models/user.js";
import Lesson from "../models/lesson.js";
import mongoose from "mongoose";

//Helper to convert yt url in embeded
const convertToEmbedUrl = (url) => {
  
  if (url.includes("youtu.be")) {
    const videoId = url.split("/").pop().split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  
  if (url.includes("watch?v=")) {
    const videoId = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // already embed or unknown format
  return url;
};

//Admin create course
export const createCourse = async (req, res) => {
  try {
    const { title, description, level, playlistUrl } = req.body;

    const course = await Course.create({
      title,
      description,
      level,
      playlistUrl,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Course creation failed",
    });
  }
};


export const addLesson = async (req, res) => {
  try {
    const { title, youtubeUrl } = req.body;
    const { courseId } = req.params;

    //  auto convert youtube link to embed
    const embedUrl = convertToEmbedUrl(youtubeUrl);

    const lesson = await Lesson.create({
      title,
      youtubeUrl: embedUrl,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { lessons: lesson._id },
    });

    res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Adding lesson failed",
    });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("lessons")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};


export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id).populate("lessons");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user._id);

    //  HANDLE MIXED OLD DATA
    const alreadyEnrolled = user.enrolledCourses.some((c) => {
      if (c.course) {
        return c.course.toString() === courseId;
      }
      return c.toString() === courseId; // old ObjectId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled",
      });
    }

    user.enrolledCourses.push({
      course: courseId,
      completedLessons: [],
    });

    await user.save();

    res.json({
      success: true,
      message: "Enrolled successfully",
    });
  } catch (error) {
    console.error("❌ ENROLL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Enrollment failed",
    });
  }
};

export const myCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("enrolledCourses.course");

    const courses = [];

    for (const item of user.enrolledCourses) {
      // NEW STRUCTURE
      if (item.course) {
        courses.push({
          _id: item.course._id,
          title: item.course.title,
          description: item.course.description,
          lessons: item.course.lessons || [],
          completedLessons: item.completedLessons || [],
        });
      }
      // OLD STRUCTURE (ObjectId only)
      else {
        const course = await Course.findById(item);
        if (course) {
          courses.push({
            _id: course._id,
            title: course.title,
            description: course.description,
            lessons: course.lessons || [],
            completedLessons: [],
          });
        }
      }
    }

    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error(" MY COURSES ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch my courses",
    });
  }
};








// STUDENT → MARK LESSON COMPLETE
export const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //  SAFE FIND (handles broken data)
    const enrolledCourse = user.enrolledCourses.find((c) => {
      if (!c) return false;

      // old broken format
      if (typeof c === "string" || c instanceof mongoose.Types.ObjectId) {
        return c.toString() === courseId;
      }

      // correct format
      if (c.course) {
        return c.course.toString() === courseId;
      }

      return false;
    });

    if (!enrolledCourse || !enrolledCourse.course) {
      return res.status(400).json({
        success: false,
        message: "User not enrolled in this course",
      });
    }

    // ensure completedLessons exists
    if (!Array.isArray(enrolledCourse.completedLessons)) {
      enrolledCourse.completedLessons = [];
    }

    // already completed
    if (
      enrolledCourse.completedLessons.some(
        (id) => id.toString() === lessonId
      )
    ) {
      return res.json({
        success: true,
        message: "Lesson already completed",
      });
    }

    enrolledCourse.completedLessons.push(lessonId);

    await user.save();

    res.json({
      success: true,
      message: "Lesson marked as completed",
    });
  } catch (error) {
    console.error(" markLessonComplete ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








