const { handleError, handleSuccessResponse } = require("../utils");
const {
  findRoleById,
  findRoleByType,
  findAllRoles,
  addRole,
} = require("../utils/roles");
const { validateInput, validateRoleType } = require("../utils/validations");

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await findAllRoles();

    if (!roles || roles.length === 0) {
      return handleError(next, "No roles found", 404);
    }

    return handleSuccessResponse(res, roles, "Roles fetched successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching roles",
      500,
      error
    );
  }
};

exports.getRoleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const role = await findRoleById(id);

    if (!role) {
      return handleError(next, "Role not found", 404);
    }

    return handleSuccessResponse(res, role, "Role fetched successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while fetching role",
      500,
      error
    );
  }
};

exports.createRole = async (req, res, next) => {
  const { type, permissions } = req.body;

  if (
    !validateInput(req.body, ["type", "permissions"], next) ||
    !validateRoleType(type)
  ) {
    return handleError(next, "Invalid input data", 400);
  }

  try {
    const existingRole = await findRoleByType(type);
    if (existingRole) {
      return handleError(next, "Role already exists", 409);
    }

    const role = await addRole({ type, permissions });

    return handleSuccessResponse(res, role, "Role created successfully", 201);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while creating role",
      500,
      error
    );
  }
};

exports.updateRole = async (req, res, next) => {
  const { id } = req.params;
  const { permissions } = req.body;

  if (!validateInput(req.body, ["permissions"], next)) {
    return handleError(next, "Invalid input data", 400);
  }

  try {
    const role = await findRoleById(id);

    if (!role) {
      return handleError(next, "Role not found", 404);
    }

    await role.update({ permissions });

    return handleSuccessResponse(res, role, "Role updated successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while updating role",
      500,
      error
    );
  }
};

exports.deleteRole = async (req, res, next) => {
  const { id } = req.params;

  try {
    const role = await findRoleById(id);

    if (!role) {
      return handleError(next, "Role not found", 404);
    }

    await role.destroy();

    return handleSuccessResponse(res, null, "Role deleted successfully", 200);
  } catch (error) {
    return handleError(
      next,
      "An error occurred while deleting role",
      500,
      error
    );
  }
};
