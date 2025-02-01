const { handleError, handleSuccessResponse } = require("../utils");
const { hashPassword } = require("../utils/password");
const {
  findUserById,
  findAllUsers,
  isUsernameExist,
  addUser,
  findUserByEmployeeId,
} = require("../utils/users");
const { validateInput } = require("../utils/validations");

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);
    if (!user) {
      return handleError(next, "User not found", 404);
    }

    handleSuccessResponse(res, user, "User found", 200);
  } catch (error) {
    handleError(next, "An error occurred while fetching the user", 500, error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers();

    if (!users || users.length === 0) {
      return handleError(next, "No users found", 404);
    }

    handleSuccessResponse(res, users, "Users found", 200);
  } catch (error) {
    handleError(next, "An error occurred while fetching the users", 500, error);
  }
};

exports.createUser = async (req, res, next) => {
  const { data } = req.body;

  if (
    !validateInput(data, ["employee_id", "username", "password", "role_id"])
  ) {
    return handleError(next, "Invalid input", 400);
  }

  try {
    if (await isUsernameExist(data.username)) {
      return handleError(next, "Username already exists", 400);
    }

    const userWithEmployeeId = await findUserByEmployeeId(data.employee_id);

    if (userWithEmployeeId) {
      return handleError(
        next,
        "This employee is already a user, update it or delete it first",
        400
      );
    }

    data.password = await hashPassword(data.password);

    const user = await addUser(data);

    if (!user) {
      return handleError(
        next,
        "An error occurred while creating the user",
        500
      );
    }

    handleSuccessResponse(res, user, "User created", 201);
  } catch (error) {
    handleError(next, "An error occurred while creating the user", 500, error);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const user = await findUserById(id);

    if (!user) {
      return handleError(next, "User not found", 404);
    }

    if (data.username && (await isUsernameExist(data.username))) {
      return handleError(next, "Username already exists", 400);
    }

    if (data.password && data.password.trim() !== "") {
      data.password = await hashPassword(data.password);
    }

    const updatedUser = await user.update(data);

    if (!updatedUser) {
      return handleError(
        next,
        "An error occurred while updating the user",
        500
      );
    }

    handleSuccessResponse(res, updatedUser, "User updated", 200);
  } catch (error) {
    handleError(next, "An error occurred while updating the user", 500, error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);

    if (!user) {
      return handleError(next, "User not found", 404);
    }

    await user.destroy();

    handleSuccessResponse(res, null, "User deleted", 200);
  } catch (error) {
    handleError(next, "An error occurred while deleting the user", 500, error);
  }
};
