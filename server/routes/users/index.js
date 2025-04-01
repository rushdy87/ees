const router = require("express").Router();
const UsersController = require("../../controllers/users");

// /api/v1/users

// GET single user by id
router.get("/:id", UsersController.getUserById);

// GET all users
router.get("/", UsersController.getAllUsers);

// POST create user
router.post("/", UsersController.createUser);

// PATCH update user
router.patch("/:id", UsersController.updateUser);

// DELETE user
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
