const { Op } = require("sequelize");

const Unit = require("../../models/units");
const { units } = require("../../constants/units");

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

const findUnitByNameOrSymbol = async (symbol, excludeId = null) => {
  const whereCondition = excludeId ? { id: { [Op.ne]: excludeId } } : {};
  return await Unit.findOne({
    where: {
      ...whereCondition,
      [Op.or]: [{ symbol }],
    },
    attributes: ["id", "name", "symbol"],
  });
};

const addUnit = async (symbol) => {
  const unit = units.find((unit) => unit.symbol === symbol);
  return await Unit.create(unit);
};

const updateUnit = async (id, symbol) => {
  const unit = await findUnitById(id);
  if (!unit) return null;

  const { name } = units.find((unit) => unit.symbol === symbol);

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
