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

module.exports = { findEvaluationRuleById };
