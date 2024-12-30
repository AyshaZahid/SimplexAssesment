const { Students } = require('../models/students');
const { Users } = require('../models/users');
const { Courses } = require('../models/courses');
const { StudentCourses } = require('../models/studentCourses');

const syncDatabase = async () => {
  //syncing the database
  await Users.sync({ alter: true });
  await Students.sync({ alter: true });
  await Courses.sync({ alter: true });
  await StudentCourses.sync({ alter: true });
};

module.exports = {
  syncDatabase,
};
