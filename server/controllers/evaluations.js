const e = require("express");
const { handleError, handleSuccessResponse } = require("../utils");
const {
  findAllEvaluationsByDate,
  findAllEvaluationsByUnit,
  addEvaluation,
  findEvaluationById,
  isEmployeeEvaluated,
} = require("../utils/evaluations");
const { validateInput } = require("../utils/validations");

exports.getEvaluations = async (req, res, next) => {
  const { year, month } = req.query;

  if (!year) {
    return handleError(next, "Year is required", 400);
  }

  if (!/^\d{4}$/.test(year) || (month && !/^(0[1-9]|1[0-2])$/.test(month))) {
    return handleError(next, "Invalid year or month format", 400);
  }

  try {
    const evaluations = await findAllEvaluationsByDate({ year, month });

    if (!evaluations.length) {
      return handleError(next, "No evaluations found", 404);
    }

    handleSuccessResponse(res, evaluations, "Evaluations found", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching evaluations",
      500,
      error
    );
  }
};

exports.getEvaluationsByEmployee = async (req, res, next) => {
  const { employee_id } = req.params;
  const { year, month } = req.query;

  if (!year) {
    return handleError(next, "Year is required", 400);
  }

  if (!/^\d{4}$/.test(year) || (month && !/^(0[1-9]|1[0-2])$/.test(month))) {
    return handleError(next, "Invalid year or month format", 400);
  }

  try {
    const evaluations = await findAllEvaluationsByDate({
      employee_id,
      year,
      month,
    });

    if (!evaluations.length) {
      return handleError(next, "No evaluations found", 404);
    }

    handleSuccessResponse(res, evaluations, "Evaluations found", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching evaluations",
      500,
      error
    );
  }
};

exports.getEvaluationsByUnit = async (req, res, next) => {
  const { unit_id } = req.params;
  const { year, month, shift } = req.query;

  if (!year) {
    return handleError(next, "Year is required", 400);
  }

  if (!/^\d{4}$/.test(year) || (month && !/^(0[1-9]|1[0-2])$/.test(month))) {
    return handleError(next, "Invalid year or month format", 400);
  }

  try {
    const evaluations = await findAllEvaluationsByUnit({
      unit_id,
      shift,
      year,
      month,
    });

    if (!evaluations.length) {
      return handleError(next, "No evaluations found", 404);
    }

    handleSuccessResponse(res, evaluations, "Evaluations found", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while fetching evaluations",
      500,
      error
    );
  }
};

exports.createEvaluation = async (req, res, next) => {
  if (!req.body.data) {
    return handleError(next, "All fields are required", 400);
  }

  const { employee_id, year, month, score } = req.body.data;

  if (
    !validateInput(req.body.data, ["employee_id", "year", "month", "score"])
  ) {
    return handleError(next, "All fields are required", 400);
  }

  if (
    !/^\d{4}$/.test(year) ||
    !/^(0[1-9]|1[0-2])$/.test(month) ||
    !/^\d{1,2}$/.test(score) ||
    score < 70 ||
    score > 93
  ) {
    return handleError(next, "Invalid input format", 400);
  }

  try {
    if (await isEmployeeEvaluated(employee_id, year, month)) {
      return handleError(
        next,
        "Employee is already evaluated for this month",
        400
      );
    }

    const evaluation = await addEvaluation({
      employee_id,
      year,
      month,
      score,
    });

    handleSuccessResponse(res, evaluation, "Evaluation created", 201);
  } catch (error) {
    handleError(
      next,
      "An error occurred while creating the evaluation",
      500,
      error
    );
  }
};

exports.updateEvaluation = async (req, res, next) => {
  const { id } = req.params;

  if (!req.body.data) {
    return handleError(next, "All fields are required", 400);
  }

  const { score } = req.body.data;

  if (!validateInput(req.body.data, ["score"])) {
    return handleError(next, "Score is required", 400);
  }

  if (!/^\d{1,2}$/.test(score) || score < 70 || score > 93) {
    return handleError(next, "Invalid score format", 400);
  }

  try {
    const evaluation = await findEvaluationById(id);

    if (!evaluation) {
      return handleError(next, "Evaluation not found", 404);
    }

    evaluation.score = score;
    await evaluation.save();

    handleSuccessResponse(res, evaluation, "Evaluation updated", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while updating the evaluation",
      500,
      error
    );
  }
};

exports.deleteEvaluation = async (req, res, next) => {
  const { id } = req.params;

  try {
    const evaluation = await findEvaluationById(id);

    if (!evaluation) {
      return handleError(next, "Evaluation not found", 404);
    }

    await evaluation.destroy();

    handleSuccessResponse(res, null, "Evaluation deleted", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while deleting the evaluation",
      500,
      error
    );
  }
};
