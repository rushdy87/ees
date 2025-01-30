const Unit = require("../models/units");

const findUnitById = async (id) => {
  return await Unit.findByPk(id);
};

const findAllUnits = async () => {
  return await Unit.findAll();
};

const addUnit = async (unit) => {
  return await Unit.create(unit);
};

module.exports = {
  findUnitById,
  findAllUnits,
  addUnit,
};
