const { Courses } = require("../models/courses");
const { Students } = require("../models/students");

// Create a new course
const courseCreation = async (courseData) => {
  try {
    const course = await Courses.create(courseData);
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Find all courses
const findAllCourses = async () => {
  try {
    const course = await Courses.findAll();
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find course by ID
const findCourseById = async (id) => {
  try {
    const course = await Courses.findOne({
      where: { id },
    });
    return course;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update course by ID
const updateCourseById = async (id, updatedData) => {
  try {
    await Courses.update(updatedData, {
      where: { id },
    });
    const student = await Courses.findByPk(id);
    return student;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete course by ID
const deleteCourseById = async (id) => {
  try {
    const deletedCount = await Courses.destroy({
      where: { id },
    });
    return deletedCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find all assigned students with the specified course id
const findAllAssignedStudents = async (id) => {
  try {
    const result = await Courses.findByPk(id, {
      include: {
        model: Students,
        as: "students", // Use the alias from association
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "dateOfBirth",
          "enrollmentDate",
        ], // Fetch student details
      },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  courseCreation,
  findAllCourses,
  findCourseById,
  updateCourseById,
  deleteCourseById,
  findAllAssignedStudents,
};
