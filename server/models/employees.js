const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Employee = sequelize.define(
  "Employee",
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
    employee_number: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
    start_work_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    unit: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Units",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    shift: {
      type: DataTypes.ENUM("A", "B", "C", "D"),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

module.exports = Employee;
