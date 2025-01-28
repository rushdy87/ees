const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // employee_id: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: "Employees",
    //     key: "id",
    //   },
    //   onDelete: "SET NULL",
    // },
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
    //     model: "Roles",
    //     key: "id",
    //   },
    //   onDelete: "CASCADE",
    // },
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
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
