const { rolesType } = require("../constants/roles");

const validateInput = (input, fields, next) => {
  for (const field of fields) {
    if (!input[field]) {
      return false;
    }
  }
  return true;
};

const validateRoleType = (type) => {
  return rolesType.includes(type);
};

module.exports = { validateInput, validateRoleType };
