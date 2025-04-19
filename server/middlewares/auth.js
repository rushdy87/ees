const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/response_handlers");
const { findUserById } = require("../utils/users");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(next, "Unauthorized: Token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return handleError(next, "Unauthorized: Token not provided", 401);
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) {
      return handleError(next, "Unauthorized: Invalid token", 401);
    }

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return handleError(next, "Unauthorized: Token expired", 401);
    }
    // Check if the token is valid
    if (!decoded.id) {
      return handleError(next, "Unauthorized: Invalid token", 401);
    }

    const user = await findUserById(decoded.id);
    if (!user) {
      return handleError(next, "Unauthorized: User not found", 401);
    }

    // Check if the user is active
    if (!user.is_active) {
      return handleError(next, "Unauthorized: User is not active", 401);
    }

    // Add user info to the request object
    req.user = user;

    // Continue to next middleware or route handler
    next();
  } catch (error) {
    return handleError(
      next,
      "Unauthorized: Invalid or expired token",
      401,
      error
    );
  }
};

module.exports = authenticate;
