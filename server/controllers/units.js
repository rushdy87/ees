const { handleError, handleSuccessResponse } = require("../utils");
const { findUnitById, findAllUnits, addUnit } = require("../utils/units");
const { validateInput } = require("../utils/validations");

exports.getUnitById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const unit = await findUnitById(id);

    if (!unit) {
      return handleError(next, `Unit with id ${id} not found`, 404);
    }

    return handleSuccessResponse(res, unit, "Unit found");
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
      return handleError(next, "No units available", 404);
    }

    return handleSuccessResponse(res, units, "Units retrieved successfully");
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
  const { name, symbol, unit_group } = req.body;

  if (!validateInput(req.body, ["name", "symbol", "unit_group"], next)) {
    return handleError(next, "Invalid input data", 400);
  }

  try {
    const unit = await addUnit({ name, symbol, unit_group });

    return handleSuccessResponse(res, unit, "Unit created successfully", 201);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while creating the unit",
      500,
      error
    );
  }
};

exports.updateUnit = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const unit = await findUnitById(id);

    if (!unit) {
      return handleError(next, `Unit with id ${id} not found`, 404);
    }

    // Apply updates
    Object.assign(unit, updates);

    await unit.save();

    return handleSuccessResponse(
      res,
      unit,
      `Unit ${unit.name} updated successfully`
    );
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
      return handleError(next, `Unit with id ${id} not found`, 404);
    }

    await unit.destroy();

    return handleSuccessResponse(
      res,
      null,
      `Unit ${unit.name} deleted successfully`
    );
  } catch (error) {
    return handleError(
      next,
      "An error occurred while deleting the unit",
      500,
      error
    );
  }
};
