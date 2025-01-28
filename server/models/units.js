const { DataTypes } = require("sequelize");

const sequelize = require("../config/db.js");

const Unit = sequelize.define(
  "Unit",
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
    symbol: {
      type: DataTypes.STRING(3), //u45, u52, u53, u54, u90, hfo, adm
      allowNull: false,
      unique: true,
    },
    unit_group: {
      type: DataTypes.STRING(30), // New column for unit grouping
      allowNull: false,
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
    tableName: "units",
    timestamps: false,
  }
);

module.exports = Unit;
