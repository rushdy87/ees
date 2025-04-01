const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Employee = require("../employees");
const Role = require("../roles");

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
    // role_id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: "roles",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Define Associations
User.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });
// User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

module.exports = User;
