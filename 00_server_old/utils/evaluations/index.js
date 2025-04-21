const Evaluation = require("../../models/evaluations");
const Unit = require("../../models/units");
const Employee = require("../../models/employees");

const findEvaluationById = async (id) => {
  const evaluation = await Evaluation.findByPk(id, {
    attributes: ["id", "year", "month", "score"],
    include: [
      {
        model: Employee,
        as: "employee",
        required: true,
        where: { is_active: true },
        attributes: ["name", "employee_number"],
        include: [
          {
            model: Unit,
            as: "unit",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  return evaluation;
};

const findEvaluations = async ({ year, month, employee_id, unit_id }) => {
  const whereConditions = { year };
  if (month) whereConditions.month = month;
  if (employee_id) whereConditions.employee_id = employee_id;

  const evaluation = await Evaluation.findAll({
    where: whereConditions,
    attributes: ["id", "year", "month", "score"],
    include: [
      {
        model: Employee,
        as: "employee",
        required: true,
        where: { is_active: true, ...(unit_id ? { unit_id } : {}) },
        attributes: ["name", "employee_number"],
        include: [
          {
            model: Unit,
            as: "unit",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  return evaluation;
};

const addEvaluation = async (employee_id, year, month, score) => {
  if (!employee_id || !year || !month || !score) {
    return null;
  }

  const evaluation = await Evaluation.create({
    employee_id,
    year,
    month,
    score,
  });
  return evaluation;
};

module.exports = {
  findEvaluations,
  addEvaluation,
  findEvaluationById,
};

/*
How This Works
The single route (GET /api/v1/evaluations)
Based on the query parameters, it will handle all cases dynamically.

Case	Query Parameters
Fetch evaluations for all employees in a specific year and month =>	?year=2024&month=3
Fetch evaluations for all employees in a specific year =>	?year=2024
Fetch evaluations for one employee in a specific year and month =>	?year=2024&month=3&employee_id=123
Fetch evaluations for one employee in a specific year =>	?year=2024&employee_id=123
Fetch evaluations for all employees in a specific unit in a specific year and month =>	?year=2024&month=3&unit_id=5
Fetch evaluations for all employees in a specific unit in a specific year =>	?year=2024&unit_id=5
*/
