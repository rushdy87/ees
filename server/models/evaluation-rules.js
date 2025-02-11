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
    range_90_93: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    range_80_89: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    range_70_79: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "evaluationRules",
    timestamps: true,
  }
);

// ✅ Export the Model
module.exports = EvaluationRule;
