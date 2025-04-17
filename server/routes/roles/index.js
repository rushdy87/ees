const RolesControllers = require("../../controllers/roles");

const router = require("express").Router();

// /api/v1/roles

// GET all roles
router.get("/", RolesControllers.getAllRoles);

// GET a role by id
router.get("/:id", RolesControllers.getRoleById);

module.exports = router;
