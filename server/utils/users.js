const Employee = require("../models/employees");
const Role = require("../models/roles");
const User = require("../models/users");
const { hashPassword } = require("./password");

const findUserById = async (id) => {
  return await User.findByPk(id, {
    include: [
      { model: Employee, required: false },
      { model: Role, required: false },
    ],
  });
};

const findUserByEmployeeId = async (employeeId) => {
  return await User.findOne({
    where: { employee_id: employeeId },
    include: [
      { model: Employee, required: false },
      { model: Role, required: false },
    ],
  });
};

const findAllUsers = async () => {
  return await User.findAll({
    include: [
      { model: Employee, required: false },
      { model: Role, required: false },
    ],
  });
};

const isUsernameExist = async (username) => {
  if (!username || username.trim() === "") {
    return false;
  }

  return !!(await User.findOne({ where: { username } }));
};

const addUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  findUserById,
  findUserByEmployeeId,
  findAllUsers,
  isUsernameExist,
  addUser,
};
