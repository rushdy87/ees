const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employees");

const router = require("express").Router();

// /api/v1/employees

// GET all employees
router.get("/", getAllEmployees);

// GET an employee by id
router.get("/:id", getEmployeeById);

// POST a new employee
router.post("/", createEmployee);

// PATCH an employee
router.patch("/:id", updateEmployee);

// DELETE an employee
router.delete("/:id", deleteEmployee);

module.exports = router;
