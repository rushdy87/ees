const Employee = require("../../models/employees");
const Unit = require("../../models/units");

const findEmployeeById = async (id) => {
  const employee = await Employee.findByPk(id, {
    attributes: [
      "id",
      "name",
      "employee_number",
      "start_work_date",
      "shift",
      "is_active",
    ],
    include: [
      {
        model: Unit,
        as: "unit",
        attributes: ["name", "symbol"],
        required: false,
      },
    ],
  });

  return employee;
};

const findAllEmployees = async () => {
  const employees = await Employee.findAll({
    where: { is_active: true },
    attributes: ["id", "name", "employee_number", "start_work_date", "shift"],
    include: [
      {
        model: Unit,
        as: "unit",
        attributes: ["name", "symbol"],
        required: false,
      },
    ],
  });

  return employees;
};

const findEmployeeByEmployeeNumber = async (employee_number) => {
  const employee = await Employee.findOne({
    where: {
      employee_number,
    },
  });

  return employee;
};

const addEmployee = async (data) => {
  const employee = await Employee.create(data);
  return employee.get({ plain: true }); // Returns a plain object instead of a Sequelize instance
};

const editEmployee = async (id, data) => {
  const [affectedRows, updatedEmployees] = await Employee.update(data, {
    where: { id },
    returning: true,
  });

  if (affectedRows > 0) {
    return updatedEmployees[0]
      ? updatedEmployees[0].get({ plain: true })
      : null;
  }
  return null;
};

const destroyEmployee = async (id) => {
  return await Employee.destroy({ where: { id } }); // Returns affected rows
};

const findEmployeesByUnit = async (unit_id) => {
  const employees = await Employee.findAll({
    where: {
      unit_id,
      is_active: true,
    },
    attributes: [
      "id",
      "name",
      "employee_number",
      "start_work_date",
      "shift",
      "is_active",
    ],
    include: [
      {
        model: Unit,
        as: "unit",
        attributes: ["name", "symbol"],
        required: false,
      },
    ],
  });

  return employees;
};

module.exports = {
  findEmployeeById,
  findAllEmployees,
  findEmployeeByEmployeeNumber,
  addEmployee,
  editEmployee,
  destroyEmployee,
  findEmployeesByUnit,
};
