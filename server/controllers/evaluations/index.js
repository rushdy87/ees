const { findEmployeeById } = require("../../utils/employees");
const {
  findEvaluations,
  addEvaluation,
  findEvaluationById,
} = require("../../utils/evaluations");
const {
  hasPermissionToRead,
  hasPermissionToModifyEvaluation,
} = require("../../utils/permissions");
const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const { isRequestDataValid } = require("../../utils/validations");

exports.getEvaluations = async (req, res, next) => {
  const { year, month, employee_id, unit_id } = req.query;

  const { user } = req;

  if (!hasPermissionToRead(user, unit_id)) {
    return handleError(
      next,
      "You do not have permission to access this resource",
      403
    );
  }

  if (!year) return handleError(next, "Year is required", 400);

  try {
    const evaluations = await findEvaluations({
      year,
      month,
      employee_id,
      unit_id,
    });

    if (!evaluations || evaluations.length === 0) {
      return handleError(next, "No evaluations found", 404);
    }

    handleSuccessResponse(
      res,
      evaluations,
      "Evaluations retrieved successfully",
      200
    );
  } catch (error) {
    handleError(
      next,
      "An error occurred while retrieving evaluations",
      500,
      error
    );
  }
};

exports.createEvaluation = async (req, res, next) => {
  const data = req.body;
  const { user } = req;

  if (!isRequestDataValid(data, ["year", "month", "score", "employee_id"]))
    return handleError(next, "All fields are required", 400);
  const { year, month, score, employee_id } = data;

  try {
    const employee = await findEmployeeById(employee_id); // You’ll need to implement/import this

    if (!employee) {
      return handleError(next, "Employee not found", 404);
    }

    if (
      !hasPermissionToModifyEvaluation(user, employee.unit.id, employee.shift)
    ) {
      return handleError(
        next,
        "You do not have permission to add an evaluation for this employee",
        403
      );
    }

    const existingEvaluation = await findEvaluations({
      year,
      month,
      employee_id,
    });
    if (existingEvaluation && existingEvaluation.length > 0) {
      return handleError(
        next,
        "An evaluation for this employee already exists for this month and year",
        400
      );
    }

    const evaluation = await addEvaluation(employee_id, year, month, score);
    if (!evaluation) {
      return handleError(next, "Failed to create evaluation", 400);
    }
    handleSuccessResponse(
      res,
      evaluation,
      "Evaluation created successfully",
      201
    );
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
  const data = req.body;
  const { user } = req;

  if (!isRequestDataValid(data, ["score"]))
    return handleError(next, "All fields are required", 400);

  try {
    const evaluation = await findEvaluationById(id);

    if (!evaluation) {
      return handleError(next, "Evaluation not found", 404);
    }

    if (
      !hasPermissionToModifyEvaluation(
        user,
        evaluation.unit.id,
        evaluation.employee.shift
      )
    ) {
      return handleError(
        next,
        "You do not have permission to update this evaluation",
        403
      );
    }

    const updatedEvaluation = await evaluation.update(data);

    handleSuccessResponse(
      res,
      updatedEvaluation,
      "Evaluation updated successfully",
      200
    );
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

  const { user } = req;

  try {
    const evaluation = await findEvaluationById(id);

    if (!evaluation) {
      return handleError(next, "Evaluation not found", 404);
    }

    if (
      !hasPermissionToModifyEvaluation(
        user,
        evaluation.unit.id,
        evaluation.employee.shift
      )
    ) {
      return handleError(
        next,
        "You do not have permission to delete this evaluation",
        403
      );
    }

    await evaluation.destroy();

    handleSuccessResponse(res, null, "Evaluation deleted successfully", 200);
  } catch (error) {
    handleError(
      next,
      "An error occurred while deleting the evaluation",
      500,
      error
    );
  }
};
