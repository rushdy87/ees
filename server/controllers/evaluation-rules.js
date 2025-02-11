const { handleError, handleSuccessResponse } = require("../utils");
const {
  findEvaluationRuleById,
  findAllEvaluationRules,
  addEvaluationRule,
} = require("../utils/evaluation-rules");
const { validateScoreRange, validateInput } = require("../utils/validations");

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

exports.getAllRules = async (req, res, next) => {
  try {
    const evaluationRules = await findAllEvaluationRules();

    if (!evaluationRules.length) {
      return handleError(next, "No evaluation rules found", 404);
    }

    handleSuccessResponse(
      res,
      evaluationRules,
      "Evaluation rules fetched successfully",
      200
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching the evaluation rules",
      500,
      error
    );
  }
};

exports.createRule = async (req, res, next) => {
  if (!req.body.data) {
    return handleError(next, "All fields are required", 400);
  }

  if (
    !validateInput(req.body.data, [
      "range_90_93",
      "range_80_89",
      "range_70_79",
      "units",
    ])
  ) {
    return handleError(next, "All fields are required", 400);
  }

  try {
    const evaluationRule = await addEvaluationRule(req.body.data);

    handleSuccessResponse(
      res,
      evaluationRule,
      "Evaluation rule created successfully",
      201
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while creating the evaluation rule",
      500,
      error
    );
  }
};
