const { Op } = require("sequelize");

const Unit = require("../../models/units");

const findUnitById = async (id) => {
  return await Unit.findByPk(id, { attributes: ["id", "name", "symbol"] });
};

const findAllUnits = async () => {
  return await Unit.findAll({ attributes: ["id", "name", "symbol"] });
};

const findUnitBySymbol = async (symbol) => {
  return await Unit.findOne({
    where: { symbol },
    attributes: ["id", "name", "symbol"],
  });
};

const findUnitByName = async (name) => {
  return await Unit.findOne({
    where: { name },
    attributes: ["id", "name", "symbol"],
  });
};

const findUnitByNameOrSymbol = async (name, symbol, excludeId = null) => {
  const whereCondition = excludeId ? { id: { [Op.ne]: excludeId } } : {};
  return await Unit.findOne({
    where: {
      ...whereCondition,
      [Op.or]: [{ name }, { symbol }],
    },
    attributes: ["id", "name", "symbol"],
  });
};

const addUnit = async (name, symbol) => {
  return await Unit.create({ name, symbol });
};

const updateUnit = async (id, name, symbol) => {
  const unit = await findUnitById(id);
  if (!unit) return null;

  await unit.update({ name, symbol });
  return unit;
};

const destroyUnit = async (id) => {
  return await Unit.destroy({ where: { id } });
};

module.exports = {
  findUnitById,
  findAllUnits,
  findUnitBySymbol,
  findUnitByName,
  findUnitByNameOrSymbol,
  addUnit,
  updateUnit,
  destroyUnit,
};
