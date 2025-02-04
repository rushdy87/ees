const { handleError, handleSuccessResponse } = require("../utils");
const { findEvaluationRuleById } = require("../utils/evaluation-rules");

exports.getEvaluationRuleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const evaluationRule = await findEvaluationRuleById(id);
    if (!evaluationRule) {
      return handleError(next, `Evaluation rule with id ${id} not found`, 404);
    }
    handleSuccessResponse(
      res,
      evaluationRule,
      "Evaluation rule fetched successfully",
      200
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching the evaluation rule",
      500,
      error
    );
  }
};
