const Joi = require('joi');
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');
const { Students } = require('./students');
const { Courses } = require('./courses');

// Model for Assigning Courses to Students
const StudentCourses = sequelize.define(
  'student_courses',
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    student_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Students,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    course_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: Courses,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'student_courses',
    timestamps: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
      {
        name: 'student_course_unique',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'student_id' }, { name: 'course_id' }],
      },
    ],
  }
);

// Joi Validation for Assigning Courses to Students
function validateStudentCourses(data) {
  const schema = Joi.object({
    student_id: Joi.string()
      .uuid()
      .required()
      .messages({ 'string.guid': 'Invalid student ID format' }),
    course_id: Joi.string()
      .uuid()
      .required()
      .messages({ 'string.guid': 'Invalid course ID format' }),
    enrollmentDate: Joi.date().iso().optional(),
    completionDate: Joi.date().iso().optional(),
    isCompleted: Joi.boolean().optional(),
  });

  return schema.validate(data);
}

// Export the Model and Validation
exports.StudentCourses = StudentCourses;
exports.validateStudentCourses = validateStudentCourses;
