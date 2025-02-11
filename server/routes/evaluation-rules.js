const {
  getEvaluationRuleById,
  getAllRules,
  createRule,
} = require("../controllers/evaluation-rules");

const router = require("express").Router();

// /api/v1/evaluation-rules

// GET get rule by id
router.get("/:id", getEvaluationRuleById);

// GET get all rules
router.get("/", getAllRules);

// POST create a rule
router.post("/", createRule);

module.exports = router;
