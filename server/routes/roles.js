const {
  getRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/roles");

const router = require("express").Router();

// /api/v1/roles

// GET all roles
router.get("/", getRoles);

// GET a role by id
router.get("/:id", getRoleById);

// POST create a role
router.post("/", createRole);

// PATCH update a role by id
router.patch("/:id", updateRole);

// DELETE a role by id
router.delete("/:id", deleteRole);

module.exports = router;
