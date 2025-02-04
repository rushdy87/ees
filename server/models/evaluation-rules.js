const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const Unit = require("./units.js"); // Import Unit model

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
      allowNull: true,
    },
    range_80_89: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    range_70_79: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "evaluationRules",
    timestamps: true,
  }
);

// Define Many-to-Many Relationship
EvaluationRule.belongsToMany(Unit, {
  through: "EvaluationRuleUnits", // Junction table
  foreignKey: "evaluationRule_id",
  otherKey: "unit_id",
  as: "units",
});

Unit.belongsToMany(EvaluationRule, {
  through: "EvaluationRuleUnits",
  foreignKey: "unit_id",
  otherKey: "evaluationRule_id",
  as: "evaluationRules",
});

module.exports = EvaluationRule;
