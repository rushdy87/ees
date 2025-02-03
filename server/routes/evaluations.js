const {
  getEvaluations,
  getEvaluationsByEmployee,
  getEvaluationsByUnit,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
} = require("../controllers/evaluations");

const router = require("express").Router();

// /api/v1/evaluations

// GET all evaluations (by year and/or month)
router.get("/", getEvaluations);

// GET evaluations for a specific employee (by year and/or month)
router.get("/employee/:employee_id", getEvaluationsByEmployee);

// GET evaluations for a specific unit (by year and/or month) and optionally shift
router.get("/unit/:unit_id", getEvaluationsByUnit);

// POST a new evaluation
router.post("/", createEvaluation);

// PATCH update an existing evaluation
router.patch("/:id", updateEvaluation);

// DELETE an existing evaluation
router.delete("/:id", deleteEvaluation);

module.exports = router;
