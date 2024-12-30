const { Courses } = require('../models/courses');
const { StudentCourses } = require('../models/studentCourses');
const { Students } = require('../models/students');

const association = () => {
  // Students Model
  Students.belongsToMany(Courses, {
    through: 'student_courses',
    foreignKey: 'student_id',
    otherKey: 'course_id',
    as: 'enrolledCourses',
  });

  // Courses Model
  Courses.belongsToMany(Students, {
    through: 'student_courses',
    foreignKey: 'course_id',
    otherKey: 'student_id',
    as: 'students',
  });

  // StudentCourses Model
  StudentCourses.belongsTo(Students, {
    foreignKey: 'student_id',
    as: 'student',
  });
  StudentCourses.belongsTo(Courses, {
    foreignKey: 'course_id',
    as: 'course',
  });
};

module.exports = {
  association,
};
