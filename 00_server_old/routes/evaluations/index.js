const router = require("express").Router();

const EvaluationControllers = require("../../controllers/evaluations");

// /api/v1/evaluations

// General endpoint for fetching evaluations with various filters
router.get("/", EvaluationControllers.getEvaluations);

// POST a new evaluation
router.post("/", EvaluationControllers.createEvaluation);

// PATCH update an existing evaluation
router.patch("/:id", EvaluationControllers.updateEvaluation);

// DELETE an existing evaluation
router.delete("/:id", EvaluationControllers.deleteEvaluation);

module.exports = router;
