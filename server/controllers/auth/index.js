const { verifyPassword } = require("../../utils/password");
const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const { findUser } = require("../../utils/users");
const { isRequestDataValid } = require("../../utils/validations");

exports.login = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { username, password } = data || {};

    // Validate input
    if (!isRequestDataValid(data, ["username", "password"])) {
      return handleError(next, "Username and password are required", 400);
    }

    // Find user by username
    const user = await findUser({ username });
    if (!user) {
      return handleError(next, "Invalid username or password", 401);
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return handleError(next, "Invalid username or password", 401);
    }

    // Strip password before sending back the user
    const { password: _, ...safeUser } = user.get({ plain: true });

    // TODO: Add JWT or session logic here in the future

    return handleSuccessResponse(res, safeUser, "Login successful", 200);
  } catch (error) {
    console.error(error);
    return handleError(next, "An error occurred during login", 500, error);
  }
};
