const {
  handleError,
  handleSuccessResponse,
} = require("../../utils/response_handlers");
const {
  findAllRoles,
  findRoleById,
  findRoleByType,
  addRole,
} = require("../../utils/roles");
const { isRequestDataValid } = require("../../utils/validations");

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await findAllRoles();
    if (!roles || roles.length === 0) {
      return handleError(next, "No roles found", 404);
    }

    handleSuccessResponse(res, roles, "Roles fetched successfully", 200);
  } catch (error) {
    handleError(next, "Error fetching roles", 500, error);
  }
};

exports.getRoleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const role = await findRoleById(id);

    if (!role) {
      return handleError(next, "Role not found", 404);
    }
    handleSuccessResponse(res, role, "Role fetched successfully", 200);
  } catch (error) {
    handleError(next, "Error fetching role", 500, error);
  }
};
