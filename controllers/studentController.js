const asyncHandler = require("express-async-handler");
const {
  validateStudents,
  validateEditStudents,
} = require("../models/students");
const { validateStudentCourses } = require("../models/studentCourses");
const {
  studentCreation,
  findStudentByEmail,
  findAssignedCoursesByIds,
  findAllStudents,
  findAllStudentsByStatus,
  updateStudentById,
  findStudentById,
  deleteStudentById,
  assignCourse,
  deleteAssignedCourseById,
  findAllAssignedCourses,
} = require("../helpers/studentHelper");
const { findCourseById } = require("../helpers/courseHelper");
const { expressValidatorError } = require("../middleware/commonMiddleware");
const { validate: isUUID } = require("uuid");

// @desc Create new student
// @route POST /api/students
// @access Private
const createStudent = asyncHandler(async (req, res) => {
  const student = req.body;

  // Validate request body using Joi
  if (student) {
    const { error } = validateStudents(student);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  }

  try {
    // Check if student already exists
    const existingStudent = await findStudentByEmail(student.email);
    if (existingStudent) {
      res.status(400);
      throw new Error("A student with this email already exists.");
    }

    // Create a new student
    const newStudent = await studentCreation(student);
    if (!newStudent) {
      res.status(400);
      throw new Error("Student could not be created.");
    }

    return res.status(200).send({
      message: "Student created successfully.",
      student: newStudent,
    });
  } catch (error) {
    // Error handling
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong in student creation: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get all students
// @route GET /api/students
// @access Private
const getStudents = asyncHandler(async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await findAllStudents();

    return res.status(200).send({
      message: "Students retrieved successfully.",
      students,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong while retrieving students: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Get all students based on inActive status
// @route GET /api/students?inActive=true
// @access Private
const getStudentsByStatus = asyncHandler(async (req, res) => {
  expressValidatorError(req);
  const { isActive } = req.query; // Get inActive status from query parameter

  try {
    // Fetch students based on isActive status
    const students = await findAllStudentsByStatus(isActive);

    if (!students || students.length === 0) {
      res.status(404);
      throw new Error("No students found with the specified isActive status.");
    }

    return res.status(200).send({
      message: `Students with isActive status ${isActive} retrieved successfully.`,
      students,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong while retrieving students by isActive status: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Edit a student's details by ID
// @route PUT /api/students/:id
// @access Private
const editStudent = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  const studentId = req.params.id;
  if (!isUUID(studentId)) {
    return res.status(400).json({ error: "Invalid Id format" });
  }

  const updatedData = req.body;

  try {
    // Check if student exists by ID
    const student = await findStudentById(studentId);
    if (!student) {
      res.status(404);
      throw new Error("Student not found.");
    }

    // Validate the email uniqueness
    if (updatedData.email && updatedData.email !== student.email) {
      const existingStudent = await findStudentByEmail(updatedData.email);
      if (existingStudent) {
        res.status(400);
        throw new Error("A student with this email already exists.");
      }
    }

    // Validate student data with Joi
    const { error } = validateEditStudents(updatedData);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update the student record
    const updatedStudent = await updateStudentById(studentId, updatedData);
    if (!updatedStudent) {
      res.status(400);
      throw new Error("Failed to update student.");
    }

    return res.status(200).send({
      message: "Student updated successfully.",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400 ? "Something went wrong in student update: " : ""
      }${error.message}`
    );
  }
});

// @desc Delete a student's details by ID
// @route DELETE /api/students/:id
// @access Private
const deleteStudent = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  try {
    // Check if student exists by ID
    const studentId = req.params.id;
    if (!isUUID(studentId)) {
      return res.status(400).json({ error: "Invalid Id format" });
    }

    // Delete the student record
    const deletedCount = await deleteStudentById(studentId);

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400 ? "Something went wrong in student delete: " : ""
      }${error.message}`
    );
  }
});

// @desc Assign a course to a student
// @route POST /api/students/courses/assign
// @access Private
const assignCourseController = asyncHandler(async (req, res) => {
  const body = req.body;

  // Validate request body using Joi
  if (body) {
    const { error } = validateStudentCourses(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  }

  try {
    // Check if student exist
    const existingStudent = await findStudentById(body.student_id);
    if (!existingStudent) {
      res.status(400);
      throw new Error("The student doesn't exist.");
    }

    // Check if course exist
    const existingCourse = await findCourseById(body.course_id);
    if (!existingCourse) {
      res.status(400);
      throw new Error("The course doesn't exist.");
    }

    // Check if course already assigned
    const existingAssignedCourse = await findAssignedCoursesByIds(
      body.student_id,
      body.course_id
    );
    if (existingAssignedCourse) {
      res.status(400);
      throw new Error("This course is already assigned.");
    }

    // Assign a new course
    const result = await assignCourse(body);
    if (!result) {
      res.status(400);
      throw new Error("Course could not be assigned.");
    }

    return res.status(200).send({
      message: "The course is assigned successfully.",
      body: result,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong in course assignment: "
          : ""
      }${error.message}`
    );
  }
});

// @desc Delete an assigned course
// @route DELETE /api/students/courses/delete/:id
// @access Private
const deleteaAssignCourseController = asyncHandler(async (req, res) => {
  //validate param data
  expressValidatorError(req);

  try {
    // Check if student exists by ID
    const assignedCourseId = req.params.id;
    if (!isUUID(assignedCourseId)) {
      return res.status(400).json({ error: "Invalid Id format" });
    }

    // Delete the student record
    const deletedCount = await deleteAssignedCourseById(assignedCourseId);

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Assigned Course deleted successfully" });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400 ? "Something went wrong in student delete: " : ""
      }${error.message}`
    );
  }
});

// @desc Get all assigned courses based on student id
// @route GET /api/students/courses/get/:id
// @access Private
const getStudentWithAssignedCourses = asyncHandler(async (req, res) => {
  expressValidatorError(req);

  const studentId = req.params.id;
  if (!isUUID(studentId)) {
    return res.status(400).json({ error: "Invalid Id format" });
  }

  try {
    // Fetch assigned courses based on student id
    const student = await findAllAssignedCourses(studentId);

    if (!student || student.length === 0) {
      res.status(404);
      throw new Error("No students found with the specified id.");
    }

    const filteredResult = {
      ...student.toJSON(),
      enrolledCourses: student.toJSON().enrolledCourses.map((course) => {
        const studentCourse = course.student_courses;
        const newData = {
          ...course,
          assignedId: studentCourse.id,
          enrollmentDate: studentCourse.enrollmentDate,
          completionDate: studentCourse.completionDate,
          isCompleted: studentCourse.isCompleted,
        };
        delete newData.student_courses;
        return newData;
      }),
    };

    return res.status(200).send({
      message: `Student with id ${studentId} retrieved successfully.`,
      student: filteredResult,
    });
  } catch (error) {
    res.status(res.statusCode ? res.statusCode : 500);
    throw new Error(
      `${
        res.statusCode !== 400
          ? "Something went wrong while retrieving student by id: "
          : ""
      }${error.message}`
    );
  }
});

module.exports = {
  createStudent,
  getStudents,
  getStudentsByStatus,
  editStudent,
  deleteStudent,
  assignCourseController,
  deleteaAssignCourseController,
  getStudentWithAssignedCourses,
};
