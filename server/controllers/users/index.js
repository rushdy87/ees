const { Op } = require("sequelize");
const { findEmployeeById } = require("../../utils/employees");
const { hashPassword } = require("../../utils/password");
const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const {
  findAllUsers,
  findUser,
  addUser,
  editUser,
  findUserById,
} = require("../../utils/users");
const { isRequestDataValid } = require("../../utils/validations");
const {
  hasRootPermission,
  hasMangerPermission,
} = require("../../utils/permissions");

exports.getAllUsers = async (req, res, next) => {
  const { user } = req;

  if (!hasRootPermission(user) && !hasMangerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    const users = await findAllUsers();
    if (!users || users.length === 0) {
      return handleError(next, "No users found", 404);
    }

    return handleSuccessResponse(res, users, "Users fetched successfully", 200);
  } catch (error) {
    handleError(next, "An error occurred while fetching users", 500, error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!hasRootPermission(user) && !hasMangerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    const usr = await findUserById(id);
    if (!usr) {
      return handleError(next, "User not found", 404);
    }
    if (!usr || usr.length === 0) {
      return handleError(next, "No users found", 404);
    }
    return handleSuccessResponse(res, usr, "User fetched successfully", 200);
  } catch (error) {
    handleError(next, "An error occurred while fetching users", 500, error);
  }
};

exports.createUser = async (req, res, next) => {
  const data = req.body;
  const { username, password, employee_id, role } = data || {};
  const { user } = req;

  if (!hasRootPermission(user) && !hasMangerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  // Validate required fields
  if (!isRequestDataValid(data, ["username", "password", "employee_id"])) {
    console.log("Invalid request data", data);
    return handleError(next, "Invalid request data", 400);
  }

  try {
    // Check if the employee exists
    const employee = await findEmployeeById(employee_id);
    if (!employee) {
      return handleError(next, "No employee found with this ID.", 404);
    }

    // Check if username or employee_id is already in use
    const existingUser = await findUser({
      [Op.or]: [{ username }, { employee_id }],
    });

    if (existingUser) {
      const errorMessage =
        existingUser.username === username
          ? "Username already exists."
          : "This employee is already assigned to a user.";
      return handleError(next, errorMessage, 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await addUser({
      username,
      password: hashedPassword,
      employee_id,
      role,
    });

    if (!newUser) {
      return handleError(next, "Failed to create user", 500);
    }

    return handleSuccessResponse(
      res,
      newUser,
      "User created successfully",
      201
    );
  } catch (error) {
    handleError(next, "An error occurred while creating the user", 500, error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const { user } = req;

  if (!hasRootPermission(user) && !hasMangerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  if (!isRequestDataValid(data, ["password"])) {
    return handleError(next, "Invalid request data", 400);
  }

  try {
    const usr = await findUserById(id);
    if (!usr) {
      return handleError(next, "User not found", 404);
    }

    const hashedPassword = await hashPassword(data.password);

    const updatedUser = await editUser(id, { password: hashedPassword });

    if (!updatedUser) {
      return handleError(next, "Failed to update user", 500);
    }

    return handleSuccessResponse(
      res,
      updatedUser,
      "User updated successfully",
      200
    );
  } catch (error) {
    handleError(next, "An error occurred while updating user", 500, error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  if (!hasRootPermission(user) && !hasMangerPermission(user)) {
    return handleError(
      next,
      "You don't have permission to access this resource.",
      403
    );
  }

  try {
    const usr = await findUserById(id);
    if (!usr) {
      return handleError(next, "User not found", 404);
    }

    await usr.destroy();

    return handleSuccessResponse(res, null, "User deleted successfully", 200);
  } catch (error) {
    handleError(next, "An error occurred while deleting user", 500, error);
  }
};
