const { units } = require("../constants/units");
const Unit = require("../models/units");

const findUnitById = async (id) => {
  return await Unit.findByPk(id);
};

const findAllUnits = async () => {
  return await Unit.findAll();
};

const isHaveValidName = (name) => units.some((unit) => unit.name === name);

const isUnitNameExist = async (unitName) => {
  if (!unitName) {
    return false;
  }

  const unit = await Unit.findOne({
    where: {
      name: unitName,
    },
  });

  return !!unit;
};

const addUnit = async ({ name, unit_group }) => {
  const matchedUnit = units.find((u) => u.name === name);
  if (!matchedUnit) {
    throw new Error("Invalid unit name"); // Prevents undefined symbol
  }

  return await Unit.create({ name, unit_group, symbol: matchedUnit.symbol });
};

module.exports = {
  findUnitById,
  findAllUnits,
  isHaveValidName,
  isUnitNameExist,
  addUnit,
};
