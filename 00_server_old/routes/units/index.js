const router = require("express").Router();

const UnitControllers = require("../../controllers/units");

// /api/v1/units

// GET single unit by id
router.get("/:id", UnitControllers.getUnitById);

// GET all units
router.get("/", UnitControllers.getAllUnits);

// POST create new unit
router.post("/", UnitControllers.createUnit);

// PATCH update unit by id
router.patch("/:id", UnitControllers.editUnit);

// DELETE delete unit by id
router.delete("/:id", UnitControllers.deleteUnit);

module.exports = router;
