const { getUnitById } = require("../controllers/units");

const router = require("express").Router();

// /api/v1/units

// GET single unit by id
router.get("/:id", getUnitById);

module.exports = router;
