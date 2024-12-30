const Joi = require("joi");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

// Courses model
const Courses = sequelize.define(
  "courses",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in weeks
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "courses",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "courses_isActive_index",
        using: "BTREE",
        fields: [{ name: "isActive" }],
      },
    ],
  }
);

// Joi validation
function validateCourses(course) {
  const schema = Joi.object({
    course_name: Joi.string().max(255).required(),
    description: Joi.string().optional(),
    duration: Joi.number().integer().min(1).required(), // Minimum duration is 1 week
    isActive: Joi.boolean().optional(),
  });

  return schema.validate(course);
}

function validateEditCourses(course) {
  const schema = Joi.object({
    course_name: Joi.string().max(255),
    description: Joi.string().optional(),
    duration: Joi.number().integer().min(1), // Minimum duration is 1 week
    isActive: Joi.boolean().optional(),
  });

  return schema.validate(course);
}

// id generation
Courses.beforeCreate((course) => (course.id = Sequelize.UUIDV4));

exports.Courses = Courses;
exports.validateCourses = validateCourses;
exports.validateEditCourses = validateEditCourses;
