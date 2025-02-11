const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");
const EvaluationRule = require("./evaluation-rules.js"); // Import EvaluationRule model

const Unit = sequelize.define(
  "Unit",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    symbol: {
      type: DataTypes.STRING(3), // Example: u45, u52, hfo, adm
      allowNull: false,
      unique: true,
    },
    evaluationRule_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: EvaluationRule, // ✅ Set FK Reference
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // If rule is deleted, keep unit but set FK to NULL
    },
  },
  {
    tableName: "units",
    timestamps: true,
  }
);

// ✅ Define Relationship
Unit.belongsTo(EvaluationRule, {
  foreignKey: "evaluationRule_id",
  as: "evaluationRule",
});

module.exports = Unit;
