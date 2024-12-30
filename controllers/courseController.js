const asyncHandler = require("express-async-handler");
const { validateCourses, validateEditCourses } = require("../models/courses");
const {
  courseCreation,
  findAllCourses,
  updateCourseById,
  findCourseById,
  deleteCourseById,
  findAllAssignedStudents,
} = require("../helpers/courseHelper");
const { expressValidatorError } = require("../middleware/commonMiddleware");
const { validate: isUUID } = require("uuid");

// @desc Create new course
// @route POST /api/courses
// @access Private
const createCourse = asyncHandler(async (req, res) => {
  const course = req.body;

  // Validate request body using Joi

  if (course) {
    const { error } = validateCourses(course);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  }

  try {
    // Create a new course
    const newCourse = await courseCreation(course);
    if (!newCourse) {
      res.status(400);
      throw new Error("Course could not be created.");
    }

    return res.status(200).send({
      message: "Course created successfully.",
      course: newCourse,
    });
  } catch (error) {
    // Error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong in course creation: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get all courses
// @route GET /api/courses
// @access Private
const getCourses = asyncHandler(async (req, res) => {
  try {
    // Fetch all students from the database
    const courses = await findAllCourses();

    return res.status(200).send({
      message: "Courses retrieved successfully.",
      courses,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong while retrieving courses: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Edit a course's details by ID
// @route PUT /api/courses/:id
// @access Private
const editCourse = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  const courseId = req.params.id;
  if (!isUUID(courseId)) {
    return res.status(400).json({ error: "Invalid Id format" });
  }

  const updatedData = req.body;

  try {
    // Check if course exists by ID
    const course = await findCourseById(courseId);
    if (!course) {
      res.status(404);
      throw new Error("Course not found.");
    }

    // Validate course data with Joi
    const { error } = validateEditCourses(updatedData);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update the course record
    const updatedCourse = await updateCourseById(courseId, updatedData);
    if (!updatedCourse) {
      res.status(400);
      throw new Error("Failed to update course.");
    }

    return res.status(200).send({
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400 ? "Something went wrong in course update: " : ""
      }${error.message}`
    );
  }
});

// @desc Delete a course's details by ID
// @route DELETE /api/courses/:id
// @access Private
const deleteCourse = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  try {
    // Check if course exists by ID
    const courseId = req.params.id;
    if (!isUUID(courseId)) {
      return res.status(400).json({ error: "Invalid Id format" });
    }

    // Delete the course record
    const deletedCount = await deleteCourseById(courseId);

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong in course deletion: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get all assigned students based on course id
// @route GET /api/courses/getEnrolledStudents/:id
// @access Private
const getEnrolledStudents = asyncHandler(async (req, res) => {
  expressValidatorError(req);

  const courseId = req.params.id;
  if (!isUUID(courseId)) {
    return res.status(400).json({ error: "Invalid Id format" });
  }

  try {
    // Fetch assigned students based on course id
    const course = await findAllAssignedStudents(courseId);

    if (!course || course.length === 0) {
      res.status(404);
      throw new Error("No courses found with the specified id.");
    }

    const filteredResult = {
      ...course.toJSON(),
      students: course.toJSON().students.map((student) => {
        const studentCourse = student.student_courses;
        const newData = {
          ...student,
          assignedId: studentCourse.id,
          courseEnrollmentDate: studentCourse.enrollmentDate,
          CourseCompletionDate: studentCourse.completionDate,
          isCourseCompleted: studentCourse.isCompleted,
        };
        delete newData.student_courses;
        return newData;
      }),
    };

    return res.status(200).send({
      message: `Course with id ${courseId} retrieved successfully.`,
      course: filteredResult,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong while retrieving course by id: "
          : ""
      }${error.message}`
    );
  }
});

module.exports = {
  createCourse,
  getCourses,
  editCourse,
  deleteCourse,
  getEnrolledStudents,
};
