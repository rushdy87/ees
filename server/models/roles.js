const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("Root", "Manager", "Admin", "Engineer"),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
