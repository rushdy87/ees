const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const EvaluationRule = sequelize.define(
  "EvaluationRule",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    unit_group: {
      type: DataTypes.STRING, // A comma-separated string for unit groups
      allowNull: false,
    },
    range_90_93: {
      type: DataTypes.INTEGER, // Percentage for 90-93 range
      allowNull: true,
    },
    range_80_89: {
      type: DataTypes.INTEGER, // Percentage for 80-89 range
      allowNull: true,
    },
    range_70_79: {
      type: DataTypes.INTEGER, // Percentage for 70-79 range
      allowNull: true,
    },
  },
  {
    tableName: "evaluationRules",
    timestamps: true,
  }
);

module.exports = EvaluationRule;
