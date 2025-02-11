const EvaluationRule = require("../models/evaluation-rules");
const Unit = require("../models/units");

const findEvaluationRuleById = async (id) => {
  return await EvaluationRule.findByPk(id, {
    include: {
      model: Unit,
      as: "units",
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
};

const findAllEvaluationRules = async () => {
  return await EvaluationRule.findAll({
    include: {
      model: Unit,
      as: "units",
      attributes: ["id", "name"],
      through: { attributes: [] },
    },
  });
};

const addEvaluationRule = async (rule) => {
  return await EvaluationRule.create(rule, {
    include: {
      model: Unit,
      as: "units",
    },
  });
};

module.exports = {
  findEvaluationRuleById,
  findAllEvaluationRules,
  addEvaluationRule,
};
