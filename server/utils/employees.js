const Employee = require("../models/employees");
const Unit = require("../models/units");

const findAllEmployees = async () => {
  return await Employee.findAll({
    where: {
      is_active: true,
    },
    include: [{ model: Unit, as: "unit", required: false }],
  });
};

const findEmployeeById = async (id) => {
  return await Employee.findByPk(id, {
    include: [{ model: Unit, as: "unit", required: false }],
  });
};

const isEmployeeNumberExist = async (employee_number) => {
  if (!employee_number) {
    return false;
  }

  const employee = await Employee.findOne({
    where: {
      employee_number,
    },
  });

  return !!employee;
};

const createEmployee = async (employee) => {
  return await Employee.create(employee);
};

module.exports = {
  findAllEmployees,
  findEmployeeById,
  isEmployeeNumberExist,
  createEmployee,
};
