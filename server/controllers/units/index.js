const {
  findUnitById,
  findAllUnits,
  findUnitBySymbol,
  addUnit,
  findUnitByName,
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
  isUnitHaveAValidNameAndSymbol,
} = require("../../utils/validations");

exports.getUnitById = async (req, res, next) => {
  const { id } = req.params;

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
  const { name, symbol } = req.body.data;

  if (!isRequestDataValid(req.body.data, ["name", "symbol"])) {
    return handleError(
      next,
      "Invalid request data. Please provide name and symbol",
      400
    );
  }

  if (!isUnitHaveAValidNameAndSymbol(name, symbol)) {
    return handleError(next, "Invalid inputs [symbol or name]", 400);
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

    existingUnit = await findUnitByName(name);
    if (existingUnit) {
      return handleError(next, `Unit with name (${name}) already exists.`, 400);
    }

    // create new unit
    const unit = await addUnit(name, symbol);
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
  const { name, symbol } = req.body.data;

  if (!isRequestDataValid(req.body.data, ["name", "symbol"])) {
    return handleError(
      next,
      "Invalid request data. Please provide name and symbol",
      400
    );
  }
  if (!isUnitHaveAValidNameAndSymbol(name, symbol)) {
    return handleError(next, "Invalid inputs [symbol or name]", 400);
  }

  try {
    const unit = await findUnitById(id);
    if (!unit) {
      return handleError(next, `Unit with id (${id}) not found.`, 404);
    }

    const duplicateUnit = await findUnitByNameOrSymbol(name, symbol, id);
    if (duplicateUnit) {
      return handleError(
        next,
        `Unit with name (${name}) or symbol (${symbol}) already exists.`,
        400
      );
    }

    await updateUnit(id, name, symbol);

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
