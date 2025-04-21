const { handleError } = require("../utils/response_handlers");

exports.unsupportedRoutes = (req, res, next) => {
  handleError(next, "Could not find this route!", 404);
};
