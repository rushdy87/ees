const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");
const Employee = require("./employees.js");
const Role = require("./roles.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

User.belongsTo(Employee, { foreignKey: "employee_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

module.exports = User;
