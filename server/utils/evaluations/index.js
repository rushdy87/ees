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
