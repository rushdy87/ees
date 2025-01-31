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

    unit_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "units",
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
  },
  {
    tableName: "employees",
    timestamps: true,
  }
);

const Unit = require("./units");
Employee.belongsTo(Unit, { foreignKey: "unit_id", as: "unit" });

module.exports = Employee;
