const { units, defaultMonthlyEvaluationRule } = require("../constants/units");
const EvaluationRule = require("../models/evaluation-rules");
const Unit = require("../models/units");

const findUnitById = async (id) => {
  const unit = await Unit.findByPk(id, {
    attributes: ["id", "name", "symbol", "evaluationRule_id"],
  });

  if (!unit) return null;

  const rule = unit.evaluationRule_id
    ? await EvaluationRule.findByPk(unit.evaluationRule_id)
    : defaultMonthlyEvaluationRule;

  return { id: unit.id, name: unit.name, symbol: unit.symbol, rule };
};

const findAllUnits = async () => {
  const units = await Unit.findAll({
    attributes: ["id", "name", "symbol", "evaluationRule_id"],
  });

  const ruleIds = [
    ...new Set(units.map((u) => u.evaluationRule_id).filter(Boolean)),
  ];
  const rules = await EvaluationRule.findAll({ where: { id: ruleIds } });

  const ruleMap = rules.reduce(
    (acc, rule) => ({ ...acc, [rule.id]: rule }),
    {}
  );

  return units.map((unit) => ({
    id: unit.id,
    name: unit.name,
    symbol: unit.symbol,
    rule: ruleMap[unit.evaluationRule_id] || defaultMonthlyEvaluationRule,
  }));
};

const isHaveValidSymbol = (symbol) =>
  units.some((unit) => unit.symbol === symbol);

const isUnitSymbolExist = async (symbol) => {
  if (!symbol) return false;
  return !!(await Unit.findOne({ where: { symbol } }));
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
