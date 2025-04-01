const RolesControllers = require("../../controllers/roles");

const router = require("express").Router();

// /api/v1/roles

// GET all roles
router.get("/", RolesControllers.getAllRoles);

// GET a role by id
router.get("/:id", RolesControllers.getRoleById);

// POST create a role
router.post("/", RolesControllers.createRole);

// PATCH update a role by id
router.patch("/:id");

// DELETE a role by id
router.delete("/:id");

module.exports = router;
