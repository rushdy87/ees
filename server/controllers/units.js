const { handleError, handleSuccessResponse } = require("../utils");
const {
  findUnitById,
  findAllUnits,
  addUnit,
  isHaveValidSymbol,
  isUnitSymbolExist,
} = require("../utils/units");
const { validateInput } = require("../utils/validations");

exports.getUnitById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const unit = await findUnitById(id);

    if (!unit) {
      return handleError(next, `Unit with ID ${id} not found`, 404);
    }

    handleSuccessResponse(res, unit, "Unit found");
  } catch (error) {
    console.log(error);
    handleError(next, "An error occurred while fetching the unit", 500, error);
  }
};

exports.getAllUnits = async (req, res, next) => {
  try {
    const units = await findAllUnits();

    if (units.length === 0) {
      return handleError(next, "No units available", 404);
    }

    handleSuccessResponse(res, units, "Units retrieved successfully");
  } catch (error) {
    handleError(next, "An error occurred while fetching the units", 500, error);
  }
};

exports.createUnit = async (req, res, next) => {
  try {
    const { data } = req.body;
    if (!data || !validateInput(data, ["symbol"])) {
      return handleError(next, "Invalid input data", 400);
    }

    if (!isHaveValidSymbol(data.symbol)) {
      return handleError(next, `Invalid unit symbol: ${data.symbol}`, 400);
    }
    if (await isUnitSymbolExist(data.symbol)) {
      return handleError(
        next,
        `Unit symbol "${data.symbol}" already exists`,
        400
      );
    }

    const unit = await addUnit(data);
    handleSuccessResponse(res, unit, "Unit created successfully", 201);
  } catch (error) {
    handleError(next, "Error creating unit", 500, error);
  }
};

exports.updateUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.body.data) {
      return handleError(next, "Invalid input data", 400);
    }

    const { data } = req.body;

    if (data.symbol && !isHaveValidSymbol(data.symbol)) {
      return handleError(
        next,
        `The Unit symbol "${data.symbol}" is not valid`,
        400
      );
    }

    const unit = await findUnitById(id);
    if (!unit) {
      return handleError(next, `Unit with ID ${id} not found`, 404);
    }

    await unit.update(data);

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

    handleSuccessResponse(res, null, `Unit ${unit.name} deleted successfully`);
  } catch (error) {
    handleError(next, "An error occurred while deleting the unit", 500, error);
  }
};
