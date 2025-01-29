const Unit = require("../models/units");
const { handleError, handleSuccessResponse } = require("../utils");

exports.getUnitById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const unit = await Unit.findByPk(id);

    if (!unit) {
      return handleError(next, "Unit not found", 404);
    }

    handleSuccessResponse(res, unit, "Unit found");
  } catch (error) {
    handleError(
      next,
      "There was an error occurred while fetching the unit",
      500
    );
  }
};
