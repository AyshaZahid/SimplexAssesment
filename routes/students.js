const express = require("express");
const {
  createStudent,
  getStudentsByStatus,
  getStudents,
  editStudent,
  deleteStudent,
  assignCourseController,
  deleteaAssignCourseController,
  getStudentWithAssignedCourses,
} = require("../controllers/studentController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { query } = require("express-validator");

router.post("/", protect, createStudent);
router.post("/courses/assign", protect, assignCourseController);
router.get("/getAll", protect, getStudents);
router.get("/courses/get/:id", protect, getStudentWithAssignedCourses);
router.get(
  "/getActive",
  protect,
  [
    query("isActive")
      .isBoolean()
      .withMessage("isActive must be a boolean value."),
  ],
  getStudentsByStatus
);
router.put("/:id", protect, editStudent);
router.delete("/:id", protect, deleteStudent);
router.delete("/courses/assign/:id", protect, deleteaAssignCourseController);

module.exports = router;
