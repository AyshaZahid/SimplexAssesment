const Joi = require("joi");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

//students model
const Students = sequelize.define(
  "students",
  {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      required: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      required: true,
      unique: "students_email_unique",
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "students_email_unique",
        unique: true,
        using: "BTREE",
        fields: [{ name: "email" }],
      },
      {
        name: "students_isActive_index",
        using: "BTREE",
        fields: [{ name: "isActive" }],
      },
    ],
  }
);

//joi validation
function validateStudents(student) {
  const schema = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    dateOfBirth: Joi.date().iso().optional(),
    enrollmentDate: Joi.date().iso().optional(),
    isActive: Joi.boolean().optional(),
  });
  return schema.validate(student);
}

function validateEditStudents(student) {
  const schema = Joi.object({
    first_name: Joi.string().max(255),
    last_name: Joi.string().max(255),
    email: Joi.string()
      .min(5)
      .max(255)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    dateOfBirth: Joi.date().iso().optional(),
    enrollmentDate: Joi.date().iso().optional(),
    isActive: Joi.boolean().optional(),
  });
  return schema.validate(student);
}

//id generation
Students.beforeCreate((student) => (student.id = Sequelize.UUIDV4));

exports.Students = Students;
exports.validateStudents = validateStudents;
exports.validateEditStudents = validateEditStudents;
