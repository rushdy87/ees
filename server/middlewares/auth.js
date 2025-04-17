const jwt = require("jsonwebtoken");
const { handleError } = require("../utils/response_handlers");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authenticate = (req, res, next) => {
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

    // Add user info to the request object
    req.user = decoded;

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
