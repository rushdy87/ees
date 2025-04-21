const { DataTypes } = require("sequelize");

const sequelize = require("../../config/database");
const { rolesType } = require("../../constants/roles");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(...rolesType),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
    fields: ["type"],
  }
);

module.exports = Role;
