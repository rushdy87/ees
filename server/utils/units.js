const { units, defaultMonthlyEvaluationRule } = require("../constants/units");
const EvaluationRule = require("../models/evaluation-rules");
const Unit = require("../models/units");

const findUnitById = async (id) => {
  const unit = await Unit.findByPk(id, {
    attributes: ["id", "name", "symbol", "evaluationRule_id"], // Select only necessary fields
  });

  if (!unit) {
    return null;
  }

  let rule = await EvaluationRule.findByPk(unit.evaluationRule_id);

  if (!rule) {
    rule = defaultMonthlyEvaluationRule;
  }

  return { id: unit.id, name: unit.name, symbol: unit.symbol, rule };
};

const findAllUnits = async () => {
  return await Unit.findAll();
};

const isHaveValidSymbol = (symbol) =>
  units.some((unit) => unit.symbol === symbol);

const isUnitSymbolExist = async (symbol) => {
  if (!symbol) {
    return false;
  }

  const unit = await Unit.findOne({
    where: { symbol },
  });

  return !!unit;
};

const addUnit = async ({ symbol, evaluationRule_id = null }) => {
  const matchedUnit = units.find((u) => u.symbol === symbol);
  if (!matchedUnit) {
    throw new Error("Invalid unit name"); // Prevents undefined symbol
  }

  return await Unit.create({
    name: matchedUnit.name,
    symbol,
    evaluationRule_id,
  });
};

module.exports = {
  findUnitById,
  findAllUnits,
  isHaveValidSymbol,
  isUnitSymbolExist,
  addUnit,
};
