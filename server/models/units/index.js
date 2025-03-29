const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Unit = sequelize.define(
  "Unit",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    symbol: {
      type: DataTypes.STRING(10), // Example: u52ab, u52cd, u53u54, u90, hfo, adm
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "units",
    timestamps: true,
  }
);

module.exports = Unit;
