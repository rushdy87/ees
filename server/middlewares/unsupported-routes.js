const { handleError } = require("../utils");

exports.unsupportedRoutes = (req, res, next) => {
  handleError(next, "Could not find this route!", 404);
};
