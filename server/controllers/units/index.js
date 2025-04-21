const {
  findUnitById,
  findAllUnits,
  findUnitBySymbol,
  addUnit,
  updateUnit,
  destroyUnit,
  findUnitByNameOrSymbol,
} = require("../../utils/units");
const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const {
  isRequestDataValid,
  isUnitHaveAValidSymbol,
} = require("../../utils/validations");
const {
  hasRootPermission,
  hasManagerPermission,
} = require("../../utils/permissions");

exports.getUnitById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!hasRootPermission(user) && !hasManagerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    // Fetch unit from database
    const unit = await findUnitById(id);

    if (!unit) {
      return handleError(next, `Unit with id (${id}) not found.`, 404);
    }

    return handleSuccessResponse(res, unit, "Unit fetched successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching the unit",
      500,
      error
    );
  }
};

exports.getAllUnits = async (req, res, next) => {
  const { user } = req;
  if (!hasRootPermission(user) && !hasManagerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    const units = await findAllUnits();

    if (!units || units.length === 0) {
      return handleError(next, "No units found.", 404);
    }

    handleSuccessResponse(res, units, "Units fetched successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching the units",
      500,
      error
    );
  }
};

exports.createUnit = async (req, res, next) => {
  const { symbol } = req.body;
  const { user } = req;

  if (!hasRootPermission(user) && !hasManagerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  if (!isRequestDataValid(req.body, ["symbol"])) {
    return handleError(
      next,
      "Invalid request data. Please provide unit symbol",
      400
    );
  }

  if (!isUnitHaveAValidSymbol(symbol)) {
    return handleError(next, "Invalid inputs symbol", 400);
  }

  try {
    // Check if unit with symbol already exists
    let existingUnit = await findUnitBySymbol(symbol);
    if (existingUnit) {
      return handleError(
        next,
        `Unit with symbol (${symbol}) already exists.`,
        400
      );
    }

    // create new unit
    const unit = await addUnit(symbol);
    if (!unit) {
      return handleError(
        next,
        "An error occurred while creating the unit",
        500
      );
    }
    handleSuccessResponse(res, unit, "Unit created successfully", 201);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while creating the unit",
      500,
      error
    );
  }
};

exports.editUnit = async (req, res, next) => {
  const { id } = req.params;
  const { symbol } = req.body;
  const { user } = req;

  if (!hasRootPermission(user) && !hasManagerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  if (!isRequestDataValid(req.body, ["symbol"])) {
    return handleError(
      next,
      "Invalid request data. Please provide unit symbol",
      400
    );
  }

  if (!isUnitHaveAValidSymbol(symbol)) {
    return handleError(next, "Invalid inputs symbol", 400);
  }

  try {
    const unit = await findUnitById(id);
    if (!unit) {
      return handleError(next, `Unit with id (${id}) not found.`, 404);
    }

    const duplicateUnit = await findUnitByNameOrSymbol(symbol, id);
    if (duplicateUnit) {
      return handleError(
        next,
        `Unit with symbol (${symbol}) already exists.`,
        400
      );
    }

    await updateUnit(id, symbol);

    handleSuccessResponse(res, unit, "Unit updated successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while updating the unit",
      500,
      error
    );
  }
};

exports.deleteUnit = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!hasRootPermission(user) && !hasManagerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    const unit = await findUnitById(id);
    if (!unit) {
      return handleError(next, `Unit with id (${id}) not found.`, 404);
    }

    const deletedRows = await destroyUnit(id); // 🔹 Pass `id` instead of `unit`
    if (!deletedRows) {
      return handleError(
        next,
        "An error occurred while deleting the unit",
        500
      );
    }

    handleSuccessResponse(res, null, "Unit deleted successfully", 204);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while deleting the unit",
      500,
      error
    );
  }
};
