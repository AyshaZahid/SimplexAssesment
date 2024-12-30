const { Students } = require("../models/students");
const { StudentCourses } = require("../models/studentCourses");
const { Courses } = require("../models/courses");

// Find a student by email
const findStudentByEmail = async (email) => {
  try {
    const student = await Students.findOne({
      where: { email },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find assigned courses
const findAssignedCoursesByIds = async (student_id, course_id) => {
  try {
    const assignedCourse = await StudentCourses.findOne({
      where: { student_id, course_id },
    });
    return assignedCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new student
const studentCreation = async (studentData) => {
  try {
    const student = await Students.create(studentData);
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Assign a new course
const assignCourse = async (data) => {
  try {
    const result = await StudentCourses.create(data);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find all students
const findAllStudents = async () => {
  try {
    const student = await Students.findAll();
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find all students with the specified isActive status
const findAllStudentsByStatus = async (isActive) => {
  try {
    const students = await Students.findAll({
      where: { isActive: isActive === "true" },
    });
    return students;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find all assigned courses with the specified student id
const findAllAssignedCourses = async (id) => {
  try {
    const result = await Students.findByPk(id, {
      include: {
        model: Courses,
        as: "enrolledCourses", // Use the alias from association
        attributes: ["id", "course_name", "description", "duration"], // Fetch course details
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find student by ID
const findStudentById = async (id) => {
  try {
    const student = await Students.findOne({
      where: { id },
    });
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update student by ID
const updateStudentById = async (id, updatedData) => {
  try {
    await Students.update(updatedData, {
      where: { id },
    });
    const student = await Students.findByPk(id);
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete course by ID
const deleteStudentById = async (id) => {
  try {
    const deletedCount = await Students.destroy({
      where: { id },
    });
    return deletedCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete assigned course by ID
const deleteAssignedCourseById = async (id) => {
  try {
    const deletedCount = await StudentCourses.destroy({
      where: { id },
    });
    return deletedCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findStudentByEmail,
  findAssignedCoursesByIds,
  studentCreation,
  findAllStudents,
  findAllStudentsByStatus,
  findStudentById,
  updateStudentById,
  deleteStudentById,
  assignCourse,
  deleteAssignedCourseById,
  findAllAssignedCourses,
};
