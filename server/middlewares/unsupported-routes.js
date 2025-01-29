const { HttpError } = require("../utils");

exports.unsupportedRoutes = (req, res, next) => {
  next(new HttpError("Could not find this route!", 404));
};
