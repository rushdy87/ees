const Role = require("../models/roles");

const findRoleById = async (roleId) => {
  return await Role.findByPk(roleId);
};

const findRoleByType = async (roleType) => {
  return await Role.findOne({ where: { type: roleType } });
};

const findAllRoles = async () => {
  return await Role.findAll();
};

const addRole = async (role) => {
  return await Role.create(role);
};

module.exports = { findRoleById, findRoleByType, findAllRoles, addRole };
