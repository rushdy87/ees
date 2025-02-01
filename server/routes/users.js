const {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = require("express").Router();

// /api/v1/users

// GET single user by id
router.get("/:id", getUserById);

// GET all users
router.get("/", getAllUsers);

// POST create user
router.post("/", createUser);

// PATCH update user
router.patch("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;
