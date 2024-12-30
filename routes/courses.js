const express = require("express");
const {
  createCourse,
  getCourses,
  editCourse,
  deleteCourse,
  getEnrolledStudents,
} = require("../controllers/courseController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createCourse);
router.get("/getAll", protect, getCourses);
router.get("/getEnrolledStudents/:id", protect, getEnrolledStudents);
router.put("/:id", protect, editCourse);
router.delete("/:id", protect, deleteCourse);

module.exports = router;
