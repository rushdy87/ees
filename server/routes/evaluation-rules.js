const { getEvaluationRuleById } = require("../controllers/evaluation-rules");

const router = require("express").Router();

// /api/v1/evaluation-rules

// GET get rule by id
router.get("/:id", getEvaluationRuleById);

module.exports = router;
