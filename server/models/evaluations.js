const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Evaluation = sequelize.define(
  "Evaluation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Employees",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "evaluations",
    timestamps: true,
  }
);

module.exports = Evaluation;
