const { Op } = require("sequelize");
const Employee = require("../models/employees");
const Evaluation = require("../models/evaluations");
const Unit = require("../models/units");

const findEvaluationById = async (id) => {
  return await Evaluation.findByPk(id);
};

const findAllEvaluationsByDate = async ({ year, month, employee_id }) => {
  const where = { year };
  if (month) where.month = month;
  if (employee_id) where.employee_id = employee_id;

  return await Evaluation.findAll({
    where,
    include: [
      {
        model: Employee,
        as: "employee",
        attributes: ["name", "employee_number", "unit_id", "shift"],
        include: [
          {
            model: Unit, // Include the Unit model
            as: "unit",
            attributes: ["name", "unit_group"], // Select desired fields
          },
        ],
      },
    ],
  });
};

const findAllEvaluationsByUnit = async ({ unit_id, shift, year, month }) => {
  try {
    // Step 1: Get employees in the given unit (optionally filtered by shift)
    const condition = { unit_id, is_active: true }; // Filter only active employees
    if (shift) condition.shift = shift;

    const employees = await Employee.findAll({
      where: condition,
      attributes: ["id"], // Only fetch employee IDs
    });

    if (!employees.length) {
      return []; // No employees found in this unit
    }

    // Step 2: Extract employee IDs
    const employeeIds = employees.map((emp) => emp.id);

    // Step 3: Query evaluations for these employees
    const where = { employee_id: { [Op.in]: employeeIds } };
    if (year) where.year = year;
    if (month) where.month = month;

    const evaluations = await Evaluation.findAll({
      where,
      include: [
        {
          model: Employee,
          attributes: ["name", "employee_number", "unit_id", "shift"],
          include: [
            {
              model: Unit,
              attributes: ["id", "name", "unit_group"],
            },
          ],
        },
      ],
    });

    return evaluations;
  } catch (error) {
    console.error("Error fetching evaluations by unit:", error);
    throw error;
  }
};

const isEmployeeEvaluated = async (employee_id, year, month) => {
  const evaluation = await Evaluation.findOne({
    where: { employee_id, year, month },
  });
  return evaluation ? true : false;
};

const addEvaluation = async ({ employee_id, year, month, score }) => {
  return await Evaluation.create({ employee_id, year, month, score });
};

module.exports = {
  findEvaluationById,
  findAllEvaluationsByDate,
  findAllEvaluationsByUnit,
  isEmployeeEvaluated,
  addEvaluation,
};
