const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Employee = require("../employees");

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
      onUpdate: "CASCADE",
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
    role: {
      type: DataTypes.ENUM("root", "manager", "admin", "engineer"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Define Associations
User.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

module.exports = User;
