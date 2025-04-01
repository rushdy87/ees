const Role = require("../../models/roles");

const findAllRoles = async () => {
  return await Role.findAll();
};

const findRoleById = async (id) => {
  return await Role.findByPk(id);
};

const findRoleByType = async (type) => {
  return await Role.findOne({
    where: {
      type,
    },
  });
};

const addRole = async (type, permissions) => {
  if (!type || !permissions) {
    return null;
  }
  const role = await Role.create({
    type,
    permissions,
  });
  return role;
};

module.exports = {
  findAllRoles,
  findRoleById,
  findRoleByType,
  addRole,
};
