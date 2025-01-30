const {
  getUnitById,
  getAllUnits,
  createUnit,
  updateUnit,
  deleteUnit,
} = require("../controllers/units");

const router = require("express").Router();

// /api/v1/units

// GET single unit by id
router.get("/:id", getUnitById);

// GET all units
router.get("/", getAllUnits);

// POST create new unit
router.post("/", createUnit);

// PATCH update unit by id
router.patch("/:id", updateUnit);

// DELETE delete unit by id
router.delete("/:id", deleteUnit);

module.exports = router;
